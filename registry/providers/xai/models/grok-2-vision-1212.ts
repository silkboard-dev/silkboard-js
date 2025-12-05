/**
 * Grok 2 Vision (1212)
 * 
 * Multimodal model for documents, diagrams, charts, screenshots, and photographs.
 * 
 * @see {@link https://platform.xai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withXaiDefaults } from '../_defaults';

const grok_2_vision_1212: ModelDefinition = withXaiDefaults(defineModel({
  id: 'grok-2-vision-1212',
  name: 'Grok 2 Vision (1212)',
  type: 'chat',
  family: 'grok-2',
  status: 'ga',
  description: 'Multimodal model for documents, diagrams, charts, screenshots, and photographs.',
  aliases: ['grok-2-vision', 'grok-2-vision-latest'],
  releaseDate: '2024-12-12',
  contextWindow: {
    input: 32_768,
    output: 32_768,
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
      input: 2,
      output: 10,
      cachedInput: 0.2,
    },
  },
  capabilities: {
    streaming: true,
    functionCalling: true,
    structuredOutput: true,
    systemPrompt: true,
    stopSequences: true,
  },
  features: {
    promptCaching: true,
  },
  caching: {
    supported: true,
    type: 'automatic',
  },
  rateLimits: {
    rpm: 600,
  },
}));

export default grok_2_vision_1212;
