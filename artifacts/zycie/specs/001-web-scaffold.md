# SPEC 001 — Web scaffold

Status: ready-to-implement
Depends on: 000

## Goal

Vite + React + TS + TanStack Router + TanStack Query PWA shell. No lessons yet.

## Must

- `apps/web` with Vite.
- TypeScript strict.
- TanStack Router file routes:
  - `/` home
  - `/learn` placeholder
  - `/review` placeholder
  - `/settings` placeholder
- TanStack Query provider installed, unused is fine.
- Path alias `@/` → `src/`.
- PWA plugin wired (vite-plugin-pwa) with a minimal manifest (name Życie, lang pl/en).
- SPA fallback for Netlify/Cloudflare: `public/_redirects` with `/* /index.html 200` and `netlify.toml` publish `apps/web/dist`.
- ESLint + Prettier sensible defaults.
- `pnpm --filter web dev` starts the app.

## Must not

- Next.js, Remix, TanStack Start, SSR.
- Auth, API client, i18n libraries beyond a tiny hardcoded EN dictionary object.
- UI kit explosion. Use semantic HTML + one CSS module or MUI. Pick MUI only if already natural; otherwise CSS modules.
- Fetch of any remote lesson API.

## Done when

- [ ] Home renders “Free Polish course — rule first, then practice” and links to /learn /review /settings
- [ ] Client-side navigation works
- [ ] Production build succeeds
- [ ] README in `apps/web` documents scripts
