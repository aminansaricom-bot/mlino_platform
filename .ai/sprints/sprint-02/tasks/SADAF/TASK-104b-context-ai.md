# TASK-104b: Live business-data context injection — AI selection logic

**GitHub Issue:** #13
**Engineer:** SADAF
**Sprint:** sprint-02
**Status:** ⏸️ Paused — queued, not started (see DECISION-002).
**Suggested branch:** `feature/task-104b-context-ai`
**ADR references:** No dedicated ADR required.

## Objective

Decide *which* business signals from `TASK-104a`'s (PGSPC) context
service are actually relevant to inject for a given conversation turn
— dumping everything available would blow context-window budgets and
add noise.

## Business value

"Understand" isn't "attach every table" — it's surfacing what's
actually relevant to what's being asked. This is the judgment layer
that makes Business Context useful instead of overwhelming.

## Context

`TASK-104a` provides a bounded, organization-scoped context payload
mechanism. This task decides selection: given the user's message and
available signals, which ones actually belong in this turn's prompt.

## Scope

- Relevance-selection logic operating on `TASK-104a`'s signal set.
- **Out of scope:** the context-assembly mechanism/bounding itself
  (`TASK-104a`).

## Deliverables

- Selection logic wired into the context-assembly call path.

## Acceptance Criteria

- [ ] Given a question about one topic (e.g. inventory), the injected
      context prioritizes relevant signals over unrelated ones, within
      `TASK-104a`'s size budget.
- [ ] No regression to `TASK-104a`'s multi-tenancy scoping.

## Dependencies

Depends on `TASK-104a` (PGSPC) landing first.

## Expected files

```
apps/api/src/chat/business-context.service.ts   (modified — selection logic)
```

## Definition of Done

- All acceptance criteria checked.
- `npm run lint`, `npm run build`, `npm test --workspace=apps/api` pass.
- Submitted via `mlino_sadaf-` as `submissions/TASK-104b/`, once this
  workstream's pause is lifted.
- `.ai/PROJECT_STATE.md` updated.

## Expected Submission Title

`feat(chat): relevance-based business context selection (AI logic)`
