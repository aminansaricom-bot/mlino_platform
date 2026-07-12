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
├── reviews/                              one file per reviewed submission
├── reports/                              sprint-level status reports
└── decisions/                            sprint-scoped decisions (not architecture — see docs/ADR/ for that)
```

## Engineers

Each engineer works from a single entry point — no chat instructions
needed:
- `.ai/engineers/PGSPC.md` — Engineering Foundations (tests, auth hardening)
- `.ai/engineers/AMINANSARCOM.md` — Collaboration Features (invites, roles)
- `.ai/engineers/SADAF.md` — Chat Experience (observability, search,
  streaming) — **paused**, currently on AI architecture/documentation
  instead (see Progress below)

## Progress

- ✅ **TASK-003** (`PGSPC`) merged — `apps/api` unit tests for
  `AuthService` and `OrganizationsService.assertMember`, 9/9 passing.
  First submission through the Submission Repository model. Issue #3
  closed.

### Sprint 1 execution — coordination complete, IN PROGRESS

- 🟡 **CHANGES REQUESTED — TASK-005** → `PGSPC`, revising. Branch:
  `feature/task-005-auth-hardening`. Reviewed 2026-07-12: race condition
  in `confirmPasswordReset()` (same class already fixed in `refresh()`,
  not applied here) + missing `.env.example`. See `REVIEW_RESULT.md` in
  `mlino_pgspc` and `.ai/reviews/CHANGES_REQUESTED.md`. Not merged, no
  new task assigned until resolved.
- 🔵 **IN PROGRESS — TASK-006** → assigned to `AMINANSARCOM`
  (frontend-facing). Branch: `feature/task-006-organization-invites`.
  Org invites — backend invites sub-module +
  `apps/web/src/pages/dashboard.tsx` UI. Files:
  `apps/api/src/organizations/invites/**`,
  `apps/web/src/pages/dashboard.tsx`. No blocking dependency. Spec
  verified complete, same six points as TASK-005 above. (Note: this
  task includes the backend plumbing the frontend invite UI needs — it
  wasn't split into a pure-frontend sub-task, since doing so would be a
  task redesign, out of scope for this coordination pass.)
- ⚠️ **Correction (found in 2026-07-12 audit):** TASK-005 and TASK-006
  are **not** fully disjoint — both modify
  `apps/api/prisma/schema.prisma` (TASK-005 adds `RefreshToken`/
  `PasswordResetToken`; TASK-006 adds `OrganizationInvite`). Logically
  independent (unrelated models), but the same physical file — whichever
  integrates second needs its `schema.prisma` submission manually
  reconciled against the first at integration time, not blindly
  overwritten. No action needed from either engineer — this is an
  integration-time note for Univestar, not a scope change.
- ⏸️ **SADAF** — paused on TASK-008/009/010 (code tasks via
  `mlino_sadaf-`). Reassigned to AI architecture and documentation work
  until Git-based development is opened up for this workstream. See
  `.ai/engineers/SADAF.md`.

## Status

See `.ai/sprints/sprint-01/reports/sprint-01-kickoff-report.md` for the
full kickoff report (summary, risks, blockers, next actions). Updated
here only when the sprint-level status changes (sprint closes, new
sprint opens, or a cross-cutting blocker appears).

## Review board

Every submission's status: [`.ai/reviews/REVIEW_QUEUE.md`](reviews/REVIEW_QUEUE.md)
→ [`APPROVED.md`](reviews/APPROVED.md) → [`MERGED.md`](reviews/MERGED.md),
or → [`CHANGES_REQUESTED.md`](reviews/CHANGES_REQUESTED.md) and back to
the queue. **One task, one submission, per engineer at a time** — no
engineer starts a new task while a submission of theirs is in the queue
or in changes requested.

## Blocked (cross-cutting, not tied to one engineer)

- GitHub Project board — `createProjectV2` returns `FORBIDDEN`. Needs
  **Account permissions → Projects → Read and write** on the token. See
  `STATUS.md`. Does not block Sprint 1 execution.
