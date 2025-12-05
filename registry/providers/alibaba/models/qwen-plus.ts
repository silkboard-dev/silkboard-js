/**
 * Qwen Plus
 * 
 * Balanced Qwen model
 * 
 * @see {@link https://platform.alibaba.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAlibabaDefaults } from '../_defaults';

const qwen_plus: ModelDefinition = withAlibabaDefaults(defineModel({
  id: 'qwen-plus',
  name: 'Qwen Plus',
  type: 'chat',
  family: 'qwen',
  status: 'ga',
  description: 'Balanced Qwen model',
  contextWindow: {
    input: 0, // TODO: Verify context window
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
      input: 0, // TODO: pricing
      output: 0, // TODO: pricing
    },
  },
  capabilities: {},
  features: {},
}));

export default qwen_plus;
