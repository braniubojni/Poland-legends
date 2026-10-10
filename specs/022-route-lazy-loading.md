# SPEC 022 — Smart route lazy loading (story pages first)

Status: **written** (not implemented)
Covers: none (new, propose adding to 000 as P-10)
Depends on: 004 (story images), 013 (map loaders — reuse loader chrome for any new `Suspense` fallback), 019 (story image loaders)
Parent: [000-global.md](./000-global.md)

**Investigate before implementing** — the naive read of "lazy load pages" (wrap every route in `React.lazy`) may already be partially done: `apps/web/vite.config.ts` has `tanstackRouter({ target: "react", autoCodeSplitting: true })`, which splits each file-based route's component into its own chunk at build time without a manual `.lazy.tsx` file. First confirm what that actually produces, then decide what's left to do.

## Goal

`/krakow/$storyId` (and the other routes) load only the code and data that route needs — MapLibre GL should not be in the story page's chunk (no map there), and the story page's own weight (article body, game components) should not block the initial Poland/Kraków map routes. Navigation should still feel instant on click, not show a loading flash for cached/adjacent routes.

## Out of scope

- Server-side rendering / streaming (no SSR in this stack, see 000).
- A service worker or offline precache (parking lot in 000, not this spec).
- Prefetching all six story pages eagerly "just in case" — that's the opposite of lazy loading; only intent-based preload (below) is in scope.
- Changing route paths, params, or the file-route structure itself.
- Image lazy-loading (019 already covers the story still's own load state).

## Investigation (do first, write findings into the PR description)

1. Build (`pnpm --filter web build`) and inspect `apps/web/dist/assets/*.js` (or `--mode` with `rollup-plugin-visualizer`, temporary devDependency, removed after use unless it earns a permanent place): is each route already its own chunk? Is `maplibre-gl` present in the `/krakow/$storyId` chunk or only in `/` and `/krakow`'s?
2. If routes are already split and MapLibre is already isolated, this spec's remaining work is **preload timing**, not code-splitting — say so and scope down instead of adding redundant `React.lazy` wrappers around already-split route components.
3. Check `components/games/*` (quiz/order/towers) — only one game type renders per story. If bundle analysis shows they're a meaningful chunk (not just a few KB of MUI-wrapped form controls), lazy-import the matching game component by `Game.kind` inside `StoryArticle`/`StoryPage`; if they're negligible, don't add `Suspense` boilerplate for a few KB.

## Behaviour (scope depends on investigation findings above)

- `router.tsx`: set `defaultPreload: "intent"` (hover / touch-start / focus preloads the target route's chunk + loader data before click) so navigation feels instant despite code-splitting. This is the main lever most likely to matter regardless of what step 1 finds.
- If step 1 shows gaps in the automatic split (e.g. a shared barrel import pulling `maplibre-gl` into a route that shouldn't have it), fix the import path, not the splitting mechanism — don't hand-rewrite `autoCodeSplitting`'s job with manual `React.lazy` on top of it.
- Any new `Suspense` boundary needed for a lazy chunk reuses the loader chrome from 013 (parchment/crimson skeleton) as its `fallback`, never a bare spinner or blank screen.
- No layout shift when a lazy chunk resolves, same bar as 019.

## Files

- `apps/web/src/router.tsx` (`defaultPreload`)
- `apps/web/vite.config.ts` only if the investigation finds a real gap in `autoCodeSplitting` config (unlikely to need changes)
- `apps/web/src/routes/krakow/$storyId.tsx` / `components/StoryArticle*` only if game-component lazy-import is justified by the bundle numbers
- A short note (PR description or a `## Findings` addendum to this spec file) recording what the bundle analysis showed, so the next person doesn't re-investigate from zero

## Done when

- [ ] Bundle analysis findings recorded (what's already split, what wasn't, what changed)
- [ ] `maplibre-gl` confirmed absent from `/krakow/$storyId`'s chunk (or already was — either way, confirmed, not assumed)
- [ ] `defaultPreload: "intent"` wired and manually verified (hovering a Kraków pin/link visibly preloads before click)
- [ ] No new loading flash or layout shift introduced on any route
- [ ] Tests cover ≥70% of this spec's *new* behaviour (aim 80%) — realistically a router-config assertion plus, if the game-component lazy-import branch is taken, its Suspense/fallback/error-path tests; code-splitting itself is a build-time property, not unit-testable, and is instead covered by the Playwright golden-path specs from 021 (navigation still works end to end)
- [ ] typecheck / lint / fmt pass
- [ ] 000 / README mark 022 **done**
