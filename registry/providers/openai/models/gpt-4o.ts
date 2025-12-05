/**
 * GPT-4o
 * 
 * Multimodal flagship GPT-4o with vision and structured outputs
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_4o: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-4o',
  name: 'GPT-4o',
  type: 'chat',
  family: 'gpt-4o',
  status: 'ga',
  description: 'Multimodal flagship GPT-4o with vision and structured outputs',
  aliases: ['gpt-4o-latest', 'gpt-4o-2024-11-20'],
  releaseDate: '2024-11-20',
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
      input: 2.5,
      output: 10,
      cachedInput: 1.25,
    },
    batch: {
      input: 1.25,
      output: 5,
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
    imageGeneration: false,
    mcp: true,
    fineTuning: true,
    promptCaching: true,
    batchApi: true,
    realtimeApi: true,
    assistantsApi: true,
  },
}));

export default gpt_4o;
