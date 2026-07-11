# TASK-009: Streaming chat responses

**GitHub Issue:** #9
**Engineer:** SADAF
**Sprint:** sprint-01
**Ship after:** TASK-008 and TASK-010 are merged

## Objective

Make the chat feel responsive by streaming the AI's reply as it's
generated, instead of waiting for the full response.

## Context

`POST /chat` (`apps/api/src/chat/chat.service.ts`,
`LlmGatewayService.generateReply`) currently returns the full reply in
one response. The `mock` provider especially has no reason to "stream"
(it's instant), but the `openai` provider genuinely benefits from it for
perceived latency.

## Business value

Waiting silently for several seconds for a reply reads as "broken" to a
user; streamed tokens read as "working." This is a perceived-performance
fix, not a backend-performance fix.

## Scope

- `POST /chat` supports a streaming mode (Server-Sent Events — simplest
  fit given Express/Nest + `fetch` on the client; do not introduce
  WebSockets for this).
- `apps/web/src/pages/chat.tsx` renders tokens as they arrive.
- Falls back cleanly to full-response behavior for `LLM_PROVIDER=mock`
  (no reason to fake streaming a canned string) or if a provider doesn't
  support streaming.
- **Out of scope:** streaming for the intake assistant (doesn't exist in
  this codebase) or any provider beyond `mock`/`openai`.

## Deliverables

- `LlmGatewayService` gains a streaming variant (or an option) for the
  `openai` path.
- `ChatController`'s `POST /chat` supports an SSE response mode.
- `apps/web/src/pages/chat.tsx` consumes the stream and updates the UI
  token-by-token.

## Acceptance Criteria

- [ ] With `LLM_PROVIDER=openai`, a chat request streams tokens to the
      client as they're generated (visible incremental rendering in the
      UI, not one final paint).
- [ ] With `LLM_PROVIDER=mock` (the default), behavior is unchanged —
      full response, same as today.
- [ ] The final persisted `Message` row in the database contains the
      complete assembled reply, identical to what non-streaming would
      have produced.
- [ ] Memory persistence (`MemoryService.recordFromUserMessage`) still
      runs exactly once per turn, not once per streamed chunk.
- [ ] A network interruption mid-stream doesn't corrupt the persisted
      message (either the full message is saved, or none of it is —
      no partial-garbage rows).

## Dependencies

None on other engineers. Sequenced after your own `TASK-008`/`TASK-010`
by choice (ship the cheap wins first).

## Expected files

```
apps/api/src/chat/llm-gateway.service.ts   (modified)
apps/api/src/chat/chat.service.ts          (modified)
apps/api/src/chat/chat.controller.ts       (modified)
apps/web/src/pages/chat.tsx                (modified)
apps/web/src/lib/api.ts                    (modified, if streaming needs a different fetch helper)
```

## Definition of Done

- All acceptance criteria checked.
- `npm run lint` and `npm run build` pass.
- PR merged to `main`.
- `.ai/PROJECT_STATE.md` updated (the `/chat` response contract now has
  a streaming mode — document both modes).

## Expected Pull Request title

`feat(chat): stream AI replies via SSE with mock-provider fallback`
