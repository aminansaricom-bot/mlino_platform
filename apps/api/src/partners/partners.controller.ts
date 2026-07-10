import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller('partners')
export class PartnersController {
  constructor(private partners: PartnersService) {}

  @Post()
  create(@Req() req: any, @Body() dto: CreatePartnerDto) {
    return this.partners.create(req.user.userId, dto);
  }

  @Get()
  list(@Req() req: any, @Query('organizationId') organizationId: string) {
    return this.partners.listForOrganization(req.user.userId, organizationId);
  }
}
