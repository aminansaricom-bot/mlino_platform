# CHANGES_REQUESTED.md

> Submission unit is a **task folder** (`submissions/TASK-XXX/`) in an engineer's Submission Repository, not a direct PR on `mlino_platform` and not a `.patch` file. See `.ai/SUBMISSION_WORKFLOW.md` for the full mechanism. Column names below say "PR #" for historical continuity — read it as "Submission (TASK-XXX) #", and "Branch" as "Submission Repository path".

Every Pull Request that needs modification before it can be approved.
The engineer does not start a new task while their PR is here — see the
engineering rule in `REVIEW_QUEUE.md`. Entries move back to
`REVIEW_QUEUE.md` once the engineer pushes an update and re-requests
review, then follow the normal path from there.

## Awaiting changes

_Empty — nothing currently blocked on requested changes._

| PR # | Engineer | Task | Requested At | Required Changes |
|---|---|---|---|---|
| — | — | — | — | — |

## Entry format

```
| #N | ENGINEER | TASK-NNN-slug | YYYY-MM-DD | - specific change 1 <br> - specific change 2 |
```

Required Changes must be specific and actionable — "improve error
handling" is not a valid entry, "return 404 instead of 500 when the
organization doesn't exist, see OrganizationsController.list" is.
