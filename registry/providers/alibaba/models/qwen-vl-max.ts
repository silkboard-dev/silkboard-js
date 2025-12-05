/**
 * Qwen VL Max
 * 
 * Vision-language model
 * 
 * @see {@link https://platform.alibaba.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withAlibabaDefaults } from '../_defaults';

const qwen_vl_max: ModelDefinition = withAlibabaDefaults(defineModel({
  id: 'qwen-vl-max',
  name: 'Qwen VL Max',
  type: 'multimodal',
  family: 'qwen',
  status: 'ga',
  description: 'Vision-language model',
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

export default qwen_vl_max;
