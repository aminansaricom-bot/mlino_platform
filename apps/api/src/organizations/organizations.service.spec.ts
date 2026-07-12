import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { PrismaService } from '../prisma/prisma.service';

// This is the multi-tenancy invariant every other module depends on
// (see the comment above assertMember in organizations.service.ts and
// CONTRIBUTING.md's "Multi-tenancy rule"). It is read-only for this
// task — these are characterization tests, not a rewrite.
function makePrismaMock() {
  return {
    organizationMember: { findUnique: jest.fn() },
    organization: { findUnique: jest.fn() },
  } as unknown as PrismaService;
}

describe('OrganizationsService.assertMember', () => {
  it('resolves without throwing when the user is an existing member', async () => {
    const prisma = makePrismaMock();
    const membership = { userId: 'user-1', organizationId: 'org-1', role: 'OWNER' };
    (prisma.organizationMember.findUnique as jest.Mock).mockResolvedValue(membership);
    const service = new OrganizationsService(prisma);

    await expect(service.assertMember('user-1', 'org-1')).resolves.toEqual(membership);
    expect(prisma.organization.findUnique).not.toHaveBeenCalled(); // no need to look up the org when membership already resolved
  });

  it('throws ForbiddenException when the organization exists but the user is not a member', async () => {
    const prisma = makePrismaMock();
    (prisma.organizationMember.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.organization.findUnique as jest.Mock).mockResolvedValue({ id: 'org-1', name: 'Some Org' });
    const service = new OrganizationsService(prisma);

    await expect(service.assertMember('outsider-1', 'org-1')).rejects.toThrow(ForbiddenException);
  });

  it('throws NotFoundException when the organization does not exist at all', async () => {
    const prisma = makePrismaMock();
    (prisma.organizationMember.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.organization.findUnique as jest.Mock).mockResolvedValue(null);
    const service = new OrganizationsService(prisma);

    await expect(service.assertMember('user-1', 'nonexistent-org')).rejects.toThrow(NotFoundException);
  });

  it('never treats a not-found organization as a successful membership check', async () => {
    // Defends specifically against a regression where a missing org
    // could accidentally short-circuit into "resolves successfully" —
    // this must always throw one of the two exceptions above, never
    // resolve, for any organizationId with no matching membership row.
    const prisma = makePrismaMock();
    (prisma.organizationMember.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.organization.findUnique as jest.Mock).mockResolvedValue(null);
    const service = new OrganizationsService(prisma);

    await expect(service.assertMember('user-1', 'nonexistent-org')).rejects.toBeDefined();
  });
});
