# Sprint 02 — AI Core, Wave 1

**Status:** Starting
**Milestone:** [Sprint 2 — AI Core, Wave 1](https://github.com/aminansaricom-bot/mlino_platform/milestone/5) (Issues #12–#16)
**Product basis:** `docs/product/VISION.md`, `PRODUCT_PRINCIPLES.md`,
`SPRINT_PLAN.md`, `TASK_BREAKDOWN.md` — this sprint executes
`TASK_BREAKDOWN.md`'s 7 proposed tasks, now approved.

## Task files (split per engineer — see DECISION-002)

| Feature | Issue | PGSPC (backend) | AMINANSARCOM (frontend) | SADAF (AI) |
|---|---|---|---|---|
| Streaming (carried from Sprint 1) | #9 | — | — | TASK-009 (existing, paused) |
| Search (carried from Sprint 1) | #10 | — | — | TASK-010 (existing, paused) |
| Memory | #12 | [TASK-103a](tasks/PGSPC/TASK-103a-memory-backend.md) | — | [TASK-103b](tasks/SADAF/TASK-103b-memory-ai.md) (paused) |
| Business Context | #13 | [TASK-104a](tasks/PGSPC/TASK-104a-context-backend.md) | — | [TASK-104b](tasks/SADAF/TASK-104b-context-ai.md) (paused) |
| Tool Registry | #14 | [TASK-105a](tasks/PGSPC/TASK-105a-tools-backend.md) | — | [TASK-105b](tasks/SADAF/TASK-105b-tools-ai.md) (paused) |
| Prompt Framework | #15 | [TASK-106a](tasks/PGSPC/TASK-106a-prompt-backend.md) | — | [TASK-106b](tasks/SADAF/TASK-106b-prompt-ai.md) (paused) |
| Executive Daily Brief | #16 | [TASK-107a](tasks/PGSPC/TASK-107a-brief-backend.md) | [TASK-107b](tasks/AMINANSARCOM/TASK-107b-brief-frontend.md) (queued after TASK-006/007) | [TASK-107c](tasks/SADAF/TASK-107c-brief-ai.md) (paused) |

## Sequencing within PGSPC's queue

`TASK-103a` → `TASK-104a` → `TASK-105a` → `TASK-106a` → `TASK-107a`, one
at a time, per the one-task rule. This order matches
`docs/product/SPRINT_PLAN.md`'s dependency reasoning (Memory and
Context are foundational; Tools and Prompt Framework build on the same
`ChatService`; Daily Brief is the integration point, done last).

## Why SADAF's tasks show "paused"

Her code-submission pause (set at Sprint 1 kickoff, unrelated to Vision
2.0) has not been lifted by this sprint starting — see
`decisions/DECISION-002-task-granularity-and-sadaf-pause.md`. Backend
infra work can and does proceed without her; the AI-logic half of each
feature waits.

## Directories

Same convention as `sprint-01/`: `tasks/<engineer>/`, `reviews/`
(detailed per-submission write-ups), `reports/`, `decisions/`.
Submission-status tracking (queue/approved/changes-requested/merged)
is cross-sprint at `.ai/reviews/`, not duplicated here.
