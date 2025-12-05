/**
 * Qwen 2.5 72B Instruct
 * 
 * deepinfra model: Qwen/Qwen2.5-72B-Instruct
 * 
 * @see {@link https://platform.deepinfra.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withDeepinfraDefaults } from '../_defaults';

const Qwen_Qwen2_5_72B_Instruct: ModelDefinition = withDeepinfraDefaults(defineModel({
  id: 'Qwen/Qwen2.5-72B-Instruct',
  name: 'Qwen 2.5 72B Instruct',
  type: 'chat',
  family: 'Qwen/Qwen2.5',
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

export default Qwen_Qwen2_5_72B_Instruct;
