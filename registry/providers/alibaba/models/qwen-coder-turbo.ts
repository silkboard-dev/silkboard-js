/**
 * Qwen Coder Turbo
 * 
 * Code-specialized Qwen
 * 
 * @see {@link https://platform.alibaba.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAlibabaDefaults } from '../_defaults';

const qwen_coder_turbo: ModelDefinition = withAlibabaDefaults(defineModel({
  id: 'qwen-coder-turbo',
  name: 'Qwen Coder Turbo',
  type: 'chat',
  family: 'qwen',
  status: 'ga',
  description: 'Code-specialized Qwen',
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

export default qwen_coder_turbo;
