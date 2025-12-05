/**
 * Zhipu AI (Z.AI) Provider
 * 
 * @see {@link https://open.bigmodel.cn/dev/api}
 */

import { defineProvider } from '../../base';
import type { ProviderDefinition, ModelDefinition } from '../../types';

import glm_4_plus from './models/glm-4-plus';
import glm_4_air from './models/glm-4-air';
import glm_4_airx from './models/glm-4-airx';
import glm_4_flash from './models/glm-4-flash';
import glm_4_long from './models/glm-4-long';
import glm_4v_plus from './models/glm-4v-plus';
import glm_4v from './models/glm-4v';
import embedding_3 from './models/embedding-3';

/** All Zhipu AI (Z.AI) models */
export const models: Record<string, ModelDefinition> = {
  'glm-4-plus': glm_4_plus,
  'glm-4-air': glm_4_air,
  'glm-4-airx': glm_4_airx,
  'glm-4-flash': glm_4_flash,
  'glm-4-long': glm_4_long,
  'glm-4v-plus': glm_4v_plus,
  'glm-4v': glm_4v,
  'embedding-3': embedding_3,
};

/** Zhipu AI (Z.AI) provider definition */
export const provider: ProviderDefinition = defineProvider({
  ...{
  id: 'zhipu',
  name: 'Zhipu AI (Z.AI)',
  category: 'official',
  apiFormat: 'openai-completions',
  baseUrl: 'https://open.bigmodel.cn/api/paas/v4',
  docsUrl: 'https://open.bigmodel.cn/dev/api',
  pricingUrl: 'https://open.bigmodel.cn/pricing',
},
  models,
});

export default provider;

// Re-export individual models
export {
  glm_4_plus,
  glm_4_air,
  glm_4_airx,
  glm_4_flash,
  glm_4_long,
  glm_4v_plus,
  glm_4v,
  embedding_3,
};

// Re-export defaults for external use
export * from './_defaults';
