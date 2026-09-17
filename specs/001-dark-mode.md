# SPEC 001 — Dark mode

Status: done
Covers: **G-01**
Depends on: none
Blocked by: nothing
Parent: [000-global.md](./000-global.md)

## Goal

Light parchment and dark ink of the same product. Toggle in the header. First visit follows the OS. After a tap, the choice is stored and wins.

## Out of scope

- Leaflet / map tiles (002, 003). This spec only sets `html.dataset.theme` so later maps can read it.
- MUI, Context API, Go (005–009).
- Story stills (004). Existing SVG art must still *follow tokens*.
- Changing PL/EN copy of stories.

## Tokens

| Token | Light | Dark |
|---|---|---|
| bg | `#F3EEE6` | `#161310` |
| surface | `#FAF6F0` | `#1F1B18` |
| fg | `#1C1917` | `#F3EEE6` |
| muted | `#6F6458` | `#A89888` |
| primary | `#9C1C2C` | `#C4454A` |
| primary-fg | `#FAF6F0` | `#FAF6F0` |
| border | `#D9CFC3` | `#3A322C` |
| ink-soft | `#3A322C` | `#D4C4B4` |
| success | `#2F5D3A` | `#7AAF82` |

Keep Fraunces + Source Sans 3, radii, crimson as the only accent.

## Behaviour

- Toggle sits in the sticky header, after PL/EN. One control, ≥ 44px.
- Persist key stays `opowiesci-v1`. Add `theme: "light" | "dark" | null`.
- `null` = never chosen → `prefers-color-scheme`. Listen to OS changes only while `null`.
- `setTheme("light" | "dark")` writes storage and applies immediately.
- Boot script in `<head>` applies class **before paint** (no parchment flash on a dark OS).
- `html` gets `class="dark"` and `data-theme="light|dark"`. `color-scheme` matches.
- `theme-color` meta follows bg (`#f3eee6` / `#161310`).
- Maps and StoryArt use CSS variables, not frozen hex, so they invert with the page.

## Files

- `specs/001-dark-mode.md` (this)
- `src/styles.css`
- `src/lib/theme.ts`
- `src/lib/progress.ts`
- `src/components/ThemeToggle.tsx`
- `src/components/AppShell.tsx`
- `src/routes/__root.tsx`
- `src/components/PolandMap.tsx`
- `src/components/KrakowMap.tsx`
- `src/components/StoryArt.tsx`
- `src/lib/error-component.tsx` (token colours)

## Done when

- [x] Header toggle switches the whole chrome, maps, games, story pages
- [x] Reload keeps the last explicit choice
- [x] First visit with no stored theme matches OS (light or dark)
- [x] After a toggle, OS changes do not override
- [x] No white flash on dark reload
- [x] Contrast holds (body text, muted, primary on both surfaces)
- [x] PL/EN still works; progress still persists
- [x] 000 / README mark 001 done
