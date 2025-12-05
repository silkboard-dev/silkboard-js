/**
 * Qwen2.5-VL 32B Instruct
 *
 * Multimodal Qwen2.5 vision-language model.
 *
 * @see {@link https://app.fireworks.ai/models/fireworks/qwen2p5-vl-32b-instruct}
 * @see {@link https://docs.fireworks.ai/guides/querying-vision-language-models}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withFireworksDefaults } from '../_defaults';

const accounts_fireworks_models_qwen2p5_vl_32b_instruct: ModelDefinition = withFireworksDefaults(
  defineModel({
    id: 'accounts/fireworks/models/qwen2p5-vl-32b-instruct',
    name: 'Qwen2.5-VL 32B Instruct',
    type: 'multimodal',
    family: 'accounts/fireworks/models/qwen2p5-vl',
    status: 'ga',
    contextWindow: {
      input: 0, // TODO: Verify context window from Fireworks model page
      output: 0, // TODO: Verify max output tokens from Fireworks model page
    },
    modalities: {
      input: {
        text: true,
        image: true,
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
      vision: true,
    },
    features: {},
  }),
);

export default accounts_fireworks_models_qwen2p5_vl_32b_instruct;

