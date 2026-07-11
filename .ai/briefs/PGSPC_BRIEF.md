# Brief: PGSPC — Workstream A: Engineering Foundations

This brief is self-contained. You should not need any other context
from this conversation to start working.

## Mission

Make the codebase safe for more contributors to land code in. You are
not adding product features — you are reducing the risk that someone
else's next PR breaks something silently.

## Context

MLINO is an AI Business Partner platform. This repo (`mlino_platform`)
is the MVP: NestJS API + Next.js web, Prisma/PostgreSQL, npm workspaces
monorepo. It's fully working today (auth, organizations, partners, chat)
but has **zero automated tests** and **MVP-grade auth** (no refresh
tokens, no rate limiting, no password reset).

## Repository state (read these before writing code)

- `.ai/PROJECT_STATE.md` — ground truth of what exists.
- `docs/ADR/ADR-0001-stack.md` — why NestJS/Next.js/Prisma.
- `apps/api/src/auth/` — current auth implementation (JWT, 7-day
  expiry, bcrypt, no refresh).
- `apps/api/src/organizations/organizations.service.ts` — the
  `assertMember` method every tenant-scoped feature depends on. **Do
  not modify this file** — you're testing it, not changing it. If you
  find a bug in it, open an Issue instead of fixing it inline (a fix
  there affects Workstream B, who is building on top of it in
  parallel).

## Files you own this sprint

- `apps/api/src/auth/**` (implementation changes for #5)
- `apps/api/test/**` (new — test setup/config)
- `apps/api/src/organizations/organizations.service.spec.ts` (new,
  tests only)
- Any `*.spec.ts` files colocated with the code they test

Do not touch `apps/web/**` this sprint — frontend wiring for refresh
tokens is explicitly deferred (see `.ai/CURRENT_SPRINT.md` "Next
priorities").

## Deliverables

### Issue #3 — Minimal automated test coverage
- Unit tests for `AuthService.register`/`login`: happy path, wrong
  password, duplicate email.
- Unit tests for `OrganizationsService.assertMember`: member, non-member,
  non-existent org.
- Wire a test runner into `apps/api`'s `package.json` (`"test": "..."`)
  — Jest is the natural choice given NestJS's default tooling; don't
  reach for anything heavier.

### Issue #5 — Auth hardening (backend only this sprint)
- Refresh token issued alongside the access token, with rotation on use.
- Rate limiting on `POST /auth/login` and `POST /auth/register`
  (`@nestjs/throttler` is the standard NestJS choice — don't hand-roll
  this).
- Password reset flow: `POST /auth/password-reset/request` +
  `POST /auth/password-reset/confirm`. If no email provider is chosen
  yet, generate and log the reset token server-side (matching the
  `lib/sms.js`-stub pattern used in the sibling `malino-17tir` project —
  a logged stub with a clear TODO is acceptable, a broken/fake email
  send is not) and note the gap explicitly in the PR description.

## Rules

- Follow `CONTRIBUTING.md` for branching/commits/PR format.
- `npm run lint` and `npm run build` must pass before requesting review.
- No new top-level dependency without checking it's not already
  solvable with what's installed.
- Don't touch `organizations.service.ts`, `chat/**`, or `apps/web/**`.

## Acceptance criteria

Exactly as written in GitHub Issues #3 and #5 — check every box before
marking the PR ready for review.

## Integration points

Your tests for `assertMember` pin down its current contract before
Workstream B (`AMINANSARCOM`) builds an invites module on top of it. Get
your test PR up early — it doesn't need to wait for #5 to be done.

## Definition of Done

- CI green on your PR.
- Issue acceptance criteria checked off.
- `.ai/PROJECT_STATE.md` updated if you changed anything structural
  (e.g. added a `test` script, added `@nestjs/throttler` as a
  dependency).
- PR reviewed and merged.
