/**
 * GPT-4o Transcribe Diarize
 * 
 * Transcription with diarization support
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const gpt_4o_transcribe_diarize: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'gpt-4o-transcribe-diarize',
  name: 'GPT-4o Transcribe Diarize',
  type: 'audio-transcription',
  family: 'gpt-4o',
  status: 'preview',
  description: 'Transcription with diarization support',
  architecture: {},
  contextWindow: {
    input: 0,
  },
  modalities: {
    input: {
      audio: true,
    },
    output: {
      text: true,
    },
  },
  pricing: {
    standard: {
      input: 2.5,
      output: 10,
    },
  },
  capabilities: {},
  features: {
    batchApi: true,
  },
}));

export default gpt_4o_transcribe_diarize;
