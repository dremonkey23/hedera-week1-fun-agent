export function renderMarkdownReport(result) {
  const lines = [];
  lines.push(`# ${result.agent}`);
  lines.push('');
  lines.push(`**Request:** ${result.request}`);
  lines.push(`**Decision:** ${result.evaluation.policyDecision}`);
  lines.push(`**Next action:** ${result.nextAction}`);
  lines.push('');
  lines.push('## Parsed intent');
  lines.push('```json');
  lines.push(JSON.stringify(result.intent, null, 2));
  lines.push('```');
  lines.push('');
  lines.push('## Policy reasons');
  for (const reason of result.evaluation.reasons) lines.push(`- ${reason}`);
  lines.push('');
  lines.push('## Hedera transaction preparation');
  if (result.preparedTransaction) {
    lines.push('```json');
    lines.push(JSON.stringify(result.preparedTransaction, null, 2));
    lines.push('```');
  } else {
    lines.push('No transaction prepared because policy blocked the request.');
  }
  lines.push('');
  lines.push('## HCS-style audit event');
  lines.push('```json');
  lines.push(JSON.stringify(result.auditEvent, null, 2));
  lines.push('```');
  return lines.join('\n');
}
