# DECISION-001: Engineer roster change — LUGH → SADAF

**Date:** 2026-07-11
**Status:** Accepted

## Context

Sprint 1 was originally planned with three engineers: `PGSPC`,
`AMINANSARCOM`, `LUGH` — with `LUGH` owning Workstream C (Chat
Experience: Issues #8, #9, #10), documented in
`.ai/briefs/LUGH_BRIEF.md` and referenced in GitHub comments on those
issues.

The repo-as-source-of-truth restructuring names the roster as `PGSPC`,
`AMINANSARCOM`, `SADAF` — no `LUGH`. Since no workstream reassignment
was stated explicitly, this decision documents the assumption made:
`SADAF` replaces `LUGH` as the owner of Workstream C, with no change to
scope, files owned, or task content.

## Decision

- Workstream C (Chat Experience: Issues #8, #9, #10) is now owned by
  `SADAF`.
- `.ai/engineers/SADAF.md` replaces `.ai/briefs/LUGH_BRIEF.md`.
- Task content is carried over unchanged — only the owner name changed.
- GitHub Issue comments on #8/#9/#10 updated to reflect the new owner.

## Consequences

- If `LUGH` was meant to remain on the team alongside `SADAF` (a 4th
  engineer, not a replacement), this needs an explicit correction — flag
  it and a 4th engineer file + rebalanced tasks can be created.
- No code or architecture is affected by this change — it's a
  task-ownership relabeling only.
