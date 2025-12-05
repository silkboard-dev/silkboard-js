/**
 * Grok 4.1 Fast (Reasoning)
 * 
 * Next generation tool-calling agents with 2M context. Reasoning mode enabled.
 * 
 * @see {@link https://platform.xai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withXaiDefaults } from '../_defaults';

const grok_4_1_fast_reasoning: ModelDefinition = withXaiDefaults(defineModel({
  id: 'grok-4-1-fast-reasoning',
  name: 'Grok 4.1 Fast (Reasoning)',
  type: 'chat',
  family: 'grok-4.1',
  status: 'ga',
  description: 'Next generation tool-calling agents with 2M context. Reasoning mode enabled.',
  aliases: ['grok-4-1-fast'],
  releaseDate: '2025-11-19',
  contextWindow: {
    input: 2_000_000,
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
      input: 0.2,
      output: 0.5,
      cachedInput: 0.02,
    },
  },
  capabilities: {
    streaming: true,
    functionCalling: true,
    parallelToolCalls: true,
    structuredOutput: true,
    systemPrompt: true,
  },
  features: {
    webSearch: true,
    promptCaching: true,
    mcp: true,
  },
  reasoning: {
    supported: true,
    type: 'native',
  },
  caching: {
    supported: true,
    type: 'automatic',
  },
}));

export default grok_4_1_fast_reasoning;
