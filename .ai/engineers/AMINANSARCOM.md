# Engineer: AMINANSARCOM

> This file is your single entry point. You do not need chat
> instructions — everything you need is linked from here or from the
> task files it points to.

## Current Mission

Make an Organization support more than one member: an invite flow, then
role enforcement on top of it.

## Current Sprint

`sprint-01` — see `.ai/sprints/sprint-01/`.

## Assigned Tasks

1. [`TASK-006-org-invites.md`](../sprints/sprint-01/tasks/AMINANSARCOM/TASK-006-org-invites.md) — Priority: **Medium**
2. [`TASK-007-roles-permissions.md`](../sprints/sprint-01/tasks/AMINANSARCOM/TASK-007-roles-permissions.md) — Priority: **Medium** (depends on Task 006)

## Next Task

`TASK-006-org-invites.md`. Do not start `TASK-007` until #006 is merged
— it builds directly on the membership model #006 introduces.

## Priority

Both Medium. Strictly sequential — not parallel with each other.

## Dependencies

`TASK-003` (owned by `PGSPC`) pins the current behavior of
`OrganizationsService.assertMember` with tests. You don't need to wait
for it to merge before starting, but do not change `assertMember`'s
signature or behavior — only add new methods alongside it.

## Definition of Done

Per-task DoD is in each task file. At the engineer level: both tasks'
PRs merged, ADR-0011 merged before Task 007's enforcement code, CI
green, `.ai/PROJECT_STATE.md` updated (new model, new sub-module).

## Known Blockers

None currently.

## Rules (apply to every task)

- Follow `CONTRIBUTING.md` for branching/commit/PR format.
- `npm run lint` and `npm run build` must pass before requesting review.
- Files you own this sprint: `apps/api/src/organizations/**` (new
  `invites` sub-module), `apps/api/prisma/schema.prisma` (additive
  only), `apps/web/src/pages/dashboard.tsx`.
- Do not touch `apps/api/src/auth/**` or `apps/api/src/chat/**`.
- Multi-tenancy rule is non-negotiable — every new query goes through an
  org-membership check, same pattern as `assertMember`.
- Never invent work outside your assigned tasks — if you find something
  that needs doing, propose a new task file (or flag it in
  `.ai/sprints/sprint-01/reports/`), don't just do it.
