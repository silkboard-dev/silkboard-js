/**
 * DeepSeek V3
 * 
 * deepinfra model: deepseek-ai/DeepSeek-V3
 * 
 * @see {@link https://platform.deepinfra.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withDeepinfraDefaults } from '../_defaults';

const deepseek_ai_DeepSeek_V3: ModelDefinition = withDeepinfraDefaults(defineModel({
  id: 'deepseek-ai/DeepSeek-V3',
  name: 'DeepSeek V3',
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
}));

export default deepseek_ai_DeepSeek_V3;
