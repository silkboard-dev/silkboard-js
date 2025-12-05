/**
 * Kimi K2 Instruct 0905
 *
 * Updated Kimi K2 Instruct model with improved coding and long-context support.
 *
 * @see {@link https://fireworks.ai/models/fireworks/kimi-k2-instruct-0905}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withFireworksDefaults } from '../_defaults';

const accounts_fireworks_models_kimi_k2_instruct_0905: ModelDefinition = withFireworksDefaults(
  defineModel({
    id: 'accounts/fireworks/models/kimi-k2-instruct-0905',
    name: 'Kimi K2 Instruct 0905',
    type: 'chat',
    family: 'accounts/fireworks/models/kimi-k2',
    status: 'ga',
    contextWindow: {
      input: 0, // TODO: Verify context window (tokens) from Fireworks model page
      output: 0, // TODO: Verify max output tokens from Fireworks model page
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
        input: 0, // TODO: Fill in pricing from Fireworks pricing page
        output: 0, // TODO: Fill in pricing from Fireworks pricing page
      },
    },
    capabilities: {},
    features: {},
  }),
);

export default accounts_fireworks_models_kimi_k2_instruct_0905;

