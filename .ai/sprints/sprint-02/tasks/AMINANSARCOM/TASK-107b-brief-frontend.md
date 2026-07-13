# TASK-107b: Executive Daily Brief — landing screen

**GitHub Issue:** #16
**Engineer:** AMINANSARCOM
**Sprint:** sprint-02
**Status:** Queued — starts after `TASK-006`/`TASK-007` (Sprint 1) are
both merged. Not started now.
**Suggested branch:** `feature/task-107b-brief-frontend`
**ADR references:** No dedicated ADR required.

## Objective

Build the actual "Good morning" landing screen from
`docs/product/VISION.md` — the first conversation-first UI surface in
the product, replacing the dashboard as the default view.

## Business value

Per `docs/product/PRODUCT_PRINCIPLES.md` Principle 2 (conversation
before dashboard), this is the flagship UI change of Wave 1 — the
moment the product's actual default experience shifts.

## Context

Today, `apps/web/src/pages/dashboard.tsx` is effectively the landing
experience after login (via `apps/web/src/pages/index.tsx` → login →
dashboard). This task changes what a logged-in user sees first.

## Scope

- New landing view: brief content (from `TASK-107a`/`TASK-107c`'s
  endpoint) + a conversational input box, shown first after login.
- Existing dashboard becomes reachable on request (a link/button), not
  the default route.
- **Out of scope:** the brief content/narrative generation itself
  (backend/AI tasks); any redesign of the dashboard's own internals.

## Deliverables

- New page (e.g. `apps/web/src/pages/home.tsx` or repurposed
  `index.tsx` post-login) rendering the brief + input.
- Routing change: login success lands here, not directly on
  `dashboard.tsx`.
- A visible path from this screen to the dashboard, for users who want
  the traditional view (Principle 9, progressive disclosure — detail
  is one tap away, never forced upfront).

## Acceptance Criteria

- [ ] Logging in lands on the brief + conversational input, not the
      dashboard.
- [ ] Brief content is fetched from the real backend endpoint (once
      `TASK-107a` exists) — not hardcoded placeholder text.
- [ ] Dashboard remains fully reachable via an explicit action.
- [ ] No regression to existing dashboard functionality (org/partner
      creation, invites once `TASK-006` lands).

## Dependencies

Depends on `TASK-107a` (PGSPC, signal endpoint) and ideally `TASK-107c`
(SADAF, narrative) existing to have real content to render — can start
against a stubbed response shape before either fully lands, as long as
the real shape is agreed first. Sequenced after your own `TASK-006`/
`TASK-007` — do not start this until those are merged.

## Expected files

```
apps/web/src/pages/home.tsx          (new, or index.tsx repurposed)
apps/web/src/pages/dashboard.tsx     (modified — reachable, not default)
apps/web/src/lib/api.ts              (modified, if a new fetch helper is needed)
```

## Definition of Done

- All acceptance criteria checked.
- `npm run lint` and `npm run build` pass.
- Submitted via `mlino_amin-` as `submissions/TASK-107b/`.
- `.ai/PROJECT_STATE.md` updated.

## Expected Submission Title

`feat(web): conversation-first landing screen (Executive Daily Brief)`
