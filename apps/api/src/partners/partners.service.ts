import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { CreatePartnerDto } from './dto';

@Injectable()
export class PartnersService {
  constructor(
    private prisma: PrismaService,
    private orgs: OrganizationsService,
  ) {}

  async create(userId: string, dto: CreatePartnerDto) {
    await this.orgs.assertMember(userId, dto.organizationId);
    return this.prisma.partner.create({
      data: {
        organizationId: dto.organizationId,
        name: dto.name,
        ...(dto.systemPrompt ? { systemPrompt: dto.systemPrompt } : {}),
      },
    });
  }

  async listForOrganization(userId: string, organizationId: string) {
    await this.orgs.assertMember(userId, organizationId);
    return this.prisma.partner.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
