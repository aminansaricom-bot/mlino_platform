# ADR-0001: MVP stack
**Status:** Accepted
**Date:** 2026-07-11

## Context
Need to ship a working MVP fast: auth → org → partner → chat → AI reply → persisted history.

## Decision
NestJS (API) + Next.js (web) + Prisma + PostgreSQL, npm workspaces monorepo
(`apps/api`, `apps/web`), Docker Compose for local Postgres. LLM access
through one small gateway service (`LlmGatewayService`) behind an
interface, provider selected by env var, with a `mock` provider as the
zero-config default so the MVP runs without any paid API key.

## Consequences
Easy: one repo, one command to get Postgres up, NestJS/Next.js are both
mainstream and well-documented. Harder: two runtimes to start locally
(api + web) instead of one — accepted, this is what the brief asked for.
This is unrelated to `malino-17tir` (Express/vanilla JS dental SaaS) —
no shared code, no shared deployment.
