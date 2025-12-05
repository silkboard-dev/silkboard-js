import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { withGroqDefaults } from '../_defaults';

const playai_tts: ModelDefinition = withGroqDefaults(defineModel({
  id: 'playai-tts',
  name: 'PlayAI TTS',
  type: 'audio-speech',
  family: 'playai',
  status: 'preview',
  contextWindow: {
    input: 0, // TODO: Fill in character limits from Groq docs
  },
  modalities: {
    input: { text: true },
    output: { audio: true },
  },
  pricing: {
    standard: {
      input: 0,
    },
    // TODO: Fill in pricing (per-character) from Supported Models page
  },
  capabilities: {},
  features: {},
}));

export default playai_tts;

