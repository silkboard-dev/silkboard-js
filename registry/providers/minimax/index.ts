/**
 * MiniMax Provider
 * 
 * @see {@link https://platform.minimaxi.com/document}
 */

import { defineProvider } from '../../base';
import type { ProviderDefinition, ModelDefinition } from '../../types';

import abab6_5s_chat from './models/abab6.5s-chat';
import abab6_5g_chat from './models/abab6.5g-chat';
import abab6_5t_chat from './models/abab6.5t-chat';
import embo_01 from './models/embo-01';

/** All MiniMax models */
export const models: Record<string, ModelDefinition> = {
  'abab6.5s-chat': abab6_5s_chat,
  'abab6.5g-chat': abab6_5g_chat,
  'abab6.5t-chat': abab6_5t_chat,
  'embo-01': embo_01,
};

/** MiniMax provider definition */
export const provider: ProviderDefinition = defineProvider({
  ...{
  id: 'minimax',
  name: 'MiniMax',
  category: 'official',
  apiFormat: 'openai-completions',
  baseUrl: 'https://api.minimax.chat/v1',
  docsUrl: 'https://platform.minimaxi.com/document',
  pricingUrl: 'https://platform.minimaxi.com/document/Price',
},
  models,
});

export default provider;

// Re-export individual models
export {
  abab6_5s_chat,
  abab6_5g_chat,
  abab6_5t_chat,
  embo_01,
};

// Re-export defaults for external use
export * from './_defaults';
