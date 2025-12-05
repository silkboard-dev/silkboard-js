/**
 * GPT-4o Mini
 * 
 * Cost-optimized GPT-4o for fast text/vision tasks
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_4o_mini: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-4o-mini',
  name: 'GPT-4o Mini',
  type: 'chat',
  family: 'gpt-4o',
  status: 'ga',
  description: 'Cost-optimized GPT-4o for fast text/vision tasks',
  aliases: ['gpt-4o-mini-2024-07-18', 'gpt-4o-mini-latest'],
  releaseDate: '2024-07-18',
  architecture: {
    trainingCutoff: '2023-10-01',
  },
  contextWindow: {
    input: 128_000,
    output: 16_384,
  },
  modalities: {
    input: {
      text: true,
      image: true,
      file: true,
    },
    output: {
      text: true,
    },
  },
  pricing: {
    standard: {
      input: 0.15,
      output: 0.6,
      cachedInput: 0.075,
    },
    batch: {
      input: 0.075,
      output: 0.3,
      discountPercent: 50,
    },
  },
  capabilities: {
    streaming: true,
    functionCalling: true,
    parallelToolCalls: true,
    structuredOutput: true,
    jsonMode: true,
    systemPrompt: true,
    logprobs: true,
    seed: true,
    stopSequences: true,
  },
  features: {
    webSearch: true,
    fileSearch: true,
    codeInterpreter: true,
    promptCaching: true,
    batchApi: true,
    realtimeApi: true,
    assistantsApi: true,
  },
}));

export default gpt_4o_mini;
