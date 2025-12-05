/**
 * Grok 3
 * 
 * Strong enterprise model for data extraction, coding, and summarization.
 * 
 * @see {@link https://platform.xai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withXaiDefaults } from '../_defaults';

const grok_3: ModelDefinition = withXaiDefaults(defineModel({
  id: 'grok-3',
  name: 'Grok 3',
  type: 'chat',
  family: 'grok-3',
  status: 'ga',
  description: 'Strong enterprise model for data extraction, coding, and summarization.',
  aliases: ['grok-3-latest'],
  releaseDate: '2025-02',
  contextWindow: {
    input: 131_072,
    output: 131_072,
  },
  modalities: {
    input: {
      text: true,
      image: true,
    },
    output: {
      text: true,
    },
  },
  pricing: {
    standard: {
      input: 3,
      output: 15,
      cachedInput: 0.3,
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
    webSearch: true,
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

export default grok_3;
