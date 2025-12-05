/**
 * DeepSeek TNG R1T2 Chimera (via Chutes)
 *
 * chutes model: tngtech/DeepSeek-TNG-R1T2-Chimera
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const tngtech_deepseek_tng_r1t2_chimera: ModelDefinition = withChutesDefaults(defineModel({
  id: 'tngtech/DeepSeek-TNG-R1T2-Chimera',
  name: 'DeepSeek TNG R1T2 Chimera',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'DeepSeek TNG R1T2 Chimera served via Chutes llm gateway.',
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

export default tngtech_deepseek_tng_r1t2_chimera;

