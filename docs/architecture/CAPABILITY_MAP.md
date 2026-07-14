# CAPABILITY_MAP.md — v1.0

> **This is a consolidation document, not a design document.** Every
> statement here is traceable to a decision already made earlier in
> this project's history — primarily `docs/product/PRODUCT_ROADMAP.md`,
> `docs/product/FEATURE_TREE.md`, `docs/product/PRODUCT_PRINCIPLES.md`,
> and `.ai/ENGINEER_WORKFLOW.md`. Where no prior decision exists for a
> requested field, it is marked **Deferred — no architectural decision
> has been made**, not filled in. That marking is itself an honest and
> load-bearing part of this document, not a placeholder to feel bad
> about.

## Traceability note (read before the rest of this document)

Two terms were introduced only in the request that produced this
document and were never used earlier in this project:

- **"Capability" / "Level-1 Capability"** — no prior document used this
  term. The nearest real, decided unit of architecture is the
  **Domain** (`docs/product/PRODUCT_ROADMAP.md`,
  `docs/product/FEATURE_TREE.md`). This document treats **Capability =
  Domain**, a relabeling, not a new concept — every Capability below
  is one of the 10 Domains already defined, in the same order, with
  the same scope.
- **"Kernel Architecture Specification"** — no such document exists,
  separately named or otherwise. The nearest real, decided
  architectural invariants are: the multi-tenancy scoping rule (every
  organization-scoped query goes through an `assertMember`-equivalent
  check — stated repeatedly across `.ai/ENGINEER_WORKFLOW.md` and every
  task file's Rules section) and the 10 rules in
  `docs/product/PRODUCT_PRINCIPLES.md` v1.0. This document's "Mapping
  to Kernel Architecture Specification" section references *those*,
  since nothing else exists to reference.

**On the count of 11:** exactly **10** Level-1 units were ever decided
(the 10 Domains). No 11th unit — a separate "Platform Kernel" distinct
from Domain 10 (Platform), or anything else — was ever proposed or
decided in this conversation. If an 11th Capability was intended, its
existence itself is:

> **Deferred — no architectural decision has been made.**

Everything below proceeds with the real 10.

---

## Capability 1 — AI Core

**Purpose:** the central intelligence of MLINO — conversation,
reasoning, and action, per `docs/product/VISION.md`'s Business Brain
definition. (Source: `PRODUCT_ROADMAP.md` Domain 1 goal statement.)

**Responsibilities:** Conversation Engine, Memory, Business Context,
Tool Calling, Reasoning, Recommendations, Business Actions,
Voice-Ready Architecture, Conversation History, Prompt Framework — the
10 Features enumerated under Domain 1 in `FEATURE_TREE.md`.

**Explicit Non-Responsibilities:** hardcoding vertical-specific
concepts (dental-clinic terms) — explicitly assigned to Capabilities
3–6 instead (`PRODUCT_PRINCIPLES.md` Principle 8, "Multi-industry
architecture," and `FEATURE_TREE.md`'s Domain 8 cross-domain note).

**Main Inputs:** business data from whichever of Capabilities 2–10 are
active at a given time (`FEATURE_TREE.md`'s "Business Context" epic —
"live business-data context injection"). Specific per-capability input
contracts: Deferred — no architectural decision has been made.

**Main Outputs:** conversational responses, recommendations, and
initiated Business Actions, consumed by the user directly and by
Capability 10 (Platform) via the Action audit trail. Structured
output schema: Deferred.

**Internal Level-2 Capabilities:** the Epics already listed per Feature
under Domain 1 in `FEATURE_TREE.md` (e.g., Conversation Engine →
Multi-turn orchestration, Streaming responses, Multi-modal input
contract). Not restated here — see that document.

**Dependencies on other Level-1 Capabilities:** none required to exist
first (`PRODUCT_ROADMAP.md`: Capability 1 is 🟢 Now, with nothing
upstream of it). Capability 2 depends on *this* one, not the reverse.

**Governance touchpoints:** `PRODUCT_PRINCIPLES.md` Principles 4
(Automation before manual work) and 5 (Memory-driven interactions)
both carry an explicit **ADR Required** designation in that document's
Governance table for exactly the boundaries this Capability owns
(classifying an action as automatable; memory retention policy).
Beyond that: Deferred.

**Events consumed:** Deferred — no event system was ever specified.

**Events produced:** Deferred — same reason.

**Extension points:** Deferred — Tool Calling's "new business-action
tools per domain" (`FEATURE_TREE.md`) implies an extension mechanism
must exist, but its shape was never decided.

---

## Capability 2 — Business Brain

**Purpose:** AI understanding of the whole organization — health,
risk, profit, cost, forecasting, trends, recommendations, anomalies,
and the daily brief. (Source: `PRODUCT_ROADMAP.md` Domain 2 goal.)

**Responsibilities:** the 10 Features listed under Domain 2 in
`FEATURE_TREE.md` (Business Health Score through Executive Daily
Brief).

**Explicit Non-Responsibilities:** the *full* domain is explicitly not
this Capability's current responsibility — only "the minimum slice
needed to make [Capability 1] answer real business questions"
(`PRODUCT_ROADMAP.md` Domain 2 entry). Which specific Features are
in vs. out of that slice beyond Executive Daily Brief: partially
decided — see `docs/product/SPRINT_PLAN.md`'s Wave 1 scoping (only
Executive Daily Brief is in Wave 1; the other 9 Features are
Deferred as to timing, though not as to eventual existence).

**Main Inputs:** Capability 1 must exist first (`FEATURE_TREE.md`
cross-domain note: "Domain 2 depends on Domain 1"). Capabilities 3, 4,
6 "feed" this one (same source). Capability 7 "feeds [this] directly"
(Profit & Loss ↔ Profit Analysis).

**Main Outputs:** recommendations and briefs consumed by Capability 1
(which delivers them conversationally) and, per `FEATURE_TREE.md`'s
Domain 9 Dashboards epic, by Capability 9 ("widgets sourced from
[this Capability]'s signals").

**Internal Level-2 Capabilities:** the Epics per Feature under Domain 2
in `FEATURE_TREE.md`.

**Dependencies on other Level-1 Capabilities:** Capability 1 (hard
dependency, must exist first); Capabilities 3, 4, 6, 7 (data-feed
dependencies, softer — Wave 1 explicitly uses "estimated/stubbed"
data where these aren't built yet, per `FEATURE_TREE.md`'s Domain 7
note).

**Governance touchpoints:** none explicitly assigned beyond the
general Principle 6 (Explainable AI) requirement, which
`PRODUCT_PRINCIPLES.md` marks as absolute (no override) and directly
governs this Capability's Score/Risk/Anomaly outputs by name in that
principle's own test. Beyond that: Deferred.

**Events consumed:** Deferred.

**Events produced:** Deferred.

**Extension points:** Deferred.

---

## Capability 3 — CRM Intelligence

**Purpose:** patient/customer relationship understanding. (Source:
`PRODUCT_ROADMAP.md` Domain 3 goal — "the Business Brain needs a real
customer/patient model to reason about beyond aggregate numbers.")

**Responsibilities:** the 8 Features under Domain 3 in
`FEATURE_TREE.md` (Patient Profile through AI Notes).

**Explicit Non-Responsibilities:** Deferred — no explicit boundary was
stated for this Capability beyond its Feature list. (Its "Customer
Profile" Feature notes it is "not built until a second vertical is
real," but that is a timing note, not a responsibility boundary.)

**Main Inputs:** Deferred — no explicit input contract was decided.

**Main Outputs:** feeds Capability 2 (`FEATURE_TREE.md` cross-domain
note: "Domains 3, 4, 6 feed Domain 2").

**Internal Level-2 Capabilities:** the Epics per Feature under Domain 3
in `FEATURE_TREE.md`.

**Dependencies on other Level-1 Capabilities:** none stated as
required before this Capability can be built; it is sequenced 🟡 Next
in `PRODUCT_ROADMAP.md` for prioritization reasons, not a hard
technical dependency.

**Governance touchpoints:** Deferred.

**Events consumed:** Deferred.

**Events produced:** Deferred.

**Extension points:** Deferred.

---

## Capability 4 — Smart Scheduling

**Purpose:** appointment and doctor-matching intelligence. (Source:
`PRODUCT_ROADMAP.md` Domain 4 goal.)

**Responsibilities:** the 8 Features under Domain 4 in
`FEATURE_TREE.md` (Appointment Engine through Smart Calendar).

**Explicit Non-Responsibilities:** its Smart Calendar Feature is
explicitly scoped as "secondary UI... not the default landing screen"
(`FEATURE_TREE.md`, echoing `PRODUCT_PRINCIPLES.md` Principle 2) — the
one explicit boundary decided for this Capability. Everything else:
Deferred.

**Main Inputs:** Deferred.

**Main Outputs:** feeds Capability 2 (same cross-domain note as
Capability 3).

**Internal Level-2 Capabilities:** the Epics per Feature under Domain 4
in `FEATURE_TREE.md`.

**Dependencies on other Level-1 Capabilities:** none stated as hard
prerequisites; 🟡 Next tier.

**Governance touchpoints:** Deferred.

**Events consumed:** Deferred.

**Events produced:** Deferred.

**Extension points:** Deferred.

---

## Capability 5 — Staff Intelligence

**Purpose:** doctor/employee performance and workload understanding.
(Source: `PRODUCT_ROADMAP.md` Domain 5 goal.)

**Responsibilities:** the 6 Features under Domain 5 in
`FEATURE_TREE.md` (Doctor Performance through Performance Insights).

**Explicit Non-Responsibilities:** Deferred.

**Main Inputs:** explicitly depends on "real operational data existing
(Domain 4, Domain 6)" (`PRODUCT_ROADMAP.md` Domain 5 entry) — the only
Capability whose input dependency was stated in those exact terms.

**Main Outputs:** Deferred — not explicitly stated whether/how this
feeds Capability 2 the way Capabilities 3/4/6 do; the omission is
notable but not resolved by any prior decision, so it stays Deferred
rather than assumed either way.

**Internal Level-2 Capabilities:** the Epics per Feature under Domain 5
in `FEATURE_TREE.md`.

**Dependencies on other Level-1 Capabilities:** Capabilities 4 and 6
(explicit, per Main Inputs above).

**Governance touchpoints:** Deferred.

**Events consumed:** Deferred.

**Events produced:** Deferred.

**Extension points:** Deferred.

---

## Capability 6 — Inventory Intelligence

**Purpose:** consumption prediction and purchase suggestions. (Source:
`PRODUCT_ROADMAP.md` Domain 6 goal — directly cites `VISION.md`'s "do
we need to order materials?" example.)

**Responsibilities:** the 6 Features under Domain 6 in
`FEATURE_TREE.md` (Inventory through Low Stock Alerts).

**Explicit Non-Responsibilities:** Deferred.

**Main Inputs:** Deferred.

**Main Outputs:** feeds Capability 2 (same cross-domain note as
Capabilities 3/4); its Material Cost Analysis Feature specifically
feeds Capability 2's Cost Analysis Feature (`FEATURE_TREE.md`, stated
at Feature-level granularity, not just Domain-level).

**Internal Level-2 Capabilities:** the Epics per Feature under Domain 6
in `FEATURE_TREE.md`.

**Dependencies on other Level-1 Capabilities:** none stated as hard
prerequisites; 🟡 Next tier.

**Governance touchpoints:** Deferred.

**Events consumed:** Deferred.

**Events produced:** Deferred.

**Extension points:** Deferred.

---

## Capability 7 — Finance Services

**Purpose:** accounting, positioned as a service the Business Brain
draws on. (Source: `PRODUCT_ROADMAP.md` Domain 7 goal — "explicitly
repositioned by Vision 2.0.")

**Responsibilities:** the 9 Features under Domain 7 in
`FEATURE_TREE.md` (Journal through Profit & Loss).

**Explicit Non-Responsibilities:** **being the product's primary
interface or core** — stated directly and repeatedly (`VISION.md`:
"MLINO IS NOT AN ACCOUNTING SOFTWARE"; `PRODUCT_PRINCIPLES.md`
Principle 7, "Business-first, accounting-second"; `PRODUCT_ROADMAP.md`
Domain 7: "NOT the product core"). This is the single most explicitly
decided Non-Responsibility of any Capability in this document.

**Main Inputs:** Deferred.

**Main Outputs:** feeds Capability 2 directly — Profit & Loss ↔ Profit
Analysis (`FEATURE_TREE.md` cross-domain note, stated as a direct
Feature-to-Feature link, the most specific output-mapping decided for
any Capability).

**Internal Level-2 Capabilities:** the Epics per Feature under Domain 7
in `FEATURE_TREE.md`.

**Dependencies on other Level-1 Capabilities:** none stated as
prerequisites for building this Capability itself; it is ⚪ Later
because it is "legitimately deferrable," not because it's blocked.

**Governance touchpoints:** `PRODUCT_PRINCIPLES.md` Principle 7's own
text: "compliance-grade financial correctness itself is never
negotiable once Domain 7 is being built" — a real, decided constraint
on this Capability specifically, phrased as an exception to the
sequencing principle, not the accuracy principle.

**Events consumed:** Deferred.

**Events produced:** Deferred.

**Extension points:** Deferred.

---

## Capability 8 — Workflow Automation

**Purpose:** rules, triggers, approvals, and automated workflows.
(Source: `PRODUCT_ROADMAP.md` Domain 8 goal.)

**Responsibilities:** the 6 Features under Domain 8 in
`FEATURE_TREE.md` (Business Rules through Smart Workflows).

**Explicit Non-Responsibilities:** Deferred.

**Main Inputs:** Capability 1's Business Actions must be "trustworthy
enough to automate against" first (`FEATURE_TREE.md` cross-domain
note) — the clearest maturity-gate (not just data-feed) dependency
decided for any Capability.

**Main Outputs:** Deferred — notifications are listed as a Feature of
this Capability, and Capability 6's Low Stock Alerts Feature is noted
as feeding "Domain 8's Notifications" (`FEATURE_TREE.md`), so this
Capability is a known *consumer* of Capability 6's output; its own
outward outputs beyond that are Deferred.

**Internal Level-2 Capabilities:** the Epics per Feature under Domain 8
in `FEATURE_TREE.md`.

**Dependencies on other Level-1 Capabilities:** Capability 1 (maturity
dependency, per Main Inputs above); Capability 6 (as a Notifications
consumer, per Main Outputs above).

**Governance touchpoints:** `PRODUCT_PRINCIPLES.md` Principle 4's
Governance-table entry marks "classifying any action as safe to
automate" as **ADR Required** — this Capability is where that
classification is operationally enforced, even though the ADR
requirement itself belongs to Capability 1's governance touchpoint
(Automation before manual work is a Capability 1 principle applied at
Capability 8's execution layer).

**Events consumed:** Deferred (though "Triggers" as a named Feature
implies an event mechanism must exist — its shape was never decided).

**Events produced:** Deferred.

**Extension points:** Deferred.

---

## Capability 9 — Insights

**Purpose:** reports, dashboards, charts — secondary surfaces. (Source:
`PRODUCT_ROADMAP.md` Domain 9 goal.)

**Responsibilities:** the 5 Features under Domain 9 in
`FEATURE_TREE.md` (Reports through KPI Explorer).

**Explicit Non-Responsibilities:** **being the primary or default user
experience** — stated directly and repeatedly (`VISION.md`: "Dashboards
... are secondary interfaces"; `PRODUCT_PRINCIPLES.md` Principle 2,
"Conversation before dashboard," marked with no override allowed at
all in that principle's Governance row; `PRODUCT_ROADMAP.md` Domain 9:
"shown only when a user explicitly asks for more detail").

**Main Inputs:** Capability 2's signals, specifically for the
Dashboards Feature ("widgets sourced from Domain 2's signals, not a
separate data model" — `FEATURE_TREE.md`).

**Main Outputs:** consumed directly by the user on request; no
downstream Capability consumption was ever decided.

**Internal Level-2 Capabilities:** the Epics per Feature under Domain 9
in `FEATURE_TREE.md`.

**Dependencies on other Level-1 Capabilities:** Capability 2 (for
Dashboards specifically, per Main Inputs above).

**Governance touchpoints:** `PRODUCT_PRINCIPLES.md` Principle 9
("Progressive disclosure of information") governs this Capability by
name in its own Rule text ("Charts, tables, and full reports (Domain
9)... reached by asking, never the first thing shown") — marked no
override allowed.

**Events consumed:** Deferred.

**Events produced:** Deferred.

**Extension points:** Deferred.

---

## Capability 10 — Platform

**Purpose:** organizations, permissions, API, marketplace, plugins,
audit, configuration. (Source: `PRODUCT_ROADMAP.md` Domain 10 goal.)

**Responsibilities:** the 7 Features under Domain 10 in
`FEATURE_TREE.md` (Organizations through Configuration).

**Explicit Non-Responsibilities:** Deferred — though it is explicitly
noted this Capability is "partially already in progress" and its
Organizations/Permissions Features are not a "restart" of Sprint 0–1
work (`FEATURE_TREE.md` Domain 10 header note).

**Main Inputs:** its Audit Feature specifically depends on Capability
1's Action audit trail ("same underlying log, two consumers" —
`FEATURE_TREE.md` cross-domain note).

**Main Outputs:** the multi-tenancy scoping mechanism
(`OrganizationMember`/`assertMember`) that this Capability's
Organizations/Permissions Features own is, in practice, consumed by
every other Capability that touches organization-scoped data — this is
the one true "everyone depends on this" relationship in the whole map,
though it was never stated as a formal Capability-to-Capability
dependency in those words; it is stated as an engineering invariant
instead (`.ai/ENGINEER_WORKFLOW.md` §10, "multi-tenancy scoping is
non-negotiable"). Recorded here as the closest real source, with the
gap between "engineering invariant" and "formal Capability dependency"
left visible rather than smoothed over.

**Internal Level-2 Capabilities:** the Epics per Feature under Domain
10 in `FEATURE_TREE.md`, two of which are already **in progress as
real engineering tasks**, not just planned Epics: Organizations →
Multi-org membership (TASK-006) and Permissions → Role-based
permission enforcement (TASK-007).

**Dependencies on other Level-1 Capabilities:** Capability 1 (for
Audit, per Main Inputs above).

**Governance touchpoints:** its API Feature is explicitly marked
"stays deliberately unscheduled" (`FEATURE_TREE.md`), a scheduling
decision, not a governance one — no formal governance touchpoint was
decided for this Capability beyond that.

**Events consumed:** Deferred.

**Events produced:** Deferred.

**Extension points:** its Marketplace and Plugins Features are
explicitly *about* extension points as a product concept
(`FEATURE_TREE.md`: "Plugin/extension marketplace," "Plugin execution
sandbox") — but no technical extension-point mechanism was ever
designed. The concept is decided; the mechanism is Deferred.

---

# Cross-Capability Dependency Summary

Every dependency below is a direct restatement of a decision already
recorded in `FEATURE_TREE.md`'s own "Cross-domain dependency notes"
section or `PRODUCT_ROADMAP.md`'s per-domain entries — nothing new is
introduced here.

```
Capability 10 (Platform: Organizations/Permissions)
    └─ multi-tenancy scoping consumed by → every other Capability
       that touches organization-scoped data (engineering invariant,
       not a formally-stated Capability dependency — see Capability
       10's Main Outputs note)

Capability 1 (AI Core)
    ├─ required before → Capability 2 (Business Brain)
    ├─ maturity-gates → Capability 8 (Workflow Automation)'s ability
    │   to automate
    └─ Action audit trail feeds → Capability 10's Audit Feature

Capability 2 (Business Brain)
    ├─ fed by → Capability 3 (CRM Intelligence)
    ├─ fed by → Capability 4 (Smart Scheduling)
    ├─ fed by → Capability 6 (Inventory Intelligence)
    ├─ fed by → Capability 7 (Finance Services), directly at
    │   Feature level (P&L ↔ Profit Analysis)
    └─ feeds → Capability 9 (Insights)'s Dashboards Feature

Capability 4 (Smart Scheduling) + Capability 6 (Inventory Intelligence)
    └─ real operational data required before → Capability 5
       (Staff Intelligence) has anything to analyze

Capability 6 (Inventory Intelligence)
    └─ Low Stock Alerts feeds → Capability 8 (Workflow Automation)'s
       Notifications
```

**Not decided, and not guessed at here:** whether Capability 5 (Staff
Intelligence) feeds Capability 2 the way Capabilities 3/4/6 do. Flagged
under Capability 5's own Main Outputs field above as Deferred, and
deliberately left out of this diagram rather than assumed.

---

# Mapping to Kernel Architecture Specification

No document by that name exists (see Traceability note). The nearest
real, decided invariants — referenced, not repeated, per instruction:

- **Multi-tenancy scoping invariant** (`.ai/ENGINEER_WORKFLOW.md` §10)
  — affects every Capability that reads or writes organization-scoped
  data. In practice: all 10.
- **`PRODUCT_PRINCIPLES.md` Principle 2** (Conversation before
  dashboard, no override) — affects Capability 9 directly (its entire
  Non-Responsibility), and Capability 4's Smart Calendar Feature
  specifically.
- **Principle 4** (Automation before manual work, ADR-gated override)
  — affects Capability 1 (owns the principle) and Capability 8 (where
  it's executed).
- **Principle 5** (Memory-driven interactions, ADR-gated override) —
  affects Capability 1 only.
- **Principle 6** (Explainable AI, no override) — affects Capability 1
  and Capability 2 by name in the principle's own text.
- **Principle 7** (Business-first, accounting-second) — affects
  Capability 7 directly (its Non-Responsibility) and, by extension,
  every roadmap-sequencing decision recorded in
  `docs/product/PRODUCT_ROADMAP.md`.
- **Principle 8** (Multi-industry architecture, ADR-gated override) —
  affects Capabilities 1, 2, 8, 9, 10 by name in the principle's own
  Rule text ("nothing in Domains 1, 2, 8, 9, or 10 should hard-code
  dental-clinic-specific concepts").
- **Principle 9** (Progressive disclosure, no override) — affects
  Capability 9 directly, and is named as infrastructure for Principles
  2/3 (which touch Capabilities 1 and 2).
- **Principle 10** (Human override for every AI action, no override) —
  affects Capability 1 (owns Business Actions) and Capability 10
  (owns the Audit trail those actions are recorded in).

Principles 1 and 3 were not traced to a specific Capability beyond
Capability 1/2 already covered above — they are cross-cutting product
philosophy rather than a single Capability's governance touchpoint.

---

# Freeze Checklist

Answered honestly, not optimistically — a consolidation document's job
is to reveal gaps, not paper over them:

- [x] **Responsibility boundaries are clean** — each Capability's
      Responsibilities trace to a distinct set of Features with no
      Feature appearing under two Capabilities.
- [x] **No duplicated ownership exists** — same basis as above; no
      contradiction found in the source documents.
- [ ] **No hidden coupling exists** — **cannot confirm.** Capability
      10's multi-tenancy mechanism is depended on by every other
      Capability but was never formally stated as a Capability-level
      dependency (see Capability 10's Main Outputs) — this is exactly
      the shape of an unstated, "hidden" coupling, even though the
      underlying fact (multi-tenancy scoping) is well-documented as an
      engineering rule. Recommend this be formally stated before a
      true freeze.
- [ ] **Every Capability has explicit non-responsibilities** — **false
      as of this document.** Only Capabilities 1, 2 (partially), 4
      (partially), 7, and 9 have an explicitly decided
      Non-Responsibility. Capabilities 3, 5, 6, 8, 10 do not — marked
      Deferred above, not invented.
- [ ] **Every dependency is intentional** — **cannot fully confirm.**
      Capability 5's relationship to Capability 2 was never decided
      either way (see Cross-Capability Dependency Summary) — an
      undecided dependency is not the same as an intentional absence
      of one, and this document does not resolve that ambiguity on its
      own authority.
- [x] **Capability Map is consistent with [the referenced] Kernel
      invariants** — every mapping in the "Mapping to Kernel
      Architecture Specification" section above is a direct citation,
      not an inference, so no inconsistency was found *within what
      exists*. This does not mean the underlying invariants are
      complete — only that this document doesn't contradict them.

**Overall: not ready for a true freeze as-is.** This document
accurately consolidates what has been decided and is safe to treat as
the canonical record *of that*. But three checklist items are
genuinely unresolved, not just undocumented — closing them requires
new decisions (a Capability 5 ↔ 2 relationship, explicit
Non-Responsibilities for 5 Capabilities, a formal statement of
Capability 10's universal dependency), which is real architecture work
this document was explicitly told not to do. Recommend: treat this as
**v1.0-draft**, resolve the three open items as their own explicit
decisions (each is small), then re-issue as v1.0-final.
