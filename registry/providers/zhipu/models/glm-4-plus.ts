/**
 * GLM-4 Plus
 * 
 * Most capable GLM model
 * 
 * @see {@link https://platform.zhipu.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withZhipuDefaults } from '../_defaults';

const glm_4_plus: ModelDefinition = withZhipuDefaults(defineModel({
  id: 'glm-4-plus',
  name: 'GLM-4 Plus',
  type: 'chat',
  family: 'glm',
  status: 'ga',
  description: 'Most capable GLM model',
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
      input: 7,
      output: 7,
    },
  },
  capabilities: {
    vision: false,
    functionCalling: true,
    structuredOutput: true,
    streaming: true,
    systemPrompt: true,
  },
  features: {},
}));

export default glm_4_plus;
