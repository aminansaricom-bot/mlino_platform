# Brief: AMINANSARCOM — Workstream B: Collaboration Features

This brief is self-contained. You should not need any other context
from this conversation to start working.

## Mission

Make an Organization support more than one member. Today the only way
into an Organization is being the person who created it.

## Context

MLINO is an AI Business Partner platform. This repo (`mlino_platform`)
is the MVP: NestJS API + Next.js web, Prisma/PostgreSQL, npm workspaces
monorepo. `Organization` and `OrganizationMember` already exist in the
schema — `OrganizationMember.role` is a free-text field defaulting to
`"OWNER"` that nothing currently enforces.

## Repository state (read these before writing code)

- `.ai/PROJECT_STATE.md` — ground truth of what exists.
- `docs/ADR/ADR-0001-stack.md` — why NestJS/Next.js/Prisma.
- `apps/api/src/organizations/organizations.service.ts` — read this in
  full, especially `assertMember`. **You may add new methods to this
  service; do not change the signature or behavior of `assertMember`
  itself** — Workstream A (`PGSPC`) is pinning its current contract with
  tests in parallel.
- `apps/api/prisma/schema.prisma` — `Organization`, `OrganizationMember`
  models.
- `apps/web/src/pages/dashboard.tsx` — where org/partner creation UI
  lives today; invite UI belongs here.

## Files you own this sprint

- `apps/api/src/organizations/**` (new `invites` sub-module goes here,
  e.g. `apps/api/src/organizations/invites/`)
- `apps/api/prisma/schema.prisma` (new `OrganizationInvite` model —
  additive migration only, do not alter existing models)
- `apps/web/src/pages/dashboard.tsx`

Do not touch `apps/api/src/auth/**` or `apps/api/src/chat/**` this
sprint.

## Deliverables

### Issue #6 — Multi-organization membership and invites
- `POST /organizations/:id/invites` — creates a pending invite
  (email-based). Only an existing member can invite (use
  `assertMember`, don't reinvent the check).
- Accept flow: invited user (must have or create an account) gets an
  `OrganizationMember` row.
- Dashboard: show pending invites for the current user, with an accept
  action.
- If no email provider is chosen yet, follow the same pattern as
  Workstream A's password-reset gap: log the invite link server-side
  with a clear TODO rather than faking a send.

### Issue #7 — Roles and permissions within an organization
**Write a short ADR first** (`docs/ADR/ADR-0011-organization-roles.md`,
copy `docs/ADR/TEMPLATE.md`) defining the minimal role set for this
milestone (e.g. `OWNER`, `MEMBER` — resist the urge to design a full
permission matrix; YAGNI applies here same as everywhere else in this
repo). Get the ADR committed before writing the enforcement code, so the
decision is visible and reviewable on its own.

Then:
- A guard/decorator enforces role checks on sensitive endpoints (e.g.
  only `OWNER` can create a `Partner` for an org — check
  `apps/api/src/partners/` for the current unrestricted behavior).
- Existing OWNER-only creation flows keep working unchanged for
  existing single-member organizations (the org creator is always
  `OWNER` already — verify this isn't broken).

## Rules

- Follow `CONTRIBUTING.md` for branching/commits/PR format.
- `npm run lint` and `npm run build` must pass before requesting review.
- Multi-tenancy rule is non-negotiable: every new query you write must
  be scoped through an org-membership check, same pattern as
  `assertMember`. Don't add a parallel, unchecked way to read
  organization data.
- Issue #6 before Issue #7 — #7 builds on #6's membership model.

## Acceptance criteria

Exactly as written in GitHub Issues #6 and #7 — check every box before
marking each PR ready for review.

## Integration points

You're building on top of `OrganizationsService.assertMember`, which
Workstream A (`PGSPC`) is writing tests against in parallel. You don't
need to wait for their PR — just don't change `assertMember`'s
signature or behavior. If you genuinely need to, flag it as an
integration issue rather than changing it silently.

## Definition of Done

- CI green on your PR.
- Issue acceptance criteria checked off.
- ADR-0011 merged before Issue #7's enforcement code.
- `.ai/PROJECT_STATE.md` updated (new model, new sub-module).
- PRs reviewed and merged.
