# SPEC 010 — Netlify Free publish

Status: **implementing**
Covers: **S-06**
Depends on: 007c
Parent: [000-global.md](./000-global.md)
Repo: [braniubojni/Poland-legends](https://github.com/braniubojni/Poland-legends)

Team: `braniubojni` — **Free + Legacy**. No card. Stay there.

Human does the Netlify UI. Agent does files only.

## Goal

Document and harden the first publish of the **static** Vite SPA on Netlify team `braniubojni` (Free + Legacy, no payment card). Production is `apps/web/dist`. Go stays local. Do not wrap Fiber as a Netlify Function.

007c already landed `netlify.toml` (build + SPA redirect) and prod `queryFn`s that read `cities.ts` / `krakow.ts`. This spec pins the toolchain for Git CI and writes the UI steps the human follows.

## Stay-free (non-negotiable)

- Team **Free + Legacy**. No card. Do not upgrade.
- Do **not** enable Visual Editor, Netlify Database, Functions, or Deploy Previews on every branch.
- Do **not** add paid add-ons.
- One production site. Static assets only — no Fiber, no SQLite, no Netlify Functions as the data path.
- `netlify.toml` must not set `[functions]`, `go build`, or plugins.

## UI steps (human)

1. Confirm team `braniubojni` shows **Free** + **Legacy**. Do not add a card.
2. **Builds** → **New project from Git** → **GitHub** → `Poland-legends` → branch **`main`**.
3. Leave **build command** and **publish directory** to [`netlify.toml`](../netlify.toml):
   - command: `pnpm --filter web build`
   - publish: `apps/web/dist`
4. Do not add Functions, Visual Editor, a database, or deploy previews on every branch.
5. Save and wait for a green deploy.

## After a green deploy (human)

- Open `/` (Poland map).
- Open `/krakow` (city map + list).
- Refresh `/krakow/hejnal` (SPA fallback — must not 404).
- Toggle dark mode. Pan/zoom the map.
- DevTools → Network: **no** `localhost` API calls. Content comes from the static bundle (007c `queryFn` path).

## Files

- `specs/010-netlify-publish.md` (this)
- `package.json` (`packageManager`)
- `netlify.toml` (`PNPM_FLAGS`; keep command / publish / redirects)
- `pnpm-workspace.yaml` (exclude Go `apps/api`)
- `specs/000-global.md` (S-06 → 010; S-05 / 009 prod-static note)
- `specs/README.md` (010 implementing; 009 keep-007c-path note)

## Done when

- [x] `package.json` has `packageManager` for this machine's pnpm
- [x] `netlify.toml` keeps 007c command / publish / SPA redirect; adds `NODE_VERSION` + `PNPM_FLAGS`; no `[functions]`, no `go build`, no plugins
- [x] `pnpm-workspace.yaml` keeps `apps/web` and excludes `apps/api` (no fake API `package.json`)
- [x] `specs/000-global.md` S-06 points at `braniubojni/Poland-legends` and **→ 010**; S-05 notes that later 009 must keep the 007c prod static `queryFn` path
- [x] `specs/README.md` marks 010 **implementing**; 009 stays not written with the prod-static constraint
- [ ] Live `*.netlify.app` URL serves `/`, `/krakow`, and refresh on `/krakow/hejnal`; dark mode and map work; Network tab has no `localhost`

The live URL checkbox stays unchecked until the human publishes.

## Out of scope

- Netlify account clicks (human)
- Custom domain
- 009 content cutover
- Paid add-ons
- Go on Netlify
- Wrapping Fiber as a Function
- 011 / 012
