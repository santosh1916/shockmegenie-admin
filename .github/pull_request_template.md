## What changed

<!-- One or two sentences. What this does, not how. -->

## Why

<!-- The problem this solves. Link the issue if there is one. -->

## Sibling pull requests

<!-- REQUIRED if this change spans repositories. List them, and note the merge order:
     the API merges before its consumers. Leave "None" if this is self-contained.
     See shockmegenie-docs/GIT_WORKFLOW.md#changes-spanning-repositories -->

None

## How it was verified

<!-- Commands run, and what you observed. "It builds" is not verification. -->

- [ ] `pnpm lint`
- [ ] `pnpm typecheck`
- [ ] `pnpm test`
- [ ] `pnpm build`

## Product rules checklist

Tick only what applies. If any answer is yes, explain below.

- [ ] Could this expose box contents to a sender or recipient before delivery?
- [ ] Could this let a non-compliant product category reach a box?
- [ ] Could this let a branded item ship without complete authenticity documentation?
- [ ] Does this mutate money or inventory? If so, is it transactional, idempotent, and audited?
- [ ] Does this change an API DTO? If so, have the consumers been regenerated?
