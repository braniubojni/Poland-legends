# SPEC 005 — Local web bootstrap

Status: done
Covers: **S-01**
Depends on: 001–004 (product behaviour to port)
Parent: [000-global.md](./000-global.md)

The Grok/TanStack Start sandbox at the repo root is not the product stack. This spec turns **this repo** into a pnpm monorepo whose web app is a Vite SPA. No second git repo. No dual tree (`src/` + `apps/web`).

## Goal

`pnpm --filter web dev` serves Opowieści as a client SPA: parchment + crimson, PL/EN, dark mode, Poland map, Kraków map, six stories with stills and games. Same three routes as today.

## Out of scope

- React Context instead of zustand (006)
- Go API, SQLite, rate limit (007)
- TanStack Query + `fetch` + Zod on responses (008)
- Moving `cities` / `krakowStories` behind the API (009)
- Netlify / `netlify.toml` (010)
- New stories, copy changes, extra cities
- Mapbox / CARTO / MapTiler / OSM raster keys
- `apps/api/` and `packages/` — do not create empty placeholders
- [artifacts/zycie](../artifacts/zycie) — leave it alone

## Decision

**In-place monorepo.** Product lives at `apps/web`. Drop TanStack Start, Nitro, and Grok preview chrome from the product path. Rewrite root `AGENTS.md` for this product (Vite SPA, no Start).

## Stack

| Keep | Change | Drop |
|---|---|---|
| React 19 | Tailwind → **MUI v9** + Emotion | TanStack Start, Nitro, Vercel preset |
| TanStack Router (file routes) | ESLint/Prettier → **oxlint** + **oxfmt** | `AuthProvider`, `PreviewHostBridge` |
| lucide-react | add **Vitest v5** | `src/lib/auth`, `app-data`, `db`, `multiplayer` |
| Zod (unused on the wire until 008) | path `@/` → `apps/web/src` | `server/`, `public/__grok/`, grok PWA scripts |
| zustand + `opowiesci-v1` | npm root → **pnpm workspaces** (`apps/*`) | Radix / shadcn `Button`, Tailwind |
| MapLibre + OpenFreeMap (no key) | | `startup.sh` `:8080` contract |
| Static `data/*`, story WebPs | | |

Vite default dev port is fine. Do not lock 8080.

## Layout

```
orbit-berry-palm-mountain/
  apps/web/          # Vite SPA (this spec)
  apps/api/          # 007 — do not create
  packages/          # 008/009 — do not create
  specs/
  AGENTS.md
  package.json
  pnpm-workspace.yaml
```

`apps/web` is named `web` in `package.json` so `pnpm --filter web` works.

## Behaviour

### App

- SPA entry: `index.html` + `src/main.tsx`. No SSR. No `getRouter` Start contract.
- File routes: `/`, `/krakow`, `/krakow/$storyId`. Client navigation. Refresh on a deep link must not 404 in Vite preview (Vite SPA fallback is enough; Netlify is 010).
- `defaultErrorComponent` stays. Restyle with MUI. Keep `error.message` visible.
- Port the working UI, not stubs: `AppShell`, Poland/Kraków maps, six stories, games, stills, Hejnał player, PL/EN, progress counter.
- Data stays static TS (`cities`, `krakowStories`).
- **zustand persist key `opowiesci-v1` stays** (version + `locale` / `theme` / `completed`). Do not invent a second storage shape.

### MUI theme

Custom `createTheme` from G-01 tokens. Not default purple, not Roboto.

| Token | Light | Dark |
|---|---|---|
| bg | `#F3EEE6` | `#161310` |
| surface | `#FAF6F0` | `#1F1B18` |
| fg | `#1C1917` | `#F3EEE6` |
| muted | `#6F6458` | `#A89888` |
| primary | `#9C1C2C` | `#C4454A` |
| primary-fg | `#FAF6F0` | `#FAF6F0` |
| border | `#D9CFC3` | `#3A322C` |
| ink-soft | `#3A322C` | `#D4C4B4` |
| success | `#2F5D3A` | `#7AAF82` |

Fonts: **Fraunces** (display) + **Source Sans 3** (body). Radii stay small (4 / 8 / 12). Crimson is the only accent.

If the chrome looks like a default MUI dashboard — Roboto, purple, elevated `AppBar`, `Card` shadows — this child has failed. Prefer `Box` / `Stack` / `Typography` / `Button` / `ToggleButtonGroup`. Hairline borders, parchment surfaces.

`palette.mode` follows `resolveTheme`. Keep `html.dark` + `data-theme` + CSS variables on `:root` so MapLibre overlays from 002/003 still read tokens. Tiny CSS is allowed for those variables and MapLibre; no Tailwind.

### Theme boot (copy 001)

- First visit with no stored theme follows `prefers-color-scheme`.
- After an explicit tap, storage wins; OS changes do not override.
- Boot script in `<head>` before paint (no parchment flash on a dark OS).
- `theme-color` meta follows bg (`#f3eee6` / `#161310`).
- Toggle in the header, after PL/EN, ≥ 44px.

### Maps and stills

Port 002–004 as-is: OpenFreeMap + MapLibre, no API key, story pins at lat/lng, `public/stories/{id}.webp` (+ `-dark` where it exists). Replace Tailwind class names on chrome around the map; do not rewrite map behaviour.

## Files

New under `apps/web/`:

- `index.html`, `src/main.tsx`, `src/router.tsx`
- `vite.config.ts`, `tsconfig.json`
- MUI theme module (e.g. `src/theme/opowiesci.ts`)
- oxlint / oxfmt / Vitest config
- `src/styles.css` (tokens + MapLibre only)

Port from current `src/` into `apps/web/src/`:

- `routes/__root.tsx`, `routes/index.tsx`, `routes/krakow/index.tsx`, `routes/krakow/$storyId.tsx`
- `components/AppShell.tsx`, `ThemeToggle.tsx`, `PolandMap.tsx`, `KrakowMap.tsx`, `StoryArt.tsx`, `HejnalPlayer.tsx`
- `components/map/*`, `components/games/*`
- `lib/progress.ts`, `lib/theme.ts`, `lib/copy.ts`, `lib/geo.ts`, `lib/error-component.tsx`
- `data/types.ts`, `data/cities.ts`, `data/krakow.ts`

Assets: `apps/web/public/stories/*.webp`, `favicon.svg`

Root: `package.json`, `pnpm-workspace.yaml`, `AGENTS.md`

Do not keep a product `src/` at the repo root after the move.

## Done when

- [x] `pnpm --filter web dev` serves `/`, `/krakow`, `/krakow/$storyId` as a client SPA
- [x] Chrome is parchment + crimson + Fraunces / Source Sans 3, not default MUI
- [x] Dark mode + PL/EN + progress persist (`opowiesci-v1`)
- [x] Maps and story stills still work; no API key
- [x] oxlint, `oxfmt --check`, `tsc`, and Vitest pass (at least one real unit test: theme resolve or Kraków story count/pins)
- [x] Start / Nitro / Grok auth / db / `__grok` chrome gone from the product path
- [x] 000 / README mark 005 **done**
