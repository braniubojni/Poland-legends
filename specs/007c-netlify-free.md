# SPEC 007c — Prepare web + Go for Netlify Free (Legacy)

Status: done
Covers: **S-09**
Depends on: 008
Parent: [000-global.md](./000-global.md) / [007-go-api.md](./007-go-api.md)
Next: **010** Netlify Free publish (Git connect + first publish) — not 008 (008 is already Query + Zod)

Team: `braniubojni` — **Free + Legacy**. No card. Stay there.

## Goal

Ship the **static web app** on Netlify Free. Keep Go as a **local / optional** API. Do not buy Pro, Personal, extra build minutes, extra bandwidth, Visual Editor, Agent Runners, Netlify Database, or Image CDN.

If a change would spend money or require a card, it is out of scope.

`pnpm --filter web build` produces `apps/web/dist` that works with `npx serve` (or Netlify) without `apps/api`. Refresh on `/krakow` and `/krakow/hejnal` does not 404. The production JS bundle does not call `localhost`.

## Why Go+SQLite does not live on Netlify

Netlify is a CDN + build + **serverless functions**. There is no always-on VM.

| Piece | On Netlify Free? |
|---|---|
| Vite/React static `apps/web/dist` | Yes. This is the product. |
| `netlify.toml` redirects (SPA) | Yes. |
| Custom domain + Let’s Encrypt | Yes. |
| Long-running Fiber + SQLite file | **No.** Functions are cold, disk is ephemeral. Writes vanish. |
| Netlify Functions (Go or Node) | Yes, but **125k invocations / site / month** (Legacy). No persistent SQLite. |
| Edge Functions | Yes, **1M / month**. Still no SQLite file. |
| Netlify DB / Blobs / AI / Visual Editor | Skip. Credits / paid-adjacent. |

Default for 007c: **content stays in the web bundle** (`apps/web/src/data/*`). Go API remains for local / later host. Netlify serves HTML/JS/CSS only.

A later spec may add **read-only** functions. Not this one.

## Legacy Free hard limits (this team)

From the Usage screen + Legacy docs:

| Meter | Limit | At 100% |
|---|---|---|
| Bandwidth | 100 GB / month (team) | **All sites pause** until card + upgrade |
| Build minutes | 300 / month (team) | Builds stop; live site still served |
| Serverless Functions | 125k invocations / site / month | Pause risk |
| Edge Functions | 1M / month | Pause risk |
| Concurrent builds | 1 | Queue |
| Members | 1 | — |
| Price | $0 | Free does **not** auto-charge. Paid Legacy **does** buy extra packages. Do not add a card. |

Warnings at 50 / 75 / 90 / 100%. Check **Usage & billing** monthly.

## Stay-free rules (non-negotiable)

1. Do **not** add a payment method.
2. Do **not** click “Change team plan” except to confirm you are still Free.
3. Do **not** enable: Visual Editor, Agent Runners, Netlify Database, Blobs as primary store, Identity, Forms, Analytics add-on, Large Media, Image CDN transforms.
4. One production site for this app. Do not multiply sites that share the 100 GB + 300 min pool.
5. Prefer **local build + `netlify deploy`** so Netlify does not burn build minutes. Git CI is optional and must stay under 300 min.
6. No function on every page view. Static assets only.
7. `netlify.toml` must not set paid plugins.
8. Deploy previews: off or rare. They eat build minutes on Legacy.

## Decisions locked

- **Static product.** Fiber is not on Netlify. Do not wrap it as a Function in this spec.
- **Prod reads static TS.** 008 wired `queryFn`s to `fetch(VITE_API_URL ?? "http://localhost:8080")`. That bakes localhost into `vite build`. Fix:
  - **dev:** `VITE_API_URL` or `http://localhost:8080` — unchanged `fetch` + Zod.
  - **prod** (`import.meta.env.PROD`, or empty `VITE_API_URL`): `queryFn`s in `apps/web/src/lib/api/queries.ts` read `cities.ts` / `krakow.ts` and parse with the same Zod schemas. Unknown city/story still throws `NotFoundError`.
- Components and routes stay on query hooks. Do not re-import `@/data/cities` or `@/data/krakow` in `components/` or `routes/`.
- Skip optional `GET /export` / `content.json` (008 already has Zod shapes).
- Vite `build.sourcemap = false`. Bundle budget is an **aim** (`< 1 MB` JS gzipped), not a hard fail.
- OpenFreeMap tiles stay third-party. Do not proxy them through Netlify Functions (they do not count as Netlify bandwidth).
- Omit `[functions]` in `netlify.toml`. No empty `netlify/functions` dir required.

## Local prep (this child)

### Web

- Production build: `pnpm --filter web build` → `apps/web/dist`.
- `base` / public asset paths work at domain root (`/`).
- Router: all routes fall back to `index.html` (TanStack Router SPA).
- No calls to `localhost` in the production bundle.

### Go

- Keep `apps/api` runnable locally (`pnpm dev:api` / `go run .`, SQLite file).
- Rate limit + logs stay local-only.
- Not required for the live site.

### Repo files to add

```
netlify.toml
docs/netlify-free.md
.gitignore          # already ignores dist/; confirm .netlify/ too
```

`netlify.toml` (static only, repo root):

```toml
[build]
  command = "pnpm --filter web build"
  publish = "apps/web/dist"

[build.environment]
  NODE_VERSION = "22"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

No `[functions]` key.

### CLI workflow (saves build minutes)

```bash
# once
npm i -g netlify-cli
netlify login
netlify init          # or netlify link

# every release (no Netlify build minutes)
pnpm --filter web build
netlify deploy --prod --dir=apps/web/dist
```

Manual drag-and-drop of `apps/web/dist` in the UI also uses **0 build minutes**.

Git “build on push” uses the 300 minutes. Use it only when the local CLI is annoying.

## Deploy process (what 010 will do)

1. Repo on GitHub (public is fine; private org repos are a Pro feature).
2. Netlify UI → Add site → Import from Git **or** skip Git and CLI-deploy.
3. Team = `braniubojni` (Free Legacy). Confirm badges **Free** + **Legacy**.
4. Build settings only if using Git CI. Otherwise publish dir = `apps/web/dist`.
5. First deploy → preview URL `*.netlify.app`.
6. Optional: custom domain later (SSL free). Not required for 010.
7. Check Usage: bandwidth 0, build minutes 0 if CLI deploy.
8. Click the site. `/`, `/krakow`, refresh on a nested route (SPA fallback).
9. Dark mode, map, quiz — all client-side.

Rollback: Deploys → previous publish → Publish.

## Files

- `specs/007c-netlify-free.md` (this)
- `netlify.toml`
- `docs/netlify-free.md`
- `.gitignore` (`.netlify/` if missing)
- `apps/web/src/lib/api/client.ts`, `queries.ts` (prod static path)
- `apps/web/vite.config.ts` (`build.sourcemap = false`)
- tests for the static `queryFn` path (unknown id → `NotFoundError`)
- `AGENTS.md`, `CLAUDE.md`, `specs/000-global.md`, `specs/README.md`

## Done when

- [x] `netlify.toml` in repo, static-only, SPA redirect, no `[functions]`
- [x] `pnpm --filter web build` produces `apps/web/dist` you can open with `npx serve apps/web/dist`
- [x] No `localhost` API in the production bundle
- [x] Prod `queryFn`s read `cities.ts` / `krakow.ts` through the same hooks; routes do not import those modules
- [x] Go API still runs locally (`pnpm dev:api`); not required for the live site
- [x] `docs/netlify-free.md` lists the limits + “no card” rule
- [x] `netlify/functions` omitted
- [x] 010 can connect the site without changing plan
- [x] `pnpm --filter web typecheck` / `lint` / `fmt:check` / `test` pass
- [x] 000 / README mark 007c **done**

## Out of scope

- Actual Netlify account clicks (010)
- Custom domain
- Auth
- Paid add-ons
- Rewriting Fiber into Lambda
- Persistent SQLite on Netlify
- `GET /export` / `content.json`
- Docker / `go build` release / Fiber serving `dist`
