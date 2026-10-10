# SPEC 021 — Playwright e2e + 90% coverage gate

Status: **written** (not implemented)
Covers: none (new, propose adding to 000 as S-13)
Depends on: 005 (Vitest bootstrap), 011 (house style), 020 (git hooks — pre-push is where this plugs in)
Parent: [000-global.md](./000-global.md)

Today: Vitest unit tests only (`apps/web/src/**/*.test.ts`), no coverage number tracked, no browser-level test. Unit tests can't catch a MapLibre pin that never renders, a route that 404s, or a game that doesn't actually mark a story done end to end.

## Goal

- Add [Playwright](https://playwright.dev/) as the e2e layer alongside the existing Vitest unit suite (not a replacement).
- Add a coverage gate: **90%** statements/branches/functions/lines on the Vitest unit suite, enforced in CI-shape (fails the `test` script, which 020's pre-push hook already runs).

## Out of scope

- Replacing Vitest or oxlint/oxfmt with a different runner.
- Visual regression / screenshot-diff testing (Playwright supports it; not requested, adds flakiness and asset storage cost — separate spec if wanted).
- Cross-browser matrix in CI (no CI exists yet — 020 note applies). Playwright config still lists chromium/firefox/webkit so it's a one-line change to add a matrix once CI exists.
- 90% on generated/vendored files (see exclusions below) — that number would be free and meaningless.
- Running Playwright inside the git pre-push hook (020) — a browser suite is too slow for a local hook; it runs via `pnpm --filter web test:e2e` on demand and is the natural next thing to add once a CI workflow exists.

## Why 90% needs scoping, not just a threshold

A blanket 90% over the whole `src/` tree would either be fake (excluding everything hard) or force tests that verify a canvas/WebGL wrapper renders instead of that it behaves. Split the codebase by what each layer is *for* and test it there:

| Layer | Example | Covered by |
|---|---|---|
| Pure logic | `lib/progress/helpers.ts`, `story-art-helpers.ts`, query option builders | Vitest unit tests — this is where 90% is real and enforced |
| Generated / vendored | `routeTree.gen.ts`, `data/{cities,krakow,chrome}.ts`, GeoJSON assets | Excluded from the coverage denominator (see 009/018 — hand-editing or hand-testing generated output is the wrong layer) |
| MapLibre/canvas wrappers | `components/map/*Libre.tsx` | Thin — logic already extracted to colocated `helpers.ts` per 011; the wrapper itself is exercised by Playwright (real Chromium renders WebGL), not jsdom |
| User-visible flows | Poland → Kraków → story → game → completion persisted | Playwright, not Vitest |

**Investigate before locking the exclusion list**: run `pnpm --filter web test -- --coverage` once instrumented and look at the actual uncovered lines per file before deciding what's structurally untestable vs. just untested. Don't pre-exclude a file because it looks hard — exclude it because coverage on it would be canvas-rendering theater, and say which files those are and why in the PR.

## Behaviour

**Coverage:**

- Add `@vitest/coverage-v8` devDependency; `test.coverage` in `apps/web/vite.config.ts`: `provider: 'v8'`, `reporter: ['text', 'html']`, `thresholds: { statements: 90, branches: 90, functions: 90, lines: 90 }`, `exclude` for generated/vendored files (`src/routeTree.gen.ts`, `src/data/**`, `**/*.gen.ts`) plus whatever the investigation step above confirms is canvas/WebGL wrapper code, not logic.
- `pnpm --filter web test` (already what 020's pre-push runs) fails when under threshold — no separate `test:coverage` script needed, coverage is just always on.
- Write the unit tests needed to actually clear 90% on the included set — this is the bulk of the work, not the config.

**Playwright:**

- `@playwright/test` devDependency in `apps/web`; `apps/web/playwright.config.ts` targeting the Vite `preview` server (build once, serve statically — matches how Netlify actually serves it) on a fixed port, chromium project only for now (see out-of-scope).
- Test dir: `apps/web/e2e/`. Scripts: `apps/web/package.json` → `"test:e2e": "playwright test"`; root alias `"test:e2e": "pnpm --filter web test:e2e"`.
- Golden-path specs (bilingual PL/EN where the flow touches locale):
  - Home → Poland map → click Kraków (unlocked) → lands on `/krakow`.
  - Home → click a locked city → "Wkrótce / Coming next", stays on `/`.
  - `/krakow` → click a story pin → `/krakow/$storyId` renders legend + fact + game.
  - Complete a game → story marked done (persisted, reload keeps it) → "next story" link works.
  - Locale toggle persists across a navigation; theme toggle persists and honors dark tokens (no MUI purple).
- WebGL note: headless Chromium renders MapLibre via SwiftShader out of the box; confirm during implementation, don't assume — if a specific CI/sandbox environment can't do it, `--headed`/`xvfb` is the documented fallback, not a reason to skip map assertions.

## Files

- `apps/web/vite.config.ts` (coverage config)
- `apps/web/package.json`, root `package.json` (scripts, devDependencies)
- `apps/web/playwright.config.ts`
- `apps/web/e2e/*.spec.ts`
- New/expanded `*.test.ts` across `apps/web/src/**` wherever coverage is short
- `.gitignore` (Playwright report/output dirs, coverage output dir)

## Done when

- [ ] `pnpm --filter web test` enforces 90% statements/branches/functions/lines on the non-excluded set and currently passes
- [ ] Coverage exclusion list is written down in this spec (or the vite config comment) with the reason per entry, not just the glob
- [ ] `pnpm --filter web test:e2e` runs the golden-path Playwright specs above against a built preview server, headless, and passes
- [ ] Playwright artifacts (`playwright-report/`, `test-results/`) and coverage output (`coverage/`) are gitignored
- [ ] typecheck / lint / fmt pass
- [ ] 000 / README mark 021 **done**
