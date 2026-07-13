# TASK-103b: Structured business memory — AI logic

**GitHub Issue:** #12
**Engineer:** SADAF
**Sprint:** sprint-02
**Status:** ⏸️ Paused — queued, not started. Code-submission pause
from Sprint 1 kickoff has not been lifted (see
`.ai/sprints/sprint-02/decisions/DECISION-002-task-granularity-and-sadaf-pause.md`).
**Suggested branch:** `feature/task-103b-memory-ai`
**ADR references:** No dedicated ADR required.

## Objective

Define what gets written to memory, when, and how it's selected for
retrieval — the intelligence layer on top of `TASK-103a`'s (PGSPC)
structural substrate.

## Business value

Structure without judgment is just a bigger table. This task is what
actually makes memory *useful* — deciding what's worth remembering,
not just storing everything verbatim (today's placeholder behavior).

## Context

`TASK-103a` provides categorized storage + filtered retrieval. This
task decides: what counts as a memory-worthy fact (vs. noise), what
category it belongs to, and how retrieval selects the most relevant
memories for a given conversation turn (not just "most recent").

## Scope

- Extraction logic: given a conversation turn, decide what (if
  anything) is worth persisting to memory, and its category.
- Retrieval-relevance logic: given the current conversation, select
  which stored memories to inject (not just recency-ordered).
- **Out of scope:** the storage/schema itself (`TASK-103a`).

## Deliverables

- Extraction function/service called from the chat flow.
- Relevance-based retrieval logic replacing "last N."

## Acceptance Criteria

- [ ] Not every message becomes a memory — extraction is selective,
      not a verbatim log (regression check against today's placeholder
      behavior).
- [ ] Retrieval demonstrably prefers relevant memories over merely
      recent ones in at least one test scenario.
- [ ] Building on `TASK-103a`'s schema without requiring changes to it.

## Dependencies

Depends on `TASK-103a` (PGSPC) landing first — needs the categorized
storage to write into.

## Expected files

```
apps/api/src/chat/memory.service.ts   (modified — extraction + relevance logic)
```

## Definition of Done

- All acceptance criteria checked.
- `npm run lint`, `npm run build`, `npm test --workspace=apps/api` pass.
- Submitted via `mlino_sadaf-` as `submissions/TASK-103b/`, **once this
  workstream's code-submission pause is lifted**.
- `.ai/PROJECT_STATE.md` updated.

## Expected Submission Title

`feat(chat): selective memory extraction and relevance-based retrieval (AI logic)`
