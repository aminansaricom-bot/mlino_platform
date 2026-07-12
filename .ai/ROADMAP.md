# ROADMAP

## MVP (building now)
Landing → Auth → Create Organization → Create Partner → Chat → AI reply → persist Conversation/Message/Memory → view history.

## Not in MVP (TODO, not built)
- TODO: multi-organization membership / invites (tracked: Issue #6)
- TODO: roles & permissions within an organization (tracked: Issue #7)
- TODO: real LLM provider selection / cost tracking (tracked: Issue #8)
- TODO: streaming chat responses (tracked: Issue #9)
- TODO: conversation search (tracked: Issue #10)
- TODO: billing/licensing (dental-project-style licensing does NOT apply here)
- ~~TODO: tests~~ — done, Issue #3, apps/api unit tests for AuthService + OrganizationsService.assertMember
- ~~TODO: production auth hardening (refresh tokens, rate limiting, password reset)~~ — done, Issue #5 (backend only; frontend wiring for refresh/reset is a new fast-follow TODO below)
- TODO: frontend wiring for refresh-token silent refresh and password-reset UI (backend contract exists as of Issue #5)
