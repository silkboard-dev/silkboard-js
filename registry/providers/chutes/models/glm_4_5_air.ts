/**
 * GLM 4.5 Air (via Chutes)
 *
 * chutes model: zai-org/GLM-4.5-Air
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const glm_4_5_air: ModelDefinition = withChutesDefaults(defineModel({
  id: 'zai-org/GLM-4.5-Air',
  name: 'GLM 4.5 Air',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'GLM 4.5 Air served via Chutes llm gateway.',
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

export default glm_4_5_air;

