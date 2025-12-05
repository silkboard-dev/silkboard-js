/**
 * Provider Registry
 * 
 * All providers and models are exported from here.
 * Each model is in its own file for easy maintenance and lazy loading.
 */

import alibabaProvider from './alibaba';
import anthropicProvider from './anthropic';
import deepseekProvider from './deepseek';
import googleProvider from './google';
import minimaxProvider from './minimax';
import moonshotProvider from './moonshot';
import openaiProvider from './openai';
import perplexityProvider from './perplexity';
import xaiProvider from './xai';
import zhipuProvider from './zhipu';
import basetenProvider from './baseten';
import cerebrasProvider from './cerebras';
import chutesProvider from './chutes';
import deepinfraProvider from './deepinfra';
import fireworksProvider from './fireworks';
import groqProvider from './groq';
import togetherProvider from './together';
import azureProvider from './azure';
import bedrockProvider from './bedrock';
import cloudflareProvider from './cloudflare';
import vertexProvider from './vertex';
import openrouterProvider from './openrouter';
import requestyProvider from './requesty';

/** All registered providers */
export const providers = {
  alibaba: alibabaProvider,
  anthropic: anthropicProvider,
  deepseek: deepseekProvider,
  google: googleProvider,
  minimax: minimaxProvider,
  moonshot: moonshotProvider,
  openai: openaiProvider,
  perplexity: perplexityProvider,
  xai: xaiProvider,
  zhipu: zhipuProvider,
  baseten: basetenProvider,
  cerebras: cerebrasProvider,
  chutes: chutesProvider,
  deepinfra: deepinfraProvider,
  fireworks: fireworksProvider,
  groq: groqProvider,
  together: togetherProvider,
  azure: azureProvider,
  bedrock: bedrockProvider,
  cloudflare: cloudflareProvider,
  vertex: vertexProvider,
  openrouter: openrouterProvider,
  requesty: requestyProvider,
};

/** Get all provider IDs */
export const providerIds = Object.keys(providers);

/** Get a provider by ID */
export function getProvider(id: string) {
  return providers[id as keyof typeof providers];
}

// Re-export providers
export {
  alibabaProvider,
  anthropicProvider,
  deepseekProvider,
  googleProvider,
  minimaxProvider,
  moonshotProvider,
  openaiProvider,
  perplexityProvider,
  xaiProvider,
  zhipuProvider,
  basetenProvider,
  cerebrasProvider,
  chutesProvider,
  deepinfraProvider,
  fireworksProvider,
  groqProvider,
  togetherProvider,
  azureProvider,
  bedrockProvider,
  cloudflareProvider,
  vertexProvider,
  openrouterProvider,
  requestyProvider,
};
