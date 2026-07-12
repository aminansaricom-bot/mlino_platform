# Engineer: AMINANSARCOM

> Single entry point. No chat instructions required — this file plus
> its linked task files are everything you need. If you have zero prior
> context, also read `.ai/RESUME.md` first.

## Current Mission

Make an Organization support more than one member: an invite flow, then
role enforcement on top of it.

## Current Sprint

`sprint-01` — see [`.ai/sprints/sprint-01/README.md`](../sprints/sprint-01/README.md).

## Inbox Repository

`mlino_amin-` — submit patches here, not as a direct PR on `mlino_platform`. See `.ai/PATCH_WORKFLOW.md` for the exact convention (one `.patch` file per task under `patches/`, plus a `PROJECT_STATE.md` describing the submission).

## Assigned Tasks

1. [`TASK-006-org-invites.md`](../sprints/sprint-01/tasks/AMINANSARCOM/TASK-006-org-invites.md) — not started
2. [`TASK-007-roles-permissions.md`](../sprints/sprint-01/tasks/AMINANSARCOM/TASK-007-roles-permissions.md) — not started, blocked on TASK-006

## Current Priority

Medium — both tasks. Strictly sequential: TASK-006 must merge before
TASK-007 starts.

## Business Goal

MLINO is a platform for organizations, not individuals — a product only
one person per organization can use isn't the product. This is the
minimum viable version of "a team," plus the permission boundary that
makes adding a second person safe.

## Context

`Organization` and `OrganizationMember` already exist in the schema;
`OrganizationMember.role` is an unenforced free-text field defaulting to
`"OWNER"`. Today the only way into an org is being its creator. Full
picture: `.ai/PROJECT_STATE.md`. Relevant code:
`apps/api/src/organizations/organizations.service.ts` (read-only for
you regarding `assertMember` — see Files To Modify),
`apps/api/src/partners/` (for TASK-007's enforcement target).

## Files To Modify

- `apps/api/src/organizations/**` (new `invites/` sub-module)
- `apps/api/prisma/schema.prisma` (additive migration: `OrganizationInvite`)
- `apps/web/src/pages/dashboard.tsx`
- `docs/ADR/ADR-0011-organization-roles.md` (new, TASK-007 — must merge
  before TASK-007's enforcement code)
- `apps/api/src/organizations/require-role.decorator.ts` +
  `require-role.guard.ts` (new, TASK-007)
- `apps/api/src/partners/partners.controller.ts` (TASK-007)

**Do not modify:** `organizations.service.ts`'s `assertMember` method
itself (add new methods alongside it, don't change its signature or
behavior), anything under `apps/api/src/auth/` or `apps/api/src/chat/`.

## Acceptance Criteria

See each task file's own Acceptance Criteria section — TASK-006 and
TASK-007 each have a full checklist. Do not consider a task done until
every box in its own file is checked.

## Definition of Done

Per task, plus at the engineer level: both tasks' PRs merged, ADR-0011
merged before TASK-007's enforcement code, CI green,
`.ai/PROJECT_STATE.md` updated (new model, new sub-module).

## Remaining Work

Both TASK-006 and TASK-007 — neither has started yet.

## Next Immediate Action

Start `TASK-006-org-invites.md`. Open a PR titled
`feat(organizations): add invite flow for multi-member organizations`
per that task's "Expected Pull Request Title." Do not start TASK-007
until this merges.

## Current Blockers

None. (Not blocked on `PGSPC`'s TASK-003 — you may start immediately,
just don't change `assertMember` itself.)

## Expected Pull Request

- TASK-006: `feat(organizations): add invite flow for multi-member organizations`
- TASK-007: `feat(organizations): enforce role-based permissions on Partner creation`

## Rules

- Follow `CONTRIBUTING.md` for branching/commit/PR format.
- `npm run lint` and `npm run build` must pass before requesting review.
- Multi-tenancy rule is non-negotiable — every new query goes through an
  org-membership check, same pattern as `assertMember`.
- One task, one PR at a time — do not start your next task while a PR is in `.ai/reviews/REVIEW_QUEUE.md` or `.ai/reviews/CHANGES_REQUESTED.md`.
- Never invent work outside your assigned tasks. If you find something
  that needs doing, propose a new task file or flag it in
  `.ai/sprints/sprint-01/reports/` — don't just do it.
