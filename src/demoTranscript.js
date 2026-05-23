#!/usr/bin/env node
import { runFunAgent } from './agent.js';
import { renderMarkdownReport } from './renderReport.js';

const scenarios = [
  'Send 3 HBAR to 0.0.12345 for coffee',
  'Send 50 HBAR to 0.0.12345 for coffee',
  'Send 4 USDC to 0.0.12345 for api credits',
  'Send 2 HBAR to 0.0.99999 for snack'
];

for (const scenario of scenarios) {
  const result = await runFunAgent(scenario);
  console.log('\n---\n');
  console.log(renderMarkdownReport(result));
}
