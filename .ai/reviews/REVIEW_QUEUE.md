# REVIEW_QUEUE.md

Every open Pull Request waiting for review. Entries are removed from
here the moment a review verdict is reached — moved to `APPROVED.md`
(then `MERGED.md` after merge) or `CHANGES_REQUESTED.md`.

**Engineering rule:** while an engineer has a PR in this file, they do
not start another task. One task, one PR, reviewed before the next task
begins. See each `.ai/engineers/<name>.md` file's "Current Blockers" —
this queue is the reason a blocker like "PR #N awaiting review" would
appear there.

## Queue

_Empty — no PRs currently open._

| PR # | Engineer | Task | Branch | Status | Submitted At | Review Priority |
|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — |

## Entry format

```
| #N | ENGINEER | TASK-NNN-slug | branch-name | Awaiting review | YYYY-MM-DD | High/Medium/Low |
```

Review Priority defaults to the task's own priority (see the task file),
raised to High if the PR is blocking another engineer's integration
point (e.g. TASK-003 blocking `AMINANSARCOM`'s TASK-006/007).
