/**
 * Kimi K2 Instruct 0905 (via Chutes)
 *
 * chutes model: moonshotai/Kimi-K2-Instruct-0905
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const kimi_k2_instruct_0905: ModelDefinition = withChutesDefaults(defineModel({
  id: 'moonshotai/Kimi-K2-Instruct-0905',
  name: 'Kimi K2 Instruct 0905',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'Moonshot AI Kimi K2 Instruct 0905 served via Chutes llm gateway.',
  contextWindow: {
    input: 0, // TODO: Verify context window from llm.chutes.ai
  },
  modalities: {
    input: { text: true },
    output: { text: true },
  },
  pricing: {
    standard: {
      input: 0, // TODO: Add pricing from llm.chutes.ai
      output: 0,
    },
  },
  capabilities: {},
  features: {},
  reasoning: {
    supported: false, // TODO: Confirm reasoning support
  },
}));

export default kimi_k2_instruct_0905;

