# TASK-005: Auth hardening (backend only)

**GitHub Issue:** #5
**Engineer:** PGSPC
**Sprint:** sprint-01

## Objective

Bring authentication from MVP-grade to production-grade on the backend:
refresh tokens, rate limiting, and password reset.

## Context

Current auth (`apps/api/src/auth/`) issues a single 7-day access token
with no refresh, no rate limiting on login/register, and no way to
reset a forgotten password. Fine for an internal demo, not for real
users.

## Business value

Prevents account lockout from expired tokens without silent
re-login friction, protects against credential-stuffing/brute-force on
login, and unblocks real users who forget their password — all
prerequisites before this product has any real accounts in it.

## Scope

- Refresh token issuance + rotation.
- Rate limiting on `POST /auth/login` and `POST /auth/register`.
- Password reset request/confirm endpoints.
- **Explicitly out of scope this sprint:** any `apps/web` changes
  (silent refresh wiring, reset-password UI) — backend contract only.
  This is deliberate, to avoid two engineers touching `apps/web` in the
  same sprint. Tracked as a fast-follow in `.ai/ROADMAP.md`.
- **Explicitly out of scope:** a real email provider. If none is
  configured, log the reset token/link server-side with a clear
  `// TODO: wire real email provider` comment — same pattern as
  `malino-17tir`'s `lib/sms.js` stub. Do not fake a working email send.

## Deliverables

- `POST /auth/refresh` — exchanges a valid refresh token for a new
  access + refresh token pair (rotation: old refresh token invalidated).
- `@nestjs/throttler` wired onto `/auth/login` and `/auth/register`.
- `POST /auth/password-reset/request` — accepts an email, issues a
  reset token (logged, not emailed, per Scope above).
- `POST /auth/password-reset/confirm` — accepts token + new password.

## Acceptance Criteria

- [ ] Login/register response includes both `accessToken` and
      `refreshToken`.
- [ ] `POST /auth/refresh` with a valid refresh token returns a new
      token pair; the old refresh token no longer works after rotation.
- [ ] More than N rapid requests (document the chosen limit) to
      `/auth/login` or `/auth/register` return `429 Too Many Requests`.
- [ ] `POST /auth/password-reset/request` never reveals whether an
      email exists in the system (same response either way) and logs a
      reset token server-side.
- [ ] `POST /auth/password-reset/confirm` with a valid, unexpired token
      updates the password hash; an expired or already-used token is
      rejected.
- [ ] No changes to any file under `apps/web/`.

## Dependencies

None. Independent of `TASK-003`, though both touch `apps/api/src/auth/`
— coordinate merge order with yourself (same engineer), not a
cross-engineer dependency.

## Expected files

```
apps/api/src/auth/auth.service.ts        (modified)
apps/api/src/auth/auth.controller.ts     (modified)
apps/api/src/auth/dto.ts                 (modified — new DTOs)
apps/api/src/auth/auth.module.ts         (modified — ThrottlerModule)
apps/api/prisma/schema.prisma            (modified — refresh token / reset token storage)
apps/api/package.json                    (modified — @nestjs/throttler)
```

## Definition of Done

- All acceptance criteria checked.
- `npm run lint` and `npm run build` pass; if `TASK-003`'s test runner
  has landed, existing `AuthService` tests still pass (update them if
  the method signatures changed).
- PR merged to `main`.
- `.ai/PROJECT_STATE.md` and `.ai/ROADMAP.md` updated (auth hardening
  moves from TODO to done; frontend wiring added as a new, explicit
  fast-follow TODO).

## Expected Pull Request title

`feat(auth): add refresh tokens, rate limiting, and password reset (backend)`
