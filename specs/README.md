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
| 007 | **done**, superseded by 018 | Go API + SQLite + rate limit + logging (removed) |
| 007c | **done**, superseded by 018 | Netlify Free prep (static SPA, Go stays local — no Go left) |
| 008 | **done** | TanStack Query + fetch + Zod (fetch branch removed by 018) |
| 009 | **done**, content pipeline kept | Content API: SQLite SoT + chrome; pipeline relocated to `content/` by 018 |
| 010 | **done** | Netlify Free publish (depends on 007c) |
| 011 | **done** | Align `apps/web` to house rules (expressions, size, helpers, React 19) |
| 012 | **done** | Knip (unused files, exports, dependencies) |
| 013 | written | Map loaders (overlay + list skeletons) |
| 014 | written | Hide compact attribution “i” |
| 015 | written | Poland + Kraków playable borders |
| 016 | **done**, superseded by 018 | Standard Go layout (`cmd/api` + `internal/app`) (removed) |
| 017 | written | Richer six-story prose |
| 018 | **done** | Remove Go/SQLite backend (static-only content) + TypeScript 7 |

Child specs must include: Goal, Out of scope, Files, Done when (checkboxes, including tests covering ≥70% of the new behaviour, aim 80%). One child = one PR-sized change.
