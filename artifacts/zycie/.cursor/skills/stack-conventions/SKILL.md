---
name: stack-conventions
description: Stack and folder conventions for Życie. Use when scaffolding, adding routes, API handlers, packages, or choosing libraries.
---

# Stack conventions

## Web (`apps/web`)

- Vite + React + TypeScript strict
- TanStack Router file routes
- TanStack Query for server state later; v1 lessons load from the content package
- PWA via vite-plugin-pwa
- No Next.js, no TanStack Start in v1
- Alias `@/` → `src/`

## API (`apps/api`)

- Go
- Content comes from `packages/content`, not a second copy of strings
- No DB until a spec says so

## Content (`packages/content`)

- JSON units under `packages/content/courses/<lang>/units`
- Validate with Zod on the web side
- Slugs are ASCII kebab (`greetings`, `cafe`)
- v1 language code is `pl` only

## Install

pnpm workspaces. Do not add npm lockfiles.
