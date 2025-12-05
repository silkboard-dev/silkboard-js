/**
 * Grok 3 Mini
 * 
 * Lower cost, faster version of Grok 3.
 * 
 * @see {@link https://platform.xai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withXaiDefaults } from '../_defaults';

const grok_3_mini: ModelDefinition = withXaiDefaults(defineModel({
  id: 'grok-3-mini',
  name: 'Grok 3 Mini',
  type: 'chat',
  family: 'grok-3',
  status: 'ga',
  description: 'Lower cost, faster version of Grok 3.',
  aliases: ['grok-3-mini-latest'],
  releaseDate: '2025-02',
  contextWindow: {
    input: 131_072,
    output: 131_072,
  },
  modalities: {
    input: {
      text: true,
    },
    output: {
      text: true,
    },
  },
  pricing: {
    standard: {
      input: 0.3,
      output: 0.5,
      cachedInput: 0.03,
    },
  },
  capabilities: {
    streaming: true,
    functionCalling: true,
    parallelToolCalls: true,
    structuredOutput: true,
    systemPrompt: true,
    stopSequences: true,
  },
  features: {
    promptCaching: true,
  },
  reasoning: {
    supported: true,
    type: 'reasoning_effort',
    effortLevels: ['low', 'medium', 'high'],
  },
  caching: {
    supported: true,
    type: 'automatic',
  },
}));

export default grok_3_mini;
