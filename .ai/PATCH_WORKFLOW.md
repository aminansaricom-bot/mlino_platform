# PATCH_WORKFLOW.md

How work moves from an engineer to `mlino_platform` under the
Inbox-repository model. This supersedes direct-PR-on-`mlino_platform`
as the submission mechanism — `.ai/reviews/*.md` still tracks review
status, just for patches instead of PRs now.

## Repositories

| Repo | Owner | Purpose |
|---|---|---|
| `mlino_platform` | Univestar only | Main repo — the actual product. |
| `mlino_pgspc` | `PGSPC` | Inbox — where `PGSPC` submits patches. |
| `mlino_amin-` | `AMINANSARCOM` | Inbox — where `AMINANSARCOM` submits patches. |
| `mlino_sadaf-` | `SADAF` | Inbox — where `SADAF` submits patches. |

(Note: the actual repo names carry a trailing `-` — `mlino_amin-` /
`mlino_sadaf-`, not `mlino_amin` / `mlino_sadaf`. Verified against the
GitHub account's real repo list.)

## Convention (proposed — adjust once real usage tells us otherwise)

Since no patch has been submitted yet, this is a starting convention,
not observed practice. Update this file the first time real usage
diverges from it.

An engineer's Inbox repo root should contain:

```
mlino_<engineer>/
├── PROJECT_STATE.md      what this submission does, from the engineer's side
├── patches/
│   └── TASK-NNN-slug.patch    unified diff (git format-patch output), one per task
├── REVIEW.md              written by Univestar only — do not edit
└── REVIEW_RESULT.md        written by Univestar only — do not edit
```

- One patch file per task — matches the "every PR solves exactly one
  task" rule carried over from the PR-based workflow.
- `PROJECT_STATE.md` in the Inbox (not to be confused with
  `mlino_platform`'s own `.ai/PROJECT_STATE.md`) briefly states: which
  task, what changed, how it was verified locally (lint/build/test
  output), and anything the reviewer should know.
- The engineer generates the patch against their own up-to-date clone of
  `mlino_platform`'s `main`, e.g. `git format-patch main --stdout >
  patches/TASK-006-org-invites.patch`.

## Review pipeline (Univestar)

Same pipeline as before, relabeled for patches instead of PRs — see
`.ai/reviews/REVIEW_QUEUE.md` for the live board:

1. Pull `mlino_platform` + all three Inbox repos.
2. New patch file in an Inbox's `patches/`? → add to
   `.ai/reviews/REVIEW_QUEUE.md`.
3. Review: architecture fit, coding standards, security, ADR
   consistency, roadmap alignment, task acceptance criteria.
4. **Rejected** → write `REVIEW.md` in the Inbox repo (the only file
   Univestar may write there besides `REVIEW_RESULT.md`) explaining
   exactly what must change. Move the entry to
   `.ai/reviews/CHANGES_REQUESTED.md`. Engineer does not get a new task
   until resolved.
5. **Accepted** → `git apply` the patch to a local `mlino_platform`
   checkout, run `npm run lint && npm run build` (and `npm test` once
   `TASK-003` lands a test runner), commit, push to `mlino_platform`.
   Write `REVIEW_RESULT.md` in the Inbox stating "Applied in commit
   `<sha>`". Move the entry through `APPROVED.md` → `MERGED.md`. Update
   `.ai/CURRENT_SPRINT.md`, `STATUS.md`, `CHANGELOG.md`,
   `.ai/PROJECT_STATE.md`. Assign the engineer's next task in
   `.ai/engineers/<name>.md`.

## What Univestar never does in an Inbox repo

Never write or modify anything in an Inbox repo except `REVIEW.md` and
`REVIEW_RESULT.md`. Never push code there. Never delete an engineer's
patch file, even a rejected one — it's their record, leave it as-is.
