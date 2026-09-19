# SPEC 012 — Knip

Status: **done**
Covers: **S-08**
Depends on: 005
Parent: [000-global.md](./000-global.md)

Wire Knip into `apps/web` so unused files, exports, and package.json deps fail the same way lint does. No product/UI change.

## Goal

- `knip` is a web **devDependency**. Script: `pnpm --filter web knip`. Root alias `pnpm knip` (same pattern as lint/test).
- Config for this Vite SPA: entries `index.html` / `src/main.tsx`, TanStack file routes, Vitest.
- Ignore `.grok/`, `artifacts/`, `specs/`.
- First pass: delete or wire up real dead code until Knip is clean. Do **not** delete things later specs still need (`data/cities.ts` / `krakow.ts` stay for 007c prod + 009).
- Do not invent a second unused-code tool (ts-prune, depcheck, unimported).
- No product/UI change.

## Out of scope

- New features, copy, map cameras/pins, or chrome
- 009 content cutover
- A second unused-code tool
- GitHub Actions / CI YAML (none exists; Knip is a local script like oxlint)
- Deleting 007c's static `queryFn` data path

## Files

- `specs/012-knip.md` (this)
- `apps/web/package.json` (`knip` script + `knip` devDependency)
- `package.json` (root `knip` alias)
- `apps/web/knip.config.ts`
- `apps/web/src/lib/knip/helpers.ts` + `helpers.test.ts`
- `AGENTS.md`, `CLAUDE.md`
- `specs/000-global.md`, `specs/README.md`

Dead-code deletions land in whatever files Knip reports; do not restyle them.

## Done when

- [x] `pnpm --filter web knip` (and `pnpm knip`) exits 0
- [x] Config entries cover `index.html`, `src/main.tsx`, TanStack file routes, and Vitest
- [x] Config ignores `.grok/`, `artifacts/`, `specs/`
- [x] No `ts-prune` / `depcheck` / `unimported` in package.json
- [x] Tests cover ≥70% of the bullets above (config shape, scripts, ignore, forbidden tools)
- [x] typecheck / lint / fmt / test pass
- [x] Behaviour unchanged: maps, lists, games, theme, PL/EN, persist
- [x] 000 / README mark 012 **done**
