/**
 * DeepSeek R1T Chimera (via Chutes)
 *
 * chutes model: tngtech/DeepSeek-R1T-Chimera
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const tngtech_deepseek_r1t_chimera: ModelDefinition = withChutesDefaults(defineModel({
  id: 'tngtech/DeepSeek-R1T-Chimera',
  name: 'DeepSeek R1T Chimera',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'DeepSeek R1T Chimera served via Chutes llm gateway.',
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

export default tngtech_deepseek_r1t_chimera;

