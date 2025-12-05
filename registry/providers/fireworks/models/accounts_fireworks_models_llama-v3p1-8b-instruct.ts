/**
 * Llama 3.1 8B Instruct
 * 
 * fireworks model: accounts/fireworks/models/llama-v3p1-8b-instruct
 * 
 * @see {@link https://docs.fireworks.ai/}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withFireworksDefaults } from '../_defaults';

const accounts_fireworks_models_llama_v3p1_8b_instruct: ModelDefinition = withFireworksDefaults(defineModel({
  id: 'accounts/fireworks/models/llama-v3p1-8b-instruct',
  name: 'Llama 3.1 8B Instruct',
  type: 'chat',
  family: 'accounts/fireworks/models/llama',
  status: 'ga',
  contextWindow: {
    input: 0, // TODO: Verify context window
    output: 0, // TODO: Verify context window
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
      input: 0, // TODO: Verify pricing
      output: 0, // TODO: Verify pricing
    },
  },
  capabilities: {},
  features: {},
}));

export default accounts_fireworks_models_llama_v3p1_8b_instruct;
