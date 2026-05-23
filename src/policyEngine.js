export const DECISIONS = Object.freeze({
  ALLOW_PREPARE: 'ALLOW_PREPARE',
  REQUIRE_APPROVAL: 'REQUIRE_APPROVAL',
  BLOCK_RECIPIENT: 'BLOCK_RECIPIENT',
  BLOCK_AMOUNT: 'BLOCK_AMOUNT',
  BLOCK_ASSET: 'BLOCK_ASSET',
  BLOCK_DAILY_LIMIT: 'BLOCK_DAILY_LIMIT',
  BLOCK_PURPOSE: 'BLOCK_PURPOSE'
});

export const defaultPolicy = Object.freeze({
  maxAmount: 10,
  dailyBudget: 25,
  spentToday: 7.5,
  allowedRecipients: ['0.0.12345', '0.0.22222', '0.0.33333'],
  allowedAssets: ['HBAR'],
  allowedPurposes: ['coffee', 'snack', 'api-credit', 'demo'],
  requireHumanApproval: true
});

export function normalizeAccountId(value = '') {
  const match = String(value).match(/0\.0\.\d+/);
  return match ? match[0] : null;
}

export function parsePaymentIntent(text) {
  const input = String(text || '').trim();
  const amountMatch = input.match(/(\d+(?:\.\d+)?)\s*(HBAR|USDC|USD|TOKEN)?/i);
  const recipient = normalizeAccountId(input) || '0.0.12345';
  const asset = (amountMatch?.[2] || 'HBAR').toUpperCase();
  const amount = amountMatch ? Number(amountMatch[1]) : 3;
  const purpose = detectPurpose(input);

  return {
    raw: input,
    action: 'prepare_payment',
    amount,
    asset,
    recipient,
    purpose,
    memo: `fun-agent:${purpose}`
  };
}

function detectPurpose(input) {
  const lower = input.toLowerCase();
  if (/coffee|latte|espresso/.test(lower)) return 'coffee';
  if (/snack|pizza|taco|cookie|donut/.test(lower)) return 'snack';
  if (/api|credit|compute|inference/.test(lower)) return 'api-credit';
  if (/demo|test/.test(lower)) return 'demo';
  return 'unknown';
}

export function evaluatePolicy(intent, policy = defaultPolicy) {
  const reasons = [];
  if (!policy.allowedRecipients.includes(intent.recipient)) {
    return decision(DECISIONS.BLOCK_RECIPIENT, [`Recipient ${intent.recipient} is not allowlisted.`], intent, policy);
  }
  if (!policy.allowedAssets.includes(intent.asset)) {
    return decision(DECISIONS.BLOCK_ASSET, [`Asset ${intent.asset} is not allowed.`], intent, policy);
  }
  if (!policy.allowedPurposes.includes(intent.purpose)) {
    return decision(DECISIONS.BLOCK_PURPOSE, [`Purpose ${intent.purpose} is not approved for the fun-agent.`], intent, policy);
  }
  if (intent.amount > policy.maxAmount) {
    return decision(DECISIONS.BLOCK_AMOUNT, [`Amount ${intent.amount} exceeds per-payment max ${policy.maxAmount}.`], intent, policy);
  }
  if (policy.spentToday + intent.amount > policy.dailyBudget) {
    return decision(DECISIONS.BLOCK_DAILY_LIMIT, [`Daily budget would be ${policy.spentToday + intent.amount}, over ${policy.dailyBudget}.`], intent, policy);
  }
  reasons.push('Recipient, asset, purpose, amount, and daily budget passed.');
  if (policy.requireHumanApproval) {
    reasons.push('Human approval required before transaction submission.');
    return decision(DECISIONS.REQUIRE_APPROVAL, reasons, intent, policy);
  }
  return decision(DECISIONS.ALLOW_PREPARE, reasons, intent, policy);
}

function decision(policyDecision, reasons, intent, policy) {
  const approvedToSubmit = policyDecision === DECISIONS.ALLOW_PREPARE && !policy.requireHumanApproval;
  return {
    policyDecision,
    approvedToSubmit,
    reasons,
    checks: {
      recipientAllowlisted: policy.allowedRecipients.includes(intent.recipient),
      assetAllowed: policy.allowedAssets.includes(intent.asset),
      purposeAllowed: policy.allowedPurposes.includes(intent.purpose),
      amountWithinLimit: intent.amount <= policy.maxAmount,
      dailyBudgetRemaining: Math.max(0, policy.dailyBudget - policy.spentToday)
    }
  };
}

export function buildAuditEvent(intent, evaluation) {
  return {
    schema: 'hedera.fun-agent.audit.v1',
    timestamp: new Date().toISOString(),
    network: 'mock-testnet',
    hederaServices: ['HCS-audit-log', 'HBAR-transfer-prepare'],
    intent,
    evaluation,
    hcsTopicMode: 'mock',
    privacy: 'no private keys, seed phrases, or wallet material captured'
  };
}
