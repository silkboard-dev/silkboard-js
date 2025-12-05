/**
 * Qwen3 Coder 480B A35B Instruct FP8 (via Chutes)
 *
 * chutes model: Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const qwen_3_coder_480b_a35b_instruct_fp8: ModelDefinition = withChutesDefaults(defineModel({
  id: 'Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8',
  name: 'Qwen3 Coder 480B A35B Instruct FP8',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'Qwen3 Coder 480B A35B Instruct FP8 served via Chutes llm gateway.',
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

export default qwen_3_coder_480b_a35b_instruct_fp8;

