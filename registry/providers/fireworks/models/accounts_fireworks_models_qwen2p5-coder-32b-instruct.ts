/**
 * Qwen2.5 Coder 32B Instruct
 *
 * Code-specialized Qwen2.5 model for code generation and reasoning.
 *
 * @see {@link https://fireworks.ai/models/fireworks/qwen2p5-coder-32b-instruct}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withFireworksDefaults } from '../_defaults';

const accounts_fireworks_models_qwen2p5_coder_32b_instruct: ModelDefinition = withFireworksDefaults(
  defineModel({
    id: 'accounts/fireworks/models/qwen2p5-coder-32b-instruct',
    name: 'Qwen2.5 Coder 32B Instruct',
    type: 'chat',
    family: 'accounts/fireworks/models/qwen2p5',
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
  }),
);

export default accounts_fireworks_models_qwen2p5_coder_32b_instruct;

