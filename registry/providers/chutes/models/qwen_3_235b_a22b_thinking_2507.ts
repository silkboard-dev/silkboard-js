/**
 * Qwen3 235B A22B Thinking 2507 (via Chutes)
 *
 * chutes model: Qwen/Qwen3-235B-A22B-Thinking-2507
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const qwen_3_235b_a22b_thinking_2507: ModelDefinition = withChutesDefaults(defineModel({
  id: 'Qwen/Qwen3-235B-A22B-Thinking-2507',
  name: 'Qwen3 235B A22B Thinking 2507',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'Qwen3 235B A22B Thinking 2507 served via Chutes llm gateway.',
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

export default qwen_3_235b_a22b_thinking_2507;

