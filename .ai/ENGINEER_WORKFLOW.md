# Engineer Workflow

> This is the single source of truth for how engineering work happens
> on MLINO. Every engineer — human or AI — reads this before starting
> any task. If any other document conflicts with this one on process
> (not on architecture — `docs/ADR/` still wins on architecture), this
> document wins; fix the other document to match.

## 1. Team Roles

### Univestar
Chief Architect, Tech Lead, Integrator, and Release Manager. Owns
`mlino_platform` exclusively — the only role permitted to push to it.
Responsibilities: sprint planning, task decomposition, architecture
protection, reviewing every submission, integration, CI/CD, technical
documentation, risk detection, dependency management, keeping
`.ai/PROJECT_STATE.md` / `.ai/CURRENT_SPRINT.md` / `STATUS.md` /
`CHANGELOG.md` synchronized with reality. Never implements feature code
unless explicitly asked. Never redefines product vision or business
goals — executes the founder's vision through engineering.

### PGSPC
Engineering Foundations workstream. Owns test coverage and backend auth
hardening. Submission Repository: `mlino_pgspc`. Full brief:
`.ai/engineers/PGSPC.md`.

### Amin (AMINANSARCOM)
Collaboration Features workstream. Owns multi-organization membership,
invites, and role enforcement. Submission Repository: `mlino_amin-`.
Full brief: `.ai/engineers/AMINANSARCOM.md`.

### Sadaf (SADAF)
Chat Experience workstream. Owns LLM observability, conversation
search, and streaming. Submission Repository: `mlino_sadaf-`. Full
brief: `.ai/engineers/SADAF.md`.

Every engineer role shares the same constraints: work only on assigned
tasks, submit only through your own Submission Repository, never touch
`mlino_platform` or another engineer's repository, never invent work
outside your task files (propose a new task instead).

---

## 2. Repository Structure

**Main Repository** — [`mlino_platform`](https://github.com/aminansaricom-bot/mlino_platform).
The only production repository. Only Univestar pushes here.

**Submission Repositories** — one per engineer, submission-only, not
forks: `mlino_pgspc`, `mlino_amin-`, `mlino_sadaf-`. Structure and
convention: `.ai/SUBMISSION_WORKFLOW.md`.

**Review Flow:** engineer pushes `submissions/TASK-XXX/` to their own
Submission Repository → Univestar pulls it → reviews against this
document's §8 → writes `REVIEW_RESULT.md` (the only file Univestar
writes in a Submission Repository) with verdict **APPROVED** or
**CHANGES REQUESTED**.

**Merge Flow:** on **APPROVED**, Univestar copies the submitted files
into a local `mlino_platform` checkout at their real paths, validates
(§7), commits, pushes directly to `mlino_platform@main` — there is no
PR-merge step on `mlino_platform` itself; Univestar's push *is* the
merge. Tracked live in `.ai/reviews/REVIEW_QUEUE.md` →
`APPROVED.md`/`CHANGES_REQUESTED.md` → `MERGED.md`.

---

## 3. Before Starting Any Task

Every engineer must, in order:

1. Pull the latest `mlino_platform` (read-only clone — never push here).
2. Read `.ai/CURRENT_SPRINT.md`.
3. Read `.ai/PROJECT_STATE.md` — ground truth of what exists today.
4. Read your assigned task file in full
   (`.ai/sprints/sprint-01/tasks/<you>/TASK-XXX-*.md`).
5. Read every ADR in `docs/ADR/` relevant to the files you're about to
   touch — an `Accepted` ADR is a constraint, not a suggestion; a
   `Proposed` ADR means "evaluated and deliberately not built," not
   "safe to build anyway."
6. **Never modify the Main Repository directly.** Work happens in your
   own clone/checkout, submitted via your Submission Repository.

If any of these disagree with each other, `mlino_platform`'s actual code
is the ground truth over any document, and `.ai/PROJECT_STATE.md` is the
most-current doc — flag the drift in your `REPORT.md` rather than
guessing.

---

## 4. Branch Naming

Standard convention (used in your own local clone of `mlino_platform`
before generating a submission — the branch never gets pushed anywhere,
it's local scaffolding for your own diffing/history):

```
<type>/<task-id>-<short-slug>
```

| Type | Use |
|---|---|
| `feat` | New capability |
| `fix` | Bug fix |
| `test` | Tests only, no behavior change |
| `docs` | Documentation only |
| `chore` | Tooling, config, dependency changes |
| `refactor` | No behavior change, internal restructuring |

**Examples:**
- `test/3-auth-org-coverage`
- `feat/6-org-invites`
- `feat/9-streaming-chat`

---

## 5. Commit Message Convention

[Conventional Commits](https://www.conventionalcommits.org/), same as
`CONTRIBUTING.md` already specifies for `mlino_platform` itself:

```
<type>(<scope>): <short summary>

<body — what and why, wrap at ~72 chars>

Closes #<issue-number>
```

**Examples:**
```
test(api): add unit tests for AuthService and OrganizationsService.assertMember

Closes #3
```
```
feat(organizations): add invite flow for multi-member organizations

Closes #6
```

One concern per commit. Don't mix a refactor with a feature in the
commit history you submit — Univestar reviews the history, not just the
final diff.

---

## 6. Submission Rules

Every task submission, without exception, must include:

- **`PROJECT_STATE.md`** (at your Submission Repository's root) updated
  to reflect the new Current Task / Status / Last Update / Notes.
- **`REPORT.md`** inside `submissions/TASK-XXX/` — what changed, why,
  and how it was verified locally (paste real lint/build/test output,
  not a claim that it passed).
- **Required repository structure** — exactly
  `submissions/TASK-XXX/<modified files, at their real mlino_platform
  path>` plus `REPORT.md` in that same folder. No `.patch`, `.diff`, or
  zip files, ever — see `.ai/SUBMISSION_WORKFLOW.md`.
- One task per submission. If a task is too big to review in one
  sitting, it's too big — split the task, don't split the submission.

---

## 7. Definition of Done

A task is complete only if **all** of the following are true:

- [ ] Code builds (`npm run build`, relevant workspace).
- [ ] Lint passes (`npm run lint`).
- [ ] Tests pass (`npm test --workspace=apps/api`, once applicable to
      the files touched).
- [ ] Documentation updated (`docs/ADR/` if an architecture decision was
      made, `docs/` if API/database/business behavior changed).
- [ ] `PROJECT_STATE.md` (Submission Repository's own) updated.
- [ ] `REPORT.md` completed with real, pasted verification output.
- [ ] Submitted to your own Submission Repository in the required
      structure.

None of these are optional. A submission missing any of them is
automatic **CHANGES REQUESTED** (§8) without a deeper review.

---

## 8. Review Process

Univestar's review, every submission, every time:

1. Pull `mlino_platform` + the submitting engineer's Submission
   Repository.
2. Detect the new/updated `submissions/TASK-XXX/` folder.
3. Compare submitted files against the corresponding real paths in
   `mlino_platform` (diff each file).
4. **Required validation** — independently re-run, never just trust the
   `REPORT.md`: apply the submitted files to a clean local checkout,
   `npm install` if dependencies changed, `npm run lint`, `npm run
   build`, `npm test --workspace=apps/api` where relevant.
5. **Architecture review** — does this belong where it was placed? Does
   it respect module boundaries (`.ai/ARCHITECTURE.md`-equivalent
   content in `docs/architecture/`)?
6. **Security review** — multi-tenancy scoping intact
   (`OrganizationsService.assertMember` pattern), no secrets committed,
   no new attack surface introduced without justification.
7. **Code quality review** — readability, no unnecessary abstraction,
   matches `.ai/CODING_RULES.md`-equivalent conventions already in the
   codebase.
8. **ADR compliance** — does not contradict any `Accepted` ADR; if it
   proposes a new architectural direction, that belongs in a new ADR,
   not smuggled into a feature submission.
9. **Roadmap consistency** — matches the task's stated scope in
   `.ai/ROADMAP.md` / the task file; does not silently expand scope.
10. **Task completion** — every acceptance-criteria checkbox in the task
    file is genuinely satisfied, not just claimed.

**Acceptance criteria (to reach APPROVED):** all ten checks above pass,
independently re-verified, no unresolved concern.

**Rejection criteria (→ CHANGES REQUESTED):** any of — validation fails
when independently re-run; scope creep beyond the task; a multi-tenancy
scoping gap; contradicts an `Accepted` ADR; missing `PROJECT_STATE.md`
or `REPORT.md` update; code quality issue that would create technical
debt if merged as-is. `REVIEW_RESULT.md` must explain every required
modification specifically enough that the engineer doesn't have to
guess (see the standard set in the `TASK-003` review as an example of
the expected level of detail).

---

## 9. Merge Process

Merge into `mlino_platform` happens **only** when:

- Review verdict is **APPROVED** (§8), written in `REVIEW_RESULT.md`.
- Independent validation (lint/build/test) passed in Univestar's own
  checkout, not just in the engineer's report.
- The change doesn't conflict with work merged since the submission was
  generated (Univestar rebases/reconciles if `main` has moved — see §13
  if this involves reconciling against another engineer's work).

On merge: Univestar commits with the engineer's authorship intent
preserved in the commit body (task, engineer, what changed), pushes
directly to `mlino_platform@main`, updates `.ai/CURRENT_SPRINT.md`,
`STATUS.md`, `CHANGELOG.md`, `.ai/PROJECT_STATE.md`, moves the entry to
`.ai/reviews/MERGED.md`, closes the corresponding GitHub Issue, and
assigns the engineer's next task in `.ai/engineers/<name>.md`.

---

## 10. Coding Standards

- **General:** TypeScript, strict mode. Simplicity, maintainability,
  readability, modularity over cleverness. YAGNI — don't build for a
  hypothetical future requirement (`.ai/CONSTITUTION.md`-equivalent
  principles already established for the `malino-17tir` sibling project
  apply here in spirit: Small Core, no unnecessary abstractions, no
  premature optimization).
- **Architecture rules:** routes/controllers handle HTTP concerns only;
  business logic lives in services; multi-tenancy scoping
  (`assertMember`-style checks) is non-negotiable on every query
  touching organization-scoped data; no new top-level dependency without
  checking it's not already solvable with what's installed; no new
  framework or paradigm introduced inside a feature submission — that's
  an ADR first.
- **Documentation rules:** a structural change ships with its
  `.ai/PROJECT_STATE.md` update in the same submission; an architecture
  decision ships with an ADR (`docs/ADR/`, `Proposed` unless Univestar
  marks it `Accepted`); no aspirational documentation — if it's not
  built, it belongs in `.ai/ROADMAP.md`, not in a doc describing current
  behavior as fact.

---

## 11. Forbidden Actions

Engineers must never:

- Push directly to the Main Repository (`mlino_platform`).
- Merge their own work.
- Modify another engineer's Submission Repository.
- **Resolve a merge conflict involving another engineer's work** — see
  §13. Only revise your own submission; conflicts across submissions
  are Univestar's job, not yours.
- Ignore ADRs.
- Skip `PROJECT_STATE.md` updates.
- Skip `REPORT.md` updates.

Violating any of these is grounds for automatic **CHANGES REQUESTED**
regardless of code quality.

---

## 12. Continuous Development Cycle

```
Task
  ↓
Implementation      (in your own local clone, never in mlino_platform directly)
  ↓
Validation           (lint, build, test — all real, all local, all before submitting)
  ↓
Submission            (submissions/TASK-XXX/ + REPORT.md, pushed to your Submission Repository)
  ↓
Review                (Univestar: independent re-validation + the 10-point check in §8)
  ↓
Merge                 (Univestar pushes to mlino_platform@main, only on APPROVED)
  ↓
Next Task              (assigned in .ai/engineers/<you>.md — you never assign yourself work)
```

This cycle repeats for every task, for every engineer, for the life of
the project. No step is skipped, no step is reordered, regardless of
urgency.

---

## 13. Merge Conflict Resolution

**Only Univestar is allowed to resolve merge conflicts between engineer
submissions. Engineers must never resolve conflicts involving work from
another engineer.**

This matters specifically because two engineers can legitimately be
assigned independent tasks that happen to touch the same physical file
(e.g. two unrelated Prisma models both added to
`apps/api/prisma/schema.prisma` — the first confirmed real case of this
was TASK-005/TASK-006 in Sprint 1, see `.ai/CURRENT_SPRINT.md`).
Independent tasks are not always independent files.

**Why engineers never touch this themselves:** an engineer only has
visibility into their own Submission Repository — they cannot see
another engineer's in-flight, unmerged work, so they are structurally
unable to resolve a conflict against it correctly even if they wanted
to. Only Univestar, who reviews and integrates every submission, has
visibility into all of them at once.

**What this means in practice:**

- If your submission's diff no longer applies cleanly because
  `mlino_platform@main` has moved since you generated it (whether from
  another engineer's merged work or otherwise), that is expected and
  not an error on your part — do not attempt to manually patch around
  it or guess at the current state of a file you don't own this sprint.
- Your job is only ever to revise **your own submission** — if
  requested changes are unrelated to a conflict, just make them. If
  Univestar's review explains that reconciliation with another
  engineer's work is needed, that reconciliation happens on Univestar's
  side during integration, not yours.
- Univestar performs all manual reconciliation: pulling the current
  state of `mlino_platform@main`, applying each submission's intended
  change against it in turn, and verifying (lint/build/test) after
  reconciliation, not just after each individual submission in
  isolation.
- See `.ai/SUBMISSION_WORKFLOW.md` for the full mechanics of how this is
  handled during integration.
