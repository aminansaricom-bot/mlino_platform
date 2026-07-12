# RESUME.md

> If you are a brand new AI session (or human) with **zero conversation
> history**, this file alone is enough to continue MLINO engineering
> work immediately. Read this first, then follow the links.

## What MLINO is

An AI Business Partner platform. This repo (`mlino_platform`) is the
MVP: NestJS API (`apps/api`) + Next.js web (`apps/web`), Prisma +
PostgreSQL, npm-workspaces monorepo. Full detail: `.ai/PROJECT_STATE.md`.

## The operating model (read this even if you skip everything else)

**GitHub is the single source of truth.** Nobody — human or AI —
receives engineering instructions through chat. Everything needed to
work is in this repository:

1. **Are you an engineer with a name** (`PGSPC`, `AMINANSARCOM`,
   `SADAF`)? Go straight to `.ai/engineers/<YOUR_NAME>.md`. It has your
   mission, your tasks, your next immediate action, your blockers —
   everything. Do not wait for chat instructions. Do not invent work
   outside your assigned tasks — if you find something that needs
   doing, propose a new task or note it in
   `.ai/sprints/sprint-01/reports/`, don't just do it.

2. **Are you acting as Executive CTO** (engineering-org-wide
   coordination, not a single workstream)? Your job:
   - Read `.ai/PROJECT_STATE.md`, `.ai/CURRENT_SPRINT.md`, all three
     `.ai/engineers/*.md` files, `.ai/reviews/REVIEW_QUEUE.md`, and
     every open GitHub Issue/PR before doing anything.
   - Enforce the one-task rule: an engineer with a PR in
     `.ai/reviews/REVIEW_QUEUE.md` or `.ai/reviews/CHANGES_REQUESTED.md`
     does not get assigned a new task until it clears.
   - Keep `.ai/PROJECT_STATE.md`, `.ai/CURRENT_SPRINT.md`, and every
     `.ai/engineers/*.md` file continuously accurate — these are read
     by other sessions with no memory of this one.
   - Never redefine product vision or business goals — you execute the
     founder's vision through engineering, you don't set it.
   - Never let an engineer invent their own work.
   - Optimize for simplicity, maintainability, parallel development.
     Avoid duplicate work, architecture drift, overengineering.

## Where everything lives

```
.ai/
├── PROJECT_STATE.md      ground truth: what exists in the code right now
├── CURRENT_SPRINT.md      pointer to the active sprint
├── ROADMAP.md             what's explicitly not built yet, and why
├── RESUME.md              this file
├── engineers/             one file per engineer — their entry point
├── reviews/                CTO's live PR review board (queue/approved/changes-requested/merged)
└── sprints/sprint-01/
    ├── README.md          sprint index
    ├── tasks/<engineer>/  one standalone file per task
    ├── reviews/           detailed per-PR write-ups (status/queue is in .ai/reviews/ instead)
    ├── reports/           sprint-level status reports
    └── decisions/         sprint-scoped decisions (not architecture — see docs/ADR/)

docs/ADR/                  architecture decisions (durable, not sprint-scoped)
```

## Current state in one paragraph

Sprint Zero (MVP + engineering infra: 11 labels, 3 milestones, 8
Issues, green CI) is done, merged at `c864d5b`. Sprint 1 is active: 3
parallel workstreams, `PGSPC` (tests + auth hardening), `AMINANSARCOM`
(org invites + roles, sequential), `SADAF` (LLM observability → search →
streaming). No PRs have landed yet — every task is still in "not
started." GitHub Project board is blocked on a token permission (see
`STATUS.md`); everything else needed to execute Sprint 1 is unblocked.

## What a new session should do first

1. `git pull` — never assume the local checkout is current.
2. Read `.ai/CURRENT_SPRINT.md` → `.ai/sprints/sprint-01/README.md`.
3. Check GitHub for any open PRs/Issues opened since this file was last
   updated — GitHub, not this file, is the actual source of truth;
   this file is a map to it, not a replacement for checking it.
4. Proceed per your role (engineer or CTO) as described above.
