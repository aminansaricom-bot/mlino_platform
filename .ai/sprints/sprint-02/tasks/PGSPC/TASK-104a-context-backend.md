# TASK-104a: Live business-data context injection — backend

**GitHub Issue:** #13
**Engineer:** PGSPC
**Sprint:** sprint-02
**Suggested branch:** `feature/task-104a-context-backend`
**ADR references:** No dedicated ADR required — this generalizes
existing patterns (organization-scoped Prisma queries) into a reusable
service, not a new architectural direction.

## Objective

Build a context-assembly service that pulls current
organization/partner business state into what's sent to the LLM —
today only conversation history + memory are injected, never live
business data.

## Business value

"Understand" is the first Business Brain verb in
`docs/product/VISION.md`. Without real business data in context, every
downstream Domain 1 epic (Reasoning, Recommendations, Actions) reasons
over nothing real.

## Context

`ChatService.sendMessage` currently assembles: system prompt + memory
block + conversation history. No live organization data (appointment
counts, license status, recent activity) is included regardless of
what the user asks.

## Scope

- A single, testable context-assembly service/function.
- Strict organization-scoping — same invariant as `assertMember`
  elsewhere in the codebase.
- Explicit size budget (token/character cap) so context can't grow
  unbounded as more data sources are added later.
- **Out of scope:** *which* business signals are most relevant to
  surface for a given question (that's `TASK-104b`, the AI-side
  selection logic) — this task provides the assembly mechanism and a
  reasonable default set of signals, not the intelligence about which
  ones matter most.

## Deliverables

- `BusinessContextService` (or equivalent) callable from `ChatService`,
  returning a bounded, organization-scoped context payload.
- Wired into `ChatService`'s existing prompt-assembly step alongside
  memory (coordinate with whoever lands `TASK-103a` first — same file).

## Acceptance Criteria

- [ ] Context assembly is one testable service, not inline logic
      scattered in `ChatService`.
- [ ] Multi-tenancy test: a conversation in Organization A never
      receives Organization B's data, including under adversarial
      input (e.g. a crafted message trying to reference another org's
      ID).
- [ ] Context size is explicitly bounded, with the bound documented.
- [ ] Existing chat behavior is unchanged for any signal not yet wired
      up (fails safe/empty, not with an error).

## Dependencies

None blocking start. Coordinates with `TASK-103a` (Memory) — both
modify `ChatService`'s prompt-assembly path — see note in that task
file.

## Expected files

```
apps/api/src/chat/business-context.service.ts   (new)
apps/api/src/chat/chat.module.ts                (modified — register the new service)
apps/api/src/chat/chat.service.ts               (modified — call the new service)
```

## Definition of Done

- All acceptance criteria checked.
- `npm run lint`, `npm run build`, `npm test --workspace=apps/api` pass.
- Submitted via `mlino_pgspc` as `submissions/TASK-104a/`.
- `.ai/PROJECT_STATE.md` updated.

## Expected Submission Title

`feat(chat): live business-data context injection (backend)`
