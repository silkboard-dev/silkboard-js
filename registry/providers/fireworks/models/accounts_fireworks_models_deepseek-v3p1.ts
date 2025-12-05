/**
 * DeepSeek V3.1
 *
 * Fireworks serverless DeepSeek V3.1 model.
 *
 * @see {@link https://fireworks.ai/models/fireworks/deepseek-v3p1}
 * @see {@link https://docs.fireworks.ai/guides/querying-text-models}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withFireworksDefaults } from '../_defaults';

const accounts_fireworks_models_deepseek_v3p1: ModelDefinition = withFireworksDefaults(
  defineModel({
    id: 'accounts/fireworks/models/deepseek-v3p1',
    name: 'DeepSeek V3.1',
    type: 'chat',
    family: 'accounts/fireworks/models/deepseek',
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
      type: 'reasoning_effort',
      effortLevels: ['low', 'medium', 'high'],
    },
  }),
);

export default accounts_fireworks_models_deepseek_v3p1;

