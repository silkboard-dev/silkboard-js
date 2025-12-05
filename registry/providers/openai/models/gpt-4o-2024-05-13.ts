/**
 * GPT-4o (May 2024)
 * 
 * Initial GPT-4o snapshot
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_4o_2024_05_13: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-4o-2024-05-13',
  name: 'GPT-4o (May 2024)',
  type: 'chat',
  family: 'gpt-4o',
  status: 'ga',
  description: 'Initial GPT-4o snapshot',
  releaseDate: '2024-05-13',
  architecture: {
    trainingCutoff: '2023-10-01',
  },
  contextWindow: {
    input: 128_000,
    output: 4096,
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
      input: 5,
      output: 15,
    },
  },
  capabilities: {
    streaming: true,
    functionCalling: true,
    structuredOutput: true,
    jsonMode: true,
    systemPrompt: true,
  },
  features: {
    batchApi: true,
    assistantsApi: true,
  },
}));

export default gpt_4o_2024_05_13;
