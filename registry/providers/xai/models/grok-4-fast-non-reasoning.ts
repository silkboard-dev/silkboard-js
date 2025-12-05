/**
 * Grok 4 Fast (Non-Reasoning)
 * 
 * Cost-efficient intelligence with 2M context window. No reasoning tokens.
 * 
 * @see {@link https://platform.xai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withXaiDefaults } from '../_defaults';

const grok_4_fast_non_reasoning: ModelDefinition = withXaiDefaults(defineModel({
  id: 'grok-4-fast-non-reasoning',
  name: 'Grok 4 Fast (Non-Reasoning)',
  type: 'chat',
  family: 'grok-4',
  status: 'ga',
  description: 'Cost-efficient intelligence with 2M context window. No reasoning tokens.',
  releaseDate: '2025-07',
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
  caching: {
    supported: true,
    type: 'automatic',
  },
}));

export default grok_4_fast_non_reasoning;
