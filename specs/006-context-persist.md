# SPEC 006 — Context persist

Status: done
Covers: **S-02**
Depends on: 005
Parent: [000-global.md](./000-global.md)

zustand persist is the last piece of the old store. This spec keeps the same `opowiesci-v1` blob and the same fields, and moves them onto React Context.

## Goal

`ProgressProvider` owns `locale`, `theme`, `completed: string[]`, and `markDone`. Persist to `localStorage` key `opowiesci-v1` (keep version + migrate). Reload keeps PL/EN, explicit theme, and completed stories.

## Out of scope

- TanStack Query + `fetch` + Zod (008)
- Go API, SQLite, rate limit (007)
- Content behind the API (009)
- Netlify (010)
- House-style retrofit of existing UI files (011)
- New stories, copy, maps, or chrome

## Behaviour

- Same key: `opowiesci-v1`.
- Same fields: `version`, `locale`, `theme` (`"light" | "dark" | null`), `completed: string[]`.
- On load, accept the current zustand wrapper `{ state, version }` **and** a flat `{ version, locale, theme, completed }`.
- On save, write the flat snapshot (version 1).
- Invalid JSON / unknown locale / non-array `completed` → defaults (`en`, `theme: null`, `[]`).
- `markDone` appends once.
- `theme: null` still means first visit follows `prefers-color-scheme`; after an explicit tap, storage wins.
- Pre-paint boot script reads theme from `state.theme` or top-level `theme` so a migrated blob does not flash parchment on a dark reload.

## Files

- `specs/006-context-persist.md` (this)
- `apps/web/src/lib/progress/` (`helpers.ts`, `ProgressProvider.tsx`, `index.ts`)
- `apps/web/src/routes/__root.tsx` (`ProgressProvider` wraps the tree)
- Call sites of `useProgress` (selector → context value)
- `apps/web/index.html`, `apps/web/src/lib/theme.ts` (boot)
- `apps/web/package.json` (drop zustand)
- `AGENTS.md`, `specs/000-global.md`, `specs/README.md`

## Done when

- [x] No zustand in the product path
- [x] Reload keeps locale, explicit theme, and `completed`
- [x] Existing `opowiesci-v1` zustand blobs still load
- [x] First visit with empty storage follows OS theme
- [x] Vitest covers parse/migrate; typecheck / lint / fmt pass
- [x] 000 / README mark 006 **done**
