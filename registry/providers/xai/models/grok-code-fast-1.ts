/**
 * Grok Code Fast 1
 * 
 * Lightning fast reasoning model built for agentic coding.
 * 
 * @see {@link https://platform.xai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withXaiDefaults } from '../_defaults';

const grok_code_fast_1: ModelDefinition = withXaiDefaults(defineModel({
  id: 'grok-code-fast-1',
  name: 'Grok Code Fast 1',
  type: 'chat',
  family: 'grok-code',
  status: 'ga',
  description: 'Lightning fast reasoning model built for agentic coding.',
  releaseDate: '2025-08',
  contextWindow: {
    input: 256_000,
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
      input: 0.2,
      output: 1.5,
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
    promptCaching: true,
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

export default grok_code_fast_1;
