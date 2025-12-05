/**
 * ChatGPT-4o (latest)
 * 
 * GPT-4o snapshot used in ChatGPT with additional RLHF, exposed as a dynamic chat model.
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const chatgpt_4o_latest: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'chatgpt-4o-latest',
  name: 'ChatGPT-4o (latest)',
  type: 'chat',
  family: 'gpt-4o',
  status: 'ga',
  description: 'GPT-4o snapshot used in ChatGPT with additional RLHF, exposed as a dynamic chat model.',
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
  },
  features: {
    assistantsApi: true,
  },
}));

export default chatgpt_4o_latest;
