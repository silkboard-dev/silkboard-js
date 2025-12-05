/**
 * Moonshot V1 128K
 * 
 * 128K context model
 * 
 * @see {@link https://platform.moonshot.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withMoonshotDefaults } from '../_defaults';

const moonshot_v1_128k: ModelDefinition = withMoonshotDefaults(defineModel({
  id: 'moonshot-v1-128k',
  name: 'Moonshot V1 128K',
  type: 'chat',
  family: 'moonshot',
  status: 'ga',
  description: '128K context model',
  contextWindow: {
    input: 131_072,
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
      input: 8.4,
      output: 8.4,
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

export default moonshot_v1_128k;
