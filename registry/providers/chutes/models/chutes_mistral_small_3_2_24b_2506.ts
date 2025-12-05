/**
 * Mistral Small 3.2 24B Instruct 2506 (via Chutes)
 *
 * chutes model: chutesai/Mistral-Small-3.2-24B-Instruct-2506
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const chutes_mistral_small_3_2_24b_2506: ModelDefinition = withChutesDefaults(defineModel({
  id: 'chutesai/Mistral-Small-3.2-24B-Instruct-2506',
  name: 'Mistral Small 3.2 24B Instruct 2506',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'Chutes-hosted Mistral Small 3.2 24B Instruct 2506.',
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

export default chutes_mistral_small_3_2_24b_2506;

