/**
 * FLUX.1 dev FP8
 *
 * Fireworks-hosted FLUX.1 image generation model (developer variant).
 *
 * @see {@link https://fireworks.ai/models/fireworks/flux-1-dev-fp8}
 * @see {@link https://docs.fireworks.ai/api-reference/image-api}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withFireworksDefaults } from '../_defaults';

const accounts_fireworks_models_flux_1_dev_fp8: ModelDefinition = withFireworksDefaults(
  defineModel({
    id: 'accounts/fireworks/models/flux-1-dev-fp8',
    name: 'FLUX.1 dev FP8',
    type: 'image-generation',
    family: 'accounts/fireworks/models/flux',
    status: 'ga',
    contextWindow: {
      input: 0, // TODO: Verify prompt token limits from Fireworks docs
    },
    modalities: {
      input: {
        text: true,
        image: true,
      },
      output: {
        image: true,
      },
    },
    pricing: {
      standard: {
        input: 0, // TODO: Fill in pricing from Fireworks pricing page
        output: 0,
      },
    },
    capabilities: {
      imageGeneration: true,
    },
    features: {
      imageGeneration: true,
    },
  }),
);

export default accounts_fireworks_models_flux_1_dev_fp8;

