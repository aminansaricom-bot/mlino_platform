# PROJECT_STATE.md

> Ground truth. If this disagrees with the code, the code wins — fix
> this file in the same PR you noticed the drift.
>
> Last verified: 2026-07-11 (commit `c864d5b`, repo `mlino_platform`).

## What exists today

A working, deployed-nowhere-yet MVP: NestJS API (`apps/api`) + Next.js
web (`apps/web`), npm-workspaces monorepo, Prisma + PostgreSQL.

**Auth**: JWT register/login. No refresh tokens, no rate limiting, no
password reset yet (Issue #5).

**Data model** (`apps/api/prisma/schema.prisma`): `User`,
`Organization`, `OrganizationMember` (role field exists but nothing
enforces it yet — Issue #7), `Partner`, `Conversation`, `Message`,
`Memory`.

**API surface**: `POST /auth/{register,login}`, `POST|GET
/organizations`, `POST|GET /partners`, `POST /chat`, `GET
/conversations[/:id]`, `GET /health`.

**Chat**: `LlmGatewayService` — `mock` provider (zero-config default) or
`openai` (env-configured). Tool-calling / streaming not implemented.
Memory is a naive per-partner log of user messages, no extraction, no
retrieval ranking.

**No test suite yet** (Issue #3). **No frontend beyond**: login/
register, dashboard (create org/partner), single-conversation chat page.
No search, no streaming.

## Engineering infrastructure (as of Sprint Zero)

- CI: `.github/workflows/ci.yml` — lint + build on push/PR to `main`.
  Verified green.
- 11 labels, 3 milestones (`Engineering Foundations`, `Collaboration
  Features`, `Chat Experience`), 7 open Issues (#3, #5–#10) — see
  `docs/ADR/` for architecture context, GitHub Issues for task-level
  tracking.
- GitHub Project board: **not created** — token lacks the Projects
  account permission. See `STATUS.md`.
- Shared ESLint/Prettier at repo root. `CurrentUserId` decorator in
  `apps/api/src/common/`.

## What is explicitly not built (see ROADMAP.md for the full list)

Multi-org invites, role enforcement, streaming chat, conversation
search, LLM cost/latency observability, refresh tokens/rate limiting/
password reset, any automated tests, any production deployment config.

## Engineering management (repo-driven, no chat-delivered instructions)

- `.ai/RESUME.md` — the file that lets a brand new session (AI or
  human) with zero conversation history continue immediately. Read it
  first if you're starting cold.
- `.ai/engineers/{PGSPC,AMINANSARCOM,SADAF}.md` — one file per engineer,
  each a self-contained entry point (mission, current sprint, assigned
  tasks, priority, business goal, context, files to modify, acceptance
  criteria, DoD, remaining work, next immediate action, blockers,
  expected PR).
- `.ai/reviews/{REVIEW_QUEUE,APPROVED,CHANGES_REQUESTED,MERGED}.md` —
  the live PR review board. Every PR passes through this pipeline:
  queue → approved → merged, or queue → changes requested → back to
  queue. An engineer with a PR anywhere in this pipeline (queue or
  changes-requested) does not start a new task until it clears.
- `.ai/sprints/sprint-NN/README.md` — sprint index.
- `.ai/sprints/sprint-NN/tasks/<engineer>/TASK-NNN-*.md` — one file per
  task (objective, business value, context, scope, deliverables,
  acceptance criteria, dependencies, expected files, DoD, expected PR
  title).
- `.ai/sprints/sprint-NN/{reviews,reports,decisions}/` — PR reviews,
  sprint status reports, and sprint-scoped decisions (distinct from
  `docs/ADR/`, which is architecture-level, not sprint-level).
- GitHub Issues/Milestones remain the lightweight, at-a-glance tracker;
  `.ai/sprints/` is the detailed, self-contained brief each task needs
  to be worked without further chat context.

## Team / ownership state

Single founder-owner (`aminansaricom-bot`). No human engineers besides
the founder as of this writing — `PGSPC`, `AMINANSARCOM`, `SADAF` are
named workstream owners (human and/or AI) operating entirely from the
repo structure above, not from chat instructions.
