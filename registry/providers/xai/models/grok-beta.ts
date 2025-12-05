/**
 * Grok Beta
 * 
 * Legacy beta model. Consider migrating to grok-2-1212 or newer.
 * 
 * @see {@link https://platform.xai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withXaiDefaults } from '../_defaults';

const grok_beta: ModelDefinition = withXaiDefaults(defineModel({
  id: 'grok-beta',
  name: 'Grok Beta',
  type: 'chat',
  family: 'grok-beta',
  status: 'deprecated',
  description: 'Legacy beta model. Consider migrating to grok-2-1212 or newer.',
  releaseDate: '2024-11',
  contextWindow: {
    input: 131_072,
    output: 32_768,
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
      input: 5,
      output: 15,
    },
  },
  capabilities: {
    streaming: true,
    functionCalling: true,
    systemPrompt: true,
  },
  features: {},
}));

export default grok_beta;
