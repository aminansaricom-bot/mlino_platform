# Engineer: PGSPC

> This file is your single entry point. You do not need chat
> instructions — everything you need is linked from here or from the
> task files it points to.

## Current Mission

Make the codebase safe for more contributors to land code in:
test coverage on the highest-risk paths, then backend auth hardening.

## Current Sprint

`sprint-01` — see `.ai/sprints/sprint-01/`.

## Assigned Tasks

1. [`TASK-003-test-coverage.md`](../sprints/sprint-01/tasks/PGSPC/TASK-003-test-coverage.md) — Priority: **High**
2. [`TASK-005-auth-hardening.md`](../sprints/sprint-01/tasks/PGSPC/TASK-005-auth-hardening.md) — Priority: **High**

## Next Task

Start with `TASK-003-test-coverage.md`. Its output (characterization
tests for `OrganizationsService.assertMember`) is an integration point
for `AMINANSARCOM` — land it early.

## Priority

Both tasks are High. Sequence: #003 first (fast, de-risks everything
else), then #005.

## Dependencies

None blocking you from starting. You are a dependency **for**
`AMINANSARCOM` (see Integration Points in `TASK-003`) — get that one
merged promptly.

## Definition of Done

Per-task DoD is in each task file. At the engineer level: both tasks'
PRs merged, CI green, `.ai/PROJECT_STATE.md` updated for any structural
change (new `test` script, new dependency like `@nestjs/throttler`).

## Known Blockers

None currently.

## Rules (apply to every task)

- Follow `CONTRIBUTING.md` for branching/commit/PR format.
- `npm run lint` and `npm run build` must pass before requesting review.
- Files you own this sprint: `apps/api/src/auth/**`, `apps/api/test/**`
  (new), `apps/api/src/organizations/organizations.service.spec.ts`
  (new — tests only, do not modify `organizations.service.ts`).
- Do not touch `apps/web/**`, `apps/api/src/chat/**`, or
  `apps/api/src/organizations/organizations.service.ts` itself.
- Never invent work outside your assigned tasks — if you find something
  that needs doing, propose a new task file (or flag it in
  `.ai/sprints/sprint-01/reports/`), don't just do it.
