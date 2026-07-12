# Engineer: SADAF

> Single entry point. No chat instructions required — this file plus
> its linked task files are everything you need. If you have zero prior
> context, also read `.ai/RESUME.md` first.
>
> Note: this workstream was previously planned under a placeholder name
> `LUGH`. See
> `.ai/sprints/sprint-01/decisions/DECISION-001-engineer-roster-change.md`
> — scope and tasks are unchanged, only the owner name changed.

## Current Mission

⏸️ **Paused (as of 2026-07-12):** code tasks (TASK-008/009/010, Chat
Experience — observable, searchable, responsive chat) are on hold until
Git-based development is opened up for this workstream. Current focus
instead: **AI architecture and documentation** — reviewing and improving
`docs/ai/`-equivalent content, `docs/ADR/` entries touching the AI
assistant/LLM gateway, and keeping this workstream's task files accurate
and ready to resume the moment code submission opens back up.

## Current Sprint

`sprint-01` — see [`.ai/sprints/sprint-01/README.md`](../sprints/sprint-01/README.md).

## Submission Repository

`mlino_sadaf-` — initialized and ready (`README.md`, `PROJECT_STATE.md`,
`submissions/`, `reports/`, `docs/`), but not yet in active use for this
workstream — see Current Mission above. See `.ai/SUBMISSION_WORKFLOW.md`
for the exact submission convention when code work resumes: one
`submissions/TASK-XXX/` folder per task, containing only the modified
files (preserving their real project path) plus `REPORT.md`. No
`.patch`/`.diff`/zip files.

## Assigned Tasks

**Paused (code, resume when Git-based development opens for this
workstream):**
1. [`TASK-008-llm-observability.md`](../sprints/sprint-01/tasks/SADAF/TASK-008-llm-observability.md) — not started, on hold
2. [`TASK-010-conversation-search.md`](../sprints/sprint-01/tasks/SADAF/TASK-010-conversation-search.md) — not started, on hold
3. [`TASK-009-streaming-chat.md`](../sprints/sprint-01/tasks/SADAF/TASK-009-streaming-chat.md) — not started, on hold, ship last by design once resumed

**Active now:** AI architecture and documentation review (no task file
yet — first deliverable is proposing one, scoped to real gaps found in
`docs/ai/` and AI-related ADRs, not speculative work).

## Current Priority

Documentation/architecture review is the only active work right now.
Once resumed, sequencing stays: TASK-008 and TASK-010 (Low complexity,
quick wins) before TASK-009 (Medium, the largest task in this
workstream).

## Business Goal

Nobody can currently answer "how much is chat costing us" or "which
provider is slower," conversation history stops being usable once it
grows past a quick scroll, and a silent multi-second wait for a reply
reads as broken to a user. These three tasks close those three gaps.

## Context

`LlmGatewayService` has no logging of cost/latency; `GET /conversations`
has no content search; `/chat` is request/response only, no streaming.
Full picture: `.ai/PROJECT_STATE.md`. `docs/ADR/` already evaluated and
deferred adopting a full LLM gateway library — TASK-008 is the "plain
logging" alternative that decision called for, not a reason to revisit
it.

## Files To Modify

- `apps/api/src/chat/llm-gateway.service.ts` (TASK-008, TASK-009)
- `apps/api/src/chat/chat.service.ts` (TASK-009, TASK-010)
- `apps/api/src/chat/chat.controller.ts` (TASK-009, TASK-010)
- `apps/web/src/pages/chat.tsx` (TASK-009, TASK-010)
- `apps/web/src/lib/api.ts` (TASK-009, only if streaming needs a
  different fetch helper)

**Do not modify:** anything under `apps/api/src/auth/`,
`apps/api/src/organizations/`, or `apps/web/src/pages/dashboard.tsx`.

## Acceptance Criteria

See each task file's own Acceptance Criteria section — TASK-008,
TASK-010, and TASK-009 each have a full checklist. Do not consider a
task done until every box in its own file is checked.

## Definition of Done

Per task, plus at the engineer level: all three tasks' PRs merged, CI
green, `.ai/PROJECT_STATE.md` updated if the `/chat` response contract
changes (it will, for streaming) or a new dependency is added.

## Remaining Work

All three code tasks (TASK-008/009/010) — none started, all paused. AI
architecture and documentation review — not yet scoped into a task file.

## Next Immediate Action

Code tasks are paused — do not start `TASK-008` yet. Current next
action: review `docs/ai/` and AI-related ADRs for real (not
speculative) gaps, propose findings. When code development reopens for
this workstream, resume here: start `TASK-008-llm-observability.md` —
smallest, ship it first to build momentum before the bigger streaming
task. Open a PR titled
`feat(chat): log provider, latency, and token usage for every LLM call`.

## Current Blockers

Not blocked, but **paused by decision, not by a technical blocker**:
code tasks on hold until Git-based development is opened up for this
workstream (per Engineering Lead direction, 2026-07-12). Submission
Repository (`mlino_sadaf-`) is fully initialized and ready whenever
that changes.

## Expected Pull Request

- TASK-008: `feat(chat): log provider, latency, and token usage for every LLM call`
- TASK-010: `feat(chat): add conversation search by message content`
- TASK-009: `feat(chat): stream AI replies via SSE with mock-provider fallback`

## Rules

- Follow `CONTRIBUTING.md` for branching/commit/PR format.
- `npm run lint` and `npm run build` must pass before requesting review.
- Do not adopt a full LLM gateway library for observability — see
  Context above.
- Multi-tenancy rule is non-negotiable — search must be scoped to the
  organization, never global.
- One task, one PR at a time — do not start your next task while a PR is in `.ai/reviews/REVIEW_QUEUE.md` or `.ai/reviews/CHANGES_REQUESTED.md`.
- Never invent work outside your assigned tasks. If you find something
  that needs doing, propose a new task file or flag it in
  `.ai/sprints/sprint-01/reports/` — don't just do it.
