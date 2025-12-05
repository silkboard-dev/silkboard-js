/**
 * GPT Audio
 * 
 * Audio-capable GPT model for speech interactions
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_audio: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-audio',
  name: 'GPT Audio',
  type: 'chat',
  family: 'gpt-audio',
  status: 'preview',
  description: 'Audio-capable GPT model for speech interactions',
  architecture: {},
  contextWindow: {
    input: 0,
  },
  modalities: {
    input: {
      text: true,
      audio: true,
    },
    output: {
      text: true,
      audio: true,
    },
  },
  pricing: {
    standard: {
      input: 2.5,
      output: 10,
    },
    modality: {
      text: {
        input: 2.5,
        output: 10,
      },
      audio: {
        input: 32,
        output: 64,
      },
    },
  },
  capabilities: {
    streaming: true,
    functionCalling: true,
    structuredOutput: true,
  },
  features: {
    realtimeApi: true,
    assistantsApi: true,
  },
}));

export default gpt_audio;
