# SPRINT_PLAN.md

> Sequencing lives here; the permanent map lives in
> `PRODUCT_ROADMAP.md` and `FEATURE_TREE.md`. This document moves,
> those don't (much).

## Sprint 0 — Engineering Foundations (done)

MVP scaffold, CI, labels/milestones/issues, Submission Repository
model, `.ai/ENGINEER_WORKFLOW.md`. Not product work — this built the
ability to *do* product work safely with multiple engineers/agents.
Complete.

## Sprint 1 — currently in flight (unchanged by this document)

This document does not modify Sprint 1's live assignments — that
requires the explicit approval step named at the end of this document,
not a planning doc. For the record, current state as of this writing:

- `PGSPC` — TASK-003 (tests) and TASK-005 (auth hardening) merged.
  Engineering Foundations milestone complete. No new task assigned yet.
- `AMINANSARCOM` — TASK-006 (org invites, Domain 10 / Organizations) in
  progress. TASK-007 (roles, Domain 10 / Permissions) queued after it.
- `SADAF` — paused on TASK-008/009/010 pending Git-based development
  reopening for that workstream (standing direction, unrelated to this
  vision reset). **Reframed, not changed:** these three tasks map
  directly onto Domain 1 epics (TASK-008 → tooling supporting
  Conversation Engine observability, TASK-009 → Conversation Engine's
  Streaming epic, TASK-010 → Conversation History's persistent-search
  epic) — when this workstream resumes, it resumes *as* the start of
  Domain 1 work, not as separate legacy tasks.

## Sprint 2 — proposed: "AI Core, Wave 1" 🟢

**This is the sprint the vision reset is asking for** — the first one
scheduled entirely around Domain 1 (AI Core), with one Domain 2
(Business Brain) feature included as the proof-of-concept that the
whole philosophy actually works end-to-end.

**Not started. Proposed only — no Issues, Milestones, or engineer
files touched yet.** Per the vision reset's own instructions: *"After
these documents are approved, generate the engineering prompts for
PGSPC, AMINANSARCOM and SADAF."* This section is that proposal, pending
your approval.

### Epics selected for Wave 1

From **Domain 1 — AI Core**:
1. Conversation Engine → Streaming responses (already scoped as
   TASK-009 — carried forward, not redone)
2. Conversation History → Persistent, searchable history (already
   scoped as TASK-010 — carried forward, not redone)
3. Memory → Structured business memory (new — replaces the naive
   per-partner log)
4. Business Context → Live business-data context injection + scoping
   (new)
5. Tool Calling → Tool registry & execution framework generalization
   (new — evolves the existing tool-loop pattern)
6. Prompt Framework → Centralized, versioned system-prompt management
   (new)

From **Domain 2 — Business Brain** (minimum slice, per
`PRODUCT_ROADMAP.md`):
7. Executive Daily Brief → Daily brief generation (new — this is the
   literal "Good morning" first screen from `VISION.md`, and the
   clearest possible demonstration that Domain 1 + a thin slice of
   Domain 2 together deliver the new philosophy, not just a promise of
   it)

### Why this set and not more

Six Domain 1 epics + one Domain 2 epic is deliberately small for a
"maximize AI capability" sprint. Reasoning: the Executive Daily Brief
epic needs real signals to summarize (health score, risk, profit,
etc.) — pulling in more of Domain 2 now would mean building Business
Brain *ahead* of Domain 1 being solid enough to deliver it
conversationally, inverting the vision's own sequencing logic. Wave 1
proves the shape works with the smallest real slice; Wave 2 (not
planned yet) expands Domain 2 once Wave 1 ships.

### Not in Wave 1 (explicitly deferred, not forgotten)

Reasoning, Recommendations, and Business Actions (Domain 1) all depend
on Tool Calling and Business Context landing first — same "don't build
ahead of the layer below it" discipline. Voice-Ready Architecture is a
constraint on how Wave 1 is built (don't foreclose it), not a
deliverable of Wave 1 itself.

## Beyond Sprint 2

Not planned at task level. `PRODUCT_ROADMAP.md`'s 🟡 **Next** tier
(Domains 3, 4, 6, 5 in that rough order) is the candidate pool for
Sprint 3 onward, re-evaluated after Wave 1 ships rather than
pre-committed now.
