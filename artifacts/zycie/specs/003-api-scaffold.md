# SPEC 003 — Go API scaffold

Status: ready-to-implement
Depends on: 002
Note: implement only after the player works offline.

## Goal

Thin Go API that can later serve content and progress. v1 may only healthcheck + dump units from the same JSON.

## Must

- `apps/api` Go module `zycie/api`
- `GET /health` → `{ "ok": true }`
- `GET /v1/units` → list unit id, slug, title
- `GET /v1/units/{slug}` → full unit JSON
- Read content from `packages/content/courses/pl/units` (copied or go:embed). Do not duplicate lessons in Go structs by hand.
- `Makefile` or `just` with `run`, `test`
- CORS allow localhost:5173
- No database yet
- No auth yet

## Must not

- Framework soup
- LLM calls
- User accounts

## Done when

- [ ] `go test ./...` passes
- [ ] curl health works
- [ ] Unit payload matches the TS schema field names
