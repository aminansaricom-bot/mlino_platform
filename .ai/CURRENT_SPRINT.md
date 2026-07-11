# CURRENT SPRINT — Sprint 1

Sprint Zero (MVP + engineering infrastructure) is complete and merged to
`main` at `c864d5b`. Sprint 1 begins now.

## Sprint 1 goal

Ship the highest-leverage post-MVP work in 3 fully independent,
parallel workstreams — no engineer blocked on another's PR.

## Workstreams

### A — Engineering Foundations (`PGSPC`)
- **Goal:** make the codebase safe for more contributors to land code in.
- **Scope:** test coverage for the highest-risk paths; backend auth
  hardening.
- **Deliverables:** Issue #3 (tests), Issue #5 (refresh tokens, rate
  limiting, password reset — **backend only** this sprint, see brief).
- **Acceptance criteria:** see Issue #3 / #5 on GitHub.
- **Dependencies:** none to start. Coordinate with Workstream B before
  merging tests for `OrganizationsService.assertMember` — see
  Integration Points below.
- **Estimated complexity:** M (tests) + L (auth hardening) = **L overall**.
- **Files owned:** `apps/api/src/auth/**`, `apps/api/test/**` (new),
  `apps/api/src/organizations/organizations.service.spec.ts` (new, tests
  only — do not modify `organizations.service.ts` itself).

### B — Collaboration Features (`AMINANSARCOM`)
- **Goal:** an Organization can have more than one member.
- **Scope:** invite flow, then role enforcement on top of it.
- **Deliverables:** Issue #6 (invites), Issue #7 (roles — depends on #6,
  same engineer, sequential not parallel).
- **Acceptance criteria:** see Issue #6 / #7 on GitHub. Issue #7 also
  requires a short ADR (`docs/ADR/ADR-0011-...`) before implementation,
  per the issue body.
- **Dependencies:** none on other workstreams to start.
- **Estimated complexity:** M (invites) + M (roles) = **M overall**.
- **Files owned:** `apps/api/src/organizations/**` (including new
  `invites` sub-module), `apps/web/src/pages/dashboard.tsx`.

### C — Chat Experience (`LUGH`)
- **Goal:** make the chat surface production-grade.
- **Scope:** provider observability (cheap, ship first), search
  (cheap, good-first-task complexity), streaming (the real lift).
- **Deliverables:** Issue #8, Issue #10, Issue #9 — in that order.
- **Acceptance criteria:** see Issues #8 / #9 / #10 on GitHub.
- **Dependencies:** none.
- **Estimated complexity:** S (#8) + S (#10) + L (#9) = **M overall**.
- **Files owned:** `apps/api/src/chat/**`, `apps/web/src/pages/chat.tsx`.

## Integration points

- **A ↔ B, `assertMember`:** A is writing characterization tests
  against `OrganizationsService.assertMember` in parallel with B adding
  an invites sub-module that will call the same service. A's tests
  should land first (or in the same PR window) so B's invite logic is
  built against a pinned, tested contract instead of a moving target.
  Neither engineer blocks on the other — A tests current behavior, B
  adds new methods; only a signature change to `assertMember` itself
  would require coordination, and none is planned.
- **No other cross-workstream file overlap.** A touches `auth/` + new
  test files, B touches `organizations/` + `dashboard.tsx`, C touches
  `chat/` + `chat.tsx`. Verified against Sprint Zero's module boundaries
  (`docs/architecture/README.md`).

## Definition of Done (all workstreams)

`npm run lint` and `npm run build` pass, CI is green, the relevant
GitHub Issue's acceptance criteria are checked off, `.ai/PROJECT_STATE.md`
is updated if the change is structural, and the PR is reviewed against
`CONTRIBUTING.md` before merge.

## Completed (Sprint Zero — for history, see CHANGELOG.md)

MVP (auth, organizations, partners, chat, memory), core architecture
review, 11 labels, 3 milestones, 8 issues, CI workflow (verified green:
`https://github.com/aminansaricom-bot/mlino_platform/actions/runs/29154270158`).

## Blocked

- GitHub Project board — `createProjectV2` returns `FORBIDDEN`. Needs
  **Account permissions → Projects → Read and write** on the token (see
  `STATUS.md`). Does not block Sprint 1 work — Issues/Milestones alone
  are enough to execute the plan above.

## Next priorities after Sprint 1

Whatever's left un-picked in the three milestones, plus: wiring the
Sprint 1 auth-hardening backend work into the frontend (silent refresh),
which was deliberately deferred out of Sprint 1 to avoid a second
engineer touching `apps/web` in the same sprint as Workstream B/C.
