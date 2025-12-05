/**
 * Moonshot V1 8K
 * 
 * 8K context model
 * 
 * @see {@link https://platform.moonshot.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withMoonshotDefaults } from '../_defaults';

const moonshot_v1_8k: ModelDefinition = withMoonshotDefaults(defineModel({
  id: 'moonshot-v1-8k',
  name: 'Moonshot V1 8K',
  type: 'chat',
  family: 'moonshot',
  status: 'ga',
  description: '8K context model',
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
      input: 1.68,
      output: 1.68,
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

export default moonshot_v1_8k;
