import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUserId } from '../common/current-user.decorator';
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller('partners')
export class PartnersController {
  constructor(private partners: PartnersService) {}

  @Post()
  create(@CurrentUserId() userId: string, @Body() dto: CreatePartnerDto) {
    return this.partners.create(userId, dto);
  }

  @Get()
  list(@CurrentUserId() userId: string, @Query('organizationId') organizationId: string) {
    return this.partners.listForOrganization(userId, organizationId);
  }
}
