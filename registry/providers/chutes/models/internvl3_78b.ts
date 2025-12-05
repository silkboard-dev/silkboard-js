/**
 * InternVL3 78B (via Chutes)
 *
 * chutes model: OpenGVLab/InternVL3-78B
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const internvl3_78b: ModelDefinition = withChutesDefaults(defineModel({
  id: 'OpenGVLab/InternVL3-78B',
  name: 'InternVL3 78B',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'InternVL3 78B served via Chutes llm gateway.',
  contextWindow: {
    input: 0, // TODO: Verify context window from llm.chutes.ai
  },
  modalities: {
    input: { text: true }, // TODO: Supports image input
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

export default internvl3_78b;

