# Hedera Week 1 Fun Agent: Snack Guardian

A small Week 1 Hedera AI Agent bounty demo: an AI agent prepares tiny HBAR snack/coffee payments, but deterministic policy guardrails stop unsafe spend before anything can be submitted.

## What it demonstrates

- Natural-language payment intent parsing.
- Spend policy checks: amount cap, daily budget, recipient allowlist, allowed asset, approved purpose.
- Human approval before submit.
- HCS-style audit event for every decision.
- Hedera Agent Kit v4 dependency declared, with a safe mock adapter by default.

## Quick start

```bash
npm install
npm test
npm run demo
npm run demo:block
```

Example safe request:

```bash
node src/cli.js --request "Send 3 HBAR to 0.0.12345 for coffee"
```

Example blocked request:

```bash
node src/cli.js --request "Send 50 HBAR to 0.0.99999 for fireworks"
```

## Safety model

This repo defaults to mock-safe mode:

- No private keys.
- No seed phrases.
- No wallet connect.
- No mainnet.
- No transaction submission.

The output is a prepared transaction-shaped object plus an HCS-style audit event. Real testnet integration requires explicit owner approval and credentials supplied outside the repo.

## Hedera fit

Snack Guardian is intentionally simple/fun for Week 1, but the pattern maps to enterprise agentic payments:

- HCS audit logs for agent decisions.
- HBAR/HTS transfers for low-fee commerce.
- Hedera Agent Kit for AI-tool integration.
- Policy controls before autonomous payment execution.

## Bounty readiness

See:

- `docs/architecture.md`
- `docs/feedback-for-hedera-agent-kit.md`
- `docs/submission-checklist.md`
- `public/demo.html`


## Submission assets

- `public/demo.html` — interactive browser demo.
- `docs/demo-script.md` — 2-minute demo/video script.
- `docs/github-feedback-issue-draft.md` — required Hedera Agent Kit feedback draft.
- `docs/bounty-submission-draft.md` — form-ready bounty submission draft.
- `SECURITY.md` — safety posture and dependency audit note.

## Extra demo commands

```bash
npm run demo:good
npm run demo:amount
npm run demo:asset
npm run demo:block
npm run transcript
```
