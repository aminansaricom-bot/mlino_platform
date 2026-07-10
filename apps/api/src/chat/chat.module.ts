import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { LlmGatewayService } from './llm-gateway.service';
import { MemoryService } from './memory.service';
import { OrganizationsModule } from '../organizations/organizations.module';

@Module({
  imports: [OrganizationsModule],
  controllers: [ChatController],
  providers: [ChatService, LlmGatewayService, MemoryService],
})
export class ChatModule {}
