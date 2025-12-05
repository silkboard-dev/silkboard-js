/**
 * GPT OSS 20B (via Chutes)
 *
 * chutes model: openai/gpt-oss-20b
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withChutesDefaults } from '../_defaults';

const gpt_oss_20b: ModelDefinition = withChutesDefaults(defineModel({
  id: 'openai/gpt-oss-20b',
  name: 'GPT OSS 20B',
  type: 'chat',
  family: 'chutes',
  status: 'ga',
  description: 'OpenAI GPT OSS 20B served via Chutes llm gateway.',
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

export default gpt_oss_20b;

