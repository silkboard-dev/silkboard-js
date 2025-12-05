/**
 * Qwen3 Next 80B A3B Instruct (via Chutes)
 *
 * chutes model: Qwen/Qwen3-Next-80B-A3B-Instruct
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const qwen_3_next_80b_a3b_instruct: ModelDefinition = withChutesDefaults(defineModel({
  id: 'Qwen/Qwen3-Next-80B-A3B-Instruct',
  name: 'Qwen3 Next 80B A3B Instruct',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'Qwen3 Next 80B A3B Instruct served via Chutes llm gateway.',
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

export default qwen_3_next_80b_a3b_instruct;

