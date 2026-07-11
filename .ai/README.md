# .ai

Read before working on this repo:
1. PROJECT_STATE.md — ground truth of what exists today.
2. ROADMAP.md — what's in/out of scope (MVP only, everything else is a TODO line).
3. CURRENT_SPRINT.md — pointer to the active sprint's detail.
4. docs/ADR/ — why the stack was chosen.

## Engineering management is repo-driven, not chat-driven

If you are an engineer (human or AI) assigned to this project, you do
not need instructions from a chat conversation. Go to
`.ai/engineers/<YOUR_NAME>.md` — it is your complete entry point:
mission, assigned tasks, priority, dependencies, Definition of Done,
next task, known blockers. Each task it links to
(`.ai/sprints/sprint-NN/tasks/<YOUR_NAME>/TASK-NNN-*.md`) is fully
self-contained. Never invent work outside your assigned tasks — if you
find something that needs doing, propose a new task or flag it in
`.ai/sprints/sprint-NN/reports/`, don't just do it.

This is a separate project from `malino-17tir` (dental clinic SaaS). Same
company, different product: MLINO is a generic AI Business Partner
platform. Do not copy dental-domain concepts (Clinic/Patient/License)
into this repo — this repo's domain is Organization/Partner/Conversation.
