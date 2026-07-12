# CURRENT SPRINT

> New session with no prior context? Read `.ai/RESUME.md` first.

**Active sprint:** `sprint-01`
**Full detail:** [`.ai/sprints/sprint-01/README.md`](sprints/sprint-01/README.md) — this file is a pointer, not
a duplicate. If this disagrees with `sprints/sprint-01/`, that
directory wins.

## Structure

```
.ai/sprints/sprint-01/
├── README.md                            sprint index
├── tasks/{PGSPC,AMINANSARCOM,SADAF}/    one file per task
├── reviews/                              one file per reviewed PR
├── reports/                              sprint-level status reports
└── decisions/                            sprint-scoped decisions (not architecture — see docs/ADR/ for that)
```

## Engineers

Each engineer works from a single entry point — no chat instructions
needed:
- `.ai/engineers/PGSPC.md` — Engineering Foundations (tests, auth hardening)
- `.ai/engineers/AMINANSARCOM.md` — Collaboration Features (invites, roles)
- `.ai/engineers/SADAF.md` — Chat Experience (observability, search, streaming)

## Status

See `.ai/sprints/sprint-01/reports/sprint-01-kickoff-report.md` for the
full kickoff report (summary, risks, blockers, next actions). Updated
here only when the sprint-level status changes (sprint closes, new
sprint opens, or a cross-cutting blocker appears).

## Review board

Every PR's status: [`.ai/reviews/REVIEW_QUEUE.md`](reviews/REVIEW_QUEUE.md)
→ [`APPROVED.md`](reviews/APPROVED.md) → [`MERGED.md`](reviews/MERGED.md),
or → [`CHANGES_REQUESTED.md`](reviews/CHANGES_REQUESTED.md) and back to
the queue. **One task, one PR, per engineer at a time** — no engineer
starts a new task while a PR of theirs is in the queue or in changes
requested.

## Blocked (cross-cutting, not tied to one engineer)

- GitHub Project board — `createProjectV2` returns `FORBIDDEN`. Needs
  **Account permissions → Projects → Read and write** on the token. See
  `STATUS.md`. Does not block Sprint 1 execution.
