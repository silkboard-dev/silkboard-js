/**
 * Kimi K2 Thinking
 *
 * Kimi K2 variant optimized for deep reasoning.
 *
 * @see {@link https://app.fireworks.ai/models/fireworks/kimi-k2-thinking}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withFireworksDefaults } from '../_defaults';

const accounts_fireworks_models_kimi_k2_thinking: ModelDefinition = withFireworksDefaults(
  defineModel({
    id: 'accounts/fireworks/models/kimi-k2-thinking',
    name: 'Kimi K2 Thinking',
    type: 'chat',
    family: 'accounts/fireworks/models/kimi-k2',
    status: 'ga',
    contextWindow: {
      input: 0, // TODO: Verify context window from Fireworks model page
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
    reasoning: {
      supported: true,
      type: 'extended_thinking',
    },
  }),
);

export default accounts_fireworks_models_kimi_k2_thinking;

