import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

// MVP memory: store a short record of what the user said, per Partner,
// so a future conversation can eventually be primed with it. No
// LLM-based fact-extraction yet — see ROADMAP.md TODO. Deliberately the
// simplest thing that satisfies "Persist Memory" without inventing a
// vector-store layer nobody asked for yet.
@Injectable()
export class MemoryService {
  constructor(private prisma: PrismaService) {}

  async recordFromUserMessage(partnerId: string, userMessage: string) {
    const content = userMessage.trim().slice(0, 500);
    if (!content) return null;
    return this.prisma.memory.create({ data: { partnerId, content } });
  }

  async recentForPartner(partnerId: string, take = 10) {
    return this.prisma.memory.findMany({
      where: { partnerId },
      orderBy: { createdAt: 'desc' },
      take,
    });
  }
}
