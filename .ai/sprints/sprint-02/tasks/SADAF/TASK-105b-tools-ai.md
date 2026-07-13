# TASK-105b: Tool registry — contract and safety boundaries

**GitHub Issue:** #14
**Engineer:** SADAF
**Sprint:** sprint-02
**Status:** ⏸️ Paused — queued, not started (see DECISION-002).
**Suggested branch:** `feature/task-105b-tools-ai`
**ADR references:** No dedicated ADR required.

## Objective

Define the tool-calling contract (schema conventions, error handling
for malformed calls) and the safety boundaries for what a tool may do
without human confirmation, on top of `TASK-105a`'s (PGSPC) registry
mechanism.

## Business value

A registry without a safety policy just makes it easier to add
dangerous tools faster. This task is what keeps Domain 1's "Automate"
capability aligned with `docs/product/PRODUCT_PRINCIPLES.md` Principle
10 (human override for every AI action).

## Context

`TASK-105a` provides the mechanical registry. This task defines: what
schema/documentation a tool must provide to be registered safely, and
which categories of action require confirmation before executing
versus which are safe to auto-execute (read-only queries, for
instance).

## Scope

- Contract/schema conventions new tools must follow.
- Safety-tier classification (e.g. read-only vs. mutating vs.
  irreversible) and the confirmation-gating rule for each tier.
- **Out of scope:** the registry mechanism itself (`TASK-105a`); any
  actual new business-action tools (those arrive with later domains).

## Deliverables

- Documented contract + safety-tier classification, applied to
  whatever example tools already exist in the registry.

## Acceptance Criteria

- [ ] Every registered tool declares a safety tier.
- [ ] Mutating/irreversible-tier tools require explicit confirmation
      before executing (per Principle 10) — read-only tools do not.
- [ ] Contract is documented clearly enough that `TASK-105a`'s registry
      mechanism doesn't need to change to accommodate it.

## Dependencies

Depends on `TASK-105a` (PGSPC) landing first.

## Expected files

```
apps/api/src/chat/tool-registry.ts        (modified — safety-tier field, confirmation gating)
docs/ai/README.md                          (modified — document the contract)
```

## Definition of Done

- All acceptance criteria checked.
- `npm run lint`, `npm run build`, `npm test --workspace=apps/api` pass.
- Submitted via `mlino_sadaf-` as `submissions/TASK-105b/`, once this
  workstream's pause is lifted.
- `.ai/PROJECT_STATE.md` updated.

## Expected Submission Title

`feat(chat): tool safety tiers and confirmation gating (AI logic)`
