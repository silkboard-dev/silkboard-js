/**
 * GPT-4o Mini Audio Preview
 * 
 * Budget audio preview variant
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_4o_mini_audio_preview: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-4o-mini-audio-preview',
  name: 'GPT-4o Mini Audio Preview',
  type: 'chat',
  family: 'gpt-4o',
  status: 'preview',
  description: 'Budget audio preview variant',
  architecture: {
    trainingCutoff: '2023-10-01',
  },
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
      input: 0.15,
      output: 0.6,
    },
    modality: {
      audio: {
        input: 10,
        output: 20,
      },
    },
  },
  capabilities: {
    streaming: true,
    structuredOutput: true,
  },
  features: {
    realtimeApi: true,
  },
}));

export default gpt_4o_mini_audio_preview;
