/**
 * GLM-4 AirX
 * 
 * Extended GLM-4 Air
 * 
 * @see {@link https://platform.zhipu.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withZhipuDefaults } from '../_defaults';

const glm_4_airx: ModelDefinition = withZhipuDefaults(defineModel({
  id: 'glm-4-airx',
  name: 'GLM-4 AirX',
  type: 'chat',
  family: 'glm',
  status: 'ga',
  description: 'Extended GLM-4 Air',
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
    vision: false,
    functionCalling: true,
    streaming: true,
    systemPrompt: true,
  },
  features: {},
}));

export default glm_4_airx;
