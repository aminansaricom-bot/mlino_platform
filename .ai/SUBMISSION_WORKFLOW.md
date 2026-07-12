# SUBMISSION_WORKFLOW.md

How work moves from an engineer to `mlino_platform`. This is the
**final** architecture for the Submission Repository model — it supersedes the earlier
`.patch`-file convention (`PATCH_WORKFLOW.md`, retired). No `.patch` or
diff files are used anywhere in this workflow anymore.

## Repositories

| Repo | Owner | Purpose |
|---|---|---|
| `mlino_platform` | Univestar only | Main repo — the actual product. |
| `mlino_pgspc` | `PGSPC` | Submission Repository for `PGSPC`. |
| `mlino_amin-` | `AMINANSARCOM` | Submission Repository for `AMINANSARCOM`. |
| `mlino_sadaf-` | `SADAF` | Submission Repository for `SADAF`. |

(Note: real repo names carry a trailing `-` — `mlino_amin-` /
`mlino_sadaf-`, not `mlino_amin` / `mlino_sadaf`.)

## Submission Repository structure

Each engineer's Submission Repository root:

```
mlino_<engineer>/
├── PROJECT_STATE.md          engineer's own view: Engineer / Current Task /
│                             Status / Last Update / Notes (see the template
│                             every Submission Repository was initialized with)
├── submissions/
│   └── TASK-XXX/
│       ├── REPORT.md          what changed, why, how it was verified locally
│       └── <modified files>   only the files that changed, at their real
│                               project path, e.g.:
│                               apps/api/src/chat/llm-gateway.service.ts
├── docs/                     optional — supporting docs a submission needs
│                             (e.g. an ADR draft, an architecture proposal)
└── REVIEW_RESULT.md           written by Univestar only — do not edit
                              (states APPROVED or CHANGES REQUESTED,
                              with full explanation either way)
```

- One `submissions/TASK-XXX/` folder per task — still one task per
  submission, same rule as before, just no `.patch` file: the engineer
  commits the actual changed files, preserving their real path relative
  to the `mlino_platform` repo root (e.g. a change to
  `apps/api/src/chat/llm-gateway.service.ts` lives at
  `submissions/TASK-008/apps/api/src/chat/llm-gateway.service.ts` in the
  Submission Repository).
- Only modified files go in — not a full repo copy. If `TASK-008` only
  touches one file, `submissions/TASK-008/` contains exactly that one
  file (at its real path) plus `REPORT.md`.
- `REPORT.md` per task states: what changed, why, and how it was
  verified locally (lint/build/test output).
- Top-level `PROJECT_STATE.md` is the engineer's own
  running status — not to be confused with `mlino_platform`'s
  `.ai/PROJECT_STATE.md`, which is Univestar's.

## Review pipeline (Univestar)

Tracked live in `.ai/reviews/REVIEW_QUEUE.md` → `APPROVED.md` /
`CHANGES_REQUESTED.md` → `MERGED.md`, same board as before, now fed by
submissions instead of patches:

1. Pull `mlino_platform` + all three Submission Repositories.
2. Detect new `submissions/TASK-XXX/` folders not yet reviewed.
3. Compare the submitted files against the corresponding paths in
   `mlino_platform` (diff each file at its real project path).
4. Full review checklist: `.ai/ENGINEER_WORKFLOW.md` §8 — independent
   re-validation (never just trust `REPORT.md`), architecture, security,
   code quality, ADR compliance, roadmap consistency, task completion.
   Not restated here to avoid the two documents drifting apart; if
   you're looking for the checklist itself, that's the one place it
   lives.
5. **Approved** → copy the submitted files into a local
   `mlino_platform` checkout at their real paths, run
   `npm run lint && npm run build && npm test --workspace=apps/api`, commit, push to `mlino_platform`. Update
   `.ai/CURRENT_SPRINT.md`, `STATUS.md`, `CHANGELOG.md`,
   `.ai/PROJECT_STATE.md`. Write `REVIEW_RESULT.md` in the Submission
   Repository stating **APPROVED**, the integration commit sha, and any
   review notes. Assign the engineer's next task in
   `.ai/engineers/<name>.md`.
6. **Changes requested** → write `REVIEW_RESULT.md` in the Submission
   Repository stating **CHANGES REQUESTED** and explaining exactly what
   must change, one point per required modification. Move the entry to
   `.ai/reviews/CHANGES_REQUESTED.md`. Engineer does not get a new task
   until resolved — they update their `submissions/TASK-XXX/` folder in
   place and it re-enters the queue.

Every review ends with one of exactly two verdicts written into
`REVIEW_RESULT.md`: **APPROVED** or **CHANGES REQUESTED**.

## What Univestar never does in a Submission Repository

Never write or modify anything there except `REVIEW_RESULT.md`. Never
push code there. Never delete or edit an engineer's
`submissions/TASK-XXX/` folder, even after integrating it — it's their
historical record.

## Docs-only contributions (no code, no PR)

Everything above assumes a code task. When an engineer's current work
is documentation/architecture-only (e.g. a paused workstream reassigned
to architecture review — see `.ai/engineers/SADAF.md`), the same
discipline still applies, scoped down:

- Documents go under `docs/` at the Submission Repository root, not
  loose at the repo root and not in `submissions/` (that's for code
  tasks with a `TASK-XXX` number).
- `PROJECT_STATE.md` still gets updated — "Current Task" can name the
  document, not just a `TASK-XXX` id.
- Commit through git with a real, Conventional-Commits message (`docs:
  ...`) — not a web-UI drag-and-drop upload, which produces an
  unreviewable generic commit message and is where duplicate/mangled
  filenames (a trailing `" (1)"`, etc.) tend to come from.
- Univestar still reviews it and still writes a `REVIEW_RESULT.md` —
  lighter than a code review (no lint/build/test to run), but still a
  real verdict, not a silent pass-through.

(This section exists because it didn't before — found missing during
the 2026-07-12 audit, after a real docs contribution landed without any
convention to follow.)
