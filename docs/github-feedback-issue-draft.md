# GitHub feedback issue draft

Title:

```text
Week 1 AI bounty feedback: prepare-only transfers, human approval, and HCS audit examples
```

Body:

```markdown
I built a small Week 1 fun agent demo using Hedera Agent Kit v4 concepts: an AI agent can prepare tiny HBAR payment actions, but policy checks and human approval stop unsafe autonomous spend.

Feedback from the build:

1. A first-party `prepare-only` transfer example would help agent builders avoid accidental auto-submit flows.
2. Human-approval examples should show return-bytes or transaction preview objects before signing/submission.
3. Policy/hook examples should include max spend, allowlisted recipients, allowed assets, approved purpose, and daily budget controls.
4. HCS audit logging templates for agent decisions would make examples more enterprise-ready.
5. Copy-paste troubleshooting for testnet account ID/private key format would reduce onboarding friction.

The demo defaults to no wallet/private key and mock transaction preparation, then documents the path to testnet integration only after explicit approval.
```

Do not post without approval.
