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
