# Engineer: PGSPC

> Single entry point. No chat instructions required — this file plus
> its linked task files are everything you need. If you have zero prior
> context, also read `.ai/RESUME.md` first.

## Current Mission

Make the codebase safe for more contributors to land code in: test
coverage on the highest-risk paths, then backend auth hardening.

## Current Sprint

`sprint-01` — see [`.ai/sprints/sprint-01/README.md`](../sprints/sprint-01/README.md).

## Submission Repository

`mlino_pgspc` — submit patches here, not as a direct PR on `mlino_platform`. See `.ai/SUBMISSION_WORKFLOW.md` for the exact convention: one `submissions/TASK-XXX/` folder per task, containing only the modified files (preserving their real project path) plus `REPORT.md`. No `.patch`/`.diff`/zip files.

## Assigned Tasks

1. [`TASK-003-test-coverage.md`](../sprints/sprint-01/tasks/PGSPC/TASK-003-test-coverage.md) — not started
2. [`TASK-005-auth-hardening.md`](../sprints/sprint-01/tasks/PGSPC/TASK-005-auth-hardening.md) — not started

## Current Priority

High — both tasks. Sequence: TASK-003 first (fast, de-risks everything,
and unblocks `AMINANSARCOM`'s integration point), then TASK-005.

## Business Goal

Reduce the risk that a future change silently breaks login or breaks
tenant isolation between organizations (a security incident, not just a
bug), and remove the auth gaps (no refresh, no rate limiting, no
password reset) that block this product from having real user accounts.

## Context

`mlino_platform` has zero automated tests and MVP-grade auth (single
7-day JWT, no refresh, no rate limiting, no password reset). Full
picture: `.ai/PROJECT_STATE.md`. Relevant code: `apps/api/src/auth/`,
`apps/api/src/organizations/organizations.service.ts` (read-only for
you — see Files To Modify).

## Files To Modify

- `apps/api/src/auth/**` (implementation, for TASK-005)
- `apps/api/test/**` (new, test config)
- `apps/api/src/organizations/organizations.service.spec.ts` (new —
  tests only)
- `apps/api/package.json` (test script, `@nestjs/throttler` dependency)

**Do not modify:** `organizations.service.ts` itself, anything under
`apps/web/`, anything under `apps/api/src/chat/`.

## Acceptance Criteria

See each task file's own Acceptance Criteria section — TASK-003 and
TASK-005 each have a full checklist. Do not consider a task done until
every box in its own file is checked.

## Definition of Done

Per task, plus at the engineer level: both tasks' PRs merged, CI green,
`.ai/PROJECT_STATE.md` updated for any structural change (new `test`
script, new dependency).

## Remaining Work

Both TASK-003 and TASK-005 — neither has started yet.

## Next Immediate Action

Start `TASK-003-test-coverage.md`. Open a PR titled
`test(api): add unit tests for AuthService and OrganizationsService.assertMember`
per that task's "Expected Pull Request Title."

## Current Blockers

None.

## Expected Pull Request

- TASK-003: `test(api): add unit tests for AuthService and OrganizationsService.assertMember`
- TASK-005: `feat(auth): add refresh tokens, rate limiting, and password reset (backend)`

## Rules

- Follow `CONTRIBUTING.md` for branching/commit/PR format.
- `npm run lint` and `npm run build` must pass before requesting review.
- You are a dependency **for** `AMINANSARCOM` (see integration note in
  `.ai/sprints/sprint-01/README.md`) — land TASK-003 promptly.
- One task, one PR at a time — do not start your next task while a PR is in `.ai/reviews/REVIEW_QUEUE.md` or `.ai/reviews/CHANGES_REQUESTED.md`.
- Never invent work outside your assigned tasks. If you find something
  that needs doing, propose a new task file or flag it in
  `.ai/sprints/sprint-01/reports/` — don't just do it.
