# SPEC 004 — Story images

Status: done
Covers: **P-04**
Depends on: 001 (tokens)
Parent: [000-global.md](./000-global.md)

Geometric `StoryArt` SVGs are not informative. Keep page chrome. Replace the header graphic with one still per Kraków story.

## Goal

Each `/krakow/$storyId` header shows a readable place, graded to parchment + crimson. Alt comes from `place` / `title`. Light and dark both work.

## Out of scope

- OG / share-card second crop
- Map pins (002, 003)
- Stack rewrite (005–009)
- New stories or copy changes
- Runtime xAI / Imagine image calls

## Behaviour

- Stills live at `public/stories/{id}.webp`. Places that have a true night plate also ship `{id}-dark.webp`.
- `Story.image` is `{ light, dark }`. Theme picks the file. Paired night plates skip the CSS wash.
- Mariacki and the Rynek follow real views (unequal towers + green porch; Sukiennice as the square’s axis). No watermarks, no identifiable faces.
- Frame stays the existing rounded `border-border` surface. Image is full width, height ~240–320px, `object-fit: cover`.
- Alt: `{place} — {title}` in the active locale.

| id | Show |
|---|---|
| hejnal | Mariacki, two unequal towers, taller tower window |
| wieze | Close towers, height difference obvious (tighter crop than hejnal) |
| smok | Wawel bank, bronze dragon, Vistula |
| lajkonik | Hobby-horse costume, not a generic horse |
| golebie | Rynek / Sukiennice, pigeons, no feeding |
| rynek | Square grid + Sukiennice axis |

## Files

- `specs/004-story-images.md` (this)
- `public/stories/{id}.webp`
- `src/data/types.ts`
- `src/data/krakow.ts`
- `src/components/StoryArt.tsx`
- `src/routes/krakow/$storyId.tsx`
- `src/styles.css`

## Done when

- [x] Six WebP stills exist under `public/stories/`
- [x] Header graphic is the still, not the SVG blob
- [x] Chrome (fonts, borders, surfaces) is unchanged
- [x] Alt text follows place / title in PL and EN
- [x] Dark mode darkens the plate; light stays parchment
- [x] Typecheck passes for 004 files
- [x] 000 / README mark 004 done
