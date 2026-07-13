# PRODUCT_PRINCIPLES.md — MLINO's Constitution

> This is to the **product** what `.ai/CONSTITUTION.md` (in the
> `malino-17tir` sibling project) is to **engineering**: non-negotiable
> unless a new ADR/vision document explicitly supersedes it. Every
> future Sprint, Epic, and Task is checked against this document before
> it ships — not just at kickoff, at review too.
>
> Each principle below has three parts: the **rule**, a **test** you
> can actually apply to a real feature, and **where it doesn't apply**
> — a principle with no acknowledged limits isn't a principle, it's a
> slogan, and slogans don't survive contact with Domain 7's financial
> statements.

## 1. AI-first interface

**Rule:** the AI conversation is the primary way a user accomplishes
something in MLINO. Every other interface is secondary until proven
necessary.

**Test:** for any new capability, ask `VISION.md`'s question first —
*"can this be solved by AI conversation instead of another page?"* If
yes, the conversational path ships before or alongside any UI, never
as an afterthought bolted onto an existing page.

**Where it doesn't apply:** compliance-grade output (Domain 7's
financial statements), bulk data entry, and configuration screens are
legitimately form/table-shaped. Forcing these into chat isn't
AI-first, it's AI-shaped cosplay — see Principle 9 for the actual
pattern these should follow instead.

**Examples:**
- ✅ A manager types "how's my inventory looking?" and gets an answer
  with an offer to reorder low-stock items — no need to open an
  inventory page to find that out.
- ❌ A new "Low Stock Alerts" capability ships only as a dashboard
  widget, with no way to ask about it, or act on it, conversationally.

## 2. Conversation before dashboard

**Rule:** the default landing experience is the conversation (the
Executive Daily Brief + input box — `VISION.md`'s "Good morning"
screen), never a dashboard, for any user role, on any surface.

**Test:** when a new user role, module, or vertical is added, its first
screen is drafted as a conversation opener before anyone drafts a
dashboard layout for it.

**Where it doesn't apply:** nowhere, structurally — this is about
*default landing*, not about whether dashboards exist. Dashboards
still exist (Domain 9), just never as the front door.

**Examples:**
- ✅ Logging in shows: *"Good morning. Yesterday's revenue was up 12%,
  but Dr. Sara has had 3 cancellations this week."* — then an input box.
- ❌ Logging in shows a grid of charts and KPI cards, with a chat icon
  tucked in the corner as an extra feature.

## 3. Recommendation before reporting

**Rule:** when the AI has enough signal to suggest an action, it leads
with the recommendation, not the underlying numbers. The numbers are
one tap away (Principle 9), not the first thing said.

**Test:** read the AI's response to a business question out loud. If it
reads like a report ("Revenue was X, costs were Y, margin is Z%")
instead of a recommendation ("Margin dropped because of X — consider
Y"), it fails this principle regardless of how accurate the numbers
are.

**Where it doesn't apply:** when there isn't enough signal for a
responsible recommendation yet (Domain 2 still maturing — see
`SPRINT_PLAN.md`'s Wave 1 scoping), the honest answer is the data plus
an explicit "not enough history to recommend yet," not a fabricated
recommendation. Principle 6 (Explainable AI) governs this boundary.

**Examples:**
- ✅ *"Margin dropped 8% this month, mainly from a 15% rise in material
  costs — want me to compare suppliers?"*
- ❌ *"Revenue: $12,400. Costs: $9,800. Margin: 21%."* — accurate, and
  still a report, not a recommendation.

## 4. Automation before manual work

**Rule:** once an action is reliable enough to trust, MLINO should
offer to do it, not just describe that it needs doing.

**Test:** for any recurring manual task a feature surfaces (reordering
inventory, rescheduling a cancellation, flagging a risk), the roadmap
question isn't "should we show this to the user" but "when is this
safe to automate, and what does 'safe' require" — see Domain 8's
Automation Engine and its explicit sequencing *after* Domain 1's
Business Actions are trustworthy (`FEATURE_TREE.md` cross-domain
notes).

**Where it doesn't apply:** irreversible or compliance-sensitive
actions (issuing a check, finalizing a tax filing) require human
initiation even after automation infrastructure exists — this isn't a
maturity gap to close later, it's permanent, and it's exactly what
Principle 10 is for.

**Examples:**
- ✅ A cancellation is detected and the AI automatically offers the
  freed slot to the next waitlisted patient, pending one-tap manager
  confirmation.
- ❌ The AI shows "you have a cancellation" and leaves the manager to
  manually check the waitlist and call each patient.

## 5. Memory-driven interactions

**Rule:** the AI should get better at helping a specific organization
the longer it's used, by actually remembering what it's learned, not
by re-deriving context from scratch every conversation.

**Test:** ask the same kind of question twice, weeks apart, in
different words. If the AI's answer doesn't reflect anything learned
between the two conversations, memory isn't working, regardless of how
good either individual answer is.

**Where it doesn't apply:** patient/customer health or otherwise
sensitive personal data has its own retention/deletion rules (already
flagged as an open question in the MVP's memory-architecture
discussion) — "remember everything forever" is not the same principle
as "remember what's useful," and the two must not be conflated when
memory retention policy is actually designed.

**Examples:**
- ✅ Two weeks after a manager mentions wanting to cut late
  cancellations, the AI opens with *"since you mentioned reducing late
  cancellations — here's what's changed."*
- ❌ Every conversation starts from zero, and the manager re-explains
  the same recurring problem each time they bring it up.

## 6. Explainable AI

**Rule:** every score, recommendation, or automated action the AI
produces must be able to answer "why" in terms a non-technical business
owner understands — not a confidence percentage alone, not a black box.

**Test:** for any AI output, there's a real answer to "why do you say
that?" that references specific business data, not the model's general
knowledge. If the honest answer would be "the model just generated
that," the feature isn't ready to ship as a recommendation — it ships
as a question back to the user instead, or not at all.

**Where it doesn't apply:** nowhere — this is the one principle with no
carve-out. Un-explainable automation (Principle 4) or un-explainable
recommendations (Principle 3) are the two places this product is most
likely to lose trust in one bad interaction, so this principle
overrides the other two when they'd conflict.

**Examples:**
- ✅ *"Flagging Dr. Sara's schedule as at-risk: 3 cancellations in 2
  weeks, versus her usual 0–1."* — a specific, checkable reason.
- ❌ *"Risk score: 82/100."* — with no accessible reason behind the
  number.

## 7. Business-first, accounting-second

**Rule:** MLINO is not accounting software with an AI feature bolted on
— accounting (Domain 7) is one service the Business Brain draws
on, positioned behind Domains 1–2 in every roadmap decision
(`PRODUCT_ROADMAP.md`).

**Test:** when a feature request could be framed either as "better
accounting" or "the AI understands the business better," the second
framing wins the roadmap slot, even if the first would be easier to
build. If a proposal starts from "what does our chart of accounts need"
instead of "what does the manager need to know," it's being designed
backwards relative to this principle.

**Where it doesn't apply:** compliance-grade financial correctness
itself is never negotiable *once Domain 7 is being built* — this
principle governs sequencing and framing, not accuracy. "Business-first"
does not mean "accounting can be sloppy."

**Examples:**
- ✅ The roadmap prioritizes "AI explains why profit dropped" over
  "add multi-currency journal entry support."
- ❌ Sprint planning starts from "what does the chart of accounts
  need" instead of "what does the manager need to know."

## 8. Multi-industry architecture

**Rule:** nothing in Domains 1, 2, 8, 9, or 10 should hard-code
dental-clinic-specific concepts. Vertical-specific concepts (patients,
doctors, appointments) belong in Domains 3–6, built so a second
vertical could plug in without a rewrite of the core.

**Test:** before naming a new model, field, or concept in Domain
1/2/8/9/10 code, ask "would this word make sense to a retail shop or a
law firm, not just a dental clinic?" If not, it belongs in Domain 3–6
instead, generalized (see `FEATURE_TREE.md`'s Domain 3 "Customer
Profile" epic existing specifically to generalize "Patient Profile").

**Where it doesn't apply:** this is architecture discipline, not a
promise that a second vertical ships soon — `.ai/VISION.md`'s existing
"the dental clinic vertical is the first tenant type, not the ceiling"
already established this; this principle is how that stays true in
code, not a new commitment to build a second vertical.

**Examples:**
- ✅ Domain 1's Memory model stores a generic `subjectType`/`subjectId`
  pair, not a hardcoded `patientId` column.
- ❌ `ChatService` (Domain 1, core) imports a `Patient` type directly
  instead of a generic `Customer`/`Subject` abstraction.

## 9. Progressive disclosure of information

**Rule:** start with the conclusion, let the user ask for more. Every
AI response has an implicit "want more detail?" layer underneath it,
not a wall of information upfront.

**Test:** the first thing a user sees for any question should be
answerable in one sentence. Charts, tables, and full reports (Domain 9)
are the second layer, reached by asking, never the first thing shown
unless the user explicitly asked for a report.

**Where it doesn't apply:** this is the *mechanism* by which Principles
2 and 3 are actually implementable without becoming useless (a
recommendation with zero supporting detail available on request isn't
trustworthy, it's just an assertion) — so this principle has no
carve-out either, it's infrastructure for the others.

**Examples:**
- ✅ *"Profit is down this month."* first, with a tappable "see
  breakdown" that reveals the full P&L table on request.
- ❌ The AI's first reply is a complete financial statement pasted
  into the chat before anyone asked for detail.

## 10. Human override for every AI action

**Rule:** any action MLINO's AI takes on a user's behalf must be
visible, reversible where possible, and stoppable — a human can always
see what the AI did and undo or override it.

**Test:** for any new Business Action (Domain 1) or automated Workflow
(Domain 8), the design isn't complete until there's a real answer to
"how does a manager find out this happened, and how do they undo it if
it was wrong" — not a hypothetical answer, an actual audit-trail entry
(`FEATURE_TREE.md`'s Domain 1 "Action audit trail" epic, feeding
Domain 10's Audit feature) and a real reversal path.

**Where it doesn't apply:** nowhere — irreversible actions (Principle
4's exception) don't get an exemption from this principle, they get a
*stricter* version of it: irreversible actions require confirmation
*before* they happen, not just visibility after.

**Examples:**
- ✅ An automated inventory reorder appears in an activity log with a
  visible "undo" and a notification to the manager, before it's final.
- ❌ The AI silently reorders inventory with no record of what it did
  or why, discoverable only by noticing the invoice later.

## How this document is used

- A new Epic or Task that conflicts with a principle here needs an
  explicit, written exception in its own spec (same discipline as an
  ADR overriding the engineering Constitution) — not a silent
  violation.
- When two principles conflict in a specific feature (flagged in
  Principle 6's note about overriding 3/4), the more restrictive one
  wins by default unless a product decision explicitly says otherwise.
- This document changes rarely and deliberately. `PRODUCT_ROADMAP.md`
  and `SPRINT_PLAN.md` move constantly — if you find yourself editing
  this file often, something is being decided at the wrong altitude.

## Governance

| Principle | Mandatory | Override Allowed | ADR Required |
|---|---|---|---|
| 1. AI-first interface | Yes | Yes — for the named exception categories (compliance forms, bulk data entry, configuration screens) | No — case-by-case, via Principle 9's disclosure pattern |
| 2. Conversation before dashboard | Yes | No | N/A |
| 3. Recommendation before reporting | Yes | Yes — when signal is genuinely insufficient (must say so explicitly, never fabricate a recommendation) | No |
| 4. Automation before manual work | Yes | Yes — irreversible/compliance-sensitive actions never auto-execute | **Yes** — classifying any action as "safe to automate" vs. "always manual" |
| 5. Memory-driven interactions | Yes | Yes — sensitive personal data follows its own retention/deletion rules | **Yes** — the retention/deletion policy itself |
| 6. Explainable AI | Yes | No | N/A |
| 7. Business-first, accounting-second | Yes (sequencing) | Yes — roadmap prioritization is inherently case-by-case | No |
| 8. Multi-industry architecture | Yes | Only via a documented decision | **Yes** — any exception that hardcodes a vertical-specific concept into Domains 1/2/8/9/10 |
| 9. Progressive disclosure of information | Yes | No | N/A |
| 10. Human override for every AI action | Yes | No | N/A |

**Reading the table:** "Override Allowed: No" + "ADR Required: N/A"
means the principle has no escape hatch at all — Principles 2, 6, 9,
and 10 are absolute. Where "ADR Required: Yes," the override itself
doesn't exist until an ADR defining its boundary is written and
accepted — a Task cannot invoke Principle 4, 5, or 8's exception on its
own authority, only reference an ADR that already did.

## Version

**v1.0 — Frozen.** Approved as the permanent product constitution.

From this point forward, this document is not edited directly. A
change to any principle, its test, its examples, or the Governance
table requires a new ADR (`docs/ADR/`) that explicitly proposes
amending `PRODUCT_PRINCIPLES.md`, the same way an ADR would be required
to override `.ai/CONSTITUTION.md` on the engineering side. Once such an
ADR is accepted, this document is updated to match it and bumped to
v1.1 — the version number and this section's own wording move only
alongside an accepted ADR, never as a standalone doc edit.
