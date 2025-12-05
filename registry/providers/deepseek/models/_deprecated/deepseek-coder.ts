/**
 * DeepSeek Coder
 * 
 * Code-specialized model (deprecated)
 *
 * @see {@link https://api-docs.deepseek.com/}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withDeepseekDefaults } from '../_defaults';

const deepseek_coder: ModelDefinition = withDeepseekDefaults(defineModel({
  id: 'deepseek-coder',
  name: 'DeepSeek Coder',
  type: 'chat',
  family: 'deepseek',
  status: 'deprecated',
  description: 'Code-specialized model (deprecated / not listed in current API models)',
  contextWindow: {
    input: 0, // TODO: Verify if this model is still available and its limits.
    output: 0, // TODO: Verify if this model is still available and its limits.
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
      input: 0, // TODO: Pricing not available; placeholder.
      output: 0, // TODO: Pricing not available; placeholder.
    },
  },
  capabilities: {
    vision: false,
  },
  features: {},
}));

export default deepseek_coder;
