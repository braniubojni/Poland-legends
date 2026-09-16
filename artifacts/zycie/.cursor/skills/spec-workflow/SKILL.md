---
name: spec-workflow
description: How to add and implement feature specs in the Życie monorepo. Use when creating specs, starting a slice, marking a spec done, or when the user says implement spec, write spec, next prompt.
---

# Spec workflow

## File names

`specs/NNN-short-kebab.md` — three digits, increment from the last file.

## Template

```markdown
# SPEC NNN — Title

Status: draft | ready-to-implement | in-progress | done
Depends on: NNN

## Goal
One paragraph.

## Must
Bullets.

## Must not
Bullets.

## Done when
- [ ] observable checks
```

## Implement

1. Read constitution + the spec.
2. Change only files needed for that spec.
3. Tick Done boxes when true.
4. Set Status to done.
5. Do not start the next spec unless asked.

## Conflicts

If the user prompt asks for something outside Must, refuse and propose a new spec file instead.
