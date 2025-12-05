/**
 * DeepSeek R1
 * 
 * deepinfra model: deepseek-ai/DeepSeek-R1
 * 
 * @see {@link https://platform.deepinfra.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withDeepinfraDefaults } from '../_defaults';

const deepseek_ai_DeepSeek_R1: ModelDefinition = withDeepinfraDefaults(defineModel({
  id: 'deepseek-ai/DeepSeek-R1',
  name: 'DeepSeek R1',
  type: 'chat',
  family: 'deepseek',
  status: 'ga',
  contextWindow: {
    input: 0, // TODO: Verify max input tokens
    output: 0, // TODO: Verify max output tokens
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
      input: 0, // TODO: Add pricing per 1K input tokens
      output: 0, // TODO: Add pricing per 1K output tokens
    },
  },
  capabilities: {},
  features: {},
  reasoning: {
    supported: true,
    type: 'native',
  },
}));

export default deepseek_ai_DeepSeek_R1;
