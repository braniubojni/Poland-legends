# SPEC 020 — Git hooks (Husky)

Status: **written** (not implemented)
Covers: none (new, propose adding to 000 as S-12)
Depends on: 005 (Vite bootstrap — `typecheck`/`lint`/`fmt:check`/`build` scripts), 012 (Knip)
Parent: [000-global.md](./000-global.md)

There is no local gate today: a broken build, a type error, dead code, or a failing test can be committed and pushed. Netlify's build step (`netlify.toml`) only runs `pnpm --filter web build` on deploy — no typecheck, lint, knip, or test runs anywhere in the pipeline. There is no GitHub Actions CI either, so these git hooks are the only quality gate until one exists.

## Goal

Wire [Husky](https://typicode.github.io/husky/) v9 so:

- **pre-commit** runs the fast, deterministic static checks: `fmt:check`, `lint`, `typecheck`, `knip`, `build`.
- **pre-push** runs the test suite: `test` (Vitest).

Split by cost, not by the exact list requested: static analysis + build (seconds) gates every commit; the full test run (still fast today, but the thing most likely to grow) gates every push instead, so it does not slow down every intermediate commit on a branch.

`fmt:check` and `lint` are added beyond the requested `build`/`typecheck`/`knip` set — they're existing one-line scripts (`apps/web/package.json`) and skipping them would let a commit pass hooks while still failing what `pnpm lint`/`pnpm fmt:check` would catch a minute later. Flag if that's unwanted; they're easy to drop from the pre-commit list.

## Out of scope

- `lint-staged` / scoping checks to changed files only — one app, whole-project runs are simple and already fast; revisit only if hook time becomes a real complaint.
- Commit-message linting / Conventional Commits enforcement (not requested).
- CI (GitHub Actions or similar) — hooks are bypassable (`--no-verify`) and don't replace CI; a future spec can add CI that runs the same commands server-side.
- Changing what any of the underlying scripts (`typecheck`, `lint`, `fmt`, `knip`, `build`, `test`) do.

## Behaviour

- `pnpm dlx husky init` (or manual equivalent) at the repo root: adds `husky` as a root devDependency, a `"prepare": "husky"` script in the root `package.json`, and `.husky/` hook files. `pnpm install` (which runs `prepare`) is what activates the hooks for a fresh clone — no separate "husky install" step.
- `.husky/pre-commit`:
  ```sh
  pnpm fmt:check && pnpm lint && pnpm typecheck && pnpm knip && pnpm build
  ```
- `.husky/pre-push`:
  ```sh
  pnpm test
  ```
- All commands run from the repo root using the existing root `package.json` aliases (`pnpm typecheck` → `pnpm --filter web typecheck`, etc.) — no new scripts needed beyond what 005/012 already added.
- A failing hook must block the commit/push with the underlying tool's own error output (no swallowing, no `--no-verify` baked into the hook itself).
- Hooks must work from a clean `pnpm install` with no manual setup step beyond that install.

## Files

- `package.json` (root): `husky` devDependency, `"prepare": "husky"` script
- `.husky/pre-commit`
- `.husky/pre-push`
- `specs/000-global.md`, `specs/README.md` (status)

## Done when

- [ ] Fresh `pnpm install` activates the hooks (verify in a clean clone or by removing `.husky/_` and reinstalling)
- [ ] `git commit` runs `fmt:check` → `lint` → `typecheck` → `knip` → `build` and blocks on any failure
- [ ] `git push` runs `test` and blocks on failure
- [ ] Deliberately breaking each check (a lint error, a type error, an unused export, a build error, a failing test) confirms the corresponding hook actually blocks — recorded as a manual verification note in the PR, not a Vitest test (this spec's new behaviour is shell tooling, not application logic)
- [ ] `--no-verify` still works as the documented escape hatch (no attempt to block it)
- [ ] typecheck / lint / fmt pass on the repo itself
- [ ] 000 / README mark 020 **done**
