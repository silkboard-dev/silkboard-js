/**
 * AWS Bedrock Provider
 * 
 * @see {@link https://docs.aws.amazon.com/bedrock/}
 */

import { defineProvider } from '../../base';
import type { ProviderDefinition, ModelDefinition } from '../../types';

import anthropic_claude_3_5_sonnet_20241022_v2_0 from './models/anthropic.claude-3-5-sonnet-20241022-v2_0';

/** All AWS Bedrock models */
export const models: Record<string, ModelDefinition> = {
  'anthropic.claude-3-5-sonnet-20241022-v2:0': anthropic_claude_3_5_sonnet_20241022_v2_0,
};

/** AWS Bedrock provider definition */
export const provider: ProviderDefinition = defineProvider({
  ...{
  id: 'bedrock',
  name: 'AWS Bedrock',
  category: 'cloud',
  apiFormat: 'bedrock',
  baseUrl: 'https://bedrock-runtime.{region}.amazonaws.com',
  docsUrl: 'https://docs.aws.amazon.com/bedrock/',
  pricingUrl: 'https://aws.amazon.com/bedrock/pricing/',
  auth: {
    type: 'iam',
    envVar: 'AWS_ACCESS_KEY_ID',
  },
},
  models,
});

export default provider;

// Re-export individual models
export {
  anthropic_claude_3_5_sonnet_20241022_v2_0,
};

// Re-export defaults for external use
export * from './_defaults';
