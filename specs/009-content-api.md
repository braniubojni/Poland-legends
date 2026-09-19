# SPEC 009 — Content API (SQLite SoT + chrome)

Status: **written** (not implemented)
Covers: **S-05**
Depends on: 007, 008, **016** (layout first if both are open)
Parent: [000-global.md](./000-global.md)

City/story payloads are already **seeded** in SQLite (`apps/api/internal/db/`). Local `pnpm dev:full` already hits the API (**008**). Prod still reads hand-maintained `cities.ts` / `krakow.ts` (**007c**). UI chrome is still inline `locale === "pl" ? …` in React. This spec makes SQLite the source of truth for **local** content **and** chrome, and generates the static dump Netlify ships.

## Goal

One seed. Local API serves it. Prod `queryFn`s read a generated dump of the same seed. No live SQLite on Netlify. No Fiber-as-Function.

## Out of scope

- Netlify Functions, Postgres, Redis, auth
- **017** wording changes (this spec copies today’s prose 1:1)
- **016** file moves (do 016 first)
- New cities, new story IDs, new game kinds
- POSTing quiz answers

## Behaviour

- SQLite remains SoT for `pnpm dev:api`. Seed cities, six Kraków stories (incl. games), and a **chrome** table/key-value of bilingual `Copy`.
- `GET /v1/chrome` returns the chrome map (no envelope). Zod parse on the web. Query key `['chrome']`.
- Chrome keys cover today’s inline UI, including (not exhaustive if a string is missed — inventory at implement time):
  - Home/city headings (`Poland, city by city`, `Stories that still stand.`, `Polska` back-link)
  - Locked city (`Coming next` / `Wkrótce`)
  - Story sections (`The legend`, `What we know`, `See it today`, `Play`)
  - Navigation (`Open`, `Next story`, `Back to the map`)
  - Game chrome (`Question`, `Done`, `Order`, `Reset`, `Point`, `This one`, almost/try-again)
  - Theme toggle, story not-found / load error
  - Map loader status if **013** has landed; otherwise leave a key for it
- First seed is **1:1** with current `cities.ts` / `krakow.ts` / inline chrome. Do not enrich prose here (**017**).
- Document and run a generate command that writes `apps/web/src/data/cities.ts`, `krakow.ts`, and `chrome.ts` from the seed (or from a checked-in JSON that the API also loads). Prod **007c** `queryFn`s keep using those files — they must not call `localhost`.
- After generate, hand-editing the TS dump is not the SoT. Edit seed, regenerate.
- Existing city/story routes stay the same shape as `data/types.ts`.

## Files

- `specs/009-content-api.md` (this)
- `apps/api/internal/db/` (schema + seed: chrome keys)
- `apps/api/internal/handlers/` (`GET /v1/chrome`)
- Generate script + `apps/web/src/data/chrome.ts` (and regenerated cities/stories)
- `apps/web/src/lib/api/` (chrome query + Zod)
- UI files that currently inline PL/EN chrome (AppShell, routes, StoryArticle, games, StoryStatus, map helpers, lists)
- `AGENTS.md` / `CLAUDE.md` (how to regenerate the dump)
- `specs/000-global.md`, `specs/README.md`

## Done when

- [ ] Local API serves cities, stories, and chrome from SQLite
- [ ] `GET /v1/chrome` matches the Zod schema; web uses `['chrome']`
- [ ] Inline `locale === "pl" ?` chrome in the listed UI is gone (wordmark `Opowieści` / `PL`/`EN` labels may stay)
- [ ] Generate command produces `cities.ts` / `krakow.ts` / `chrome.ts` from the same seed
- [ ] Prod path still has **no** `localhost` fetch (007c)
- [ ] Seed copy is 1:1 with pre-009 prose (017 not mixed in)
- [ ] Tests cover ≥70% of this spec’s new behaviour (aim 80%): chrome 200, missing-key handling, generate dump round-trip, Zod parse. Skip Netlify UI.
- [ ] typecheck / lint / fmt / `go test` pass
- [ ] 000 / README mark 009 **done**
