/**
 * Llama 3.3 70B Instruct (deprecated on Chutes)
 *
 * Original chutes model: meta-llama/Llama-3.3-70B-Instruct
 *
 * This model no longer appears in the llm.chutes.ai /v1/models list
 * but is kept here for historical reference.
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const meta_llama_Llama_3_3_70B_Instruct: ModelDefinition = withChutesDefaults(defineModel({
  id: 'meta-llama/Llama-3.3-70B-Instruct',
  name: 'Llama 3.3 70B Instruct',
  type: 'chat',
  family: 'chutes',
  status: 'deprecated',
  contextWindow: {
    input: 0, // TODO: Verify context window
  },
  modalities: {
    input: { text: true },
    output: { text: true },
  },
  pricing: {
    standard: {
      input: 0, // TODO: Add official pricing
      output: 0, // TODO: Add official pricing
    },
  },
  capabilities: {},
  features: {},
  reasoning: {
    supported: false, // TODO: Confirm reasoning support
  },
}));

export default meta_llama_Llama_3_3_70B_Instruct;

