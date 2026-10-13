# SPEC 000 — Global todo (Opowieści)

Status: **locked** (split into child specs before coding)
Product: **Opowieści** — map of Polish stories; Kraków first
Audience for this file: you, Cursor, Grok Build (local)

This is not an implementation spec. It is the backlog + architecture lock so later child specs stay small and do not invent a second product.

---

## How to use

1. Keep this file as the only global list.
2. When you start work, copy **one** `G-xx` / `P-xx` / `S-xx` / `B-xx` block into a new `specs/00N-….md`.
3. Mark the ID here as `→ 00N`.
4. Implement only that child. No drive-by stack rewrites.
5. Cover **at least 70%** of that child’s new behaviour with tests (aim **80%**) before marking it done. See `.cursor/rules/spec-test-coverage.mdc`.

If a child conflicts with this file, **stop and amend 000** first.

---

## Product (do not change without an amendment)

- Poland map → city → story pin → legend + documented fact + one short game + “see it today”.
- v1 city: **Kraków**, six pins: hejnał, smok, wieże, lajkonik, gołębie, rynek 1257.
- UI languages: **PL** and **EN**.
- No accounts.
- Keep the current visual language: parchment, ink, crimson `#9C1C2C`, Fraunces + Source Sans 3, hairline borders. Polish chrome, not default Material.

---

## Current snapshot (this codebase, 2026-09-17)

Honest delta so we do not “migrate” things that are already done.

| Area | Today | Target from your list |
|---|---|---|
| UI library | React 19 + Vite SPA in `apps/web` | React SPA (not Next.js) — **done (005)** |
| Routing | **TanStack Router** (file routes) | TanStack Router — **keep** |
| Icons | **lucide-react** | lucide-react — **keep** |
| Styling | **MUI v9** custom parchment theme | MUI — **done (005)** |
| State | **React Context** persist (`opowiesci-v1`) | React Context — **done (006)** |
| Data | `content/{seed,chrome}.json` SoT (relocated by 018); `apps/web/src/data/{cities,krakow,chrome}.ts` generated via `pnpm gen:content` | SQLite SoT + generated static dump — **done (009)**, relocated to plain JSON by **018** |
| Fetch | **`fetch`-free** — TanStack Query + Zod over the static loaders, dev and prod alike (**018**) | `fetch` + **TanStack Query** + **Zod** |
| Tests | **Vitest v5** | Vitest v5 — **done (005)** |
| Lint/format | **oxlint** + **oxfmt** | oxlint + oxfmt — **done (005)** |
| Backend | none — static content only, generated via `pnpm gen:content` from `content/seed.json`/`chrome.json` | Go (Fiber) + SQLite at `apps/api` — **done (007)**, **superseded by 018** (removed; was local-only, never on the public host) |
| Auth | off | **none** |
| Maps | **MapLibre + OpenFreeMap** (Poland + Kraków) | still **no API key / no Mapbox** |
| Story art | WebP stills in `apps/web/public/stories/` | Informative stills — **done (004)** |
| Theme | light parchment + dark ink | **dark mode** — **done (001)** |
| Deploy | **Netlify Free Legacy** (static `apps/web/dist`) | **done (010)** |
| Code style | house rules in `.cursor/rules/` | **done (011)** |
| Unused code | **Knip** on `apps/web` | **Knip** — unused files, exports, deps — **done (012)** |

There is **no Next.js**, **no react-router**, **no react-icons** in this app. Do not spend a child spec on those switches.

**005** turned this repo into a Vite SPA at `apps/web` (MUI, oxlint/oxfmt, Vitest). It talked to the Go API from 007 until **018** removed it in favor of static-only content.

---

## Bugs

_None filed._ Add them here as `B-01`, `B-02`, … with repro + expected.

<!--
### B-01 — title
Repro:
Expected:
Child:
-->

---

## UI/UX features

### G-01 — Dark mode → 001 done

- Toggle in the existing header, next to PL/EN.
- Persist with the same progress storage (`locale` + `theme`).
- Tokens (light stays as now):

| Token | Light | Dark |
|---|---|---|
| bg | `#F3EEE6` | `#161310` |
| surface | `#FAF6F0` | `#1F1B18` |
| fg | `#1C1917` | `#F3EEE6` |
| muted | `#6F6458` | `#A89888` |
| primary | `#9C1C2C` | `#C4454A` |
| border | `#D9CFC3` | `#3A322C` |

- Theme tokens drive the map fill/stroke. No tile CDN to swap.
- `prefers-color-scheme` is a default **only on first visit**; after that, explicit choice wins.
- Child: **001** (done)

---

## UI/UX polish

### P-01 — Poland home map (OpenFreeMap) → 002

Replace the SVG blob on `/`.

- **No Mapbox / CARTO / MapTiler key.** OpenFreeMap public styles + MapLibre.
- On mount camera: zoom **5.63**, lat **50.3295**, lng **18.00527** (geojson.io Poland view).
- Ctrl/⌘ + scroll to zoom. Zoom +/−. Metric scale (~100 km).
- Cities from `cities[]` with real lat/lng.
- **Kraków unlocked**; Warsaw, Gdańsk, Wrocław, Poznań, Lublin visible but locked.
- **One** `onSelect(cityId)`.
- Click unlocked → `/krakow`.
- Click locked → “Wkrótce / Coming next”.
- Child: **002** (done)

### P-02 — Kraków city map (no API key) → 003

Replace the “Old Town” schematic on `/krakow`.

- Same **no-key** rule as P-01. No CARTO/MapTiler/OSM raster tiles.
- Prefer local geometry for the Old Town, or **OpenFreeMap + MapLibre** (public instance, no key) only if streets are required. Decide in 003.
- `maxBounds` + min zoom around Stare Miasto / Wawel / Zwierzyniec so it feels like a city, not a country.
- Story pins use **lat/lng**, not percent `x/y`. Suggested anchors (adjust on the map, do not invent new stories):

| Story | Place | Approx |
|---|---|---|
| hejnal | Kościół Mariacki | 50.0616, 19.9394 |
| wieze | Hejnalica | 50.0617, 19.9395 |
| golebie | Rynek | 50.0614, 19.9373 |
| rynek | Rynek / Sukiennice | 50.0616, 19.9373 |
| smok | Smok Wawelski | 50.0530, 19.9334 |
| lajkonik | Zwierzyniec → Rynek | 50.0545, 19.9145 |

- Same **one click pipeline** as P-01 (`storyId` → `/krakow/$storyId`).
- Hover: title + place. Completed pin uses the existing check / success color, not a new palette.
- Keep the list under the map. Map is orientation; list is the reliable mobile target.
- Child: **003**

### P-03 — Hover on map places

Covered by P-01 and P-02. If hover is weak after those, file a polish bug instead of a fourth map spec.

### P-04 — Story images → 004

`StoryArt` SVGs are not informative enough. Keep page chrome (fonts, borders, surfaces). Replace the header graphic.

- One still per story (6 for Kraków). Optional second crop for OG later.
- Direction: **editorial 3D / cinematic still**, readable place, no emoji, no collage, no random people faces, no tourist-stock watermarks.
- Grade to parchment + crimson. Light and dark both have to work (slightly darker plate in dark mode is OK).
- Content:

| id | Show |
|---|---|
| hejnal | Mariacki, two unequal towers, taller tower window |
| smok | Wawel bank, bronze dragon, Vistula |
| wieze | Close towers, height difference obvious |
| lajkonik | Hobby-horse costume, not a generic horse |
| golebie | Rynek / Sukiennice, pigeons, no feeding |
| rynek | Square grid + Sukiennice axis |

- Store as static assets `public/stories/{id}.webp` (and `@2x` if needed) plus `image` field on `Story`.
- Alt text from `place` / `title`. Width full, height ~240–320px, `object-fit: cover`.
- Child: **004**

### P-05 — Map loaders → 013

Parchment-themed overlay while the MapLibre chunk and style load. Same treatment on `/` and `/krakow`. List rows on those pages get a short skeleton while the query is pending. Not a default MUI purple spinner.

- Overlay on the map stage until MapLibre `load`. Dismiss on load; show again if `setStyle` restyle starts.
- `aria-busy` + bilingual status. Honor `prefers-reduced-motion`.
- Home/city lists: skeleton rows while `useQuery` is pending (not error).
- Child: **013** (done)

### P-06 — Hide compact attribution “i” → 014

Keep OSM / OpenFreeMap / OpenMapTiles credit text visible (license). Hide the info toggle.

- MapLibre has no “hide the i button” flag. Use `{ compact: false }` first.
- Fallback if the button still shows: CSS `display: none` on `.maplibregl-ctrl-attrib-button`.
- Do not set `attributionControl: false` without a visible replacement.
- Child: **014** (done)

### P-07 — Highlight Poland and the Kraków playable area → 015

Home: Poland country outline only (not every neighbour). City: outline of the existing playable box (`KRAKOW_BOUNDS` — Stare Miasto + Wawel + Zwierzyniec). Do not zoom out to the municipality. Do not restyle all OpenFreeMap `admin_level=2` lines (that would paint Germany/Czechia/etc. the same).

- Vendor two small GeoJSON polygons. No tile CDN, no new map key.
- Line layer in theme primary. Stroke inside the viewport so it is not clipped.
- Child: **015** (done)

### P-08 — Richer six-story prose → 017

Same six Kraków IDs. Lengthen legend / fact / see-today (and quiz explanations only if a fact sentence must stay consistent). Editorial voice, sources, dates — still “legend beside the record”. No new stories, no new cities.

- Edit the **009** seed (`content/seed.json`, relocated by **018**), then regenerate via `pnpm gen:content`. Do not hand-edit prod TS as a second SoT.
- Child: **017** (done)

### P-09 — Story image loaders → 019

`StoryArt.tsx` shows a plain `<img>` for the story still (WebP, not SVG) with no loading state; on a slow connection the figure box sits blank until it downloads. **013** explicitly scoped this out.

- Parchment placeholder inside the existing figure box until the still decodes, matching 013's loader chrome (crimson on parchment, no MUI default purple).
- No layout shift; static fallback with alt text on error, no stuck spinner. Honor `prefers-reduced-motion`.
- Child: **019** (done)

### P-10 — Smart route lazy loading (story pages first) → 022

`autoCodeSplitting: true` (router-plugin, set since **005**) already splits each file route into its own chunk without a manual `.lazy.tsx`. Confirm what that already buys (MapLibre out of the story page's chunk?) before adding more — this is an investigate-then-fix spec, not a blind `React.lazy` wrap.

- Bundle analysis first; `defaultPreload: "intent"` for instant-feeling nav despite splitting; any new `Suspense` fallback reuses 013's loader chrome.
- Child: **022** (written, not implemented)

### P-11 — Global error boundary + retry → 023

`defaultErrorComponent` (route-level, done since early on) has no retry action, and nothing catches a throw outside the router (provider tree, before `RouterProvider` mounts) — that path is still a blank screen today.

- Top-level class boundary reusing `AppErrorComponent`'s chrome; "Try again" on both the route-level and top-level surfaces; no infinite retry loop.
- Child: **023** (written, not implemented)

### P-12 — Quiz progress ring → 024

Completion is a raw `done/total` fraction, and a quiz only prints the question index and a final score. One resolved item should read as a share of the set.

- Crimson determinate circle. Fill is `round(100 × resolved / total)`: one of four is 25%, one of five is 20%.
- Quiz: questions answered while playing; correct/total on the done screen. Header and `/krakow`: stories completed, including small screens.
- Child: **024** (written, not implemented)

### P-13 — Remove playable-area and custom country borders → 025

**015** highlighted the Kraków camera box and a vendored Poland polygon. The city frame goes. A Poland-only stroke stays only if OpenFreeMap can isolate that border; the stock `boundary_*` layers cannot (they paint every country, and Poland’s lines carry no `adm0_*` code), so the custom polygon goes too.

- No GeoJSON overlay. Do not recolor `boundary_2`.
- Child: **025** (written, not implemented)

### P-14 — Resume a quiz where it was left → 026

The map pin and the Kraków list mark a finished story, but the quiz keeps each pick in component state. Open **The broken call** again and it starts at question 1.

- Save each picked option in `opowiesci-v1`. Come back to 2 of 4 resolved: those two stay revealed, the third is the open question.
- All picked: show those picks, do not restart. A story already in `completed` with no stored picks opens revealed, not blank.
- Child: **026** (written, not implemented)

---

## Tech stack changes

Work **locally** (Cursor / Grok Build) unless a child explicitly says “this preview app”. Do not mix a Go rewrite into a Leaflet PR.

### Frontend — target lock

| Keep | Change | Skip (already true) |
|---|---|---|
| React 19 | Tailwind → **MUI v9** with a custom theme (not default purple) | Next.js → React |
| TanStack Router | zustand → **React Context** | react-router → TanStack Router |
| lucide-react | ESLint/Prettier → **oxlint** + **oxfmt** | react-icons → lucide |
| Zod | add **TanStack Query** | |
| PL/EN copy shape | add **Vitest v5** | |
| | `fetch` only (no axios) | |
| | add **Knip** | |

MUI must encode current tokens (see G-01). If MUI starts looking like a dashboard, the child has failed.

Suggested local layout (child **005**):

```
orbit-berry-palm-mountain/
  apps/web/          # Vite + React + TanStack Router + MUI
  content/           # seed.json / chrome.json — SoT, no backend attached (018)
  specs/
  AGENTS.md
```

(`apps/api/` — Go (007) — existed until **018** removed it; see the S-11 entry below.)

### S-01 — Repo bootstrap (web) → 005

Vite, TanStack Router, MUI theme, oxlint, oxfmt, Vitest v5, path alias `@/`. Port existing routes: `/`, `/krakow`, `/krakow/$storyId`. Child: **005** (done)

### S-02 — Context instead of zustand → 006 done

`ProgressProvider`: `locale`, `theme`, `completed: string[]`, `markDone`, persist `localStorage` key `opowiesci-v1` (keep version + migrate). Child: **006**

### S-03 — Go API → 007 done, **superseded by 018**

- **Fiber** locked. Do not mention Gin again.
- SQLite (modernc.org/sqlite or glebarez — no CGO if we can help it).
- **No authentication.**
- Rate limit: per IP, conservative (e.g. 60 req/min JSON). 429 + `Retry-After`.
- Logging: method, path, status, duration, IP hash. No story-answer bodies in logs.
- Health: `GET /healthz`.
- CORS: web origin only.
- Child: **007** (done)
- Netlify Free prep (static SPA, Go stays local): **007c** (S-09). Do not grow 007.
- **018 removes this entirely** — Go/SQLite bought dev a live-network path prod never used and no feature needed. Kept here for history; see [018-remove-go-sqlite.md](./018-remove-go-sqlite.md).

### S-04 — Client data layer → 008 done

TanStack Query + `fetch` + Zod parse on every response. Query keys: `['cities']`, `['city', id]`, `['story', cityId, storyId]`. Progress stays client-only until we decide otherwise. Child: **008**

### S-05 — Content API → 009, content pipeline kept / serving layer superseded by 018

SQLite was the source of truth for **local** `pnpm dev:api`. Same bilingual city/story/game fields as today. Also stores **UI chrome** (page titles, section headers, game chrome, errors, “Coming next”, theme toggle) as bilingual `Copy` keys — not only cities/stories.

- Seed in migration. First pass is 1:1 with today’s copy; **017** is the prose pass.
- Prod keeps **007c**: a **generated** static dump (`cities.ts` / `krakow.ts` / `chrome.ts`) from the same seed. No live SQLite on Netlify. Do not wrap Fiber as a Netlify Function.
- Child: **009** (done)
- **018** relocates `seed.json`/`chrome.json` from `apps/api/internal/db/` to `content/` and deletes the Go/SQLite layer that served them locally. `pnpm gen:content` and the JSON-as-source design are unchanged.

### S-09 — Netlify Free prep → 007c done, **superseded by 018**

008's production `fetch` defaults to `http://localhost:8080`. Netlify cannot run Fiber + SQLite.

- Ship the **static** Vite SPA. Go stays local (`pnpm dev:api`). Do not wrap Fiber as a Netlify Function.
- Team `braniubojni` — **Free + Legacy**. No payment card. No paid add-ons.
- `netlify.toml` SPA fallback. No functions. Prod `queryFn`s read `cities.ts` / `krakow.ts`; dev still hits the API.
- Child: **007c**

### S-06 — Deploy on Netlify Free → 010 done

GitHub `braniubojni/Poland-legends` ships on Netlify team `braniubojni` (**Free + Legacy**). The sandbox host is Vercel; that is not the product URL.

- Connect this repo to **Netlify**, production from `main`, team `braniubojni` (**Free + Legacy**, no card).
- SPA fallback so `/`, `/krakow`, `/krakow/$storyId` survive refresh (`netlify.toml` from **007c**).
- No Mapbox keys, no auth env. Public site. Static assets only — no Fiber, no SQLite, no Netlify Functions as the data path.
- Do not add a Vercel project or GitHub Pages as a substitute.
- Do not add a payment method or paid Netlify add-ons.
- Prep: **007c** (done). Publish: child **010** (done).

### S-07 — Align `apps/web` to house rules → 011

One-day pass over existing UI code. **No new features, no stack rewrite.** Behaviour, copy, and visual language stay as they are. Source of truth is `.cursor/rules/` (already always-on for new work); this spec is the backlog to retrofit old files.

Rules to apply:

| Rule file | Do |
|---|---|
| `function-expressions.mdc` | `const name = () => {}` — no `function` declarations (class methods, object methods, `function*` OK) |
| `component-size.mdc` | ~100 lines per component file; **150 hard cap** |
| `helpers-files.mdc` | colocated `helpers.ts` for pure helpers, one-off controls, long effect mount/cleanup — not a global `src/helpers.ts` |
| `react-19.mdc` | `useEffectEvent` (not `fooRef.current = foo`), `<Activity>`, `<Suspense>`, `use()`, `ref` as a prop — still no RSC / `use server` / `forwardRef` |

Known first file: `apps/web/src/components/map/KrakowLibre.tsx` (already over the cap; extract `mountKrakowMap` + pins/controls; replace stale-callback refs with `useEffectEvent`).

Then the rest of `apps/web/src` the same way. Split oversized files; do not “fix” by deleting blank lines.

Out of this ID: 006 Context, maps/content/copy changes, Go, 007c, 010.

Child: **011** (done).

### S-08 — Knip (unused files, exports, dependencies) → 012

Wire **[Knip](https://github.com/webpro-nl/knip)** into `apps/web` so unused modules, exports, and package.json deps fail the same way lint does.

- Add `knip` as a web **devDependency**. Script: `pnpm --filter web knip` (and a root alias if the other web scripts have one).
- Config for this Vite SPA: entries `index.html` / `src/main.tsx`, TanStack file routes, Vitest. Ignore `.grok/`, `artifacts/`, `specs/`.
- First pass: delete or wire up real dead code until Knip is clean. Do **not** delete things later specs still need (`data/cities.ts` / `krakow.ts` stay for 007c prod + 009).
- Do not invent a second unused-code tool (ts-prune, depcheck, unimported).
- No product/UI change.

Child: **012** (done)

### S-10 — Standard Go layout → 016

Lean official layout (`cmd/` + `internal/`). Not the kitchen-sink `golang-standards/project-layout` — no `pkg/`, no `api/`, no `configs/`.

```
apps/api/
  cmd/api/main.go      # go run ./cmd/api
  internal/app/        # NewApp, Fiber wiring (today’s app.go)
  internal/db/
  internal/handlers/
  internal/middleware/
```

`pnpm dev:api` points at `./cmd/api`. No new framework, no new routes. Do this **before** growing 009 so chrome/schema land in the new tree. Child: **016** (done), **superseded by 018** (the whole tree it laid out is deleted)

### S-11 — Remove Go/SQLite; static-only content; TypeScript 7 → 018

Netlify never runs `apps/api` (007c/010, locked) — production has always been 100% static. Dev-only value of the Go+SQLite layer (a live-network path to exercise) is not worth a second toolchain once nothing ships through it.

- Delete `apps/api/` entirely. `pnpm dev:api` / `dev:full` removed; `pnpm dev` is the only local run command.
- `apps/web/src/lib/api/client.ts` loses `usesStaticContent()` / `fetchJson` / `API_BASE` — no dev/prod branch left, both read the static loaders directly.
- 009's content pipeline (`seed.json`, `chrome.json`, `pnpm gen:content`) is **kept**, only relocated to `content/` at the repo root since its old home (`apps/api/internal/db/`) goes away with the Go module.
- While touching tooling: bump `apps/web`'s `typescript` to `^7.0.0` (stable since July 2026, drop-in `tsc`, ~10x faster typecheck). Unrelated to the backend removal but same spirit; rides along in one spec instead of two.
- Child: **018** (done)

### S-12 — Git hooks (Husky) → 020

No local gate today; Netlify's build step only runs `pnpm --filter web build`, no typecheck/lint/knip/test anywhere in the pipeline.

- `pre-commit`: `fmt:check` → `lint` → `typecheck` → `knip` → `build`. `pre-push`: `test`.
- Husky v9, `"prepare": "husky"` at the root. No lint-staged, no commit-msg linting, no CI (separate future spec).
- Child: **020** (**done**)

### S-13 — Playwright e2e + 90% coverage gate → 021

Vitest unit tests only today, no coverage number tracked, no browser-level test.

- `@vitest/coverage-v8` with a 90% statements/branches/functions/lines threshold on Vitest, scoped to exclude generated/vendored files (`routeTree.gen.ts`, `data/*.ts`, GeoJSON) — investigate actual uncovered lines before locking the exclusion list, don't pre-exclude what merely looks hard.
- `@playwright/test` against the built `preview` server for golden-path flows (Poland → Kraków → story → game → completion persisted, locale/theme toggles). Runs on demand (`pnpm test:e2e`), not inside 020's pre-push hook — too slow for a local hook.
- Child: **021** (**done**)

---

## Backend (detail for 007 / 009) — historical, removed by 018

No auth. SQLite. Rate limit. Request logs.

Minimum routes:

| Method | Path | Notes |
|---|---|---|
| GET | `/healthz` | |
| GET | `/v1/cities` | list + unlocked |
| GET | `/v1/cities/:id` | city + story summaries (no full game) |
| GET | `/v1/cities/:id/stories/:storyId` | full story + game |
| GET | `/v1/chrome` | bilingual UI chrome keys (**009**) |

Do not POST answers to the server in v1 (client grades quizzes).

---

## Others

Parking lot — **no child numbers yet**. Fits the current product (Poland → city → pin → legend + fact + one game + see it today). Does not fight Netlify-static / no-auth.

**Same Kraków, more depth**

- More pins already named here: Wanda, Wit Stwosz, Kazimierz
- Suggested walking order / a short trail between the six (and later more)
- Structured “see it today”: hours, season, indoor/outdoor — still no booking
- Sources / bibliography under facts (the product is legend vs record)
- Real hejnał recording
- End-of-Kraków screen when `completed` has all six
- Story OG / share cards (004 already allowed a second crop)

**Chrome and map**

- OpenFreeMap **label language** PL when locale is `pl`
- About page: what Opowieści is, no accounts, how legend vs fact works
- Glossary of Polish terms (hejnał, Sukiennice, Lajkonik)
- PWA / offline cache of the static SPA

**Later cities (already visible, locked)**

- Warsaw, Gdańsk, Wrocław, Poznań, Lublin — one city spec each, same pin recipe

**Stay out until listed above**

- Accounts, comments, leaderboards, Postgres
- Native apps, a second public host, paid Netlify, wrapping Fiber as a Function

---

## Suggested split order

Do UI that users see before the rewrite. **005** is this repo in place, not a second clone.

| Order | Child | IDs | Depends on |
|---|---|---|---|
| 1 | 001 Dark mode | G-01 | done |
| 2 | 002 Poland GeoJSON | P-01, P-03 | done |
| 3 | 003 Kraków map (no key) | P-02, P-03 | done |
| 4 | 004 Story images | P-04 | done |
| 5 | 005 Local web bootstrap | S-01 | done |
| 6 | 006 Context persist | S-02 | done |
| 7 | 007 Go + SQLite | S-03 | 005 (done) |
| 8 | 008 Query + Zod | S-04 | 006, 007 (done) |
| 10 | 007c Netlify Free prep | S-09 | 008 |
| 11 | 010 Netlify Free publish | S-06 | 007c |
| 12 | 011 House-style pass | S-07 | 005 |
| 13 | 012 Knip | S-08 | 005 (done) |
| 14 | 016 Go layout | S-10 | 007 |
| 15 | 009 Content API | S-05 | 007, 008, 016 |
| 16 | 013 Map loaders | P-05 | 002, 003, 008 |
| 17 | 014 Map attribution | P-06 | 002, 003 |
| 18 | 015 Map borders | P-07 | 002, 003 |
| 19 | 017 Richer copy | P-08 | 009 |
| 20 | 018 Remove Go/SQLite + TS7 | S-11 | 009 |
| 21 | 019 Story image loaders | P-09 | 004, 013 |
| 22 | 020 Git hooks (Husky) | S-12 | 005, 012 |
| 23 | 021 Playwright + coverage | S-13 | 005, 011, 020 |
| 24 | 022 Smart route lazy loading | P-10 | 004, 013, 019 |
| 25 | 023 Global error boundary + retry | P-11 | none |
| 26 | 024 Quiz progress ring | P-12 | 006 |
| 27 | 025 Remove map border overlays | P-13 | 015 |
| 28 | 026 Resume a quiz | P-14 | 006, 024 |

**001–004** landed on the Grok/TanStack Start tree. **005** converts this same repo in place to `apps/web` (Vite SPA). **006**, **007**, **007c**, **008**, **009**, **010**, **011**, **012**, **013**, **014**, **015**, **016**, **017**, **018**, **019**, **020**, and **021** are done. **022**, **023**, **024**, **025**, and **026** are written, not implemented. **018** has landed: production and dev both read the generated static path (`pnpm gen:content` from `content/seed.json`/`chrome.json`); there is no live backend anywhere, and 007/007c/S-09's "SQLite is SoT for local `pnpm dev:api`" no longer applies.

---

## Explicit non-goals (until listed above)

- Next.js
- react-router, axios, react-icons
- Authentication, Postgres, Redis
- Leaderboards, accounts, comments
- Native apps
- Changing the six Kraków stories’ facts/legend copy except **017** (and typos)
- Vercel / `*.grok.me` / GitHub Pages as the public product host (sandbox Vercel may stay)
- Paid Netlify plans, a payment card, wrapping Fiber as a Netlify Function, persistent SQLite on Netlify
