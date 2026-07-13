# FEATURE_TREE.md

> Complete product architecture: every Domain → every Feature → every
> Epic, for all 10 domains, regardless of scheduling tier. This is the
> permanent reference — `PRODUCT_ROADMAP.md` says *when*, this says
> *what*. Engineering Tasks exist only for the current implementation
> priority; see `TASK_BREAKDOWN.md`.
>
> Where an Epic extends something already built in Sprint 0–1
> (`apps/api/prisma/schema.prisma` models, existing services), it says
> so explicitly — this tree describes evolution, not a rewrite.

---

## Domain 1 — AI Core 🟢

### Feature: Conversation Engine
- Epic: Multi-turn orchestration (evolves `ChatService` — history window, memory injection, tool loop already exist; this epic is about making it domain-agnostic instead of chat-specific)
- Epic: Streaming responses (already scoped as TASK-009)
- Epic: Multi-modal input contract (text now; interface designed so image/voice input doesn't require a rewrite later)

### Feature: Memory
- Epic: Structured business memory (replace the current naive per-partner message log with categorized, queryable memory)
- Epic: Memory retrieval & ranking (relevance-based selection, not just "last N")
- Epic: Memory lifecycle & retention policy (formalizes the open question already flagged in `docs/ADR/ADR-0009`-equivalent territory — see Domain 1's relationship to the existing MVP)

### Feature: Business Context
- Epic: Live business-data context injection (pull real, current org/clinic state into every prompt — not just conversation history)
- Epic: Context scoping & multi-tenancy safety (context must never leak across organizations — same invariant as every other domain)

### Feature: Tool Calling
- Epic: Tool registry & execution framework (generalizes the MVP's `assistantTools.js`-equivalent pattern beyond one hardcoded set)
- Epic: Tool result validation & safety boundaries
- Epic: New business-action tools per domain (grows incrementally as Domains 2–6 come online — not built ahead of the data existing)

### Feature: Reasoning
- Epic: Multi-step reasoning/planning before tool calls (beyond the current single-pass tool loop)
- Epic: Confidence & uncertainty signaling (the AI states what it doesn't know, not just what it does)

### Feature: Recommendations
- Epic: Recommendation generation framework (structured output: action + rationale + confidence, not free text)
- Epic: Recommendation feedback loop (accept/reject signal improves future recommendations)

### Feature: Business Actions
- Epic: Action execution framework (AI-initiated writes, with confirmation gating before anything destructive)
- Epic: Action audit trail (every AI-taken action logged — feeds Domain 10's Audit feature)

### Feature: Voice-Ready Architecture
- Epic: Voice-compatible input/output contract (no voice UI yet — the interface just doesn't block adding it)
- Epic: Latency budget for voice-viable responses (depends on streaming existing)

### Feature: Conversation History
- Epic: Persistent, searchable history (search already scoped as TASK-010)
- Epic: Conversation summarization for long-running threads

### Feature: Prompt Framework
- Epic: Centralized, versioned system-prompt management (today it's one string per `Partner` — needs real structure)
- Epic: Prompt evaluation harness (regression-check prompt changes before they ship)

---

## Domain 2 — Business Brain 🟢 (first-wave slice only — see `TASK_BREAKDOWN.md`)

### Feature: Business Health Score
- Epic: Score calculation model (composite metric definition)
- Epic: Score explainability (the AI must explain *why*, not just state a number)

### Feature: Risk Detection
- Epic: Rule-based risk signals (first pass — thresholds on known metrics)
- Epic: Pattern-based risk detection (learned rather than hardcoded — later maturity)

### Feature: Profit Analysis
- Epic: Profit data aggregation (draws from Domain 7 once it exists; estimated/stubbed until then)
- Epic: Profit driver breakdown (what's actually moving the number)

### Feature: Cost Analysis
- Epic: Cost aggregation across categories (labor, materials, overhead)
- Epic: Cost anomaly flagging

### Feature: Forecasting
- Epic: Baseline trend-projection forecasting
- Epic: Forecast confidence bands (never a bare projected number)

### Feature: KPI Analysis
- Epic: KPI definition framework (per-vertical — dental clinic KPIs won't equal a future vertical's)
- Epic: KPI comparison over time

### Feature: Trend Detection
- Epic: Time-series trend extraction
- Epic: Trend-to-recommendation linkage (feeds Decision Recommendations below)

### Feature: Decision Recommendations
- Epic: Synthesis of Domain 2 signals into Domain 1's Recommendation framework
- Epic: Recommendation prioritization (don't surface every signal at once)

### Feature: Anomaly Detection
- Epic: Statistical anomaly baseline (first pass)
- Epic: Anomaly-to-alert routing (feeds Domain 8's Notifications, once that domain is active)

### Feature: Executive Daily Brief
- Epic: Daily brief generation — the "Good morning" first-screen content from `VISION.md`
- Epic: Brief personalization by role (manager vs. accountant vs. doctor sees a different brief)

---

## Domain 3 — CRM Intelligence 🟡

### Feature: Patient Profile
- Epic: Core profile data model (generalizes the `Patient` concept already proven in the `malino-17tir` sibling project)
- Epic: Profile completeness scoring

### Feature: Customer Profile
- Epic: Generic customer entity (non-patient verticals — future-proofing, not built until a second vertical is real)

### Feature: Timeline
- Epic: Unified activity timeline per patient/customer (appointments, payments, notes, conversations, in one stream)

### Feature: Relationship History
- Epic: Cross-visit relationship tracking (which doctor, how often, sentiment trend)

### Feature: Follow-up
- Epic: Follow-up scheduling & reminders
- Epic: AI-suggested follow-up timing

### Feature: Customer Lifetime Value
- Epic: CLV calculation model

### Feature: Satisfaction Analysis
- Epic: Satisfaction signal collection (explicit ratings + inferred conversation sentiment)

### Feature: AI Notes
- Epic: AI-generated visit/interaction summaries
- Epic: Note review & correction workflow (human stays in the loop — AI drafts, doesn't finalize unreviewed)

---

## Domain 4 — Smart Scheduling 🟡

### Feature: Appointment Engine
- Epic: Core appointment CRUD (extends the existing `Appointment` model)
- Epic: Conflict detection

### Feature: Doctor Matching
- Epic: Matching algorithm (specialty, availability, patient history)
- Epic: Conversational matching — the vision's own example: *"which doctor should receive this patient?"*

### Feature: Patient Routing
- Epic: Intake routing logic

### Feature: Queue Optimization
- Epic: Real-time queue state model
- Epic: Optimization algorithm (minimize wait, balance doctor load)

### Feature: Cancellation Recovery
- Epic: Cancellation detection & waitlist fill

### Feature: Automatic Rescheduling
- Epic: AI-proposed reschedule flow (always with patient confirmation, never silent)

### Feature: Availability Prediction
- Epic: Predictive availability modeling

### Feature: Smart Calendar
- Epic: Calendar surface — secondary UI per the vision, shown on request, not the default landing screen

---

## Domain 5 — Staff Intelligence 🟡

### Feature: Doctor Performance
- Epic: Performance metric model (revenue, patient satisfaction, punctuality)

### Feature: Employee Performance
- Epic: Generic staff performance model (roles beyond doctor — accountant, assistant)

### Feature: Attendance
- Epic: Attendance tracking (extends the existing `TimeLog`/`WorkingHour` concept)

### Feature: Workload
- Epic: Workload calculation & balancing signals

### Feature: Task Assignment
- Epic: AI-assisted task/patient assignment

### Feature: Performance Insights
- Epic: Insight generation, surfaced through Domain 1's conversation, not a standalone report

---

## Domain 6 — Inventory Intelligence 🟡

### Feature: Inventory
- Epic: Core inventory data model (extends the existing `InventoryItem` concept)

### Feature: Consumption Prediction
- Epic: Usage-rate prediction model

### Feature: Automatic Purchase Suggestions
- Epic: Suggestion generation — the vision's own example: *"do we need to order materials?"*

### Feature: Supplier Intelligence
- Epic: Supplier performance/price tracking

### Feature: Material Cost Analysis
- Epic: Cost-per-use analysis (feeds Domain 2's Cost Analysis)

### Feature: Low Stock Alerts
- Epic: Threshold-based alerting (feeds Domain 8's Notifications)

---

## Domain 7 — Finance Services ⚪

### Feature: Journal
- Epic: Journal entry model & posting rules

### Feature: General Ledger
- Epic: GL account structure & rollups

### Feature: Treasury
- Epic: Cash position tracking

### Feature: Checks
- Epic: Check issuance/tracking (relevant for markets still using paper checks)

### Feature: Assets
- Epic: Fixed asset register & depreciation

### Feature: Tax
- Epic: Tax calculation rules (jurisdiction-specific — design deferred until a jurisdiction is picked)

### Feature: Financial Statements
- Epic: Statement generation — compliance-grade, deliberately form/table-shaped (see `VISION.md`'s "No" branch of the AI-first test)

### Feature: Cash Flow
- Epic: Cash flow statement & projection

### Feature: Profit & Loss
- Epic: P&L generation (feeds Domain 2's Profit Analysis directly once both exist)

---

## Domain 8 — Workflow Automation ⚪

### Feature: Business Rules
- Epic: Rule definition model

### Feature: Automation Engine
- Epic: Rule execution engine

### Feature: Triggers
- Epic: Event trigger framework (fires on domain data changes across the platform)

### Feature: Approvals
- Epic: Approval workflow — the human-in-the-loop gate before Domain 1's Business Actions execute at scale

### Feature: Notifications
- Epic: Multi-channel notification delivery (in-app, SMS, Telegram — reuses the provider-abstraction pattern already proven in the `malino-17tir` sibling project's `lib/sms.js`/`lib/telegram.js`)

### Feature: Smart Workflows
- Epic: Composable workflow builder (rules + triggers + approvals + actions, combined)

---

## Domain 9 — Insights ⚪

### Feature: Reports
- Epic: Report generation framework (on-demand, secondary surface per the vision)

### Feature: Dashboards
- Epic: Dashboard composition (widgets sourced from Domain 2's signals, not a separate data model)

### Feature: Charts
- Epic: Charting component library

### Feature: Exports
- Epic: Export to PDF/Excel/CSV

### Feature: KPI Explorer
- Epic: Ad-hoc KPI query/drill-down UI

---

## Domain 10 — Platform ⚪ (partially already in progress)

### Feature: Organizations
- Epic: Multi-org membership — **already in flight as TASK-006**
- Epic: Org settings/branding

### Feature: Permissions
- Epic: Role-based permission enforcement — **already in flight as TASK-007**

### Feature: API
- Epic: Public API surface for third-party integration (explicitly out of scope in the original MVP `.ai/ROADMAP.md` — stays deliberately unscheduled here too)

### Feature: Marketplace
- Epic: Plugin/extension marketplace (long-horizon — included for map completeness, not proximity)

### Feature: Plugins
- Epic: Plugin execution sandbox

### Feature: Audit
- Epic: System-wide audit log, especially for Domain 1's AI-initiated Business Actions

### Feature: Configuration
- Epic: Org-level configuration management

---

## Cross-domain dependency notes

- **Domain 2 depends on Domain 1** existing (it's what Domain 1 reasons
  about) — confirmed in `PRODUCT_ROADMAP.md`'s sequencing.
- **Domains 3, 4, 6 feed Domain 2** (CRM/Scheduling/Inventory data is
  what Profit/Cost/Forecasting analyze) — this is *why* they're tier
  🟡 rather than ⚪: they unlock Domain 2 maturing past its first-wave
  slice.
- **Domain 7 feeds Domain 2 directly** (Profit & Loss ↔ Profit
  Analysis) but stays ⚪ because it's also legitimately deferrable —
  Domain 2's first wave uses estimated/stubbed profit data, not real
  GL data, on purpose.
- **Domain 8 depends on Domain 1's Business Actions maturing** enough
  to be trusted to automate — sequenced last among the "later" domains
  for that reason, not arbitrarily.
- **Domain 10's Audit feature depends on Domain 1's Action audit
  trail** — same underlying log, two consumers.
