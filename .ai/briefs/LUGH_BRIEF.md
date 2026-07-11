# Brief: LUGH — Workstream C: Chat Experience

This brief is self-contained. You should not need any other context
from this conversation to start working.

## Mission

Make the chat surface production-grade: observable, searchable, and
responsive.

## Context

MLINO is an AI Business Partner platform. This repo (`mlino_platform`)
is the MVP: NestJS API + Next.js web, Prisma/PostgreSQL, npm workspaces
monorepo. Chat today is request/response only (no streaming), has no
search over past conversations, and the LLM gateway has no logging of
cost/latency per provider.

## Repository state (read these before writing code)

- `.ai/PROJECT_STATE.md` — ground truth of what exists.
- `docs/ADR/ADR-0001-stack.md`, `ADR-0008-litellm.md` (if present),
  `ADR-0009/0010`-equivalent notes in `docs/ADR/` — read what's been
  decided about the LLM gateway before touching it. **Do not adopt a
  gateway library (LiteLLM or similar) for observability** — that was
  explicitly evaluated and deferred; plain logging is the scoped ask
  here.
- `apps/api/src/chat/llm-gateway.service.ts` — provider abstraction
  (`mock` / `openai`).
- `apps/api/src/chat/chat.service.ts` — conversation orchestration,
  history window, memory injection.
- `apps/web/src/pages/chat.tsx` — chat UI.

## Files you own this sprint

- `apps/api/src/chat/**`
- `apps/web/src/pages/chat.tsx`

Do not touch `apps/api/src/auth/**`, `apps/api/src/organizations/**`, or
`apps/web/src/pages/dashboard.tsx` this sprint.

## Deliverables (ship in this order — cheapest first)

### Issue #8 — LLM provider observability / cost tracking
- Each LLM call logs provider, latency, and token usage (if the
  provider's response includes it — `mock` won't, `openai` will).
- Plain logging only — no new external dependency, no new service.

### Issue #10 — Conversation search
- `GET /conversations` supports a `q` query param filtering by message
  content (a `contains` query against `Message.content` scoped to the
  organization is enough — no need for full-text search infrastructure
  at this data volume).
- A simple search box on the chat page wired to it.

### Issue #9 — Streaming chat responses
- `POST /chat` supports a streaming response mode (SSE is the simplest
  fit for Express/Nest + `fetch` on the client — don't reach for
  WebSockets for this).
- `apps/web/src/pages/chat.tsx` renders tokens as they arrive.
- Falls back cleanly to the current non-streaming behavior when
  `LLM_PROVIDER=mock` or when the active provider doesn't support
  streaming.

## Rules

- Follow `CONTRIBUTING.md` for branching/commits/PR format.
- `npm run lint` and `npm run build` must pass before requesting review.
- Multi-tenancy rule is non-negotiable: search must be scoped to the
  organization (and ideally partner), same as every other chat query —
  never a global search across organizations.
- Ship #8 and #10 as separate, small PRs before starting #9 — #9 is the
  real complexity in this workstream, don't let it block the two cheap
  wins.

## Acceptance criteria

Exactly as written in GitHub Issues #8, #9, and #10 — check every box
before marking each PR ready for review.

## Integration points

None with other workstreams this sprint — `apps/api/src/chat/**` and
`apps/web/src/pages/chat.tsx` aren't touched by Workstream A or B.

## Definition of Done

- CI green on each PR.
- Issue acceptance criteria checked off for #8, #9, #10.
- `.ai/PROJECT_STATE.md` updated if you add a dependency (e.g. an SSE
  helper) or change the `/chat` response contract.
- PRs reviewed and merged.
