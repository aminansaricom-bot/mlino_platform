# MERGED.md

> Submission unit is a **task folder** (`submissions/TASK-XXX/`) in an engineer's Submission Repository, not a direct PR on `mlino_platform` and not a `.patch` file. See `.ai/SUBMISSION_WORKFLOW.md` for the full mechanism. Column names below say "PR #" for historical continuity — read it as "Submission (TASK-XXX) #", and "Branch" as "Submission Repository path".

Every merged Pull Request, permanent record — entries are never removed
from this file.

## Merged

| PR # | Engineer | Task | Merge Date | Commit |
|---|---|---|---|---|
| — (patch, grandfathered) | PGSPC | TASK-003-test-coverage | 2026-07-12 | see next commit on `main` |

## Entry format

```
| #N | ENGINEER | TASK-NNN-slug | YYYY-MM-DD | `abc1234` |
```

After adding an entry here: update `.ai/PROJECT_STATE.md` if the change
was structural, close the corresponding GitHub Issue if not already
closed, and assign the engineer's next task in
`.ai/engineers/<name>.md` (update Assigned Tasks, Remaining Work, Next
Immediate Action).
