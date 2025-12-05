/**
 * GLM-4 Long
 * 
 * Extended context GLM-4
 * 
 * @see {@link https://platform.zhipu.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withZhipuDefaults } from '../_defaults';

const glm_4_long: ModelDefinition = withZhipuDefaults(defineModel({
  id: 'glm-4-long',
  name: 'GLM-4 Long',
  type: 'chat',
  family: 'glm',
  status: 'ga',
  description: 'Extended context GLM-4',
  contextWindow: {
    input: 1_000_000,
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
      input: 0.14,
      output: 0.14,
    },
  },
  capabilities: {
    vision: false,
    functionCalling: true,
    streaming: true,
    systemPrompt: true,
  },
  features: {},
}));

export default glm_4_long;
