/**
 * Claude 3.5 Sonnet v2 (Bedrock)
 * 
 * bedrock model: anthropic.claude-3-5-sonnet-20241022-v2:0
 * 
 * @see {@link https://platform.bedrock.com/docs}
 */

import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';

import { withBedrockDefaults } from '../_defaults';

const anthropic_claude_3_5_sonnet_20241022_v2_0: ModelDefinition = withBedrockDefaults(defineModel({
  id: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
  name: 'Claude 3.5 Sonnet v2 (Bedrock)',
  type: 'chat',
  family: 'anthropic.claude',
  status: 'ga',
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
  },
  capabilities: {},
  features: {},
}));

export default anthropic_claude_3_5_sonnet_20241022_v2_0;
