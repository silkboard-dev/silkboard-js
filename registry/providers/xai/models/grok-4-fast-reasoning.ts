/**
 * Grok 4 Fast (Reasoning)
 * 
 * Cost-efficient intelligence with 2M context window. Reasoning mode enabled.
 * 
 * @see {@link https://platform.xai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withXaiDefaults } from '../_defaults';

const grok_4_fast_reasoning: ModelDefinition = withXaiDefaults(defineModel({
  id: 'grok-4-fast-reasoning',
  name: 'Grok 4 Fast (Reasoning)',
  type: 'chat',
  family: 'grok-4',
  status: 'ga',
  description: 'Cost-efficient intelligence with 2M context window. Reasoning mode enabled.',
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
  reasoning: {
    supported: true,
    type: 'native',
  },
  caching: {
    supported: true,
    type: 'automatic',
  },
}));

export default grok_4_fast_reasoning;
