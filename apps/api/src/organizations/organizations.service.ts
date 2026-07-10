import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrganizationDto } from './dto';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateOrganizationDto) {
    return this.prisma.organization.create({
      data: {
        name: dto.name,
        members: { create: { userId, role: 'OWNER' } },
      },
    });
  }

  async listForUser(userId: string) {
    return this.prisma.organization.findMany({
      where: { members: { some: { userId } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Every other module (partners, chat) that scopes data to an
  // organization calls this first — never trust an organizationId that
  // wasn't verified to belong to the authenticated user.
  async assertMember(userId: string, organizationId: string) {
    const membership = await this.prisma.organizationMember.findUnique({
      where: { userId_organizationId: { userId, organizationId } },
    });
    if (!membership) {
      const org = await this.prisma.organization.findUnique({ where: { id: organizationId } });
      if (!org) throw new NotFoundException('سازمان پیدا نشد');
      throw new ForbiddenException('شما عضو این سازمان نیستید');
    }
    return membership;
  }
}
