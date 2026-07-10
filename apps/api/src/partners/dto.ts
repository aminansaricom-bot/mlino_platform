import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePartnerDto {
  @IsString()
  organizationId: string;

  @IsString()
  @MinLength(1)
  name: string;

  @IsOptional()
  @IsString()
  systemPrompt?: string;
}
