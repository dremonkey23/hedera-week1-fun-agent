const policy = {
  maxAmount: 10,
  dailyBudget: 25,
  spentToday: 7.5,
  allowedRecipients: ['0.0.12345', '0.0.22222', '0.0.33333'],
  allowedAssets: ['HBAR'],
  allowedPurposes: ['coffee', 'snack', 'api-credit', 'demo'],
  requireHumanApproval: true
};

function parsePaymentIntent(text) {
  const input = String(text || '').trim();
  const amountMatch = input.match(/(\d+(?:\.\d+)?)\s*(HBAR|USDC|USD|TOKEN)?/i);
  const acctMatch = input.match(/0\.0\.\d+/);
  const lower = input.toLowerCase();
  const amount = amountMatch ? Number(amountMatch[1]) : 3;
  const asset = (amountMatch?.[2] || 'HBAR').toUpperCase();
  const recipient = acctMatch ? acctMatch[0] : '0.0.12345';
  const purpose = /coffee|latte|espresso/.test(lower) ? 'coffee'
    : /snack|pizza|taco|cookie|donut/.test(lower) ? 'snack'
    : /api|credit|compute|inference/.test(lower) ? 'api-credit'
    : /demo|test/.test(lower) ? 'demo'
    : 'unknown';
  return { raw: input, action: 'prepare_payment', amount, asset, recipient, purpose, memo: `fun-agent:${purpose}` };
}

function evaluate(intent) {
  const reasons = [];
  let policyDecision = 'REQUIRE_APPROVAL';
  if (!policy.allowedRecipients.includes(intent.recipient)) { policyDecision = 'BLOCK_RECIPIENT'; reasons.push(`Recipient ${intent.recipient} is not allowlisted.`); }
  else if (!policy.allowedAssets.includes(intent.asset)) { policyDecision = 'BLOCK_ASSET'; reasons.push(`Asset ${intent.asset} is not allowed.`); }
  else if (!policy.allowedPurposes.includes(intent.purpose)) { policyDecision = 'BLOCK_PURPOSE'; reasons.push(`Purpose ${intent.purpose} is not approved.`); }
  else if (intent.amount > policy.maxAmount) { policyDecision = 'BLOCK_AMOUNT'; reasons.push(`Amount ${intent.amount} exceeds max ${policy.maxAmount}.`); }
  else if (policy.spentToday + intent.amount > policy.dailyBudget) { policyDecision = 'BLOCK_DAILY_LIMIT'; reasons.push('Daily budget exceeded.'); }
  else { reasons.push('Recipient, asset, purpose, amount, and daily budget passed.'); reasons.push('Human approval required before transaction submission.'); }
  return { policyDecision, approvedToSubmit: false, reasons };
}

function run() {
  const request = document.querySelector('#request').value;
  const intent = parsePaymentIntent(request);
  const evaluation = evaluate(intent);
  const blocked = evaluation.policyDecision.startsWith('BLOCK');
  const result = {
    agent: 'Snack Guardian', request, intent, evaluation,
    preparedTransaction: blocked ? null : {
      type: 'HEDERA_AGENT_KIT_TRANSFER_PREPARE_MOCK', network: 'testnet', transactionSubmission: 'disabled_until_human_approval',
      toolIntent: { service: 'HBAR_TRANSFER', toAccountId: intent.recipient, amount: intent.amount, asset: intent.asset, memo: intent.memo }
    },
    auditEvent: { schema: 'hedera.fun-agent.audit.v1', timestamp: new Date().toISOString(), network: 'mock-testnet', hcsTopicMode: 'mock', privacy: 'no private keys or wallet material captured' },
    nextAction: blocked ? 'blocked_no_transaction_prepared' : 'human_approval_required_before_submit'
  };
  document.querySelector('#decision').textContent = evaluation.policyDecision;
  document.querySelector('#decision').className = blocked ? 'bad' : 'good';
  document.querySelector('#output').textContent = JSON.stringify(result, null, 2);
}

document.querySelector('#run').addEventListener('click', run);
document.querySelectorAll('[data-scenario]').forEach(btn => btn.addEventListener('click', () => { document.querySelector('#request').value = btn.dataset.scenario; run(); }));
run();
