/**
 * Qwen3 32B (via Chutes)
 *
 * chutes model: Qwen/Qwen3-32B
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const qwen_3_32b: ModelDefinition = withChutesDefaults(defineModel({
  id: 'Qwen/Qwen3-32B',
  name: 'Qwen3 32B',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'Qwen3 32B served via Chutes llm gateway.',
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

export default qwen_3_32b;

