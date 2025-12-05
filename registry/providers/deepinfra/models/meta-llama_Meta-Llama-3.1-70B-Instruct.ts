/**
 * Llama 3.1 70B Instruct
 * 
 * deepinfra model: meta-llama/Meta-Llama-3.1-70B-Instruct
 * 
 * @see {@link https://platform.deepinfra.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withDeepinfraDefaults } from '../_defaults';

const meta_llama_Meta_Llama_3_1_70B_Instruct: ModelDefinition = withDeepinfraDefaults(defineModel({
  id: 'meta-llama/Meta-Llama-3.1-70B-Instruct',
  name: 'Llama 3.1 70B Instruct',
  type: 'chat',
  family: 'meta',
  status: 'ga',
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
}));

export default meta_llama_Meta_Llama_3_1_70B_Instruct;
