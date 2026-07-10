import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller('organizations')
export class OrganizationsController {
  constructor(private orgs: OrganizationsService) {}

  @Post()
  create(@Req() req: any, @Body() dto: CreateOrganizationDto) {
    return this.orgs.create(req.user.userId, dto);
  }

  @Get()
  list(@Req() req: any) {
    return this.orgs.listForUser(req.user.userId);
  }
}
