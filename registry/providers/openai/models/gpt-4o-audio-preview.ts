/**
 * GPT-4o Audio Preview
 * 
 * GPT-4o multimodal audio preview
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_4o_audio_preview: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-4o-audio-preview',
  name: 'GPT-4o Audio Preview',
  type: 'chat',
  family: 'gpt-4o',
  status: 'preview',
  description: 'GPT-4o multimodal audio preview',
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
      image: true,
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
      audio: {
        input: 40,
        output: 80,
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

export default gpt_4o_audio_preview;
