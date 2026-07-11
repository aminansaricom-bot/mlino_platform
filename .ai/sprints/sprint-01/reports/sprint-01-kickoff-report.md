# Sprint 1 — Kickoff Report

**Date:** 2026-07-11
**Reported by:** Executive CTO function (repo-driven engineering
management, per `.ai/engineers/` and `.ai/sprints/`)

## Sprint summary

Sprint Zero (MVP + engineering infrastructure: labels, milestones, 8
Issues, CI) closed at commit `c864d5b`. Sprint 1 executes the 7
remaining Issues as 3 fully independent, parallel workstreams — no
engineer blocked on another mid-sprint, one documented shared contract
(`assertMember`) called out explicitly.

## Workstreams

| Workstream | Engineer | Tasks | Complexity |
|---|---|---|---|
| A — Engineering Foundations | `PGSPC` | TASK-003, TASK-005 | L |
| B — Collaboration Features | `AMINANSARCOM` | TASK-006 → TASK-007 | M |
| C — Chat Experience | `SADAF` | TASK-008 → TASK-010 → TASK-009 | M |

## Engineer assignments

See `.ai/engineers/PGSPC.md`, `.ai/engineers/AMINANSARCOM.md`,
`.ai/engineers/SADAF.md` — each is a self-contained entry point linking
to its task files under `.ai/sprints/sprint-01/tasks/<engineer>/`.

Note: this workstream roster supersedes an earlier planning pass that
used `LUGH` instead of `SADAF` for Workstream C — see
`decisions/DECISION-001-engineer-roster-change.md`.

## Risks

- **Shared contract:** `PGSPC` (TASK-003) and `AMINANSARCOM`
  (TASK-006/007) both depend on `OrganizationsService.assertMember`.
  Mitigation: `assertMember`'s signature/behavior is frozen this sprint;
  `PGSPC` tests it, `AMINANSARCOM` builds on it, neither modifies it.
- **No ADR yet for role model** (TASK-007) — `AMINANSARCOM` is required
  to write and merge `ADR-0011-organization-roles.md` before writing
  enforcement code, to prevent scope creep into a full permission
  matrix.
- **Auth-hardening frontend wiring deliberately deferred** out of Sprint
  1 (TASK-005 is backend-only) to keep `apps/web` conflict-free between
  `PGSPC` and `AMINANSARCOM`/`SADAF` this sprint.

## Blockers

- GitHub Project board: `createProjectV2` GraphQL mutation still returns
  `FORBIDDEN` — needs **Account permissions → Projects → Read and
  write** on the token. Does not block Sprint 1 execution; Issues +
  Milestones are sufficient without it.

## Next actions

- Each engineer starts at their own `.ai/engineers/<NAME>.md` file — no
  further chat instruction required per task.
- Reviews land in `.ai/sprints/sprint-01/reviews/` as PRs are opened.
- `.ai/PROJECT_STATE.md` and `.ai/CURRENT_SPRINT.md` are updated as
  tasks complete or blockers appear.
