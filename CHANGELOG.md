# Changelog

All notable changes to this project are documented here. Format loosely
follows [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added
- `.ai/ENGINEER_WORKFLOW.md` — permanent, single-source-of-truth
  development workflow document. Mandatory reading for every engineer
  before starting work. Covers team roles, repository structure,
  pre-task checklist, branch/commit conventions, submission rules,
  Definition of Done, review process, merge process, coding standards,
  forbidden actions, and the continuous development cycle.
- All three Submission Repositories (`mlino_pgspc`, `mlino_amin-`,
  `mlino_sadaf-`) initialized: `README.md`, `PROJECT_STATE.md`,
  `submissions/`, `reports/`, `docs/`.
- `apps/api` test suite (Jest): unit tests for `AuthService.register`/
  `.login` and `OrganizationsService.assertMember`, 9/9 passing, mocked
  `PrismaService` (no live DB in the suite). First submission through
  the Submission Repository model (`PGSPC`, TASK-003, Issue #3).
  `npm test --workspace=apps/api` now exists.
- Submission Repository workflow (final): engineers (`PGSPC`,
  `AMINANSARCOM`, `SADAF`) submit work as `submissions/TASK-XXX/`
  folders (modified files at their real project path, plus
  `REPORT.md`) to their own Submission Repository (`mlino_pgspc`,
  `mlino_amin-`, `mlino_sadaf-`) instead of opening PRs directly on
  `mlino_platform`. No `.patch`/`.diff`/zip files. Only Univestar
  pushes to `mlino_platform`. Full mechanism:
  `.ai/SUBMISSION_WORKFLOW.md`. (Supersedes an earlier `.patch`-file
  convention that was never used in practice before being replaced.)
- `.ai/reviews/{REVIEW_QUEUE,APPROVED,CHANGES_REQUESTED,MERGED}.md` —
  live review board tracking every submission through its lifecycle.
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
