# TASK-103a: Structured business memory — backend

**GitHub Issue:** #12
**Engineer:** PGSPC
**Sprint:** sprint-02
**Suggested branch:** `feature/task-103a-memory-backend`
**ADR references:** No dedicated ADR required — additive schema
evolution of the existing `Memory` model, not a new architectural
direction. If retention/deletion policy design becomes a real decision
(see Business Value below), that gets its own ADR before implementing.

## Objective

Replace the flat `Memory` model (`content: String` per row, no
structure) with a categorized, queryable memory model that
`TASK-103b` (SADAF, AI-logic half) can write to and read from
meaningfully.

## Business value

"Remember" is one of the five Business Brain verbs in
`docs/product/VISION.md`. The MVP's memory is an explicitly-flagged
placeholder in its own code comments — this is the first real
implementation, the foundation Domain 1's Memory epic needs.

## Context

Current `Memory` model: `id`, `partnerId`, `content`, `createdAt` —
every user message stored verbatim, retrieved as "last N," no
structure. See `apps/api/src/chat/memory.service.ts`.

## Scope

- New/evolved Prisma model with structure: category, subject
  reference, confidence, optional expiry.
- Service-layer CRUD supporting filtered retrieval (by category/subject),
  not just "most recent."
- **Out of scope:** the AI-side logic deciding *what* to categorize and
  *when* to write (that's `TASK-103b`) — this task provides the
  substrate, not the intelligence.
- **Out of scope:** a UI for browsing memory (later, Domain 9 concern
  if ever built).

## Deliverables

- Additive Prisma migration for the new memory structure.
- `MemoryService` methods supporting categorized write + filtered
  retrieval, backward-compatible with existing call sites until
  `TASK-103b` lands (existing naive behavior can remain the default
  category until then).

## Acceptance Criteria

- [ ] Migration is additive — no data loss for existing `Memory` rows.
- [ ] New fields support at least: category (string/enum), subject
      reference (nullable), confidence (nullable), expiry (nullable).
- [ ] `MemoryService` exposes a retrieval method that filters by
      category/subject, not only "most recent N."
- [ ] Existing chat flow continues to work unchanged if the new
      categorization isn't used yet (no hard coupling forcing
      `TASK-103b` to land first).
- [ ] Multi-tenancy: every query still scoped correctly (via `partnerId`
      → `organizationId`, same invariant as everywhere else).

## Dependencies

None blocking start. Coordinates with `TASK-104a` (Business Context) —
both touch the prompt-assembly path in `ChatService` — recommend
submitting both before either gets integrated, so Univestar reconciles
them together rather than serially.

## Expected files

```
apps/api/prisma/schema.prisma                (modified — Memory model evolution)
apps/api/prisma/migrations/*_memory_structure/ (new)
apps/api/src/chat/memory.service.ts          (modified)
```

## Definition of Done

- All acceptance criteria checked.
- `npm run lint`, `npm run build`, `npm test --workspace=apps/api` pass.
- Submitted via `mlino_pgspc` as `submissions/TASK-103a/`, per
  `.ai/SUBMISSION_WORKFLOW.md`.
- `.ai/PROJECT_STATE.md` updated (new memory structure documented).

## Expected Submission Title

`feat(chat): structured, categorized memory model (backend)`
