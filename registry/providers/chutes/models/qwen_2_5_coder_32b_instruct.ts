/**
 * Qwen2.5 Coder 32B Instruct (via Chutes)
 *
 * chutes model: Qwen/Qwen2.5-Coder-32B-Instruct
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const qwen_2_5_coder_32b_instruct: ModelDefinition = withChutesDefaults(defineModel({
  id: 'Qwen/Qwen2.5-Coder-32B-Instruct',
  name: 'Qwen2.5 Coder 32B Instruct',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'Qwen2.5 Coder 32B Instruct served via Chutes llm gateway.',
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

export default qwen_2_5_coder_32b_instruct;

