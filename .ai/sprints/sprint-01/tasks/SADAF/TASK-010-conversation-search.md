# TASK-010: Conversation search

**GitHub Issue:** #10
**Engineer:** SADAF
**Sprint:** sprint-01
**Suggested branch:** `feature/task-010-conversation-search`
**ADR references:** No dedicated ADR required — a `contains` filter on
existing data, not new search infrastructure (this task's own body
already rules out full-text/semantic search infra as out of scope).

## Objective

Let a user find a past conversation by what was said in it, not just by
browsing the conversation list.

## Context

`GET /conversations` (`apps/api/src/chat/chat.service.ts`,
`listConversations`) currently only filters by `organizationId` and
optionally `partnerId` — no content search.

## Business value

As conversation history grows, "scroll the list and guess which one"
stops working. This is the smallest fix that makes history genuinely
usable.

## Scope

- `GET /conversations` accepts an optional `q` query param, matching
  against `Message.content` within the organization (and partner, if
  provided).
- A simple search box on the chat page.
- **Out of scope:** full-text search infrastructure (Postgres
  `tsvector`, external search service) — a `contains` filter is enough
  at current data volume. Revisit if that ever changes (note it in
  `.ai/ROADMAP.md`, don't build it now).

## Deliverables

- `ChatService.listConversations` accepts and applies an optional `q`.
- `ChatController`'s `GET /conversations` passes through a `q` query
  param.
- `apps/web/src/pages/chat.tsx` (or a shared component if it makes
  sense) gets a search input wired to it.

## Acceptance Criteria

- [ ] `GET /conversations?organizationId=...&q=foo` returns only
      conversations that have at least one message containing "foo"
      (case-insensitive).
- [ ] Omitting `q` behaves exactly as today (no regression).
- [ ] Search is always scoped through `organizationId` — never a
      cross-organization search, even if `q` alone is provided.
- [ ] Chat page has a visible search input that updates the conversation
      list.

## Dependencies

None.

## Expected files

```
apps/api/src/chat/chat.service.ts      (modified)
apps/api/src/chat/chat.controller.ts   (modified)
apps/web/src/pages/chat.tsx            (modified)
```

## Definition of Done

- All acceptance criteria checked.
- `npm run lint` and `npm run build` pass.
- PR merged to `main`.
- `.ai/PROJECT_STATE.md` updated (search now exists, ROADMAP TODO
  marked done).

## Expected Pull Request title

`feat(chat): add conversation search by message content`
