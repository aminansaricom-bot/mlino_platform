import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUserId } from '../common/current-user.decorator';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller('organizations')
export class OrganizationsController {
  constructor(private orgs: OrganizationsService) {}

  @Post()
  create(@CurrentUserId() userId: string, @Body() dto: CreateOrganizationDto) {
    return this.orgs.create(userId, dto);
  }

  @Get()
  list(@CurrentUserId() userId: string) {
    return this.orgs.listForUser(userId);
  }
}
