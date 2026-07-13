# TASK-106b: Prompt framework — content and evaluation

**GitHub Issue:** #15
**Engineer:** SADAF
**Sprint:** sprint-02
**Status:** ⏸️ Paused — queued, not started (see DECISION-002).
**Suggested branch:** `feature/task-106b-prompt-ai`
**ADR references:** No dedicated ADR required.

## Objective

Own the actual prompt content and define what counts as a regression,
using `TASK-106a`'s (PGSPC) versioning infra.

## Business value

Versioning without evaluation criteria just tells you *that* something
changed, not whether it got better or worse — this task is what makes
the framework actually catch regressions.

## Context

`TASK-106a` provides storage/versioning. This task writes the actual
system prompt content for the manager assistant (currently a single
hardcoded string) and defines a minimal evaluation check.

## Scope

- Real prompt content, versioned via `TASK-106a`'s mechanism.
- A basic evaluation check — a fixed set of test conversations that
  must still produce sane tool calls / responses after a prompt
  change.
- **Out of scope:** the storage/versioning mechanism itself
  (`TASK-106a`).

## Deliverables

- Updated prompt content using the new versioning mechanism.
- A small evaluation test suite (doesn't need to be sophisticated,
  needs to exist and catch an obvious regression).

## Acceptance Criteria

- [ ] Current prompt content is migrated into the new versioned
      structure without behavior regression.
- [ ] At least one evaluation test exists and would fail on an obvious
      bad prompt change (verify by deliberately breaking the prompt
      once, confirming the test catches it, then reverting).

## Dependencies

Depends on `TASK-106a` (PGSPC) landing first.

## Expected files

```
apps/api/src/chat/prompts/                 (new — prompt content, versioned)
apps/api/src/chat/prompt-eval.spec.ts      (new — evaluation test suite)
```

## Definition of Done

- All acceptance criteria checked.
- `npm run lint`, `npm run build`, `npm test --workspace=apps/api` pass.
- Submitted via `mlino_sadaf-` as `submissions/TASK-106b/`, once this
  workstream's pause is lifted.
- `.ai/PROJECT_STATE.md` updated.

## Expected Submission Title

`feat(chat): versioned prompt content and evaluation suite (AI logic)`
