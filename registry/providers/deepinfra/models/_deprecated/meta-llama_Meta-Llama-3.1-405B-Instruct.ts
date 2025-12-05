/**
 * Llama 3.1 405B Instruct (Deprecated)
 *
 * deepinfra model: meta-llama/Meta-Llama-3.1-405B-Instruct
 *
 * This model is still routable on DeepInfra but is replaced by
 * NousResearch/Hermes-3-Llama-3.1-405B. Kept here for reference.
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withDeepinfraDefaults } from '../_defaults';

const meta_llama_Meta_Llama_3_1_405B_Instruct: ModelDefinition = withDeepinfraDefaults(
  defineModel({
    id: 'meta-llama/Meta-Llama-3.1-405B-Instruct',
    name: 'Llama 3.1 405B Instruct (Deprecated)',
    type: 'chat',
    family: 'meta',
    status: 'deprecated',
    contextWindow: {
      input: 0, // TODO: Verify max input tokens
      output: 0, // TODO: Verify max output tokens
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
        input: 0, // TODO: Add pricing per 1K input tokens
        output: 0, // TODO: Add pricing per 1K output tokens
      },
    },
    capabilities: {},
    features: {},
  }),
);

export default meta_llama_Meta_Llama_3_1_405B_Instruct;

