# SPEC 024 — Quiz progress ring

Status: **written** (not implemented)
Covers: none (new, propose adding to 000 as P-12)
Depends on: 006
Parent: [000-global.md](./000-global.md)

Finishing a story only updates a raw `done/total` fraction (header, hidden on small screens, and again under the Kraków title). A quiz itself only prints `Question n / N` and a final score. There is no visual fill, so one resolved item does not read as a share of the set.

## Goal

A crimson determinate circle shows how much of a set is resolved. Fill is `round(100 × resolved / total)`. One resolved item of four fills 25%. One of five fills 20%.

## Out of scope

- Changing when a story is marked done (still on finish, including a quiz that was not all correct)
- Order and towers games
- Story copy, maps, loaders

## Behaviour

- Quiz, while playing: the ring counts questions already answered (the current question counts once an option is picked). Before the first pick the ring is empty.
- Quiz, done: the ring shows correct answers / question count. The score text stays.
- Header and `/krakow`: the same ring for stories completed / stories in the city. Visible on small screens. `0` total (query not back yet) stays empty, not `NaN`.
- Colour is theme `primary` (crimson), with a divider track behind the fill.
- The accessible progressbar exposes the percent; the centre label is `resolved/total`.

## Files

- `apps/web/src/components/ProgressRing.tsx`
- `apps/web/src/components/progress-ring-helpers.ts`
- `apps/web/src/components/progress-ring-helpers.test.ts`
- `apps/web/src/components/games/QuizGame.tsx`
- `apps/web/src/components/AppShell.tsx`
- `apps/web/src/routes/krakow/index.tsx`

## Done when

- [ ] Quiz ring fills as questions are answered, and shows the score once the quiz is finished
- [ ] One of four fills 25%; one of five fills 20%; a full set fills 100%; zero stays empty
- [ ] Header and `/krakow` use the same ring for completed stories, including small screens
- [ ] Tests cover the percent and answered-count behaviour
- [ ] typecheck / lint / fmt pass
- [ ] 000 / README mark 024 **done**
