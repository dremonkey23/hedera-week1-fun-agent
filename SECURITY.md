# Security

Snack Guardian is safe-by-default demo code.

## Current mode

- Mock testnet only.
- No transaction submission.
- No private key loading.
- No wallet connection.
- No seed phrase handling.
- No mainnet support.

## Known dependency audit note

`npm audit --omit=dev` reports vulnerabilities in the installed dependency tree after installing `@hashgraph/hedera-agent-kit@4.0.0`. This demo does not expose a server or accept untrusted remote traffic, but dependency findings should be reviewed before production or hosted server use.

## Real Hedera integration gate

Before adding real testnet credentials or submitting a transaction, require explicit owner approval for:

- network
- account
- max spend
- recipient
- token/asset
- HCS topic creation
- prepare-only vs submit
