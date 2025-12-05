/**
 * Moonshot V1 32K
 * 
 * 32K context model
 * 
 * @see {@link https://platform.moonshot.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withMoonshotDefaults } from '../_defaults';

const moonshot_v1_32k: ModelDefinition = withMoonshotDefaults(defineModel({
  id: 'moonshot-v1-32k',
  name: 'Moonshot V1 32K',
  type: 'chat',
  family: 'moonshot',
  status: 'ga',
  description: '32K context model',
  contextWindow: {
    input: 32_768,
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
      input: 3.36,
      output: 3.36,
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

export default moonshot_v1_32k;
