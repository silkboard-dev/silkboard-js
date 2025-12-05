/**
 * Mistral Small 24B Instruct 2501 (via Chutes)
 *
 * chutes model: unsloth/Mistral-Small-24B-Instruct-2501
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const unsloth_mistral_small_24b_2501: ModelDefinition = withChutesDefaults(defineModel({
  id: 'unsloth/Mistral-Small-24B-Instruct-2501',
  name: 'Mistral Small 24B Instruct 2501',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'Mistral Small 24B Instruct 2501 served via Chutes llm gateway.',
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

export default unsloth_mistral_small_24b_2501;

