# SPEC 017 — Richer six-story prose

Status: **written** (not implemented)
Covers: **P-08**
Depends on: 009
Parent: [000-global.md](./000-global.md)

000 used to forbid changing the six Kraków facts/legends except typos. This spec **amends** that: same six IDs, longer editorial copy, still legend beside the record. Edit the **009** seed, then regenerate the 007c dump. Do not hand-edit prod TS as a second source of truth.

## Goal

Each of the six Kraków stories has a richer legend, a sourced fact, and a more useful see-today — in **PL and EN**. The product voice stays parchment, not tourist-brochure filler. Games keep the same answers unless a fact sentence must stay consistent.

## Out of scope

- New story IDs (Wanda, Wit Stwosz, Kazimierz — still Others)
- Other cities, unlocking locked pins
- UI chrome (009)
- New game kinds or extra questions “for fun”
- Changing pin coordinates, images, or cameras
- Accounts, sources UI chrome beyond the fact body itself (a bibliography **page** is Others)

## Behaviour

Same IDs: `hejnal`, `smok`, `wieze`, `lajkonik`, `golebie`, `rynek`.

Per story, both locales:

- **Legend** — tell the tale in more than one short paragraph. Keep the traditional plot; do not invent a new myth.
- **Fact** — keep the documented core (dates, names, what is / is not in the record). Add sources and context a visitor can trust. Do not collapse legend into fact.
- **See today** — richer practical beat (where to stand, when, what to look for). Still no booking, tickets, or hours API.

Games:

- Keep `correctId` / `correct` order / towers prompt meaning.
- Update **explanation** (and prompt/label wording only) if the expanded fact would otherwise contradict the quiz.

Do not add stories. Do not lengthen for its own sake past what a phone story page can still read.

## Files

- `specs/017-richer-copy.md` (this)
- API seed (`apps/api/internal/db/` seed JSON / chrome unchanged)
- Regenerated `apps/web/src/data/krakow.ts` (via 009 generate)
- Tests that the six IDs still exist and legend/fact/seeToday are non-empty in both locales (not a copy-quality linter)
- `specs/000-global.md`, `specs/README.md`

## Done when

- [ ] All six stories have longer legend + sourced fact + richer see-today in **en** and **pl**
- [ ] Same six IDs; no new stories
- [ ] Quiz/order/towers answers unchanged unless a documented fact fix required
- [ ] Seed is edited; 007c dump regenerated (not a one-off TS-only edit)
- [ ] Tests cover ≥70% of this spec’s new behaviour (aim 80%): six IDs present, both locales non-empty for legend/fact/seeToday, game `correctId`/`correct` stable vs pre-017 except documented fixes. Skip subjective prose review.
- [ ] typecheck / lint / fmt pass
- [ ] 000 / README mark 017 **done**
