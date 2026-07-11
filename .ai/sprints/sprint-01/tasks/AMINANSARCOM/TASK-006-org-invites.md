# TASK-006: Multi-organization membership and invites

**GitHub Issue:** #6
**Engineer:** AMINANSARCOM
**Sprint:** sprint-01

## Objective

Let an Organization have more than one member via an invite flow.

## Context

`Organization` and `OrganizationMember` already exist in
`apps/api/prisma/schema.prisma`. Today the only way to become a member
is being the creator (`OrganizationsService.create` auto-adds the
creator as `OWNER`). There is no way to add a second person.

## Business value

MLINO is a platform for organizations, not individuals — a product that
only one person per organization can use isn't the product. This is the
minimum viable version of "a team."

## Scope

- `POST /organizations/:id/invites` — creates a pending invite.
- Accept flow — invited user gets an `OrganizationMember` row.
- Dashboard UI to view/accept pending invites.
- **Out of scope:** role enforcement (that's `TASK-007`, sequenced
  after this one), real email delivery (log the invite link server-side
  if no provider is configured, matching the pattern used in
  `TASK-005`).

## Deliverables

- New Prisma model: `OrganizationInvite` (additive migration).
- `apps/api/src/organizations/invites/` sub-module: controller + service
  + DTOs.
- `apps/web/src/pages/dashboard.tsx`: pending-invites section with
  accept action.

## Acceptance Criteria

- [ ] Only an existing member of an organization can create an invite
      for it (reuse `OrganizationsService.assertMember` — do not
      reimplement this check).
- [ ] An invite is scoped to an email address and has an expiry.
- [ ] Accepting an invite (as the invited user, authenticated) creates
      an `OrganizationMember` row for them and marks the invite consumed.
- [ ] A consumed or expired invite cannot be accepted twice.
- [ ] Dashboard shows the current user's pending invites with an
      "Accept" button that calls the accept endpoint.
- [ ] `OrganizationsService.assertMember`'s existing signature and
      behavior are unchanged.

## Dependencies

Builds on `OrganizationsService.assertMember`, which `PGSPC` is writing
characterization tests against in `TASK-003`. You do not need to wait
for that PR to merge — just don't change `assertMember` itself.

## Expected files

```
apps/api/prisma/schema.prisma                              (modified — new model)
apps/api/src/organizations/invites/invites.module.ts        (new)
apps/api/src/organizations/invites/invites.controller.ts    (new)
apps/api/src/organizations/invites/invites.service.ts        (new)
apps/api/src/organizations/invites/dto.ts                    (new)
apps/web/src/pages/dashboard.tsx                             (modified)
```

## Definition of Done

- All acceptance criteria checked.
- `npm run lint` and `npm run build` pass.
- PR merged to `main`.
- `.ai/PROJECT_STATE.md` updated (new model, new sub-module, ROADMAP
  TODO for invites marked done).

## Expected Pull Request title

`feat(organizations): add invite flow for multi-member organizations`
