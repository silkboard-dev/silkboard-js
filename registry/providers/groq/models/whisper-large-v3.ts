/**
 * Whisper Large V3
 * 
 * OpenAI Whisper on Groq
 * 
 * @see {@link https://platform.groq.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withGroqDefaults } from '../_defaults';

const whisper_large_v3: ModelDefinition = withGroqDefaults(defineModel({
  id: 'whisper-large-v3',
  name: 'Whisper Large V3',
  type: 'audio',
  family: 'whisper',
  status: 'ga',
  description: 'OpenAI Whisper on Groq',
  contextWindow: {
    input: 0,
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
      input: 0,
    },
    notes: 'Audio transcription model',
  },
  capabilities: {},
  features: {},
}));

export default whisper_large_v3;
