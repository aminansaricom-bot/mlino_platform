# PRODUCT_ROADMAP.md

> The permanent map of the product. Full Domain → Feature → Epic
> decomposition lives in `FEATURE_TREE.md`; this document is the
> "why and in what order," not the full tree — read them together.
> Engineering-task-level detail exists only for the current
> implementation priority — see `SPRINT_PLAN.md` / `TASK_BREAKDOWN.md`.

## How to read the priority tiers

- 🟢 **Now** — first implementation wave. Has Epics *and* Engineering
  Tasks.
- 🟡 **Next** — fully designed (Epics exist in `FEATURE_TREE.md`), not
  yet broken into tasks. Candidate for the wave after this one.
  Re-evaluated each time a wave completes, not on a fixed calendar.
  🟡 **Next** is the tier where the vision doc's "AI-first test" matters
  most — dashboards/tables should feel replaceable by conversation
  before their Epics move to task-level.
- ⚪ **Later** — fully designed, deliberately not scheduled. Exists so
  the product map is complete and consistent, not because it's coming
  soon. Revisit only when a real signal (not this document) says it's
  time — same discipline as `.ai/ROADMAP.md`'s existing "Later" section
  for the original MVP TODOs.

## Domains

### Domain 1 — AI Core 🟢 Now
The central intelligence of MLINO. Conversation Engine, Memory,
Business Context, Tool Calling, Reasoning, Recommendations, Business
Actions, Voice-Ready Architecture, Conversation History, Prompt
Framework. This *is* the product from here forward — every other
domain either feeds it data or receives actions from it.

### Domain 2 — Business Brain 🟢 Now
AI understanding of the whole organization: Business Health Score,
Risk Detection, Profit Analysis, Cost Analysis, Forecasting, KPI
Analysis, Trend Detection, Decision Recommendations, Anomaly Detection,
Executive Daily Brief. Depends on Domain 1 existing first (it's what
Domain 1 reasons *about*) — first wave includes only the minimum slice
of this domain needed to make Domain 1 answer real business questions,
not the full domain.

### Domain 3 — CRM Intelligence 🟡 Next
Patient/Customer Profile, Timeline, Relationship History, Follow-up,
Customer Lifetime Value, Satisfaction Analysis, AI Notes. Natural
second wave — the Business Brain needs a real customer/patient model to
reason about beyond aggregate numbers.

### Domain 4 — Smart Scheduling 🟡 Next
Appointment Engine, Doctor Matching, Patient Routing, Queue
Optimization, Cancellation Recovery, Automatic Rescheduling,
Availability Prediction, Smart Calendar. High AI-first potential
("which doctor should receive this patient?" is a conversation, not a
calendar UI) — strong candidate for an early wave once Domain 1/2 are
solid.

### Domain 5 — Staff Intelligence 🟡 Next
Doctor Performance, Employee Performance, Attendance, Workload, Task
Assignment, Performance Insights. Depends on real operational data
existing (Domain 4, Domain 6) to have anything to be intelligent about.

### Domain 6 — Inventory Intelligence 🟡 Next
Inventory, Consumption Prediction, Automatic Purchase Suggestions,
Supplier Intelligence, Material Cost Analysis, Low Stock Alerts. "Do we
need to order materials?" is one of the vision's own example questions
— high AI-first fit, but needs real inventory data flowing first.

### Domain 7 — Finance Services ⚪ Later
Journal, General Ledger, Treasury, Checks, Assets, Tax, Financial
Statements, Cash Flow, Profit & Loss. **Explicitly repositioned by
Vision 2.0**: accounting is a service the Business Brain draws on
(Domain 2's Profit/Cost Analysis needs this data eventually), not the
product core. Compliance-grade financial statements are also a
legitimate "No" answer to the AI-first test (§ VISION.md) — this domain
will always have real forms/tables, by design, not as a gap.

### Domain 8 — Workflow Automation ⚪ Later
Business Rules, Automation Engine, Triggers, Approvals, Notifications,
Smart Workflows. This is where Domain 1's "Automate" capability
graduates from "AI suggests, human clicks" to "AI acts within defined
rules" — deliberately sequenced after Domains 1–2 are trustworthy
enough to automate against.

### Domain 9 — Insights ⚪ Later
Reports, Dashboards, Charts, Exports, KPI Explorer. Per the vision,
these are **secondary surfaces by design** — shown when a user
explicitly asks for detail, not the primary experience. Building this
domain early would fight the vision, not serve it; it stays fully
designed (see `FEATURE_TREE.md`) but unscheduled until Domains 1–2
prove what detail people actually ask to see.

### Domain 10 — Platform ⚪ Later
Organizations, Permissions, API, Marketplace, Plugins, Audit,
Configuration. Some of this already exists (`OrganizationMember`,
multi-tenancy) from Sprint 0–1 — this domain's Epics describe where
that foundation grows *to*, not a restart. Marketplace/Plugins in
particular are long-horizon, included for completeness, not because
they're close.

## Sequencing summary

```
Now:    Domain 1 (AI Core) + minimum slice of Domain 2 (Business Brain)
Next:   Domain 3 (CRM) → Domain 4 (Scheduling) → Domain 6 (Inventory) → Domain 5 (Staff)
        [order among "Next" re-evaluated per wave, not fixed in stone]
Later:  Domain 7 (Finance) · Domain 8 (Automation) · Domain 9 (Insights) · Domain 10 (Platform)
```

This is a multi-year map, not a sprint schedule. It's expected to stay
mostly stable; `SPRINT_PLAN.md` is what actually moves.
