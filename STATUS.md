# STATUS

_Last updated: 2026-07-11 by Univestar (Chief Architect / Tech Lead / Integrator / Release Manager)._

## Repository health: 🟢 Green

- Lint, typecheck, and both app builds pass.
- No circular dependencies.
- No open PRs on `mlino_platform`, no unreviewed code in `main`.
- CI now runs lint + build on every push/PR (Issue #4).

## Inbox repositories (patch submission)

| Engineer | Inbox repo | State |
|---|---|---|
| `PGSPC` | `mlino_pgspc` | Empty — no patches submitted |
| `AMINANSARCOM` | `mlino_amin-` | Empty — no patches submitted |
| `SADAF` | `mlino_sadaf-` | Empty — no patches submitted |

Mechanism: `.ai/PATCH_WORKFLOW.md`. Review board:
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
