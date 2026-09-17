# Opowieści — specs

Read **[000-global.md](./000-global.md)** first. That file is the source of truth.

Do not implement from this README. Split work only by creating a numbered child spec (`001-…`, `002-…`) that quotes the global IDs it covers, then implement that child.

| ID | Status | Title |
|---|---|---|
| 000 | **locked** | Global todo (this folder) |
| 001 | **done** | Dark mode |
| 002 | **done** | Poland map (MapLibre + OpenFreeMap) |
| 003 | not written | Kraków map (no tile CDN / no API key) |
| 004 | not written | Story images |
| 005 | not written | Local repo bootstrap (Vite + TanStack Router + MUI + oxlint/oxfmt + Vitest) |
| 006 | not written | State: Context API + persist |
| 007 | not written | Go API + SQLite + rate limit + logging |
| 008 | not written | TanStack Query + fetch + Zod |
| 009 | not written | Move story/city content behind the API |

Child specs must include: Goal, Out of scope, Files, Done when (checkboxes). One child = one PR-sized change.
