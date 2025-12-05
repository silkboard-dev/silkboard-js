/**
 * LongCat Flash Chat FP8 (via Chutes)
 *
 * chutes model: meituan-longcat/LongCat-Flash-Chat-FP8
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const longcat_flash_chat_fp8: ModelDefinition = withChutesDefaults(defineModel({
  id: 'meituan-longcat/LongCat-Flash-Chat-FP8',
  name: 'LongCat Flash Chat FP8',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'LongCat Flash Chat FP8 served via Chutes llm gateway.',
  contextWindow: {
    input: 0, // TODO: Verify context window from llm.chutes.ai
  },
  modalities: {
    input: { text: true }, // TODO: Some variants may support image input
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

export default longcat_flash_chat_fp8;

