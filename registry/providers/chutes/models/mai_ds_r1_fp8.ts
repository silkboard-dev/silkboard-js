/**
 * MAI DS R1 FP8 (via Chutes)
 *
 * chutes model: microsoft/MAI-DS-R1-FP8
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const mai_ds_r1_fp8: ModelDefinition = withChutesDefaults(defineModel({
  id: 'microsoft/MAI-DS-R1-FP8',
  name: 'MAI DS R1 FP8',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'Microsoft MAI DS R1 FP8 served via Chutes llm gateway.',
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

export default mai_ds_r1_fp8;

