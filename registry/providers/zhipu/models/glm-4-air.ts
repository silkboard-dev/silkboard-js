/**
 * GLM-4 Air
 * 
 * Fast GLM-4 variant
 * 
 * @see {@link https://platform.zhipu.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withZhipuDefaults } from '../_defaults';

const glm_4_air: ModelDefinition = withZhipuDefaults(defineModel({
  id: 'glm-4-air',
  name: 'GLM-4 Air',
  type: 'chat',
  family: 'glm',
  status: 'ga',
  description: 'Fast GLM-4 variant',
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
      input: 0.14,
      output: 0.14,
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

export default glm_4_air;
