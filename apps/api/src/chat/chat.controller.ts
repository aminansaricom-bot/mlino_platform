import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUserId } from '../common/current-user.decorator';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller()
export class ChatController {
  constructor(private chat: ChatService) {}

  @Post('chat')
  send(@CurrentUserId() userId: string, @Body() dto: SendMessageDto) {
    return this.chat.sendMessage(userId, dto);
  }

  @Get('conversations')
  list(
    @CurrentUserId() userId: string,
    @Query('organizationId') organizationId: string,
    @Query('partnerId') partnerId?: string,
  ) {
    return this.chat.listConversations(userId, organizationId, partnerId);
  }

  @Get('conversations/:id')
  messages(
    @CurrentUserId() userId: string,
    @Param('id') id: string,
    @Query('organizationId') organizationId: string,
  ) {
    return this.chat.getConversationMessages(userId, organizationId, id);
  }
}
