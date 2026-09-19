# SPEC 016 — Standard Go layout

Status: **written** (not implemented)
Covers: **S-10**
Depends on: 007
Parent: [000-global.md](./000-global.md)

`apps/api` already uses `internal/{db,handlers,middleware}`. The binary is still package `main` at the module root (`main.go` + `app.go`). This spec moves the entrypoint to `cmd/api` and Fiber wiring to `internal/app`. Behaviour, routes, and schema stay as they are.

## Goal

Lean official layout: `cmd/` for the binary, `internal/` for private code. `pnpm dev:api` still works. No new framework.

## Out of scope

- Kitchen-sink `golang-standards/project-layout`: no `pkg/`, no `api/` OpenAPI tree, no `configs/`, no `deployments/`
- New routes, rate-limit/CORS/log changes
- **009** chrome table / generate dump
- **017** copy
- Switching Fiber, SQLite driver, or module path `opowiesci/api`

## Behaviour

Target tree:

```
apps/api/
  cmd/api/main.go      # go run ./cmd/api  (env, Open, Migrate, Seed, Listen)
  internal/app/        # NewApp, Config (today’s app.go + app_test.go)
  internal/db/
  internal/handlers/
  internal/middleware/
  go.mod
```

- `pnpm dev:api` (and any root docs / `AGENTS.md` / `CLAUDE.md`) run `go run ./cmd/api` from `apps/api`.
- Tests move with the packages they belong to (`internal/app` for `NewApp`).
- HTTP behaviour identical to 007: `/healthz`, city/story routes, limiter, hashed-IP logs, CORS.

## Files

- `specs/016-go-layout.md` (this)
- `apps/api/main.go` → `apps/api/cmd/api/main.go`
- `apps/api/app.go` / `app_test.go` → `apps/api/internal/app/`
- `apps/api/main_test.go` (re-home or drop if redundant)
- root `package.json` `dev:api` script
- `AGENTS.md`, `CLAUDE.md`
- `specs/000-global.md`, `specs/README.md`

## Done when

- [ ] `go run ./cmd/api` (via `pnpm dev:api`) serves the same 007 routes
- [ ] No `package main` left at `apps/api/*.go` except under `cmd/`
- [ ] No `pkg/`, `api/`, or `configs/` directories added
- [ ] Docs and scripts point at `./cmd/api`
- [ ] Tests cover ≥70% of this spec’s new behaviour (aim 80%): `NewApp` still in `internal/app` (200/404/healthz). Skip live listen if existing tests already construct `NewApp`.
- [ ] `go test ./...` from `apps/api` passes
- [ ] 000 / README mark 016 **done**
