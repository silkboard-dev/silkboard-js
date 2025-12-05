/**
 * GLM-4 Flash
 * 
 * Fastest GLM-4 model
 * 
 * @see {@link https://platform.zhipu.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withZhipuDefaults } from '../_defaults';

const glm_4_flash: ModelDefinition = withZhipuDefaults(defineModel({
  id: 'glm-4-flash',
  name: 'GLM-4 Flash',
  type: 'chat',
  family: 'glm',
  status: 'ga',
  description: 'Fastest GLM-4 model',
  contextWindow: {
    input: 128_000,
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
      input: 0.014,
      output: 0.014,
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

export default glm_4_flash;
