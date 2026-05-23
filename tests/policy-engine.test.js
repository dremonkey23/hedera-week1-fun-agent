import assert from 'node:assert/strict';
import { DECISIONS, defaultPolicy, evaluatePolicy, parsePaymentIntent } from '../src/policyEngine.js';

const good = parsePaymentIntent('Send 3 HBAR to 0.0.12345 for coffee');
assert.equal(good.amount, 3);
assert.equal(good.asset, 'HBAR');
assert.equal(good.recipient, '0.0.12345');
assert.equal(good.purpose, 'coffee');
assert.equal(evaluatePolicy(good).policyDecision, DECISIONS.REQUIRE_APPROVAL);

const blockedRecipient = parsePaymentIntent('Send 3 HBAR to 0.0.99999 for coffee');
assert.equal(evaluatePolicy(blockedRecipient).policyDecision, DECISIONS.BLOCK_RECIPIENT);

const blockedAmount = parsePaymentIntent('Send 50 HBAR to 0.0.12345 for coffee');
assert.equal(evaluatePolicy(blockedAmount).policyDecision, DECISIONS.BLOCK_AMOUNT);

const blockedAsset = parsePaymentIntent('Send 3 USDC to 0.0.12345 for coffee');
assert.equal(evaluatePolicy(blockedAsset).policyDecision, DECISIONS.BLOCK_ASSET);

const allowPolicy = { ...defaultPolicy, requireHumanApproval: false };
assert.equal(evaluatePolicy(good, allowPolicy).policyDecision, DECISIONS.ALLOW_PREPARE);

console.log('policy-engine tests passed');
