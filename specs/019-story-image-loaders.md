# SPEC 019 — Story image loaders

Status: **done**
Covers: none (new, propose adding to 000 as P-08)
Depends on: 004, 013
Parent: [000-global.md](./000-global.md)

`StoryArt.tsx` renders the story still as a plain `<img>` with no loading state. Stills are WebP, not SVG — on a slow connection the figure box sits blank (or shows a browser broken-image icon before `src` resolves) until the file downloads. 013 explicitly scoped this out ("Story-detail image loaders").

## Goal

`/krakow/$storyId` shows a parchment-themed placeholder inside the existing figure box until the story still has decoded, matching the loader chrome established in 013 (crimson on parchment, not MUI default purple). No layout shift once the image appears.

## Out of scope

- Map loaders (013, done), attribution (014, done), border overlays (015)
- Changing image assets, formats, or `Story.image.{light,dark}` shape
- Preloading/prefetching images across routes
- Lazy-loading below-the-fold images (there's one still per story page)

## Behaviour

- Track load state per rendered `src` (theme switch swaps `src`, so state resets on `src` change — reuse `useState` + `onLoad`/`onError`, or native `<img loading>` decode signal).
- While loading: parchment skeleton/placeholder filling the same `1280x320` box (reuse `Skeleton` pattern from 013 if applicable) so no layout shift.
- On load: fade or swap in the image; keep existing `op-story-still` class and sizing.
- On error: fall back to a static bordered box with alt text visible (no infinite spinner, no broken-image icon).
- Honor `prefers-reduced-motion` (no fade transition).
- Helper logic (load/error state, whichever is non-trivial) goes in a colocated `helpers.ts` or stays inline if trivial — respect the 100/150-line component cap.

## Files

- `apps/web/src/components/StoryArt.tsx`
- Colocated helper file if load-state logic grows past trivial `useState`
- `apps/web/src/styles.css` (placeholder styling only, reuse existing parchment tokens)
- Colocated `*.test.ts`/`*.test.tsx` for load/error state behaviour

## Done when

- [x] Story still shows a parchment placeholder (not blank/broken-image) until decoded
- [x] No layout shift between placeholder and loaded image
- [x] Error case shows a static fallback with alt text, no stuck spinner
- [x] Placeholder respects `prefers-reduced-motion`
- [x] Theme switch (light/dark still swap) re-triggers placeholder correctly, not a stale image
- [x] Tests cover ≥70% of this spec's new behaviour (aim 80%): load/error/theme-swap state transitions
- [x] typecheck / lint / fmt pass
- [x] 000 / README mark 019 **done**
