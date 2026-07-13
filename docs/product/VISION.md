# VISION.md — MLINO Vision 2.0

> Supersedes the informal vision statement in `.ai/README.md`
> ("MLINO is a generic AI Business Partner platform"). This document
> sharpens that into something buildable and permanent. It does not
> contradict it — it's the same north star, made specific.

## What MLINO is

**MLINO is an AI-first Business Operating System.**

Not accounting software. Not an ERP. Accounting is one *service*
running inside the platform (Domain 7 — Finance Services), not the
product's core. The core is a conversational AI — the **Business
Brain** — that understands the organization, remembers its history,
reasons about its state, and recommends or takes action.

## The philosophy, in one shape

**Wrong** (the traditional SaaS shape — and, honestly, the shape the
first MVP shipped in):

```
User → Dashboard → Search → Forms → Reports → Decision
```

**Correct** (what every feature from here forward is built toward):

```
User → Conversation with AI → AI understands intent →
AI gathers business information → AI analyzes →
AI recommends actions → User optionally opens details
```

Dashboards, tables, and reports (Domain 9 — Insights) are not deleted —
they become **secondary surfaces**, shown only when a user explicitly
asks for more detail. They stop being the primary way anyone
experiences the product.

## The Business Brain

The AI Assistant is not a chat widget bolted onto a dashboard. It is
meant to become the organization's Business Brain:

- **Understand** — real business data, in context, not generic Q&A.
- **Remember** — organizational history, not just the current
  conversation (Domain 1's Memory feature).
- **Reason** — connect signals across the business (Domain 2).
- **Recommend** — a specific next action, not a wall of numbers.
- **Automate** — execute the action when authorized to (Domain 8).

## The first screen

When a clinic manager opens MLINO, the first thing they see is not a
dashboard. It's:

> "Good morning. How can I help you today?"

With real answers available to real questions: *"How is my clinic
today?" "Why is our profit lower?" "Do we need to order materials?"
"Which doctor should receive this patient?" "Show today's risks."*

## The decision rule for every future Sprint or Task

Before creating any new Sprint or Task, ask:

> **Can this experience be solved by AI conversation instead of
> another page?**

- **Yes** → the conversational implementation is the primary one. A
  traditional UI for it, if built at all, is secondary and deferred.
- **No** → build a traditional interface. Not everything is a
  conversation — data entry, compliance-grade financial statements,
  and configuration screens (Domain 7, parts of Domain 10) are
  legitimately form/table-shaped, and forcing them into chat would be
  worse, not more "AI-first."

## Relationship to what's already built

Nothing already merged is invalidated. Auth, organizations, partners,
and the chat/memory/LLM-gateway foundation (Sprint 0–1) are exactly the
substrate Domain 1 (AI Core) builds on — they were the right first
layer regardless of which product philosophy sits on top of them. This
vision changes what gets prioritized *next*, not what already exists.
