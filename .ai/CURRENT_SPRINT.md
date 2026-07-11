# CURRENT SPRINT

Goal: working MVP end-to-end (see ROADMAP.md).

- [x] Repo skeleton (.ai, docs/ADR, .github)
- [x] Monorepo scaffold (apps/api NestJS, apps/web Next.js)
- [x] Prisma schema: User, Organization, Partner, Conversation, Message, Memory
- [x] Docker Compose (Postgres)
- [x] Auth: register + login (JWT)
- [x] Organizations: create
- [x] Partners: create
- [x] Chat: POST /chat (LLM gateway + persist conversation/message/memory)
- [x] GET /conversations (history)
- [x] GET /health
- [x] Next.js: login, dashboard (create org/partner), chat UI
- [x] Core review (Univestar): HealthModule consistency, env fail-fast validation, shared lint/prettier config, CurrentUserId decorator removing 4x duplicated `req: any` pattern
