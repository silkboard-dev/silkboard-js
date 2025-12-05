/**
 * GLM-4V
 * 
 * Standard vision model
 * 
 * @see {@link https://platform.zhipu.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withZhipuDefaults } from '../_defaults';

const glm_4v: ModelDefinition = withZhipuDefaults(defineModel({
  id: 'glm-4v',
  name: 'GLM-4V',
  type: 'multimodal',
  family: 'glm',
  status: 'ga',
  description: 'Standard vision model',
  contextWindow: {
    input: 2048,
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
    vision: true,
    streaming: true,
    systemPrompt: true,
  },
  features: {},
}));

export default glm_4v;
