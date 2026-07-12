# REVIEW_RESULT.md — Template

> Copy this structure for every review, in every Submission Repository.
> Most recent review goes at the top of the file; older reviews stay
> below, never deleted (see any existing `REVIEW_RESULT.md` for the
> pattern of stacking multiple dated reviews in one file).

---

## TASK-NNN — Short task title

**Verdict:** APPROVED / CHANGES REQUESTED

**Reviewed by:** Univestar
**Date:** YYYY-MM-DD
**Merge Decision:** Merged as `mlino_platform@<sha>` / Not merged, returned for revision

### Summary

One or two sentences: what this submission does, and the overall
verdict in plain language before the detail below.

### Strengths

What's genuinely good here — said plainly and specifically (not generic
praise), especially when the verdict is CHANGES REQUESTED. A rejection
should never read as "everything is wrong."

### Issues Found

Every real issue, each with:
- **Severity:** Critical / High / Medium / Low
- **What's wrong**
- **Why it matters** (impact, not just "this is bad practice")
- **File(s)**

Only real, verified issues — not speculative concerns. If something is
merely a style preference with no functional consequence, say so
explicitly and don't let it drive the verdict.

### Required Changes

For a CHANGES REQUESTED verdict only: the exact, actionable fix for
each Issue Found above — specific enough that the engineer doesn't have
to guess ("apply the same atomic-claim pattern used in X to Y" beats
"fix the race condition"). Omit this section entirely for an APPROVED
verdict.

### Validation Performed

What was independently re-run, not just trusted from the submission's
own `REPORT.md`:
- [ ] Applied submitted files to a clean `mlino_platform@main` checkout
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm test --workspace=apps/api` (where relevant)
- [ ] Manual read-through of every changed file
- [ ] Cross-checked any Prisma schema/model field usage against the
      actual schema (especially if a generated client isn't available
      in the review environment — say so if that's a real limitation,
      don't silently claim full verification you didn't do)
- [ ] Checked for file-level overlap with any other in-flight submission

### Merge Decision

- **APPROVED:** state the integration commit sha once pushed, and which
  docs were updated (`CHANGELOG.md`, `STATUS.md`, `.ai/PROJECT_STATE.md`,
  `.ai/CURRENT_SPRINT.md`).
- **CHANGES REQUESTED:** confirm explicitly — "Not merged. No code
  changed in `mlino_platform`."

### Next Actions

What happens next and who does it: engineer revises in place and
resubmits, or engineer gets their next task assigned. If this
submission touched a file also touched by another in-flight
submission, note it here explicitly (see
`.ai/ENGINEER_WORKFLOW.md` §13 and `.ai/SUBMISSION_WORKFLOW.md`'s
conflict-handling section — only Univestar resolves those, never the
engineer).
