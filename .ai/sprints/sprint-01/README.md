# Sprint 01

**Status:** Active
**Started:** 2026-07-11
**Goal:** ship the 7 highest-leverage post-MVP Issues (#3, #5–#10) as 3
independent, parallel workstreams.

## Workstreams

| Engineer | Entry point | Tasks (in order) | Milestone |
|---|---|---|---|
| `PGSPC` | [`.ai/engineers/PGSPC.md`](../../engineers/PGSPC.md) | [TASK-003](tasks/PGSPC/TASK-003-test-coverage.md), [TASK-005](tasks/PGSPC/TASK-005-auth-hardening.md) | Engineering Foundations |
| `AMINANSARCOM` | [`.ai/engineers/AMINANSARCOM.md`](../../engineers/AMINANSARCOM.md) | [TASK-006](tasks/AMINANSARCOM/TASK-006-org-invites.md) → [TASK-007](tasks/AMINANSARCOM/TASK-007-roles-permissions.md) | Collaboration Features |
| `SADAF` | [`.ai/engineers/SADAF.md`](../../engineers/SADAF.md) | [TASK-008](tasks/SADAF/TASK-008-llm-observability.md) → [TASK-010](tasks/SADAF/TASK-010-conversation-search.md) → [TASK-009](tasks/SADAF/TASK-009-streaming-chat.md) | Chat Experience |

## Shared contract (the one cross-workstream dependency)

`OrganizationsService.assertMember` is frozen this sprint. `PGSPC`
(TASK-003) writes characterization tests against it; `AMINANSARCOM`
(TASK-006/007) builds on top of it. Neither changes its signature or
behavior — see `decisions/DECISION-001-engineer-roster-change.md` for
unrelated roster history and each task file's "Dependencies" section for
this specific contract.

## Directories

- `tasks/<engineer>/` — one standalone markdown file per task.
- `reviews/` — one file per reviewed PR, in addition to the GitHub PR
  review itself.
- `reports/` — sprint-level status reports (see
  `sprint-01-kickoff-report.md`).
- `decisions/` — sprint-scoped decisions. Architecture decisions belong
  in `docs/ADR/` instead, not here.

## Definition of Done for the sprint

All 7 Issues closed, all task acceptance criteria checked, CI green on
`main`, `.ai/PROJECT_STATE.md` reflects every structural change made.
