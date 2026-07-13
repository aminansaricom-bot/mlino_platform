# TASK-105a: Tool registry & execution framework — backend

**GitHub Issue:** #14
**Engineer:** PGSPC
**Sprint:** sprint-02
**Suggested branch:** `feature/task-105a-tools-backend`
**ADR references:** No dedicated ADR required — generalizes the
existing tool-loop pattern (already behind an interface per the
sibling project's ADR-0008-equivalent reasoning), not a new direction.

## Objective

Generalize the current hardcoded tool loop into a registry pattern so
future domains (2–6) can add tools without editing `ChatService`'s core
loop each time.

## Business value

Domains 2–6's entire value depends on the AI being able to *act*, not
just describe. A single hardcoded tool-definitions array doesn't scale
— this is the refactor that makes every future "AI does X" epic
buildable without touching core chat logic.

## Context

Current pattern (per `docs/product/TASK_BREAKDOWN.md` PROP-TASK-105):
one tool-definitions array, `MAX_TOOL_ROUNDS` cap, tool execution
inline in `ChatService`.

## Scope

- A registry where tools are registered (name, schema, handler)
  independently of `ChatService`'s loop logic.
- The loop itself becomes domain-agnostic — it calls "whatever's
  registered," not a hardcoded list.
- **Out of scope:** the actual safety-boundary rules for what a tool is
  allowed to do without confirmation (that's `TASK-105b`, AI-side) —
  this task provides the mechanism, not the policy.
- **Out of scope:** any new business-action tools themselves (those
  arrive with Domains 2–6, not this task).

## Deliverables

- `ToolRegistry` (or equivalent) — register/lookup/execute, replacing
  the hardcoded array.
- Existing tool behavior preserved exactly (this is a refactor, not a
  behavior change) — existing tests must still pass unmodified in
  intent, updated only where the registration mechanism changed.

## Acceptance Criteria

- [ ] Adding a new tool requires only registering it — no edit to
      `ChatService`'s core loop.
- [ ] Every tool execution remains scoped to the authenticated
      organization (no regression on the existing invariant).
- [ ] A malformed tool call (bad schema, handler throws) fails safely —
      logged, conversation continues, does not crash the request.
- [ ] `MAX_TOOL_ROUNDS` cap behavior unchanged.

## Dependencies

None.

## Expected files

```
apps/api/src/chat/tool-registry.ts        (new)
apps/api/src/chat/chat.service.ts         (modified — use the registry)
apps/api/src/chat/assistant-tools.ts      (modified or renamed — existing tool defs migrate to registrations)
```

## Definition of Done

- All acceptance criteria checked.
- `npm run lint`, `npm run build`, `npm test --workspace=apps/api` pass.
- Submitted via `mlino_pgspc` as `submissions/TASK-105a/`.
- `.ai/PROJECT_STATE.md` updated.

## Expected Submission Title

`refactor(chat): generalize tool loop into a registry (backend)`
