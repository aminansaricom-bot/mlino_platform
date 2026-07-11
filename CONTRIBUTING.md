# Contributing to MLINO

## Before you start

Read `.ai/README.md`'s reading order (`VISION` isn't present yet at repo
root — start with `.ai/ROADMAP.md` and `docs/ADR/`). Check
`.ai/CURRENT_SPRINT.md` for what's in scope right now.

## Branching

- `main` is always deployable. No direct commits to `main` except by
  the core engineer for repo-health fixes (docs, CI, config) — feature
  work goes through a PR.
- Branch names: `feat/short-description`, `fix/short-description`,
  `chore/short-description`, matching the Issue it closes where
  possible (e.g. `feat/12-partner-memory-view`).

## Commits

Small, logical commits. Prefix with type: `feat`, `fix`, `docs`,
`chore`, `refactor`, `test`. One concern per commit — don't mix a
refactor with a feature in the same commit.

## Pull Requests

- Fill out `.github/PULL_REQUEST_TEMPLATE.md` completely — a PR without
  a filled-in "Why" is sent back before review starts.
- Keep PRs small enough to review in one sitting. If a task doesn't fit,
  split the Issue, not the review.
- `npm run lint` and `npm run build` must pass locally before requesting
  review.
- Link the Issue it closes (`Closes #N`).

## Code review

Every PR is reviewed against: architecture fit (does it belong in
`apps/api`, `apps/web`, or a future shared package?), code quality,
readability, whether it introduces unnecessary complexity, security
(especially organization-scoping — see `.ai/CODING_RULES.md`-equivalent
patterns in `docs/architecture/`), and whether simpler would do. A
reviewer rejecting unnecessary complexity is doing their job correctly,
not being obstructive.

## Multi-tenancy rule (non-negotiable)

Every query touching `Organization`-scoped data must go through
`OrganizationsService.assertMember` (or an equivalent explicit check)
before reading/writing. This is checked on every PR without exception.

## Adding an ADR

Copy `docs/ADR/TEMPLATE.md` to `docs/ADR/ADR-NNNN-title.md` (next
number), fill it in, status `Proposed` unless you have explicit sign-off
to mark it `Accepted`. Add it to the index if one exists.

## Questions

Open an Issue with the `question` label, or ask in the PR you're working
on — don't block silently.
