# Architecture

```text
User request
  -> Fun Agent intent parser
  -> Deterministic policy engine
  -> Hedera Agent Kit adapter
      -> mock transfer preparation by default
      -> optional testnet integration after owner approval
  -> HCS-style audit event
  -> human approval gate
```

## Why Hedera

- HCS: ordered audit trail for agent decisions.
- HBAR/HTS: low-fee payment rails for small autonomous commerce.
- Agent Kit: a standard way for AI apps to talk to Hedera tools.
- Policy hooks/guardrails: the missing enterprise control layer for agentic spend.

## Safety

Default mode never asks for private keys, seed phrases, wallets, or account connection. It prepares a mock transaction object only.
