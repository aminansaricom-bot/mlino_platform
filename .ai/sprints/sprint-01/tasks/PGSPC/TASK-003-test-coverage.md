# TASK-003: Minimal automated test coverage (auth + org-scoping)

**GitHub Issue:** #3
**Engineer:** PGSPC
**Sprint:** sprint-01

## Objective

Give the codebase its first automated tests, focused on the two
highest-risk paths: authentication and the multi-tenancy invariant.

## Context

No test suite exists in `mlino_platform` today. Every check so far has
been manual (`npm run lint`, `npm run build`, `tsc --noEmit`). As more
engineers land code in parallel, an untested `AuthService` and an
untested `OrganizationsService.assertMember` are the two places a silent
regression would hurt most — the second one is the multi-tenancy
boundary every other feature depends on.

## Business value

Reduces the risk that a future change silently breaks login or,
worse, breaks tenant isolation between organizations — a security
incident, not just a bug.

## Scope

- Add a test runner to `apps/api` (Jest — NestJS's default tooling).
- Unit tests for `AuthService.register` and `AuthService.login`.
- Unit tests for `OrganizationsService.assertMember`.
- **Out of scope:** end-to-end tests, testing `apps/web`, testing
  `chat/` or `partners/` — later tasks, not this one.

## Deliverables

- `apps/api/package.json` — `"test"` script wired to Jest.
- `apps/api/src/auth/auth.service.spec.ts`
- `apps/api/src/organizations/organizations.service.spec.ts`

## Acceptance Criteria

- [ ] `npm test --workspace=apps/api` runs and passes.
- [ ] `AuthService.register`: happy path creates a user and returns a
      token; duplicate email throws `ConflictException`.
- [ ] `AuthService.login`: happy path returns a token; wrong password
      and non-existent email both throw `UnauthorizedException`.
- [ ] `OrganizationsService.assertMember`: existing member resolves
      without throwing; non-member throws `ForbiddenException`;
      non-existent organization throws `NotFoundException`.
- [ ] Tests use a mocked/stubbed `PrismaService`, not a real database
      connection (keep them fast and CI-friendly).

## Dependencies

None to start.

## Expected files

```
apps/api/package.json                                  (modified)
apps/api/src/auth/auth.service.spec.ts                  (new)
apps/api/src/organizations/organizations.service.spec.ts (new)
```

## Definition of Done

- All acceptance criteria checked.
- `npm run lint`, `npm run build`, and the new `npm test` all pass in CI.
- PR merged to `main`.
- `.ai/PROJECT_STATE.md` updated to note a test suite now exists.

## Expected Pull Request title

`test(api): add unit tests for AuthService and OrganizationsService.assertMember`
