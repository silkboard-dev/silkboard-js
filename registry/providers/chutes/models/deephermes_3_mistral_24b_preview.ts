/**
 * DeepHermes 3 Mistral 24B Preview (via Chutes)
 *
 * chutes model: NousResearch/DeepHermes-3-Mistral-24B-Preview
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const deephermes_3_mistral_24b_preview: ModelDefinition = withChutesDefaults(defineModel({
  id: 'NousResearch/DeepHermes-3-Mistral-24B-Preview',
  name: 'DeepHermes 3 Mistral 24B Preview',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'NousResearch DeepHermes 3 Mistral 24B Preview served via Chutes llm gateway.',
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

export default deephermes_3_mistral_24b_preview;

