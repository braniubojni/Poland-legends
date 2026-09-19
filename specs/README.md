# Opowieści — specs

Read **[000-global.md](./000-global.md)** first. That file is the source of truth.

Do not implement from this README. Split work only by creating a numbered child spec (`001-…`, `002-…`) that quotes the global IDs it covers, then implement that child.

| ID | Status | Title |
|---|---|---|
| 000 | **locked** | Global todo (this folder) |
| 001 | **done** | Dark mode |
| 002 | **done** | Poland map (MapLibre + OpenFreeMap) |
| 003 | **done** | Kraków map (OpenFreeMap + MapLibre) |
| 004 | **done** | Story images |
| 005 | **done** | Local web bootstrap (Vite SPA + MUI + oxlint/oxfmt + Vitest) |
| 006 | **done** | State: Context API + persist |
| 007 | **done** | Go API + SQLite + rate limit + logging |
| 007c | **done** | Netlify Free prep (static SPA, Go stays local) |
| 008 | **done** | TanStack Query + fetch + Zod |
| 009 | written | Content API: SQLite SoT + chrome; prod generated 007c dump |
| 010 | **done** | Netlify Free publish (depends on 007c) |
| 011 | **done** | Align `apps/web` to house rules (expressions, size, helpers, React 19) |
| 012 | **done** | Knip (unused files, exports, dependencies) |
| 013 | written | Map loaders (overlay + list skeletons) |
| 014 | written | Hide compact attribution “i” |
| 015 | written | Poland + Kraków playable borders |
| 016 | written | Standard Go layout (`cmd/api` + `internal/app`) |
| 017 | written | Richer six-story prose |

Child specs must include: Goal, Out of scope, Files, Done when (checkboxes, including tests covering ≥70% of the new behaviour, aim 80%). One child = one PR-sized change.
