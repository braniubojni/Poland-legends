# Cursor prompt sequence

Paste **one prompt per chat**. After each step, run the Done checks. Only then start the next prompt.

Enable project skills: Cursor Settings → Rules / Skills → allow `.cursor/skills` from this repo. Do not install these skills globally.

---

## Prompt 0 — repo (SPEC 000)

```
You are working in this language-trainer repo.

Read AGENTS.md, docs/constitution.md, docs/product.md, specs/000-repo.md, and .cursor/skills/spec-workflow/SKILL.md.

Implement SPEC 000 only.

Create the pnpm workspace (apps/*, packages/*).
Add .gitignore and pnpm-workspace.yaml if missing.

Do not scaffold Vite or Go yet.
Do not add living-in-Poland or civic features.

When finished, tick the Done checkboxes in specs/000-repo.md and set Status to done.
```

---

## Prompt 1 — frontend shell (SPEC 001)

```
Read AGENTS.md, docs/constitution.md, specs/001-web-scaffold.md, and .cursor/skills/stack-conventions/SKILL.md.

Implement SPEC 001 only in apps/web.

Vite + React + TS + TanStack Router + TanStack Query.
No Next.js. No TanStack Start. No lessons. No API.

Home page: one sentence — free Polish course, AirLearn-style (rule then practice).
Links to /learn /review /settings placeholders.

Include PWA plugin and SPA redirects for Netlify/Cloudflare Pages.

Verify with: pnpm --filter web build

Tick Done in specs/001-web-scaffold.md when true.
```

---

## Prompt 2 — content + player (SPEC 002)

```
Read AGENTS.md, docs/constitution.md, specs/002-content-and-player.md, .cursor/skills/content-layers/SKILL.md, and .cursor/skills/stack-conventions/SKILL.md.

Implement SPEC 002 only.

Create packages/content/courses/pl with schema and units/greetings.json.
Wire apps/web so /learn/pl/greetings plays vocab → rule → drills offline.

Everyday Polish only. No urząd, visas, ZUS, NFZ.

Validate JSON. Do not add more units.

Tick Done in specs/002-content-and-player.md when a lesson is playable without a network.
```

---

## Prompt 3 — stop and use the app

No AI. Finish the greetings unit on your phone. Fix copy in JSON if a drill feels stupid.

---

## Prompt 4 — Go API (SPEC 003)

```
Read AGENTS.md, specs/003-api-scaffold.md, and .cursor/skills/stack-conventions/SKILL.md.

Implement SPEC 003 only in apps/api.

Go service: GET /health, GET /v1/units, GET /v1/units/{slug}.
Serve JSON from packages/content/courses/pl. No DB. No auth. No LLM.

CORS for http://localhost:5173.

Tick Done in specs/003-api-scaffold.md when go test ./... passes and curl works.
```

---

## Later (same product)

- 004 IndexedDB SRS + streak
- 005 EN/RU UI toggle
- 006 More A1 units (cafe, directions, family, food)
- 007 Static deploy

## Explicitly not this repo

Expat admin companion. Citizen super-app. Bots can wait until the trainer is good.
