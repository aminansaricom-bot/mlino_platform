# TASK-107a: Executive Daily Brief — backend aggregation

**GitHub Issue:** #16
**Engineer:** PGSPC
**Sprint:** sprint-02
**Suggested branch:** `feature/task-107a-brief-backend`
**ADR references:** No dedicated ADR required — reads existing models,
introduces no new architectural pattern.

## Objective

Build an endpoint that aggregates the minimum real signals available
today into a structured payload for the "Good morning" brief — the
flagship deliverable of Wave 1.

## Business value

This is the task the whole wave exists to enable — the literal first
screen from `docs/product/VISION.md`. It's the clearest test of
whether Wave 1 succeeded.

## Context

No aggregation endpoint like this exists today. Available real signals
in the current schema: license/trial status, appointment counts,
partner list, recent conversation activity. Domain 2's full
Profit/Cost/Risk epics don't exist yet — this task explicitly does not
wait for them.

## Scope

- `GET /brief` (or equivalent) — aggregates real, currently-available
  signals for the authenticated organization.
- Designed to accept richer signals later (Domain 2 maturing) without
  a breaking response-shape change — additive fields only.
- **Out of scope:** the actual narrative generation (that's
  `TASK-107c`, AI-side) and the landing-screen UI (that's `TASK-107b`,
  frontend). This task returns structured data, not prose.

## Deliverables

- New endpoint returning a structured signal payload for the
  authenticated organization.

## Acceptance Criteria

- [ ] Endpoint returns real data for the authenticated organization —
      no placeholder/fake values.
- [ ] Response shape is designed additively (new signal fields can be
      added later without breaking existing consumers).
- [ ] Multi-tenancy respected — same invariant as everywhere else.
- [ ] Endpoint responds reasonably fast (no expensive unbounded query
      — this is meant to run on every app open).

## Dependencies

Benefits from `TASK-104a` (Business Context) landing first but can
ship with a narrower, hardcoded signal set and upgrade later — not
strictly blocking. Sequenced last in `PGSPC`'s queue regardless (see
`.ai/sprints/sprint-02/README.md`).

## Expected files

```
apps/api/src/brief/brief.module.ts        (new)
apps/api/src/brief/brief.controller.ts    (new)
apps/api/src/brief/brief.service.ts       (new)
apps/api/src/app.module.ts                (modified — register module)
```

## Definition of Done

- All acceptance criteria checked.
- `npm run lint`, `npm run build`, `npm test --workspace=apps/api` pass.
- Submitted via `mlino_pgspc` as `submissions/TASK-107a/`.
- `.ai/PROJECT_STATE.md` updated.

## Expected Submission Title

`feat(brief): add daily brief signal aggregation endpoint (backend)`
