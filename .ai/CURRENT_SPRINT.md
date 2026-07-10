# CURRENT SPRINT

Goal: working MVP end-to-end (see ROADMAP.md).

- [x] Repo skeleton (.ai, docs/ADR, .github)
- [ ] Monorepo scaffold (apps/api NestJS, apps/web Next.js)
- [ ] Prisma schema: User, Organization, Partner, Conversation, Message, Memory
- [ ] Docker Compose (Postgres)
- [ ] Auth: register + login (JWT)
- [ ] Organizations: create
- [ ] Partners: create
- [ ] Chat: POST /chat (LLM gateway + persist conversation/message/memory)
- [ ] GET /conversations (history)
- [ ] GET /health
- [ ] Next.js: login, dashboard (create org/partner), chat UI
