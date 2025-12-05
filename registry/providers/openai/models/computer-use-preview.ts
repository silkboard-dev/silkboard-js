/**
 * Computer Use Preview
 * 
 * Experimental computer use tool-calling model
 * 
 * @see {@link https://platform.openai.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withOpenaiDefaults } from '../_defaults';

const computer_use_preview: ModelDefinition = withOpenaiDefaults(defineModel({
  id: 'computer-use-preview',
  name: 'Computer Use Preview',
  type: 'chat',
  family: 'gpt-4o',
  status: 'preview',
  description: 'Experimental computer use tool-calling model',
  architecture: {},
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
      input: 3,
      output: 12,
    },
  },
  capabilities: {},
  features: {
    computerUse: true,
    assistantsApi: true,
  },
}));

export default computer_use_preview;
