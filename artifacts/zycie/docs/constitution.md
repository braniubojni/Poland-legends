# Constitution

Non-negotiable product and engineering laws. Change only with an explicit spec amendment.

## Two products, never one codebase goal

| Now (this repo) | Later (other repo / later specs) |
|---|---|
| International language trainer | App Polish citizens actually want |
| Learn Polish like AirLearn / Duolingo | Local-life / civic / community features |
| Generic everyday + culture-lite | Whatever friends validate |

Do not merge “what an expat needs at the urząd” into this trainer. Do not design this trainer as a civic portal for Poles.

## Product (this repo)

1. Free language trainer. No hearts, no paywall, no dark patterns.
2. AirLearn loop: short rule → examples → drills. Not guess-the-sentence-first.
3. One target language in v1: Polish.
4. UI languages in v1: English and Russian.
5. Culture notes are allowed when they explain the language (formality, *pan/pani*, holidays as vocabulary). They are not news or bureaucracy.

## Engineering

1. Monorepo: `apps/web`, `apps/api`, `packages/content`.
2. Web is a PWA SPA. Offline for downloaded units.
3. Do not run models on the static host.
4. $0 hosting target: static web on Cloudflare Pages or Netlify (static only).

## Agent behavior

1. Spec-driven. No drive-by refactors.
2. Skills live in `.cursor/skills/` (project only).
3. If the spec and the user prompt conflict, stop and ask.
4. Do not commit secrets.
