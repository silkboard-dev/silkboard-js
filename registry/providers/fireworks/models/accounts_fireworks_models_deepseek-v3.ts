/**
 * DeepSeek V3
 * 
 * fireworks model: accounts/fireworks/models/deepseek-v3
 * 
 * @see {@link https://docs.fireworks.ai/}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withFireworksDefaults } from '../_defaults';

const accounts_fireworks_models_deepseek_v3: ModelDefinition = withFireworksDefaults(defineModel({
  id: 'accounts/fireworks/models/deepseek-v3',
  name: 'DeepSeek V3',
  type: 'chat',
  family: 'accounts/fireworks/models/deepseek',
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

export default accounts_fireworks_models_deepseek_v3;
