# Dependency audit note

Command run:

```bash
npm audit --omit=dev --json
```

Result after installing `@hashgraph/hedera-agent-kit@4.0.0`:

- 0 critical
- 4 high
- 2 moderate

Affected packages are in the Hedera Agent Kit dependency tree:

| Package | Severity | Via | Fix available |
|---|---:|---|---|
| `@hashgraph/hedera-agent-kit` | high | `@hiero-ledger/sdk`, `ethers` | no |
| `@hiero-ledger/proto` | high | `protobufjs` | no |
| `@hiero-ledger/sdk` | high | `@hiero-ledger/proto`, `ethers`, `protobufjs` | no |
| `ethers` | moderate | `ws` | yes |
| `protobufjs` | high | `protobufjs` advisories | no |
| `ws` | moderate | `ws` advisory | yes |

Risk framing for this bounty demo:

- The demo is a local CLI/static-page artifact.
- It does not expose a public server.
- It does not load private keys.
- It does not connect a wallet.
- It does not submit transactions.

Before production or hosted server use, re-check the Agent Kit dependency tree and upgrade when fixed releases are available.
