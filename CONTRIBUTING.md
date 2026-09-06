# Contributing

This is one of four repositories that make up the ShockMeGenie platform. The rules live in
one place, `shockmegenie-docs`, so they cannot drift between repos.

## Read first

- [`../shockmegenie-docs/QUICK-START.md`](../shockmegenie-docs/QUICK-START.md) — orientation
- [`../shockmegenie-docs/STANDARDS.md`](../shockmegenie-docs/STANDARDS.md) — the rules
- [`../shockmegenie-docs/WORKFLOW.md`](../shockmegenie-docs/WORKFLOW.md) — the process
- [`../shockmegenie-docs/GIT_WORKFLOW.md`](../shockmegenie-docs/GIT_WORKFLOW.md) — branching
- [`../shockmegenie-docs/LESSONS.md`](../shockmegenie-docs/LESSONS.md) — known footguns

## Setup

Running the whole stack: [`../shockmegenie-docs/README.md`](../shockmegenie-docs/README.md).
Running natively: [`../shockmegenie-docs/MANUAL_START.md`](../shockmegenie-docs/MANUAL_START.md).

## Before you push

Run what CI runs:

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

## Branching

`dev` is the base branch. Feature work goes on `feature/<name>`, branched from `dev`.
Never develop directly on `dev` except a fix to something that already works.

**If your change spans repositories**, use the same branch name in each, cross-reference the
pull requests, and merge the API before its consumers. This is not optional; see
[`GIT_WORKFLOW.md`](../shockmegenie-docs/GIT_WORKFLOW.md#changes-spanning-repositories).

## Commits

Explain **why**, not just what. Never add AI or agent attribution to a commit.

## Four rules that are not style preferences

1. Never expose box contents before delivery, through any channel.
2. Compliance is enforced server-side, never in the UI alone.
3. Money and inventory mutations are transactional, idempotent, and audited.
4. Controllers never touch Prisma.
