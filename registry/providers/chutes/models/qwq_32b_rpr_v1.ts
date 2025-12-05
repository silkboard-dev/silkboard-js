/**
 * QwQ 32B ArliAI RpR v1 (via Chutes)
 *
 * chutes model: ArliAI/QwQ-32B-ArliAI-RpR-v1
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const qwq_32b_rpr_v1: ModelDefinition = withChutesDefaults(defineModel({
  id: 'ArliAI/QwQ-32B-ArliAI-RpR-v1',
  name: 'QwQ 32B ArliAI RpR v1',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'ArliAI QwQ 32B RpR v1 served via Chutes llm gateway.',
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

export default qwq_32b_rpr_v1;

