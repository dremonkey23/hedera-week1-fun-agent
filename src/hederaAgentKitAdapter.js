// Thin adapter: the demo runs safely in mock mode by default, while the project
// declares and probes Hedera Agent Kit v4 so the code path is ready for a real
// testnet integration after explicit approval.
export async function inspectAgentKit() {
  try {
    const kit = await import('@hashgraph/hedera-agent-kit');
    return {
      mode: 'agent-kit-available',
      package: '@hashgraph/hedera-agent-kit',
      exportedSymbols: Object.keys(kit).slice(0, 25)
    };
  } catch (error) {
    return {
      mode: 'mock-safe-mode',
      package: '@hashgraph/hedera-agent-kit',
      reason: 'Dependency not installed in this local preview or network unavailable.',
      install: 'npm install'
    };
  }
}

export function prepareMockHbarTransfer(intent) {
  return {
    type: 'HEDERA_AGENT_KIT_TRANSFER_PREPARE_MOCK',
    network: 'testnet',
    transactionSubmission: 'disabled_until_human_approval',
    toolIntent: {
      service: 'HBAR_TRANSFER',
      toAccountId: intent.recipient,
      amount: intent.amount,
      asset: intent.asset,
      memo: intent.memo
    },
    expectedRealIntegration: [
      'Instantiate Hedera Agent Kit with testnet credentials supplied by owner.',
      'Use Agent Kit transfer/transaction tooling to prepare bytes, not auto-submit.',
      'Record policy decision to HCS topic.',
      'Submit only after explicit human approval.'
    ]
  };
}
