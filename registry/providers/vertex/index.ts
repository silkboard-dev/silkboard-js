/**
 * Google Vertex AI Provider
 * 
 * @see {@link https://cloud.google.com/vertex-ai/docs}
 */

import { defineProvider } from '../../base';
import type { ProviderDefinition, ModelDefinition } from '../../types';

import gemini_1_5_pro from './models/gemini-1.5-pro';

/** All Google Vertex AI models */
export const models: Record<string, ModelDefinition> = {
  'gemini-1.5-pro': gemini_1_5_pro,
};

/** Google Vertex AI provider definition */
export const provider: ProviderDefinition = defineProvider({
  ...{
  id: 'vertex',
  name: 'Google Vertex AI',
  category: 'cloud',
  apiFormat: 'vertex',
  baseUrl: 'https://{region}-aiplatform.googleapis.com/v1',
  docsUrl: 'https://cloud.google.com/vertex-ai/docs',
  pricingUrl: 'https://cloud.google.com/vertex-ai/pricing',
  auth: {
    type: 'service_account',
    envVar: 'GOOGLE_APPLICATION_CREDENTIALS',
  },
},
  models,
});

export default provider;

// Re-export individual models
export {
  gemini_1_5_pro,
};

// Re-export defaults for external use
export * from './_defaults';
