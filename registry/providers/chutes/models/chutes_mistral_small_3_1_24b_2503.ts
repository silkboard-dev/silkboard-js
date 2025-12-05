/**
 * Mistral Small 3.1 24B Instruct 2503 (via Chutes)
 *
 * chutes model: chutesai/Mistral-Small-3.1-24B-Instruct-2503
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const chutes_mistral_small_3_1_24b_2503: ModelDefinition = withChutesDefaults(defineModel({
  id: 'chutesai/Mistral-Small-3.1-24B-Instruct-2503',
  name: 'Mistral Small 3.1 24B Instruct 2503',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'Chutes-hosted Mistral Small 3.1 24B Instruct 2503.',
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

export default chutes_mistral_small_3_1_24b_2503;

