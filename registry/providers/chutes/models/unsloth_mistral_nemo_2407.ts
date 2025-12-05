/**
 * Mistral Nemo Instruct 2407 (via Chutes)
 *
 * chutes model: unsloth/Mistral-Nemo-Instruct-2407
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const unsloth_mistral_nemo_2407: ModelDefinition = withChutesDefaults(defineModel({
  id: 'unsloth/Mistral-Nemo-Instruct-2407',
  name: 'Mistral Nemo Instruct 2407',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'Mistral Nemo Instruct 2407 served via Chutes llm gateway.',
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

export default unsloth_mistral_nemo_2407;

