# CHANGES_REQUESTED.md

> Submission unit is a **task folder** (`submissions/TASK-XXX/`) in an engineer's Submission Repository, not a direct PR on `mlino_platform` and not a `.patch` file. See `.ai/SUBMISSION_WORKFLOW.md` for the full mechanism. Column names below say "PR #" for historical continuity — read it as "Submission (TASK-XXX) #", and "Branch" as "Submission Repository path".

Every Pull Request that needs modification before it can be approved.
The engineer does not start a new task while their PR is here — see the
engineering rule in `REVIEW_QUEUE.md`. Entries move back to
`REVIEW_QUEUE.md` once the engineer pushes an update and re-requests
review, then follow the normal path from there.

## Awaiting changes

| PR # | Engineer | Task | Requested At | Required Changes |
|---|---|---|---|---|
| — | PGSPC | TASK-005-auth-hardening | 2026-07-12 | - Apply the same atomic-claim pattern used in `refresh()` to `confirmPasswordReset()` (currently read-then-write, same race class already fixed elsewhere in this file) + add a test for it <br> - Add the `.env.example` update — claimed in REPORT.md's file list but not actually present in the submission |

## Entry format

```
| #N | ENGINEER | TASK-NNN-slug | YYYY-MM-DD | - specific change 1 <br> - specific change 2 |
```

Required Changes must be specific and actionable — "improve error
handling" is not a valid entry, "return 404 instead of 500 when the
organization doesn't exist, see OrganizationsController.list" is.
