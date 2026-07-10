import { IsOptional, IsString, MinLength } from 'class-validator';

export class SendMessageDto {
  @IsString()
  organizationId: string;

  @IsString()
  partnerId: string;

  @IsOptional()
  @IsString()
  conversationId?: string;

  @IsString()
  @MinLength(1)
  message: string;
}
