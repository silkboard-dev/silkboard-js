/**
 * GPT OSS 120B (via Chutes)
 *
 * chutes model: openai/gpt-oss-120b
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const gpt_oss_120b: ModelDefinition = withChutesDefaults(defineModel({
  id: 'openai/gpt-oss-120b',
  name: 'GPT OSS 120B',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'OpenAI GPT OSS 120B served via Chutes llm gateway.',
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

export default gpt_oss_120b;

