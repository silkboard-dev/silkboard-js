/**
 * Qwen2.5 VL 72B Instruct (via Chutes)
 *
 * chutes model: Qwen/Qwen2.5-VL-72B-Instruct
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const qwen_2_5_vl_72b_instruct: ModelDefinition = withChutesDefaults(defineModel({
  id: 'Qwen/Qwen2.5-VL-72B-Instruct',
  name: 'Qwen2.5 VL 72B Instruct',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'Qwen2.5 VL 72B Instruct served via Chutes llm gateway.',
  contextWindow: {
    input: 0, // TODO: Verify context window from llm.chutes.ai
  },
  modalities: {
    input: { text: true }, // TODO: Some variants support image input
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

export default qwen_2_5_vl_72b_instruct;

