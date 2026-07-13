# TASK-107c: Executive Daily Brief — AI generation

**GitHub Issue:** #16
**Engineer:** SADAF
**Sprint:** sprint-02
**Status:** ⏸️ Paused — queued, not started (see DECISION-002).
**Suggested branch:** `feature/task-107c-brief-ai`
**ADR references:** No dedicated ADR required.

## Objective

Turn `TASK-107a`'s (PGSPC) aggregated signal payload into the actual
"Good morning" narrative, including role-based personalization.

## Business value

This is the literal content of the flagship Wave 1 deliverable — the
difference between "here is a JSON payload" and "Good morning. Your
clinic looks healthy today, though inventory needs attention."

## Context

`TASK-107a` provides structured signals. This task is the prompt/logic
that narrates them, tuned per role (manager sees business health;
accountant sees financial signals; doctor sees their own
schedule/patients — exact per-role scope is this task's call, guided by
`docs/product/PRODUCT_PRINCIPLES.md` Principle 3, recommendation
before reporting).

## Scope

- Brief-generation logic consuming `TASK-107a`'s payload.
- Role-based variation (at least manager vs. non-manager to start —
  full per-role sophistication can grow later).
- **Out of scope:** signal aggregation itself (`TASK-107a`); the
  landing-screen UI (`TASK-107b`, `AMINANSARCOM`).

## Deliverables

- Brief-generation function/prompt, called from the endpoint
  `TASK-107a` builds, returning the actual narrative text.

## Acceptance Criteria

- [ ] Brief text leads with a recommendation/summary, not a list of
      raw numbers (Principle 3).
- [ ] Content varies meaningfully by role for at least manager vs.
      non-manager.
- [ ] No fabricated content — every claim in the brief traces back to
      a real signal from `TASK-107a`'s payload (Principle 6,
      explainable AI).

## Dependencies

Depends on `TASK-107a` (PGSPC) landing first.

## Expected files

```
apps/api/src/brief/brief.service.ts   (modified — narrative generation)
```

## Definition of Done

- All acceptance criteria checked.
- `npm run lint`, `npm run build`, `npm test --workspace=apps/api` pass.
- Submitted via `mlino_sadaf-` as `submissions/TASK-107c/`, once this
  workstream's pause is lifted.
- `.ai/PROJECT_STATE.md` updated.

## Expected Submission Title

`feat(brief): AI-generated, role-personalized daily brief narrative`
