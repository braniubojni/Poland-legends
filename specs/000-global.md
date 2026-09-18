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
| Data | static TS: `apps/web/src/data/` (007's API seed + 007c prod path) | 009 later: SQLite SoT for local `pnpm dev:api` only; prod keeps static `queryFn` |
| Fetch | **`fetch` + TanStack Query + Zod** — API in dev (008), static TS in prod (**007c** done) | `fetch` + **TanStack Query** + **Zod** |
| Tests | **Vitest v5** | Vitest v5 — **done (005)** |
| Lint/format | **oxlint** + **oxfmt** | oxlint + oxfmt — **done (005)** |
| Backend | **Go** (Fiber) + **SQLite** at `apps/api` (local) | Go + SQLite — **done (007)**; local only on the public host (**007c** done) |
| Auth | off | **none** |
| Maps | **MapLibre + OpenFreeMap** (Poland + Kraków) | still **no API key / no Mapbox** |
| Story art | WebP stills in `apps/web/public/stories/` | Informative stills — **done (004)** |
| Theme | light parchment + dark ink | **dark mode** — **done (001)** |
| Deploy | files done (**010** implementing); human publishes | **Netlify Free Legacy** (static `apps/web/dist`) — **010** |
| Code style | mixed `function` declarations, large components, ref-stale callbacks | house rules in `.cursor/rules/` — **011** |
| Unused code | none | **Knip** — unused files, exports, deps — **012** |

There is **no Next.js**, **no react-router**, **no react-icons** in this app. Do not spend a child spec on those switches.

**005** turned this repo into a Vite SPA at `apps/web` (MUI, oxlint/oxfmt, Vitest). Later talks to the Go API.

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
  apps/api/          # Go (007)
  packages/content/  # optional: shared Zod schemas
  specs/
  AGENTS.md
```

### S-01 — Repo bootstrap (web) → 005

Vite, TanStack Router, MUI theme, oxlint, oxfmt, Vitest v5, path alias `@/`. Port existing routes: `/`, `/krakow`, `/krakow/$storyId`. Child: **005** (done)

### S-02 — Context instead of zustand → 006 done

`ProgressProvider`: `locale`, `theme`, `completed: string[]`, `markDone`, persist `localStorage` key `opowiesci-v1` (keep version + migrate). Child: **006**

### S-03 — Go API → 007 done

- **Fiber** locked. Do not mention Gin again.
- SQLite (modernc.org/sqlite or glebarez — no CGO if we can help it).
- **No authentication.**
- Rate limit: per IP, conservative (e.g. 60 req/min JSON). 429 + `Retry-After`.
- Logging: method, path, status, duration, IP hash. No story-answer bodies in logs.
- Health: `GET /healthz`.
- CORS: web origin only.
- Child: **007**
- Netlify Free prep (static SPA, Go stays local): **007c** (S-09). Do not grow 007.

### S-04 — Client data layer → 008 done

TanStack Query + `fetch` + Zod parse on every response. Query keys: `['cities']`, `['city', id]`, `['story', cityId, storyId]`. Progress stays client-only until we decide otherwise. Child: **008**

### S-05 — Content API

Move `cities` + `krakowStories` to SQLite (or JSON files loaded by Go). Same bilingual fields. Games stay in payload. Seed in migration. Child: **009** (not written).

When 009 is written: production on Netlify **must** keep the 007c static `queryFn` path (`cities.ts` / `krakow.ts`). 009 may make SQLite the source of truth for local `pnpm dev:api` only. Do not wrap Fiber as a Netlify Function.

### S-09 — Netlify Free prep → 007c done

008's production `fetch` defaults to `http://localhost:8080`. Netlify cannot run Fiber + SQLite.

- Ship the **static** Vite SPA. Go stays local (`pnpm dev:api`). Do not wrap Fiber as a Netlify Function.
- Team `braniubojni` — **Free + Legacy**. No payment card. No paid add-ons.
- `netlify.toml` SPA fallback. No functions. Prod `queryFn`s read `cities.ts` / `krakow.ts`; dev still hits the API.
- Child: **007c**

### S-06 — Deploy on Netlify Free → 010

GitHub `braniubojni/Poland-legends` is not shipping anywhere today. The sandbox host is Vercel; that is not the product URL.

- Connect this repo to **Netlify**, production from `main`, team `braniubojni` (**Free + Legacy**, no card).
- SPA fallback so `/`, `/krakow`, `/krakow/$storyId` survive refresh (`netlify.toml` from **007c**).
- No Mapbox keys, no auth env. Public site. Static assets only — no Fiber, no SQLite, no Netlify Functions as the data path.
- Do not add a Vercel project or GitHub Pages as a substitute.
- Do not add a payment method or paid Netlify add-ons.
- Prep: **007c** (done). Publish: child **010**.

### S-07 — Align `apps/web` to house rules

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

Child: **011** when started; this ID is enough until then.

### S-08 — Knip (unused files, exports, dependencies)

Wire **[Knip](https://github.com/webpro-nl/knip)** into `apps/web` so unused modules, exports, and package.json deps fail the same way lint does.

- Add `knip` as a web **devDependency**. Script: `pnpm --filter web knip` (and a root alias if the other web scripts have one).
- Config for this Vite SPA: entries `index.html` / `src/main.tsx`, TanStack file routes, Vitest. Ignore `.grok/`, `artifacts/`, `specs/`.
- First pass: delete or wire up real dead code until Knip is clean. Do **not** delete things later specs still need (Zod stays until **008**).
- Do not invent a second unused-code tool (ts-prune, depcheck, unimported).
- No product/UI change.

Child: **012** when started; this ID is enough until then.

---

## Backend (detail for 007 / 009)

No auth. SQLite. Rate limit. Request logs.

Minimum routes:

| Method | Path | Notes |
|---|---|---|
| GET | `/healthz` | |
| GET | `/v1/cities` | list + unlocked |
| GET | `/v1/cities/:id` | city + story summaries (no full game) |
| GET | `/v1/cities/:id/stories/:storyId` | full story + game |

Do not POST answers to the server in v1 (client grades quizzes).

---

## Others

_Empty._ Parking lot for later: more Kraków pins (Wanda, Wit Stwosz, Kazimierz), other cities, accounts, sound of a real hejnał recording, i18n files instead of inline `Copy`.

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
| 9 | 009 Content API | S-05 | 007, 008 |
| 10 | 007c Netlify Free prep | S-09 | 008 |
| 11 | 010 Netlify Free publish | S-06 | 007c |
| 12 | 011 House-style pass | S-07 | 005 |
| 13 | 012 Knip | S-08 | 005 |

**001–004** landed on the Grok/TanStack Start tree. **005** converts this same repo in place to `apps/web` (Vite SPA). **006**, **007**, **007c**, and **008** are done. **010** is implementing (human publishes). **009** is not written; when it is, production on Netlify must keep the 007c static `queryFn` path (SQLite SoT for local `pnpm dev:api` only). **S-07** and **S-08** can run anytime after **005**.

---

## Explicit non-goals (until listed above)

- Next.js
- react-router, axios, react-icons
- Authentication, Postgres, Redis
- Leaderboards, accounts, comments
- Native apps
- Changing the six Kraków stories’ facts/legend copy except for typos
- Vercel / `*.grok.me` / GitHub Pages as the public product host (sandbox Vercel may stay)
- Paid Netlify plans, a payment card, wrapping Fiber as a Netlify Function, persistent SQLite on Netlify
