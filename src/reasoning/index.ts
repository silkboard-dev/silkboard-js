/**
 * Reasoning Module
 * 
 * Provides unified reasoning configuration that maps to AI SDK's
 * provider-specific providerOptions. We translate, not duplicate.
 * 
 * @see mapper.ts for the unified mapping logic
 */

import type {
  ModelConfig,
  ReasoningOverride,
  ReasoningConfig,
  ReasoningConfigEffort,
  ReasoningConfigBudget,
  ReasoningConfigLevel,
} from '../types';
import { 
  mapReasoningToProviderOptions, 
  type ReasoningMapperConfig,
} from './mapper';

export interface ReasoningBuildResult {
  providerOptions: Record<string, any>;
  extraBody?: Record<string, any>;
}

/**
 * Build reasoning configuration for a model.
 * 
 * This function uses the new unified mapper for all providers.
 * It extracts the necessary config from ModelConfig and delegates
 * to mapReasoningToProviderOptions.
 * 
 * @param config - Model configuration
 * @param overrides - User's runtime reasoning override
 * @returns Provider options and extra body for AI SDK
 */
export function buildReasoningConfig(
  config: ModelConfig,
  overrides?: ReasoningOverride
): ReasoningBuildResult {
  const reasoning = config.reasoning;
  
  if (!reasoning || reasoning.style === 'none') {
    return { providerOptions: {} };
  }

  // Build mapper config from model config
  const mapperConfig: ReasoningMapperConfig = {
    reasoning,
    defaultEffort: reasoning.style === 'effort' 
      ? (reasoning as ReasoningConfigEffort).default 
      : undefined,
    defaultBudget: reasoning.style === 'budget' 
      ? (reasoning as ReasoningConfigBudget).default 
      : undefined,
    defaultLevel: reasoning.style === 'level' 
      ? (reasoning as ReasoningConfigLevel).default 
      : undefined,
    defaultEnabled: 'default' in reasoning && typeof reasoning.default === 'boolean'
      ? reasoning.default
      : true,
  };

  // Use the unified mapper
  const mapped = mapReasoningToProviderOptions(
    config.provider,
    mapperConfig,
    overrides
  );

  return {
    providerOptions: mapped.providerOptions ?? {},
    extraBody: mapped.extraBody,
  };
}

export function mergeReasoningOverride(
  base: ReasoningConfig | undefined,
  override: ReasoningOverride | undefined
): ReasoningConfig | undefined {
  if (!override) return base;
  if (!base) return undefined;

  switch (base.style) {
    case 'effort':
      return {
        ...base,
        default: override.effort ?? base.default,
      };

    case 'budget':
      return {
        ...base,
        default: override.budget ?? base.default,
      };

    case 'level':
      return {
        ...base,
        default: override.level ?? base.default,
      };

    case 'toggle':
    case 'toggle_budget':
    case 'hybrid':
    case 'interleaved':
    case 'transparent':
      return {
        ...base,
        default: override.enabled ?? base.default,
      };

    default:
      return base;
  }
}

// Re-export the unified mapper
export { mapReasoningToProviderOptions, type ReasoningMapperConfig } from './mapper';

// Legacy exports for backward compatibility
export { buildOpenAIProviderOptions } from './openai';
export { buildAnthropicProviderOptions } from './anthropic';
export { buildGoogleProviderOptions } from './google';
export { buildOpenRouterExtraBody } from './openrouter';
