/**
 * Hermes 4 405B FP8 (via Chutes)
 *
 * chutes model: NousResearch/Hermes-4-405B-FP8
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const hermes_4_405b_fp8: ModelDefinition = withChutesDefaults(defineModel({
  id: 'NousResearch/Hermes-4-405B-FP8',
  name: 'Hermes 4 405B FP8',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'NousResearch Hermes 4 405B FP8 served via Chutes llm gateway.',
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

export default hermes_4_405b_fp8;

