import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller()
export class ChatController {
  constructor(private chat: ChatService) {}

  @Post('chat')
  send(@Req() req: any, @Body() dto: SendMessageDto) {
    return this.chat.sendMessage(req.user.userId, dto);
  }

  @Get('conversations')
  list(
    @Req() req: any,
    @Query('organizationId') organizationId: string,
    @Query('partnerId') partnerId?: string,
  ) {
    return this.chat.listConversations(req.user.userId, organizationId, partnerId);
  }

  @Get('conversations/:id')
  messages(
    @Req() req: any,
    @Param('id') id: string,
    @Query('organizationId') organizationId: string,
  ) {
    return this.chat.getConversationMessages(req.user.userId, organizationId, id);
  }
}
