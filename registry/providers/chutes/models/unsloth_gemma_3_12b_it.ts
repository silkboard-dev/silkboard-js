/**
 * Gemma 3 12B IT (via Chutes)
 *
 * chutes model: unsloth/gemma-3-12b-it
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const unsloth_gemma_3_12b_it: ModelDefinition = withChutesDefaults(defineModel({
  id: 'unsloth/gemma-3-12b-it',
  name: 'Gemma 3 12B IT',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'Gemma 3 12B IT served via Chutes llm gateway.',
  contextWindow: {
    input: 0, // TODO: Verify context window from llm.chutes.ai
  },
  modalities: {
    input: { text: true },
    output: { text: true },
  },
  pricing: {
    standard: {
      input: 0, // TODO: Add pricing from llm.chutes.ai
      output: 0,
    },
  },
  capabilities: {},
  features: {},
  reasoning: {
    supported: false, // TODO: Confirm reasoning support
  },
}));

export default unsloth_gemma_3_12b_it;

