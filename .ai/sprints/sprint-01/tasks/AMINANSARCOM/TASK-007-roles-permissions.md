# TASK-007: Roles and permissions within an organization

**GitHub Issue:** #7
**Engineer:** AMINANSARCOM
**Sprint:** sprint-01
**Depends on:** TASK-006 (must be merged first)
**Suggested branch:** `feature/task-007-organization-roles`
**ADR references:** This task's own body already requires writing
`docs/ADR/ADR-0011-organization-roles.md` before enforcement code —
that ADR *is* the required reference for this task, not a pre-existing
one. Do not start the enforcement code until it's merged.

## Objective

Make `OrganizationMember.role` mean something — currently it's an
unenforced free-text field.

## Context

`OrganizationMember.role` defaults to `"OWNER"` and nothing checks it
today. Now that `TASK-006` allows more than one member, a second member
needs a defined, enforced set of permissions.

## Business value

Without role enforcement, every organization member has silent,
unintended full access — an invited teammate could do anything the
owner can, including things they shouldn't (e.g. deleting the whole
organization, if that existed). This closes that gap before it's a
real-user problem.

## Scope

- **Write the ADR first** (see Deliverables) — decide the minimal role
  set before writing enforcement code. Resist designing a full
  permission matrix; two roles is very likely enough for this
  milestone.
- Enforce roles on at least one sensitive endpoint (Partner creation is
  the natural first candidate — check `apps/api/src/partners/` for its
  current unrestricted behavior).
- **Out of scope:** a general-purpose permissions framework, per-action
  granular permissions beyond the ADR's chosen role set.

## Deliverables

- `docs/ADR/ADR-0011-organization-roles.md` (copy `docs/ADR/TEMPLATE.md`)
  — merged **before** the enforcement code PR.
- A guard/decorator (e.g. `@RequireRole('OWNER')`) enforcing role checks.
- Applied to `PartnersController.create` (only `OWNER` can create a
  Partner) as the first enforced case.

## Acceptance Criteria

- [ ] ADR-0011 merged, defining the role set (e.g. `OWNER`, `MEMBER`)
      and which actions require which role.
- [ ] A reusable guard/decorator exists — not a one-off `if` check
      copy-pasted per endpoint.
- [ ] `PartnersController.create` rejects non-`OWNER` members with
      `403 Forbidden`.
- [ ] Existing single-member organizations (creator = `OWNER`) are
      unaffected — verify their Partner-creation flow still works.
- [ ] No change to `OrganizationsService.assertMember`'s membership
      check itself — role enforcement is a layer on top of it, not a
      replacement.

## Dependencies

`TASK-006` must be merged first — this task assumes the invite/
multi-member model exists.

## Expected files

```
docs/ADR/ADR-0011-organization-roles.md            (new)
apps/api/src/organizations/require-role.decorator.ts (new)
apps/api/src/organizations/require-role.guard.ts     (new)
apps/api/src/partners/partners.controller.ts         (modified)
```

## Definition of Done

- All acceptance criteria checked.
- ADR-0011 merged before this task's enforcement PR.
- `npm run lint` and `npm run build` pass.
- PR merged to `main`.
- `.ai/PROJECT_STATE.md` updated (role enforcement now exists, ROADMAP
  TODO marked done).

## Expected Pull Request title

`feat(organizations): enforce role-based permissions on Partner creation`
