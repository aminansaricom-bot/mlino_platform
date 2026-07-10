import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { LlmGatewayService, ChatTurn } from './llm-gateway.service';
import { MemoryService } from './memory.service';
import { SendMessageDto } from './dto';

const HISTORY_WINDOW = 20; // last N messages sent to the LLM as context

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private orgs: OrganizationsService,
    private llm: LlmGatewayService,
    private memory: MemoryService,
  ) {}

  private async getPartner(organizationId: string, partnerId: string) {
    const partner = await this.prisma.partner.findFirst({
      where: { id: partnerId, organizationId },
    });
    if (!partner) throw new NotFoundException('پارتنر پیدا نشد');
    return partner;
  }

  private async getOrCreateConversation(
    organizationId: string,
    partnerId: string,
    conversationId: string | undefined,
    firstMessage: string,
  ) {
    if (conversationId) {
      const existing = await this.prisma.conversation.findFirst({
        where: { id: conversationId, organizationId, partnerId },
      });
      if (!existing) throw new NotFoundException('مکالمه پیدا نشد');
      return existing;
    }
    return this.prisma.conversation.create({
      data: {
        organizationId,
        partnerId,
        title: firstMessage.slice(0, 60),
      },
    });
  }

  async sendMessage(userId: string, dto: SendMessageDto) {
    await this.orgs.assertMember(userId, dto.organizationId);
    const partner = await this.getPartner(dto.organizationId, dto.partnerId);
    const conversation = await this.getOrCreateConversation(
      dto.organizationId,
      dto.partnerId,
      dto.conversationId,
      dto.message,
    );

    await this.prisma.message.create({
      data: { conversationId: conversation.id, role: 'user', content: dto.message },
    });

    const history = await this.prisma.message.findMany({
      where: { conversationId: conversation.id },
      orderBy: { createdAt: 'asc' },
      take: HISTORY_WINDOW,
    });

    const recentMemories = await this.memory.recentForPartner(partner.id, 10);
    const memoryBlock = recentMemories.length
      ? `چیزهایی که قبلاً درباره این کاربر/سازمان می‌دانی:\n${recentMemories
          .map((m: { content: string }) => `- ${m.content}`)
          .join('\n')}`
      : '';

    const turns: ChatTurn[] = [
      { role: 'system', content: [partner.systemPrompt, memoryBlock].filter(Boolean).join('\n\n') },
      ...history.map(
        (m: { role: string; content: string }): ChatTurn => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        }),
      ),
    ];

    const reply = await this.llm.generateReply(turns);

    const assistantMessage = await this.prisma.message.create({
      data: { conversationId: conversation.id, role: 'assistant', content: reply },
    });

    await this.memory.recordFromUserMessage(partner.id, dto.message);

    return {
      conversationId: conversation.id,
      reply,
      message: assistantMessage,
    };
  }

  async listConversations(userId: string, organizationId: string, partnerId?: string) {
    await this.orgs.assertMember(userId, organizationId);
    return this.prisma.conversation.findMany({
      where: { organizationId, ...(partnerId ? { partnerId } : {}) },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getConversationMessages(userId: string, organizationId: string, conversationId: string) {
    await this.orgs.assertMember(userId, organizationId);
    const conversation = await this.prisma.conversation.findFirst({
      where: { id: conversationId, organizationId },
    });
    if (!conversation) throw new NotFoundException('مکالمه پیدا نشد');
    const messages = await this.prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
    });
    return { conversation, messages };
  }
}
