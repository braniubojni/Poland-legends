# SPEC 023 — Global error boundary + retry

Status: **written** (not implemented)
Covers: none (new, propose adding to 000 as P-11)
Depends on: none functionally; touches the same `main.tsx`/`router.tsx` area as 022, implement after or coordinate to avoid a conflicting diff
Parent: [000-global.md](./000-global.md)

Today: `apps/web/src/router.tsx` sets `defaultErrorComponent: AppErrorComponent` (`apps/web/src/lib/error-component.tsx`), so a render error **inside a route** shows a styled error screen. Two gaps:

1. `AppErrorComponent` has no retry action — it's a dead end, reload-the-tab-yourself.
2. Nothing wraps `main.tsx` above the router (`ProgressProvider` → `ChromeProvider` → `OpThemeProvider` → `AppShell`, plus `QueryClientProvider`/`RouterProvider` themselves). A throw in any of those — e.g. corrupted `localStorage` JSON in `ProgressProvider`'s init — produces a blank white screen with no boundary to catch it, since it happens outside the router's own `CatchBoundary`.

Per-page query errors (`StoryStatus kind="error"` in `/krakow/$storyId`, etc.) are already handled gracefully today and are **not** what this spec is about — this is about uncaught render exceptions, the "global error" case.

## Goal

No uncaught render error anywhere in the tree produces a blank screen. Every error surface (route-level and top-level) shows the same styled error chrome with a working "Try again" action.

## Out of scope

- Per-query error UI (`StoryStatus`, `NotFoundError` handling) — already exists, not touched.
- Error reporting / telemetry (Sentry, etc.) — not requested, no such service configured.
- Retrying non-idempotent operations automatically — "Try again" is user-initiated, not auto-retry-with-backoff.

## Behaviour

- **Top-level boundary**: a class component (`componentDidCatch`/`getDerivedStateFromError` — no hook equivalent exists in React 19) wraps the tree in `main.tsx`, outside `RouterProvider`, catching anything the router's own `CatchBoundary` can't (provider-tree throws, or a throw from `RouterProvider` construction itself). Reuses `AppErrorComponent`'s visual chrome so a top-level catch and a route-level catch look identical to the user.
- **"Try again"**:
  - Route-level (`AppErrorComponent` via `defaultErrorComponent`): re-invoke the failed route's data (loader/query) and clear the error — confirm the exact reset API against the installed `@tanstack/react-router` version (e.g. `router.invalidate()` on the current match) during implementation rather than assuming; don't hand-roll a full `location.reload()` here if the router has a real retry path.
  - Top-level boundary: resets its own `hasError` state to re-render children from scratch (recovers from a transient throw, e.g. a one-time `localStorage` parse failure that a fresh mount won't hit again since the corrupt value should be cleared/defaulted on catch, not re-read as-is).
  - If retry fails again immediately (error persists across a reset), the boundary still shows the same screen rather than looping silently — no infinite retry loop, no auto-retry.
- No new "purple MUI default" error screen — same parchment/crimson tokens as `AppErrorComponent` already uses.

## Files

- `apps/web/src/lib/error-boundary.tsx` (new top-level class boundary)
- `apps/web/src/lib/error-component.tsx` (add "Try again" action, shared by both boundaries)
- `apps/web/src/main.tsx` (wrap with the new boundary)
- `apps/web/src/router.tsx` if the retry wiring needs anything beyond what `defaultErrorComponent` already provides
- Colocated `*.test.tsx` for: top-level boundary catches + resets, route-level retry re-invokes data, no-loop-on-repeated-failure

## Done when

- [ ] A thrown error inside a route shows `AppErrorComponent` with a working "Try again" that re-attempts the route's data and recovers if the underlying cause is gone
- [ ] A thrown error outside the router (simulate via a provider that throws in a test) is caught by the top-level boundary, not a blank screen
- [ ] "Try again" on the top-level boundary re-renders the tree; a persistent failure doesn't loop
- [ ] Visual parity between the two error surfaces (same component/chrome, no bare MUI default)
- [ ] Tests cover ≥70% of this spec's new behaviour (aim 80%): catch, reset/retry, persistent-failure-no-loop
- [ ] typecheck / lint / fmt pass
- [ ] 000 / README mark 023 **done**
