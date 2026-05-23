import { buildAuditEvent, defaultPolicy, evaluatePolicy, parsePaymentIntent } from './policyEngine.js';
import { inspectAgentKit, prepareMockHbarTransfer } from './hederaAgentKitAdapter.js';

export async function runFunAgent(request, policy = defaultPolicy) {
  const intent = parsePaymentIntent(request);
  const evaluation = evaluatePolicy(intent, policy);
  const preparedTransaction = evaluation.policyDecision.startsWith('BLOCK')
    ? null
    : prepareMockHbarTransfer(intent);
  const auditEvent = buildAuditEvent(intent, evaluation);
  const agentKit = await inspectAgentKit();

  return {
    agent: 'Hedera Week 1 Fun Agent: Snack Guardian',
    request,
    intent,
    evaluation,
    preparedTransaction,
    auditEvent,
    agentKit,
    nextAction: evaluation.approvedToSubmit
      ? 'ready_to_submit_after_operator_confirms_testnet_use'
      : evaluation.policyDecision === 'REQUIRE_APPROVAL'
        ? 'human_approval_required_before_submit'
        : 'blocked_no_transaction_prepared'
  };
}
