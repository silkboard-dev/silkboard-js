/**
 * MiniMax M2 (via Chutes)
 *
 * chutes model: MiniMaxAI/MiniMax-M2
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const minimax_m2: ModelDefinition = withChutesDefaults(defineModel({
  id: 'MiniMaxAI/MiniMax-M2',
  name: 'MiniMax M2',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'MiniMax M2 served via Chutes llm gateway.',
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

export default minimax_m2;

