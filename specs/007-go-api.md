# SPEC 007 — Go API + SQLite

Status: done
Covers: **S-03**
Depends on: 005
Parent: [000-global.md](./000-global.md)

Stand up the backend. Static TS content stays where it is and stays wired to the UI — this spec builds the API next to it, unused by the frontend, so 008/009 can cut over later without a big-bang rewrite.

## Goal

`apps/api`: Fiber + SQLite (no CGO), no auth, per-IP rate limit, request logging, health check, CORS locked to the web origin. Routes return the same bilingual shape as `apps/web/src/data/types.ts` so 008/009 can point `fetch` at it without reshaping payloads.

## Out of scope

- Any change to `apps/web` (no `fetch`, no TanStack Query, no Zod — that is 008)
- Moving `cities`/`krakowStories` into SQLite as the source of truth (that is 009 — this spec seeds the same data for local dev/testing only)
- Netlify Free prep (007c)
- Netlify Free publish (010)
- Auth, accounts, Postgres
- POSTing quiz/game answers — client keeps grading itself

## Decisions locked

- Framework: **Fiber**. Do not add or discuss Gin.
- SQLite driver: `modernc.org/sqlite` (pure Go, no CGO).
- Rate limit: Fiber's built-in `limiter` middleware, per-IP, 60 req/min, `429` + `Retry-After` header on trip.
- Logging: Fiber's `logger` middleware writing method, path, status, duration, and a **hashed** IP (sha256, truncated) — never raw IP, never request/response bodies.
- CORS: `Access-Control-Allow-Origin` restricted to the configured web origin (env var `WEB_ORIGIN`, default `http://localhost:5173` for dev).

## Routes

| Method | Path | Returns |
|---|---|---|
| GET | `/healthz` | `200 {"status":"ok"}`, no DB hit |
| GET | `/v1/cities` | `City[]` (same shape as `data/types.ts`) |
| GET | `/v1/cities/:id` | `City` + `stories: StorySummary[]` (id, title, place, pin — no `game`, no `legend`/`fact`/`seeToday`) |
| GET | `/v1/cities/:id/stories/:storyId` | full `Story` incl. `game` |

- Unknown `:id` / `:storyId` → `404 {"error":"not found"}`.
- All bodies `application/json`, no envelope wrapper.

## Data

- SQLite file (`apps/api/data/opowiesci.db`, gitignored), schema + seed migration only — mirrors current `cities.ts` / `krakow.ts` content 1:1 (six Kraków stories, PL/EN copy, games as JSON columns).
- This DB is scaffolding for 007's own tests, not yet the app's source of truth (009 flips that switch). Do not delete `apps/web/src/data/` in this spec.

## Files

- `specs/007-go-api.md` (this)
- `apps/api/go.mod`, `apps/api/main.go`
- `apps/api/internal/db/` (migration + seed)
- `apps/api/internal/handlers/` (routes above)
- `apps/api/internal/middleware/` (rate limit, IP-hash logger, CORS)
- `apps/api/.gitignore` (db file)
- root `package.json` / docs: add how to run the API alongside `pnpm --filter web dev` (no pnpm workspace membership — Go module, not a JS package)
- `AGENTS.md`, `specs/000-global.md`, `specs/README.md`

## Done when

- [x] `go run apps/api` (or `pnpm dev:api`) serves `/healthz`, `/v1/cities`, `/v1/cities/:id`, `/v1/cities/:id/stories/:storyId` against the seeded SQLite DB
- [x] Payload shapes match `apps/web/src/data/types.ts` field-for-field (manual diff, not codegen)
- [x] Rate limit trips at configured req/min per IP with `429` + `Retry-After`
- [x] Logs show method/path/status/duration/hashed-IP; no raw IP, no bodies
- [x] CORS allows only `WEB_ORIGIN`
- [x] `apps/web` unchanged and still builds/tests green
- [x] Go tests cover handlers (200s, 404s) and the migration/seed
- [x] 000 / README mark 007 **done**

## Follow-up

This spec stays **done** as a local `go run` API. Netlify Free prep (static SPA, Go stays local) is child **007c** (S-09). Do not grow this file to cover that.
