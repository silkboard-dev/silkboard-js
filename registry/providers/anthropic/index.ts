/**
 * Anthropic Provider
 * 
 * @see {@link https://docs.anthropic.com/en/api}
 */

import { defineProvider } from '../../base';
import type { ProviderDefinition, ModelDefinition } from '../../types';

import claude_opus_4_5_20251101 from './models/claude-opus-4-5-20251101';
import claude_opus_4_1_20250805 from './models/claude-opus-4-1-20250805';
import claude_opus_4_20250514 from './models/claude-opus-4-20250514';
import claude_sonnet_4_5_20250929 from './models/claude-sonnet-4-5-20250929';
import claude_sonnet_4_20250514 from './models/claude-sonnet-4-20250514';
import claude_haiku_4_5_20251001 from './models/claude-haiku-4-5-20251001';
import claude_3_5_haiku_20241022 from './models/claude-3-5-haiku-20241022';
import claude_3_haiku_20240307 from './models/claude-3-haiku-20240307';

/** All Anthropic models */
export const models: Record<string, ModelDefinition> = {
  'claude-opus-4-5-20251101': claude_opus_4_5_20251101,
  'claude-opus-4-1-20250805': claude_opus_4_1_20250805,
  'claude-opus-4-20250514': claude_opus_4_20250514,
  'claude-sonnet-4-5-20250929': claude_sonnet_4_5_20250929,
  'claude-sonnet-4-20250514': claude_sonnet_4_20250514,
  'claude-haiku-4-5-20251001': claude_haiku_4_5_20251001,
  'claude-3-5-haiku-20241022': claude_3_5_haiku_20241022,
  'claude-3-haiku-20240307': claude_3_haiku_20240307,
};

/** Anthropic provider definition */
export const provider: ProviderDefinition = defineProvider({
  ...{
  id: 'anthropic',
  name: 'Anthropic',
  category: 'official',
  apiFormat: 'anthropic-messages',
  baseUrl: 'https://api.anthropic.com/v1',
  docsUrl: 'https://docs.anthropic.com/en/api',
  pricingUrl: 'https://platform.claude.com/docs/en/about-claude/pricing',
  statusUrl: 'https://status.anthropic.com/',
  auth: {
    type: 'api_key',
    header: 'x-api-key',
    envVar: 'ANTHROPIC_API_KEY',
  },
},
  models,
});

export default provider;

// Re-export individual models
export {
  claude_opus_4_5_20251101,
  claude_opus_4_1_20250805,
  claude_opus_4_20250514,
  claude_sonnet_4_5_20250929,
  claude_haiku_4_5_20251001,
  claude_sonnet_4_20250514,
  claude_3_5_haiku_20241022,
  claude_3_haiku_20240307,
};

// Re-export defaults for external use
export * from './_defaults';
