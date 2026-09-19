# Netlify Free (Legacy) — Opowieści

Team: `braniubojni`. Plan: **Free + Legacy**. Price: **$0**. Do not add a payment method.

The public site is the static Vite SPA (`apps/web/dist`). Go (`apps/api`) stays local. Netlify does not run Fiber or SQLite.

## Limits (this team)

| Meter | Limit | At 100% |
|---|---|---|
| Bandwidth | 100 GB / month (team) | All sites pause until card + upgrade |
| Build minutes | 300 / month (team) | Builds stop; live site still served |
| Serverless Functions | 125k invocations / site / month | Pause risk |
| Edge Functions | 1M / month | Pause risk |
| Concurrent builds | 1 | Queue |
| Members | 1 | — |

Warnings at 50 / 75 / 90 / 100%. Check **Usage & billing** monthly.

## Stay-free rules

1. Do **not** add a payment method.
2. Do **not** click “Change team plan” except to confirm you are still Free.
3. Do **not** enable: Visual Editor, Agent Runners, Netlify Database, Blobs as primary store, Identity, Forms, Analytics add-on, Large Media, Image CDN transforms.
4. One production site for this app.
5. Prefer local build + `netlify deploy` so Netlify does not burn build minutes.
6. No function on every page view. Static assets only.
7. `netlify.toml` must not set paid plugins.
8. Deploy previews: off or rare.

OpenFreeMap tiles are third-party. They do not count as Netlify bandwidth. Do not proxy them through Functions.

## Release (0 build minutes)

```bash
pnpm --filter web build
netlify deploy --prod --dir=apps/web/dist
```

First-time: `netlify login` then `netlify init` or `netlify link`. Drag-and-drop of `apps/web/dist` in the UI also uses 0 build minutes.

Git “build on push” uses the 300-minute pool. Spec **010** (done) is the first publish.
