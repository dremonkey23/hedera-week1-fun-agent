# 2-minute demo script

## 0:00 — Problem
AI agents can ask to pay for snacks, API credits, or services, but unmanaged autonomous spend is dangerous.

## 0:15 — Meet Snack Guardian
Snack Guardian is a fun Hedera agent that prepares tiny HBAR snack/coffee payments only after deterministic policy checks pass.

## 0:30 — Safe request
Run:

```bash
node src/cli.js --request "Send 3 HBAR to 0.0.12345 for coffee"
```

Show result: `REQUIRE_APPROVAL`.

Explain: the recipient, asset, purpose, amount, and daily budget pass, but human approval is still required before transaction submission.

## 1:00 — Blocked request
Run:

```bash
node src/cli.js --request "Send 50 HBAR to 0.0.12345 for coffee"
```

Show result: `BLOCK_AMOUNT`.

Then run:

```bash
node src/cli.js --request "Send 2 HBAR to 0.0.99999 for snack"
```

Show result: `BLOCK_RECIPIENT`.

## 1:30 — Hedera fit
Show prepared transaction-shaped object and HCS-style audit event.

Say: In a real testnet integration, Hedera Agent Kit prepares the transaction, HCS records the agent decision, and no transaction submits until a human approves.

## 1:55 — Close
This is intentionally fun for Week 1, but the same pattern maps to enterprise agentic payments: spend limits, allowlists, audit logs, and human approval.
