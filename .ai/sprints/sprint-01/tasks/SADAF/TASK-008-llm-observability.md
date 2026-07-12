# TASK-008: LLM provider observability / cost tracking

**GitHub Issue:** #8
**Engineer:** SADAF
**Sprint:** sprint-01
**Suggested branch:** `feature/task-008-llm-observability`
**ADR references:** No dedicated ADR required — plain logging inside
the existing `LlmGatewayService` (already behind an interface per
`docs/ADR/ADR-0001-stack.md`), not a new architectural direction. If
this later grows into real cost-tracking infrastructure (a dashboard,
a separate metrics store), that's a new ADR, not this task.

## Objective

Log enough about every LLM call to make future provider decisions
data-driven, without adopting a gateway library.

## Context

`LlmGatewayService` (`apps/api/src/chat/llm-gateway.service.ts`) calls
one of two providers (`mock`, `openai`) with zero visibility into cost
or latency. `docs/ADR/` already evaluated and deferred adopting a full
gateway (LiteLLM-style) — this task is the "plain logging" alternative
that ADR called for instead.

## Business value

Right now nobody can answer "how much is chat costing us" or "which
provider is actually slower." This is the minimum data needed to answer
that later, without committing to infrastructure the product doesn't
need yet.

## Scope

- Log provider name, latency (ms), and token usage (when the provider
  returns it) for every `generateReply` call.
- **Out of scope:** any external observability service, any new
  dependency, any gateway library adoption.

## Deliverables

- Logging added directly in `LlmGatewayService.generateReply` (or its
  private `openai`/`mock` methods) using NestJS's built-in `Logger`.

## Acceptance Criteria

- [ ] Every call to `generateReply` logs: provider (`mock`/`openai`),
      latency in milliseconds, and token usage if present in the
      provider's response (`usage.total_tokens` for OpenAI-compatible
      responses).
- [ ] `mock` provider calls are logged the same way (latency will be
      near-zero, token usage will be absent — log `undefined`/`n/a`
      explicitly, don't silently omit the field).
- [ ] No new npm dependency added.
- [ ] Logging failure (e.g. malformed usage data) never breaks the
      actual chat response — wrap logging in a way that can't throw.

## Dependencies

None.

## Expected files

```
apps/api/src/chat/llm-gateway.service.ts   (modified)
```

## Definition of Done

- All acceptance criteria checked.
- `npm run lint` and `npm run build` pass.
- PR merged to `main`.
- `.ai/PROJECT_STATE.md` updated (observability logging now exists,
  ROADMAP TODO marked done).

## Expected Pull Request title

`feat(chat): log provider, latency, and token usage for every LLM call`
