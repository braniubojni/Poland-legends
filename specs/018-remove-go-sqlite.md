# SPEC 018 — Remove Go/SQLite backend; static-only content, TypeScript 7

Status: **done**
Covers: reverses/supersedes part of **S-03** (007), **S-04** (008), **S-05** (009), **S-09** (007c) — see the [amendment to 000](#amendment-to-specs000-globalmd-required-alongside-this-spec) below
Depends on: 009 (done) — this spec keeps 009's JSON + generator pipeline, only relocates it
Parent: [000-global.md](./000-global.md)

## Why

007/008/009 built a local Go+Fiber+SQLite API so `pnpm dev:api`/`dev:full` could exercise a real HTTP path in dev. Netlify Free (007c/010, locked) never runs it — production has always been 100% static. In practice the Go server buys dev a live-network code path that prod never uses and no feature depends on: the "no such city/story" case already surfaces identically via `NotFoundError` thrown from the static loaders (`apps/web/src/lib/api/helpers.ts`), with or without a real HTTP round-trip. Keeping an unused backend around fights the repo's own dead-code rule (Knip) and means maintaining a second toolchain (Go) for zero shipped behaviour.

This spec removes Go+SQLite, collapses dev and prod onto the same static content path, and — while touching tooling anyway — bumps `typescript` to 7.0 (stable since July 2026, drop-in `tsc` replacement, ~10x faster typecheck). The TS7 bump is unrelated to the backend removal but fits the same "simplify tooling" pass, so it rides along in this spec rather than getting its own.

## Out of scope

- Any new backend (Node, edge functions, etc.) — this spec removes a backend, does not add one.
- Changing `seed.json`/`chrome.json` content or the generator's output shape (009's design stays; only its file location moves).
- Any dependency upgrade beyond `typescript`.
- 013–015 (map polish), 017 (richer prose) — untouched, still pending in their own specs.

## Behaviour

### Static-only content (no backend)

- Delete `apps/api/` entirely (Go module, Fiber, SQLite, all Go tests). Recoverable from git history if ever needed.
- `apps/web/src/lib/api/client.ts`: delete `usesStaticContent()`, `API_BASE`, `fetchJson` — there is no other branch left to take.
- `apps/web/src/lib/api/queries.ts`: each `queryFn` calls the static loader directly (`loadCities`, `loadCity`, `loadStory`, `loadChrome`), no ternary.
- `apps/web/src/lib/api/helpers.ts` and its `NotFoundError` stay exactly as-is — they already do the real work and are how "no such city/story" surfaces to routes.
- Root `package.json`: delete `dev:api` and `dev:full`. `pnpm dev` is the only local run command.
- Remove any `VITE_API_URL` references — nothing left to point at a URL.

### Content pipeline (relocated, not redesigned)

- `apps/api/internal/db/seed.json` and `chrome.json` move to `content/seed.json` and `content/chrome.json` at the repo root (a plain data directory, no Go attached).
- `scripts/gen-content.mjs` updates its `dbDir` constant to `content/`. Nothing else about the generator changes — it already read these as plain JSON, never through SQLite.
- `pnpm gen:content` keeps working exactly as today; output must be byte-for-byte identical to pre-move.
- `apps/web/src/data/generated.test.ts` (009's drift guard) updates its path constant to `content/` and keeps passing.

### TypeScript 7

- `apps/web/package.json`: `"typescript": "^7.0.0"` (currently `^5.9.3`).
- `pnpm --filter web typecheck` (`tsc --noEmit`) must pass unchanged — TS7's `tsc` is behaviour-compatible with 6.0/5.9 per Microsoft's migration notes; this is a version bump, not a rewrite.
- No `tsconfig.json` changes expected. Note any that turn out to be necessary in the implementing PR.

## Files

- Delete: `apps/api/` (whole tree — Go module, Fiber, SQLite, tests)
- `content/seed.json`, `content/chrome.json` (moved from `apps/api/internal/db/`)
- `scripts/gen-content.mjs`
- `apps/web/src/data/generated.test.ts`
- `apps/web/src/lib/api/client.ts`, `queries.ts`, `helpers.ts`, `helpers.test.ts`
- `apps/web/package.json` (`typescript` version)
- `package.json` (root scripts)
- `netlify.toml` — confirm no change needed (007c never referenced `apps/api`)
- `AGENTS.md`, `CLAUDE.md`, `specs/000-global.md`, `specs/README.md`

## Done when

- [x] `apps/api/` deleted; `go.mod`/`go.sum` gone from the repo
- [x] `pnpm dev:api` / `pnpm dev:full` removed; `pnpm dev` is the only local run command
- [x] `client.ts` deleted; `NotFoundError` moved to `helpers.ts`; `queries.ts` `queryFn`s call the static loaders directly with no ternary
- [x] `seed.json`/`chrome.json` live at `content/`, outside `apps/api`; `pnpm gen:content` regenerates `cities.ts`/`krakow.ts`/`chrome.ts` (data bodies byte-for-byte identical to before the move; only the "source of truth" banner comment line changed)
- [x] `apps/web/package.json` pins `typescript@^7` (`7.0.2` installed); `pnpm --filter web typecheck` passes
- [x] `pnpm --filter web lint` / `fmt:check` / `test` / `knip` pass
- [x] `pnpm --filter web build` still produces a working `dist/` with no `localhost` reference (007c's guarantee, now trivially true since there is no fetch left to point at `localhost`)
- [x] Tests cover ≥70% of this spec's new behaviour (aim 80%): new `queries.test.ts` covers static-path queries resolving/404-ing with no ternary; updated `generated.test.ts` covers the generator round-trip from the new `content/` path
- [x] `specs/000-global.md` amended per below; `specs/README.md` marks this spec **done** and updates 007/007c/008/009's one-line descriptions to note supersession

## Amendment to specs/000-global.md required alongside this spec

This reverses part of the locked architecture (007/008/009's "Go + SQLite locally, static dump in prod" design), so per this repo's rule ("if a child spec would conflict with 000-global.md, stop and amend 000 first") it needs a 000 amendment, not a silent divergence, applied when this spec is implemented:

- **Stack lock**: drop "Go API (Fiber + SQLite)" from the backend row; replace with "No backend — static content only, generated via `pnpm gen:content` from `content/seed.json`/`chrome.json`".
- **S-03 (→ 007)** and **S-09 (→ 007c)**: annotate "done, superseded by 018" rather than deleting the historical record.
- **S-05 (→ 009)**: annotate "content pipeline kept; Go/SQLite serving layer superseded by 018".
- Split-order table: add row 20, `018 Remove Go/SQLite + TS7` depends on 009.
- `apps/web/src/routes/krakow/index.tsx`'s Kraków-page paragraph and any other doc text describing "local `pnpm dev:full` talks to `apps/api`" gets rewritten to describe the static-only reality.

## Non-goals reaffirmed

Everything already out of scope in 000 stays out of scope: accounts, Postgres, other cities, native apps, a live backend of any kind on Netlify (Functions, Edge Functions) — this spec makes "no live backend" permanent rather than "not yet built."
