/**
 * Qwen VL Plus
 * 
 * Balanced vision-language model
 * 
 * @see {@link https://platform.alibaba.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAlibabaDefaults } from '../_defaults';

const qwen_vl_plus: ModelDefinition = withAlibabaDefaults(defineModel({
  id: 'qwen-vl-plus',
  name: 'Qwen VL Plus',
  type: 'multimodal',
  family: 'qwen',
  status: 'ga',
  description: 'Balanced vision-language model',
  contextWindow: {
    input: 0, // TODO: Verify context window
    output: 0, // TODO: Verify max output tokens
  },
  modalities: {
    input: {
      text: true,
      image: true,
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
  capabilities: {
    vision: true,
  },
  features: {},
}));

export default qwen_vl_plus;
