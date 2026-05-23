# Bounty submission draft

## Project name
Snack Guardian — policy-governed Hedera snack payment agent

## Week
Week 1: Fun Basic Hedera Agent

## Short description
Snack Guardian is a fun AI agent that can parse a natural-language request to buy coffee/snacks with HBAR, but it cannot spend freely. It checks recipient allowlists, max spend, daily budget, asset type, and purpose, then emits an HCS-style audit event and requires human approval before transaction submission.

## Implementation details
The project uses a Node.js agent flow with `@hashgraph/hedera-agent-kit` v4 declared as the Hedera integration dependency. The default demo is mock-safe: no wallet, private key, or transaction submission. The adapter prepares a transaction-shaped object compatible with a future Hedera Agent Kit testnet path and records every policy decision as an HCS-style audit event.

## Safety notes
- No mainnet.
- No private keys.
- No seed phrases.
- No wallet connect.
- No transaction submission in default mode.
- Human approval required before any real testnet submit.

## Demo commands
```bash
npm install
npm test
npm run demo
node src/cli.js --request "Send 3 HBAR to 0.0.12345 for coffee"
node src/cli.js --request "Send 50 HBAR to 0.0.12345 for coffee"
```

## Demo URL / GitHub URL / feedback issue URL
Pending approval.

## Payout wallet
Pending approval.
