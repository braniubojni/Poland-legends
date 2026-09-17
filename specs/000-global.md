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
| UI library | React 19 + Vite + **TanStack Start** | React SPA (not Next.js) |
| Routing | **TanStack Router** (file routes) | TanStack Router — **keep** |
| Icons | **lucide-react** | lucide-react — **keep** |
| Styling | Tailwind v4 tokens in `src/styles.css` | **MUI** theme using the same tokens |
| State | zustand + persist (`opowiesci-v1`) | **React Context** |
| Data | static TS: `src/data/krakow.ts`, `cities.ts` | Go API + SQLite later; same JSON shape |
| Fetch | none | `fetch` + **TanStack Query** + **Zod** |
| Tests | almost none (platform scripts only) | **Vitest v5** |
| Lint/format | ESLint + Prettier (sandbox defaults) | **oxlint** + **oxfmt** |
| Backend | none | **Go** (Fiber *or* Gin — lock in 007) + **SQLite** |
| Auth | off | **none** |
| Maps | **MapLibre + OpenFreeMap** (Poland), schematic Kraków | Kraków map in 003, still **no API key / no Mapbox** |
| Story art | geometric SVG in `StoryArt.tsx` | Informative stills (generated 3D / editorial) |
| Theme | light parchment only | **dark mode** |
| Deploy | Grok sandbox → **Vercel** (`nitro({ preset: "vercel" })`). GitHub repo has **no** Pages, Actions, environments, or homepage URL | **Netlify** from GitHub (`main`) |

There is **no Next.js**, **no react-router**, **no react-icons** in this app. Do not spend a child spec on those switches.

**Local Cursor/Grok repo** may drop TanStack Start (SSR) and become a Vite SPA that talks to the Go API. That is spec **005**, not a silent rewrite of this preview.

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

MUI must encode current tokens (see G-01). If MUI starts looking like a dashboard, the child has failed.

Suggested local layout (child **005**):

```
opowiesci/
  apps/web/          # Vite + React + TanStack Router + MUI
  apps/api/          # Go (007)
  packages/content/  # optional: shared Zod schemas
  specs/
  AGENTS.md
```

### S-01 — Repo bootstrap (web)

Vite, TanStack Router, MUI theme, oxlint, oxfmt, Vitest v5, path alias `@/`. Port existing routes: `/`, `/krakow`, `/krakow/$storyId`. Child: **005**

### S-02 — Context instead of zustand

`ProgressProvider`: `locale`, `theme`, `completed: string[]`, `markDone`, persist `localStorage` key `opowiesci-v1` (keep version + migrate). Child: **006**

### S-03 — Go API

- Fiber **or** Gin — pick one in 007 and do not mention the other again.
- SQLite (modernc.org/sqlite or glebarez — no CGO if we can help it).
- **No authentication.**
- Rate limit: per IP, conservative (e.g. 60 req/min JSON). 429 + `Retry-After`.
- Logging: method, path, status, duration, IP hash. No story-answer bodies in logs.
- Health: `GET /healthz`.
- CORS: web origin only.
- Child: **007**

### S-04 — Client data layer

TanStack Query + `fetch` + Zod parse on every response. Query keys: `['cities']`, `['city', id]`, `['story', cityId, storyId]`. Progress stays client-only until we decide otherwise. Child: **008**

### S-05 — Content API

Move `cities` + `krakowStories` to SQLite (or JSON files loaded by Go). Same bilingual fields. Games stay in payload. Seed in migration. Child: **009**

### S-06 — Deploy on Netlify

GitHub `braniubojni/orbit-berry-palm-mountain` is not shipping anywhere today. The sandbox host is Vercel; that is not the product URL.

- Connect this repo to **Netlify**, production from `main`.
- SPA fallback so `/`, `/krakow`, `/krakow/$storyId` survive refresh (`netlify.toml` + `/* /index.html 200`).
- No Mapbox keys, no auth env. Public site.
- Do not add a Vercel project or GitHub Pages as a substitute.
- Child: **010** when started; this ID is enough until then.

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

Do UI that users see before the rewrite, unless you are starting a fresh local repo.

| Order | Child | IDs | Depends on |
|---|---|---|---|
| 1 | 001 Dark mode | G-01 | done |
| 2 | 002 Poland GeoJSON | P-01, P-03 | done |
| 3 | 003 Kraków map (no key) | P-02, P-03 | done |
| 4 | 004 Story images | P-04 | done |
| 5 | 005 Local web bootstrap | S-01 | — (new repo) |
| 6 | 006 Context persist | S-02 | 005 |
| 7 | 007 Go + SQLite | S-03 | 005 |
| 8 | 008 Query + Zod | S-04 | 006, 007 |
| 9 | 009 Content API | S-05 | 007, 008 |
| 10 | 010 Netlify | S-06 | 004 (current app) or 005 (cleaner SPA) |

If you stay in **this** Grok preview app: do **001–004** here (local maps + images + dark mode on the current Tailwind stack). Do **005–009** only in the local repo. **S-06** is the public host either way.

---

## Explicit non-goals (until listed above)

- Next.js
- react-router, axios, react-icons
- Authentication, Postgres, Redis
- Leaderboards, accounts, comments
- Native apps
- Changing the six Kraków stories’ facts/legend copy except for typos
- Vercel / `*.grok.me` / GitHub Pages as the public product host (sandbox Vercel may stay)
