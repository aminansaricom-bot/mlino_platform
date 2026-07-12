# STATUS

_Last updated: 2026-07-12 by Univestar (Chief Architect / Tech Lead / Integrator / Release Manager)._

## Infrastructure: complete

`.ai/ENGINEER_WORKFLOW.md` is now the permanent, single source of truth
for the complete development workflow (team roles, repo structure,
pre-task checklist, branch/commit conventions, submission rules,
Definition of Done, review process, merge process, coding standards,
forbidden actions, continuous development cycle). Mandatory reading for
every engineer before starting any task. All three Submission
Repositories (`mlino_pgspc`, `mlino_amin-`, `mlino_sadaf-`) are
initialized and ready.

## Repository health: 🟢 Green

- Lint, typecheck, both app builds, and now `npm test --workspace=apps/api` (9/9) all pass.
- No circular dependencies.
- No open PRs on `mlino_platform`, no unreviewed code in `main`.
- CI now runs lint + test + build on every push/PR (Issue #4, extended
  for the new `apps/api` test suite).
- Pre-existing (not new) moderate/high npm audit findings in
  `express`/`body-parser`/`qs` (transitive via `@nestjs/platform-express`)
  — tracked as Issue #11, not introduced by any recent change.

## Submission repositories (work submission)

| Engineer | Submission repo | State |
|---|---|---|
| `PGSPC` | `mlino_pgspc` | 1 merged (TASK-003), on TASK-005 next |
| `AMINANSARCOM` | `mlino_amin-` | Empty — no submissions yet |
| `SADAF` | `mlino_sadaf-` | Empty — no submissions yet |

Mechanism: `.ai/SUBMISSION_WORKFLOW.md`. Review board:
`.ai/reviews/REVIEW_QUEUE.md`.

Two other repos exist on the account (`mlino_docs-`, `mlino_workspace`),
both empty, no defined role — not part of this workflow.

## Engineering infrastructure

| Item | Status |
|---|---|
| Labels (11) | ✅ Created |
| Milestones (3) | ✅ Created — Engineering Foundations, Collaboration Features, Chat Experience |
| Issues (8) | ✅ Created and linked to milestones |
| CI workflow | ✅ `.github/workflows/ci.yml` — lint + build on push/PR |
| GitHub Project board | 🔴 Blocked — see below |
| CODEOWNERS / CONTRIBUTING / CHANGELOG | ✅ In place |

## Blocked item — GitHub Project board

**Operation:** `createProjectV2` GraphQL mutation.
**Error:**
```json
{"data":{"createProjectV2":null},"errors":[{"type":"FORBIDDEN","path":["createProjectV2"],"message":"Resource not accessible by personal access token"}]}
```
**Cause:** GitHub Projects (v2) is granted under the token's **Account
permissions** section, not **Repository permissions** — a different part
of the fine-grained token settings page. Repository-level `Issues`/
`Workflows` access does not cover it.
**Fix:** on the token's settings page, add **Account permissions →
Projects → Read and write**, then retry.

## Milestones

| # | Title | Issues |
|---|---|---|
| 2 | Engineering Foundations | #3 tests, #4 CI (done), #5 auth hardening |
| 3 | Collaboration Features | #6 org invites, #7 roles & permissions |
| 4 | Chat Experience | #8 provider observability, #9 streaming, #10 search |

## Open Issues

#3, #5, #6, #7, #8, #9, #10 — all scoped, labeled, and milestoned, ready
to be picked up by any contributor. #4 is implemented in this session;
closing it once CI is confirmed green on GitHub.
