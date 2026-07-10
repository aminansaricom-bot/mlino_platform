# MLINO (MVP)

AI Business Partner platform — MVP: Landing → Auth → Organization →
Partner → Chat → AI reply → persisted Conversation/Message/Memory →
history.

Separate project from the dental-clinic `malino-17tir` repo — no shared
code or deployment.

## Stack
NestJS (`apps/api`) · Next.js (`apps/web`) · Prisma · PostgreSQL. See
`docs/ADR/ADR-0001-stack.md`.

## Run locally

```bash
cp .env.example apps/api/.env
cp .env.example apps/web/.env.local   # only NEXT_PUBLIC_API_URL is read here
docker compose up -d
npm install
npm run build --workspace=apps/api    # generates Prisma client + compiles
npx prisma migrate dev --schema=apps/api/prisma/schema.prisma
npm run dev:api     # http://localhost:4001
npm run dev:web     # http://localhost:3000
```

No LLM API key is required to try the MVP — `LLM_PROVIDER=mock` (the
default) returns a canned reply so the full flow (org → partner → chat →
persisted history) works with zero external services. Set
`LLM_PROVIDER=openai` and `OPENAI_API_KEY` in `apps/api/.env` for real
replies.

## Structure
```
apps/api/   NestJS backend (auth, organizations, partners, chat, prisma)
apps/web/   Next.js frontend (login/register, dashboard, chat)
docs/ADR/   Architecture decisions
.ai/        Agent-facing context (ROADMAP.md, CURRENT_SPRINT.md)
```

See `.ai/ROADMAP.md` for what's explicitly out of scope for the MVP.
