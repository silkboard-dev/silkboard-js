/**
 * Qwen Max
 * 
 * Most capable Qwen model
 * 
 * @see {@link https://platform.alibaba.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAlibabaDefaults } from '../_defaults';

const qwen_max: ModelDefinition = withAlibabaDefaults(defineModel({
  id: 'qwen-max',
  name: 'Qwen Max',
  type: 'chat',
  family: 'qwen',
  status: 'ga',
  description: 'Most capable Qwen model',
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

export default qwen_max;
