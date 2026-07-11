# Engineer: SADAF

> This file is your single entry point. You do not need chat
> instructions — everything you need is linked from here or from the
> task files it points to.
>
> Note: this workstream was previously assigned to a placeholder name
> `LUGH` in an earlier planning pass. See
> `.ai/sprints/sprint-01/decisions/DECISION-001-engineer-roster-change.md`
> — scope and tasks are unchanged, only the owner name changed.

## Current Mission

Make the chat surface production-grade: observable, searchable, and
responsive.

## Current Sprint

`sprint-01` — see `.ai/sprints/sprint-01/`.

## Assigned Tasks

1. [`TASK-008-llm-observability.md`](../sprints/sprint-01/tasks/SADAF/TASK-008-llm-observability.md) — Priority: **Low**, ship first (cheap)
2. [`TASK-010-conversation-search.md`](../sprints/sprint-01/tasks/SADAF/TASK-010-conversation-search.md) — Priority: **Low**, ship second (cheap)
3. [`TASK-009-streaming-chat.md`](../sprints/sprint-01/tasks/SADAF/TASK-009-streaming-chat.md) — Priority: **Medium**, the real lift — ship last

## Next Task

`TASK-008-llm-observability.md` — smallest, ship it to build momentum
before the bigger streaming task.

## Priority

008 and 010 are Low complexity/priority — quick wins. 009 is Medium
priority but the largest task in this sprint; don't start it until 008
and 010 are merged.

## Dependencies

None on other engineers this sprint.

## Definition of Done

Per-task DoD is in each task file. At the engineer level: all three
tasks' PRs merged, CI green, `.ai/PROJECT_STATE.md` updated if the
`/chat` response contract changes (it will, for streaming) or a new
dependency is added.

## Known Blockers

None currently.

## Rules (apply to every task)

- Follow `CONTRIBUTING.md` for branching/commit/PR format.
- `npm run lint` and `npm run build` must pass before requesting review.
- Files you own this sprint: `apps/api/src/chat/**`,
  `apps/web/src/pages/chat.tsx`.
- Do not touch `apps/api/src/auth/**`, `apps/api/src/organizations/**`,
  or `apps/web/src/pages/dashboard.tsx`.
- Do not adopt a full LLM gateway library (LiteLLM or similar) for
  observability — already evaluated and deferred, see `docs/ADR/`.
  Plain logging is the scoped ask.
- Multi-tenancy rule is non-negotiable — search must be scoped to the
  organization, never global.
- Never invent work outside your assigned tasks — if you find something
  that needs doing, propose a new task file (or flag it in
  `.ai/sprints/sprint-01/reports/`), don't just do it.
