# CURRENT SPRINT

Goal: working MVP end-to-end (see ROADMAP.md).

## Completed
- Repo skeleton (.ai, docs/ADR, .github)
- Monorepo scaffold (apps/api NestJS, apps/web Next.js)
- Prisma schema: User, Organization, Partner, Conversation, Message, Memory
- Docker Compose (Postgres)
- Auth: register + login (JWT)
- Organizations: create
- Partners: create
- Chat: POST /chat (LLM gateway + persist conversation/message/memory)
- GET /conversations (history)
- GET /health
- Next.js: login, dashboard (create org/partner), chat UI
- Core review (Univestar): HealthModule consistency, env fail-fast validation, shared lint/prettier config, CurrentUserId decorator removing 4x duplicated `req: any` pattern
- Engineering infrastructure: 11 labels, 3 milestones, 8 tracked Issues (#3–#10), base CI workflow (lint + build on push/PR)

## In Progress
- None — MVP is feature-complete and shipped. Next work is entirely the
  Issues below.

## Blocked
- GitHub Project board (Backlog/Ready/In Progress/Review/Blocked/Done)
  — `createProjectV2` GraphQL mutation returns `FORBIDDEN: Resource not
  accessible by personal access token`. Needs the **Projects** account
  permission (not repository permission) enabled on the token.

## Next Priorities
1. Issue #4 — CI workflow: **done this sprint**, verify it goes green on
   the next push.
2. Issue #3 — minimal test coverage (auth + org-scoping) — highest
   leverage before more contributors join.
3. Issue #5 — auth hardening (refresh tokens, rate limiting, password
   reset) — needed before any real user data touches this.
4. Everything else in Collaboration Features / Chat Experience
   milestones is scoped and ready to pick up in any order.
