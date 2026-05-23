#!/usr/bin/env node
import { runFunAgent } from './agent.js';

const idx = process.argv.indexOf('--request');
const request = idx >= 0 ? process.argv[idx + 1] : 'Buy Andre a 3 HBAR coffee from 0.0.12345 for demo';
const result = await runFunAgent(request);
console.log(JSON.stringify(result, null, 2));
