/**
 * Llama 3.3 70B Instruct (via OpenRouter)
 * 
 * openrouter model: meta-llama/llama-3.3-70b-instruct
 * 
 * @see {@link https://platform.openrouter.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenrouterDefaults } from '../_defaults';

const meta_llama_llama_3_3_70b_instruct: ModelDefinition = withOpenrouterDefaults(defineModel({
  id: 'meta-llama/llama-3.3-70b-instruct',
  name: 'Llama 3.3 70B Instruct (via OpenRouter)',
  type: 'chat',
  family: 'meta',
  status: 'ga',
  contextWindow: {
    input: 0,
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
      input: 0,
    },
  },
  capabilities: {},
  features: {},
}));

export default meta_llama_llama_3_3_70b_instruct;
