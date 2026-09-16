# SPEC 002 — Content package + lesson player

Status: ready-to-implement
Depends on: 001

## Goal

One real A0 unit playable offline from JSON. Schema is the contract for all future units and for the future Go API.

## Schema (v0)

`packages/content/src/schema.ts` + JSON fixture.

Course sits under `packages/content/courses/pl/` so a later course (`es`, `de`) does not rewrite the app. v1 ships only `pl`.

```ts
type VocabItem = {
  id: string
  pl: string
  en: string
  ru: string
  examplePl: string
  exampleEn: string
}

type Drill =
  | { id: string; type: "tap-pair"; pairs: [string, string][] }
  | { id: string; type: "type-pl"; promptEn: string; accept: string[] }

type Lesson = {
  id: string
  titleEn: string
  ruleEn: string
  ruleRu: string
  cultureEn?: string
  vocab: VocabItem[]
  drills: Drill[]
}

type Unit = {
  id: string
  slug: string
  titleEn: string
  titleRu: string
  lessons: Lesson[]
}
```

## Fixture

`packages/content/courses/pl/units/greetings.json`

- Unit slug `greetings`
- Two lessons (hello / goodbye + *pan/pani* or “how are you”)
- Everyday words: cześć, dzień dobry, dziękuję, proszę, tak, nie
- Optional one-line culture: when *cześć* vs *dzień dobry*
- No offices, visas, clinics-as-admin, or official URLs

## Player

Route `/learn/pl/greetings` then `/learn/pl/greetings/:lessonId`.

Session order: vocab cards → rule text → drills → done screen.

## Done when

- [ ] Zod or similar validates the fixture at build or dev start
- [ ] Unit plays without network
- [ ] Invalid JSON fails loudly
- [ ] Content package is importable from `apps/web`
- [ ] No expat-admin copy anywhere in the fixture
