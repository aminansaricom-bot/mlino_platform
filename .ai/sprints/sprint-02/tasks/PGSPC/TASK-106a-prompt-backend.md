# TASK-106a: Centralized, versioned prompt framework — backend

**GitHub Issue:** #15
**Engineer:** PGSPC
**Sprint:** sprint-02
**Suggested branch:** `feature/task-106a-prompt-backend`
**ADR references:** No dedicated ADR required — storage/versioning
infra for existing prompt strings, not a new architectural direction.

## Objective

Move system prompts out of inline string literals scattered across
service files into a centralized, versioned structure `TASK-106b`
(SADAF) can populate with real prompt content and evaluation criteria.

## Business value

Every Domain 1/2 epic changes prompt behavior. Without versioning,
there's no way to attribute a quality regression in Reasoning or
Recommendations to a specific prompt change.

## Context

Today, each `Partner` has one `systemPrompt` string field, edited
directly, no history, no versioning, no test harness.

## Scope

- A storage/versioning mechanism for prompts (doesn't need to be
  elaborate — a `PromptVersion`-style table or even a changelog
  convention is acceptable per this task's acceptance criteria; don't
  over-build an A/B testing platform nobody asked for).
- A way to select which version is active at runtime.
- **Out of scope:** the actual prompt content and what counts as a
  regression (that's `TASK-106b`, AI-side).

## Deliverables

- Versioning mechanism wired into however `Partner.systemPrompt` (or
  its successor) is read at request time.
- At minimum, a documented convention for how a prompt change gets
  attributed to a version — full sophistication is `TASK-106b`'s to
  build on top of, not this task's to over-engineer.

## Acceptance Criteria

- [ ] System prompts are no longer bare inline string literals with no
      change history.
- [ ] A prompt change can be attributed to a version (a changelog-style
      record is acceptable — no requirement for a full A/B framework).
- [ ] Existing chat behavior is unchanged for any `Partner` that hasn't
      opted into the new versioning yet.

## Dependencies

None.

## Expected files

```
apps/api/prisma/schema.prisma           (modified, additive — versioning structure)
apps/api/src/chat/chat.service.ts       (modified — read active prompt version)
```

## Definition of Done

- All acceptance criteria checked.
- `npm run lint`, `npm run build`, `npm test --workspace=apps/api` pass.
- Submitted via `mlino_pgspc` as `submissions/TASK-106a/`.
- `.ai/PROJECT_STATE.md` updated.

## Expected Submission Title

`feat(chat): versioned system-prompt storage (backend)`
