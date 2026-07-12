# Changelog

All notable changes to this project are documented here. Format loosely
follows [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added
- Inbox-repository patch workflow: engineers (`PGSPC`, `AMINANSARCOM`,
  `SADAF`) now submit work as patches to their own Inbox repo
  (`mlino_pgspc`, `mlino_amin-`, `mlino_sadaf-`) instead of opening PRs
  directly on `mlino_platform`. Only Univestar pushes to
  `mlino_platform`. Full mechanism: `.ai/PATCH_WORKFLOW.md`.
- `.ai/reviews/{REVIEW_QUEUE,APPROVED,CHANGES_REQUESTED,MERGED}.md` —
  live review board tracking every patch through its lifecycle.
- `.ai/RESUME.md` — lets a new session with zero conversation history
  resume engineering work immediately.
- `.ai/sprints/sprint-01/` — Sprint 1 plan, 3 parallel workstreams,
  7 standalone task files, sprint-scoped decisions log.
- MVP scaffold: NestJS API (`apps/api`) + Next.js web (`apps/web`) in an
  npm-workspaces monorepo.
- Auth (register/login, JWT), Organizations, Partners, Chat (LLM gateway
  with `mock`/`openai` providers + naive Memory persistence).
- `GET /health`, `GET /conversations`, `GET /conversations/:id`.
- Prisma schema: `User`, `Organization`, `OrganizationMember`, `Partner`,
  `Conversation`, `Message`, `Memory`.
- Docker Compose for local PostgreSQL.
- `.ai/` agent-facing context, `docs/ADR/` (ADR-0001: MVP stack),
  `.github/` issue/PR templates.

### Changed
- Core review pass: `HealthModule` extracted for structural consistency,
  fail-fast env validation (`DATABASE_URL`, `JWT_SECRET`), shared root
  ESLint/Prettier config, `CurrentUserId` decorator replacing a
  4×-duplicated `@Req() req: any` pattern.

## How to update this file

Add an entry under `[Unreleased]` in the same PR as the change. On
release, rename `[Unreleased]` to a version + date and start a fresh
`[Unreleased]` section above it.
