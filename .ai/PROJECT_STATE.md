# PROJECT_STATE.md

> Ground truth. If this disagrees with the code, the code wins — fix
> this file in the same PR you noticed the drift.
>
> Last verified: 2026-07-12 (commit `e082d9e`, repo `mlino_platform`).

## What exists today

A working, deployed-nowhere-yet MVP: NestJS API (`apps/api`) + Next.js
web (`apps/web`), npm-workspaces monorepo, Prisma + PostgreSQL.

**Auth**: JWT register/login, now with refresh-token rotation
(atomic-claim, no double-mint on concurrent calls), rate limiting on
`/auth/login`/`/auth/register` (`@nestjs/throttler`, configurable via
`AUTH_THROTTLE_LIMIT`/`AUTH_THROTTLE_TTL_MS`), and a password-reset
flow (`POST /auth/password-reset/{request,confirm}`, also atomic-claim,
revokes all outstanding refresh tokens on success). Reset tokens are
logged server-side, not emailed — no email provider is wired in yet
(`// TODO` in `auth.service.ts`, same stub pattern as `malino-17tir`'s
`lib/sms.js`). Backend only — no frontend UI wiring for
refresh/reset yet (tracked in ROADMAP).

**Data model** (`apps/api/prisma/schema.prisma`): `User`,
`Organization`, `OrganizationMember` (role field exists but nothing
enforces it yet — Issue #7), `Partner`, `Conversation`, `Message`,
`Memory`, `RefreshToken`, `PasswordResetToken` (both store only a
SHA-256 hash of the token, never the raw value).

**API surface**: `POST /auth/{register,login}`, `POST|GET
/organizations`, `POST|GET /partners`, `POST /chat`, `GET
/conversations[/:id]`, `GET /health`.

**Chat**: `LlmGatewayService` — `mock` provider (zero-config default) or
`openai` (env-configured). Tool-calling / streaming not implemented.
Memory is a naive per-partner log of user messages, no extraction, no
retrieval ranking.

**No frontend beyond**: login/
register, dashboard (create org/partner), single-conversation chat page.
No search, no streaming.

**Tests** (`apps/api`): Jest, added in TASK-003. `AuthService.register`/
`.login` and `OrganizationsService.assertMember` have unit tests
against a mocked `PrismaService` (no real DB in the suite — fast,
CI-friendly). Run with `npm test --workspace=apps/api`. Still not
covered: `chat/`, `partners/`, anything in `apps/web` — see Issue #3's
"Out of scope" for what was deliberately deferred.

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
search, LLM cost/latency observability, any automated E2E tests, any
production deployment config. Auth hardening (refresh/rate-limit/reset)
is done as of TASK-005 — frontend wiring for it is the remaining TODO.

## Engineering management (repo-driven, no chat-delivered instructions)

- `.ai/ENGINEER_WORKFLOW.md` — **the single source of truth for the
  complete development workflow.** Mandatory reading for every engineer
  before starting any task. Covers team roles, repository structure,
  pre-task checklist, branch/commit conventions, submission rules,
  Definition of Done, review process, merge process, coding standards,
  forbidden actions, and the continuous development cycle. If any other
  doc conflicts with it on process, this file wins (architecture
  decisions still belong to `docs/ADR/`). §13 covers merge-conflict
  resolution (Univestar-only, engineers never reconcile cross-submission
  conflicts).
- `.ai/templates/REVIEW_RESULT_TEMPLATE.md` — mandatory structure for
  every `REVIEW_RESULT.md` going forward.
- `.ai/SUBMISSION_WORKFLOW.md` — how work moves from an engineer's
  Submission Repository (`mlino_pgspc`, `mlino_amin-`, `mlino_sadaf-`) into
  `mlino_platform`. Only Univestar (Chief Architect/Tech Lead/
  Integrator/Release Manager) pushes to `mlino_platform`; engineers
  submit work as file-level submissions (`submissions/TASK-XXX/`) to
  their own Submission Repository instead of opening PRs here directly.

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
- `.ai/sprints/sprint-NN/README.md` — sprint index. Task files
  (`tasks/<engineer>/TASK-NNN-*.md`) now also carry a suggested branch
  name and explicit ADR/API-contract/DB-migration sections, verified
  complete before an engineer starts (see TASK-005/006 as the
  reference standard). Branch convention:
  `feature/task-<nnn>-<slug>` (e.g. `feature/task-005-auth-hardening`).
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
repo structure above, not from chat instructions. `SADAF`'s code tasks
are paused as of 2026-07-12 — reassigned to AI architecture/
documentation review until Git-based development opens for that
workstream (see `.ai/engineers/SADAF.md`). Each has a
Submission Repository: `mlino_pgspc`, `mlino_amin-`, `mlino_sadaf-`
respectively. `PGSPC` has one merged submission (TASK-003); the other
two are still empty as of 2026-07-12.

Two other repos exist on the same account —
`mlino_docs-` and `mlino_workspace`, both empty — with no defined role
in this project yet. Not in use, not touched, noted here only so a
future session doesn't mistake them for something already integrated.
