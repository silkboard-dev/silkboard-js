/**
 * GLM-4V Plus
 * 
 * Vision-language model
 * 
 * @see {@link https://platform.zhipu.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withZhipuDefaults } from '../_defaults';

const glm_4v_plus: ModelDefinition = withZhipuDefaults(defineModel({
  id: 'glm-4v-plus',
  name: 'GLM-4V Plus',
  type: 'multimodal',
  family: 'glm',
  status: 'ga',
  description: 'Vision-language model',
  contextWindow: {
    input: 8192,
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
      input: 1.4,
      output: 1.4,
    },
  },
  capabilities: {
    vision: true,
    functionCalling: true,
    streaming: true,
    systemPrompt: true,
  },
  features: {},
}));

export default glm_4v_plus;
