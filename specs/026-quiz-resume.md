# SPEC 026 — Resume a quiz where it was left

Status: **written** (not implemented)
Covers: none (new, propose adding to 000 as P-14)
Depends on: 006, 024
Parent: [000-global.md](./000-global.md)

The Kraków map pin (`op-story-pin is-done`) and the story row already mark a finished story, including **The broken call**. That flag is the story id in `completed` inside `opowiesci-v1`. The quiz itself keeps the question index and the picked option only in `QuizGame` state. Leave the page, or reload, and `/krakow/hejnal` starts again at question 1 with nothing revealed.

## Goal

A quiz remembers each picked option. Coming back shows the questions already resolved and opens the first one that is not. When every question has a pick, the page shows those picks. It does not ask the player to start over.

## Out of scope

- Order and towers games
- Changing story copy, the progress ring formula from 024, or when the map pin and the list checkmark appear (still the story id in `completed`, after the quiz is finished — a partial 2 of 4 does not mark the pin done)
- Accounts or a server save

## Behaviour

Persist picks in the same `opowiesci-v1` snapshot as locale, theme, and `completed`. Shape: per story id, per question id, the chosen option id. Write the pick when the player chooses, before Next, so leaving mid-quiz keeps it. A missing field on an older snapshot means no picks. Do not drop `completed`, locale, or theme while parsing.

On `/krakow/$storyId` for a quiz:

- A question with a saved pick is shown resolved: that option stays selected, correct or not, with its explanation. It is not clickable again.
- The open question is the first one with no saved pick. Example: 2 of 4 saved → those two are revealed, the third is the one to answer, the fourth stays behind it until the player reaches it. The ring reads `2/4`.
- When every question has a saved pick, there is no open question. Show each picked option revealed, and the score ring (correct / total). Do not reset to an unanswered question 1.
- Finishing the last question still adds the story id to `completed` once, same as today. Re-opening that story does not remove it from `completed`.
- A story already in `completed` with no saved picks (finished before this spec) must not start over either. Reveal each question on its correct option, because the old pick was never stored. Do not invent a score.

## Files

- `apps/web/src/lib/progress/helpers.ts` (snapshot field, parse, pure resume helpers)
- `apps/web/src/lib/progress/helpers.test.ts`
- `apps/web/src/lib/progress/ProgressProvider.tsx` (save a pick)
- `apps/web/src/components/games/QuizGame.tsx` (hydrate, reveal saved picks, open the first unresolved question)

## Done when

- [ ] Answering 2 of 4, leaving, and opening the story again shows those two resolved and opens the third
- [ ] A pick survives reload before Next
- [ ] All four picked: the page shows each picked option, not a fresh quiz
- [ ] The map pin and the list checkmark still follow `completed`, and a partial quiz does not set them
- [ ] A story already in `completed` with no stored picks opens revealed, not at question 1
- [ ] Older `opowiesci-v1` snapshots still load locale, theme, and `completed`
- [ ] Tests cover ≥70% of this behaviour (aim 80%)
- [ ] typecheck / lint / fmt pass
- [ ] 000 / README mark 026 **done**
