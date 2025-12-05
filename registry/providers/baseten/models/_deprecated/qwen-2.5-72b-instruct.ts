/**
 * Qwen 2.5 72B Instruct
 * 
 * Qwen 2.5 72B on Baseten
 * 
 * @see {@link https://platform.baseten.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withBasetenDefaults } from '../_defaults';

const qwen_2_5_72b_instruct: ModelDefinition = withBasetenDefaults(defineModel({
  id: 'qwen-2.5-72b-instruct',
  name: 'Qwen 2.5 72B Instruct',
  type: 'chat',
  family: 'qwen',
  status: 'ga',
  description: 'Qwen 2.5 72B on Baseten',
  contextWindow: {
    input: 32_768,
    output: 4096,
  },
  modalities: {
    input: {
      text: true,
    },
    output: {
      text: true,
    },
  },
  pricing: {
    standard: {
      input: 0.9,
      output: 0.9,
    },
    notes: 'Pricing varies by deployment configuration',
  },
  capabilities: {
    functionCalling: true,
    streaming: true,
    systemPrompt: true,
  },
  features: {},
}));

export default qwen_2_5_72b_instruct;
