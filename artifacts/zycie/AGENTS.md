# Language trainer — agent contract

International language-learning PWA. Pedagogy: AirLearn first (explain the rule, then drill), Drops-short vocab, Duolingo-style session + streak.

This repo is **not** an expat-in-Poland companion and **not** a product for Polish citizens’ civic life. Those are separate future apps. Do not mix audiences.

Read in this order before writing code:

1. `docs/constitution.md`
2. `docs/product.md`
3. Matching file in `specs/`
4. Project skills in `.cursor/skills/`

## Hard rules

- Do not add features that are not in the active spec.
- Do not add urząd, ZUS, NFZ, visas, residence cards, taxes, or “living in Poland” guides.
- Frontend is a Vite SPA. No Next.js. No TanStack Start in v1.
- Backend is Go when we reach that spec. Do not invent a Node API.
- v1 learning loop is local-first (IndexedDB). Backend is optional until accounts exist.
- Keep it free to host: static frontend, no LLM on the request path.
- First course is Polish as a *language*, A0–A1 everyday + light culture. UI is international (English first, Russian second).
- Prefer small diffs. One spec slice per change set.
- After code changes, update the spec `Status` and `Done` checklist if behavior landed.

## Stack lock

- Web: Vite, React 19, TypeScript, TanStack Router, TanStack Query.
- API: Go (later spec).
- Content: versioned JSON in `packages/content`.
- Package manager: pnpm workspaces.

## Out of scope until a spec exists

Second products (citizen app, expat admin app), native apps, messenger bots, TranslateGemma in production, payments, extra target languages beyond Polish.
