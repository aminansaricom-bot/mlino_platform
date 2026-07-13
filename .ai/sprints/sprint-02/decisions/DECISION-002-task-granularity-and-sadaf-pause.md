# DECISION-002: Sprint 2 task granularity and SADAF's pause

**Date:** 2026-07-12
**Status:** Accepted

## Context

`docs/product/TASK_BREAKDOWN.md` proposes 5 new Wave 1 features
(Memory, Business Context, Tool Calling, Prompt Framework, Executive
Daily Brief), each listing multiple owners (Backend + AI, and for the
Daily Brief also Frontend). `.ai/ENGINEER_WORKFLOW.md`'s submission
model requires one task = one engineer = one submission — it has no
concept of a multi-owner task.

Separately: `SADAF` is the AI owner on all 5 features, but her code
tasks are still paused (per standing direction from the 2026-07-12
Sprint 1 kickoff, unrelated to Vision 2.0) pending Git-based
development reopening for her workstream. Four of the five features
also need `PGSPC` for backend infra, and one needs `AMINANSARCOM` for
frontend.

## Decision

1. **Split each multi-owner feature into per-engineer task files.**
   GitHub Issues #12–#16 stay at feature granularity (matching
   `TASK_BREAKDOWN.md`'s PROP-TASK-103–107 1:1) since an Issue isn't
   required to map to one submission. The `.ai/sprints/sprint-02/tasks/`
   files underneath each Issue are split per engineer:
   - `TASK-103a` (PGSPC) / `TASK-103b` (SADAF) — Memory
   - `TASK-104a` (PGSPC) / `TASK-104b` (SADAF) — Business Context
   - `TASK-105a` (PGSPC) / `TASK-105b` (SADAF) — Tool Registry
   - `TASK-106a` (PGSPC) / `TASK-106b` (SADAF) — Prompt Framework
   - `TASK-107a` (PGSPC) / `TASK-107b` (AMINANSARCOM) / `TASK-107c`
     (SADAF) — Executive Daily Brief
2. **`SADAF`'s `*b`/`107c` tasks are added to her engineer file as
   queued, not started.** Her pause is not lifted by this decision —
   that requires an explicit instruction, not an inference from Sprint
   2 existing. If Sprint 2 genuinely needs her sooner, that's a
   separate decision to make explicitly, not one to default into here.
3. **`PGSPC` gets one task at a time**, per the one-task rule — her
   `Assigned Tasks` list shows all four `*a` tasks in intended order,
   but only the first (`TASK-103a`) is marked ready to start now.
4. **`AMINANSARCOM`'s `TASK-107b` is queued after her current
   TASK-006/007**, not started now — she's still mid-Sprint-1 work.

## Consequences

- Backend infra for Wave 1 (Memory, Context, Tools, Prompt storage) can
  proceed now via `PGSPC`, independent of SADAF's pause.
- The AI-logic half of each feature (extraction rules, relevance
  selection, tool contracts, prompt content, brief generation) will sit
  queued and unstarted until SADAF's workstream reopens — Wave 1 cannot
  fully complete without that, which is expected and visible, not
  hidden.
- If this bottleneck becomes a real problem, the fix is an explicit
  decision to reopen SADAF's workstream (or reassign the AI-logic
  pieces), not a silent one.
