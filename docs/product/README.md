# Product Architecture — MLINO Vision 2.0

Permanent, multi-year product reference. Not sprint planning (that's
`.ai/CURRENT_SPRINT.md` / `.ai/sprints/`) — this is *what the product
is*, independent of which wave is currently being built.

**Status: proposed, awaiting approval.** Nothing here has changed any
live Sprint 1 assignment, GitHub Issue, or engineer file.

## Read in this order

1. [`VISION.md`](VISION.md) — what MLINO is, the core philosophy
   (conversation over navigation), and the decision rule for every
   future Sprint/Task ("can this be solved by AI conversation instead
   of another page?").
2. [`PRODUCT_PRINCIPLES.md`](PRODUCT_PRINCIPLES.md) — **v1.0, frozen,
   approved.** The permanent constitution. Ten non-negotiable (mostly)
   rules every future Sprint/Epic/Task is checked against, each with a
   real test, good/bad examples, and its explicit limits — not
   slogans. Governed by the table at its end; changes require a new
   ADR, never a direct edit.
3. [`PRODUCT_ROADMAP.md`](PRODUCT_ROADMAP.md) — all 10 domains, their
   goals, and priority tiers (🟢 Now / 🟡 Next / ⚪ Later).
4. [`FEATURE_TREE.md`](FEATURE_TREE.md) — the complete Domain → Feature
   → Epic decomposition, for all 10 domains, regardless of tier. The
   permanent map.
5. [`SPRINT_PLAN.md`](SPRINT_PLAN.md) — sequencing: Sprint 0/1 status,
   proposed Sprint 2 ("AI Core, Wave 1").
6. [`TASK_BREAKDOWN.md`](TASK_BREAKDOWN.md) — engineering-task-level
   detail, scoped only to the current wave (7 proposed tasks). Every
   other Epic in `FEATURE_TREE.md` intentionally stops at Epic level
   until its own wave is proposed.

## What happens after approval

Per explicit instruction: GitHub Issues, Milestones, and engineering
tasks are held until **`PRODUCT_PRINCIPLES.md` is approved** — that
approval gate now sits in front of everything else in this directory,
including the Sprint 2 Wave 1 proposal in `TASK_BREAKDOWN.md`. Once
approved, engineering tasks get generated incrementally — starting with
real GitHub Issues/Milestones for Sprint 2 Wave 1's 7 tasks, and
updates to `.ai/engineers/{PGSPC,AMINANSARCOM,SADAF}.md` assigning
them. That step has not happened yet.
