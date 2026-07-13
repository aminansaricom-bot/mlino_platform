# TASK_BREAKDOWN.md

> **Proposed only.** Nothing in this file has been turned into a real
> GitHub Issue, added to `.ai/sprints/`, or assigned in any
> `.ai/engineers/*.md` file. Per the vision reset's own sequencing:
> *"After these documents are approved, generate the engineering
> prompts for PGSPC, AMINANSARCOM and SADAF."* This document is the
> input to that step, not the step itself.
>
> Task-level detail exists only for Sprint 2 Wave 1 (7 epics, listed in
> `SPRINT_PLAN.md`). Every other Epic in `FEATURE_TREE.md` stays at
> Epic level until its own wave is proposed.

---

## PROP-TASK-101 — Streaming chat responses

**Epic:** Domain 1 / Conversation Engine / Streaming responses
**Status:** Already fully specified — this *is* the existing
`TASK-009-streaming-chat.md`, carried forward unchanged, not
duplicated here.

- **Backend owner:** SADAF (per existing task file — `apps/api/src/chat/**`)
- **Frontend owner:** SADAF (per existing task file — `apps/web/src/pages/chat.tsx`)
- **AI owner:** N/A — this is a transport-layer change (SSE), not a
  model-behavior change
- **Dependencies:** None
- **Acceptance Criteria:** see `TASK-009-streaming-chat.md` — unchanged
- **AI-first justification:** removes the multi-second silent wait that
  makes the conversational interface feel slower than a dashboard would
  — directly serves "conversation as the primary interface," not a
  cosmetic improvement

---

## PROP-TASK-102 — Conversation search

**Epic:** Domain 1 / Conversation History / Persistent, searchable history
**Status:** Already fully specified — this *is* the existing
`TASK-010-conversation-search.md`, carried forward unchanged.

- **Backend owner:** SADAF (per existing task file)
- **Frontend owner:** SADAF (per existing task file)
- **AI owner:** N/A — literal text search, not a model-behavior change
- **Dependencies:** None
- **Acceptance Criteria:** see `TASK-010-conversation-search.md` — unchanged
- **AI-first justification:** a Business Brain a user can't search the
  history of isn't trustworthy as a memory system — this is
  prerequisite trust infrastructure, not a nice-to-have

---

## PROP-TASK-103 — Structured business memory model

**Epic:** Domain 1 / Memory / Structured business memory

- **Backend owner:** PGSPC — new Prisma model(s) replacing the current
  flat `Memory` table (`content: String` per row) with categorized,
  queryable memory (e.g. `category`, `subjectType`/`subjectId`,
  `confidence`, `expiresAt`); service-layer CRUD.
- **Frontend owner:** None — infra-only, no direct UI surface in this
  task (a memory-browsing UI, if ever built, is a later Domain 9
  concern).
- **AI owner:** SADAF — defines what gets written to memory and when
  (extraction logic, replacing the current "store every user message
  verbatim" placeholder), and how memory is selected for injection into
  a prompt (ties into PROP-TASK-104).
- **Dependencies:** None blocking start; coordinates with PROP-TASK-104
  (Business Context) since both touch prompt-injection, but each can be
  implemented independently and integrated after.
- **Acceptance Criteria:**
  - [ ] New memory schema is additive (no data loss for existing rows —
        migration path defined)
  - [ ] Memory writes are categorized, not just raw message dumps
  - [ ] Retrieval supports filtering by category/subject, not just
        "most recent N"
  - [ ] Existing chat flow continues to work unchanged if this feature
        is toggled off (no hard coupling)
- **AI-first justification:** "Remember" is one of the five verbs in
  `VISION.md`'s Business Brain definition. The MVP's memory is a
  placeholder (explicitly flagged as naive in its own code comments) —
  this is the first real implementation, not a refinement.

---

## PROP-TASK-104 — Live business-data context injection

**Epic:** Domain 1 / Business Context / Live business-data context injection + scoping

- **Backend owner:** PGSPC — builds the context-assembly service that
  pulls current organization/partner state (not just chat history) into
  what gets sent to the LLM; enforces that context is always scoped to
  `req.clinicId`-equivalent (`organizationId`), same invariant as every
  other multi-tenant query in the codebase.
- **Frontend owner:** None — infra-only.
- **AI owner:** SADAF — decides *what* business data is relevant
  context for a given conversation turn (not "dump the whole database,"
  which would blow context-window budgets and add irrelevant noise).
- **Dependencies:** None blocking start. Natural pairing with
  PROP-TASK-103 (Memory) since both feed the same prompt-assembly step
  — recommend the same engineer/session handles integration of both,
  even if implemented as separate submissions.
- **Acceptance Criteria:**
  - [ ] Context assembly is a single, testable function/service — not
        scattered inline logic in `ChatService`
  - [ ] Multi-tenancy scoping test: a conversation in Organization A
        never receives Organization B's data, even under injected
        adversarial input
  - [ ] Context size is bounded (explicit token/character budget, not
        unbounded)
- **AI-first justification:** "Understand" is the first verb in the
  Business Brain definition — without real business data in context,
  every other Domain 1 epic (Reasoning, Recommendations, Actions) is
  reasoning over nothing. This is the load-bearing epic for the whole
  domain.

---

## PROP-TASK-105 — Tool registry & execution framework generalization

**Epic:** Domain 1 / Tool Calling / Tool registry & execution framework

- **Backend owner:** PGSPC — generalizes the current hardcoded tool
  loop (`MAX_TOOL_ROUNDS`, single tool-definitions array) into a
  registry pattern where tools can be added per-domain without editing
  `ChatService` itself.
- **Frontend owner:** None — infra-only.
- **AI owner:** SADAF — defines the tool-calling contract (schema
  format, error handling when a tool call is malformed, safety
  boundaries on what a tool is allowed to do without human
  confirmation).
- **Dependencies:** None. Independent of PROP-TASK-103/104, though all
  three eventually compose in the same `ChatService` call path —
  integration order doesn't matter, all three are additive.
- **Acceptance Criteria:**
  - [ ] Adding a new tool does not require modifying `ChatService`'s
        core loop — only registering the tool
  - [ ] Every tool execution is still scoped to the authenticated
        organization (no regression on the existing invariant)
  - [ ] Malformed tool calls fail safely (logged, not crashed)
- **AI-first justification:** Domain 2–6's entire value depends on the
  AI being able to *act*, not just describe. A hardcoded, single-file
  tool list doesn't scale past a handful of tools — this is the
  refactor that makes every future domain's "AI does X" epics actually
  buildable without touching core chat logic each time.

---

## PROP-TASK-106 — Centralized, versioned prompt framework

**Epic:** Domain 1 / Prompt Framework / Centralized, versioned system-prompt management

- **Backend owner:** PGSPC — storage/versioning infra (where prompts
  live, how a version is selected at runtime).
- **Frontend owner:** None — infra-only (an eventual prompt-editing UI
  is explicitly out of scope for this task; that's a Domain 10
  Configuration-style concern, not this one).
- **AI owner:** SADAF — owns actual prompt content and the evaluation
  criteria for what counts as a regression.
- **Dependencies:** None.
- **Acceptance Criteria:**
  - [ ] System prompts are no longer inline string literals scattered
        across service files
  - [ ] A prompt change can be attributed to a version (even minimally
        — a changelog entry is acceptable for this task; a full A/B
        framework is not required)
  - [ ] At least one basic evaluation check exists (e.g. a fixed set of
        test conversations that must still produce sane tool calls
        after a prompt change) — doesn't need to be sophisticated,
        needs to exist
- **AI-first justification:** every other Domain 1/2 epic changes
  prompt behavior. Without versioning, there's no way to know which
  prompt change caused a regression in Reasoning or Recommendations
  quality — this is testing infrastructure for a conversation-first
  product, not a nice-to-have.

---

## PROP-TASK-107 — Executive Daily Brief

**Epic:** Domain 2 / Executive Daily Brief / Daily brief generation
**This is the flagship task of Wave 1** — the literal "Good morning.
How can I help you today?" first screen from `VISION.md`.

- **Backend owner:** PGSPC — an endpoint that aggregates the minimum
  real signals available today (license/trial status, appointment
  count, any data already in the MVP schema) into a structured payload.
  Explicitly **does not** wait for Domain 2's full Profit/Cost/Risk
  epics — uses what's real today, designed to accept richer signals
  later without a rewrite.
- **Frontend owner:** AMINANSARCOM — the actual landing screen. This is
  the first UI surface built *conversation-first*: it opens with the
  brief + an input box, not a dashboard. Existing `dashboard.tsx`
  becomes reachable on request, not the default view (per `VISION.md`).
- **AI owner:** SADAF — the brief-generation prompt/logic that turns
  the aggregated signals into the "Good morning" narrative, including
  role-based personalization (manager vs. accountant vs. doctor).
- **Dependencies:** Benefits from PROP-TASK-104 (Business Context) landing
  first, but can start with a narrower, hardcoded signal set and
  upgrade once Context Injection exists — not strictly blocking.
- **Acceptance Criteria:**
  - [ ] Opening the app shows the brief + conversational input as the
        first thing a logged-in user sees — not a dashboard
  - [ ] Brief content reflects real data for the authenticated
        organization (no placeholder/fake numbers)
  - [ ] Dashboard/detail views remain reachable, just not the default
  - [ ] Brief generation respects multi-tenancy — same invariant as
        everywhere else
- **AI-first justification:** this is the task. Every other Wave 1
  epic is infrastructure that makes this possible; this is the one a
  user actually sees and experiences as "the vision," and the clearest
  possible test of whether Wave 1 succeeded.

---

## Summary table

| Task | Epic | Backend | Frontend | AI |
|---|---|---|---|---|
| PROP-TASK-101 | Streaming (existing TASK-009) | SADAF | SADAF | — |
| PROP-TASK-102 | Search (existing TASK-010) | SADAF | SADAF | — |
| PROP-TASK-103 | Structured memory | PGSPC | — | SADAF |
| PROP-TASK-104 | Business context injection | PGSPC | — | SADAF |
| PROP-TASK-105 | Tool registry | PGSPC | — | SADAF |
| PROP-TASK-106 | Prompt framework | PGSPC | — | SADAF |
| PROP-TASK-107 | Executive Daily Brief | PGSPC | AMINANSARCOM | SADAF |

Note: `AMINANSARCOM` appears only once (PROP-TASK-107) because six of
the seven Wave 1 epics are backend/AI infrastructure with no UI
surface — this is expected for an "AI Core" wave, not an oversight.
Her current live work (TASK-006/007) continues regardless of when/if
Wave 1 is approved.
