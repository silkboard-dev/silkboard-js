/**
 * FireFunction V1
 *
 * Fireworks function-calling optimized model.
 *
 * @see {@link https://fireworks.ai/models/fireworks/firefunction-v1}
 * @see {@link https://docs.fireworks.ai/guides/function-calling}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withFireworksDefaults } from '../_defaults';

const accounts_fireworks_models_firefunction_v1: ModelDefinition = withFireworksDefaults(
  defineModel({
    id: 'accounts/fireworks/models/firefunction-v1',
    name: 'FireFunction V1',
    type: 'chat',
    family: 'accounts/fireworks/models/firefunction',
    status: 'ga',
    contextWindow: {
      input: 0, // TODO: Verify context window from FireFunction docs
      output: 0, // TODO: Verify max output tokens from FireFunction docs
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
    capabilities: {
      // Optimized for function/tool calling workloads
      functionCalling: true,
    },
    features: {},
  }),
);

export default accounts_fireworks_models_firefunction_v1;

