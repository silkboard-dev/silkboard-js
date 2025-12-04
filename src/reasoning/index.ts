import type {
  ModelConfig,
  ReasoningOverride,
  ReasoningConfig,
  ReasoningConfigEffort,
  ReasoningConfigBudget,
  ReasoningConfigLevel,
} from '../types';
import { buildOpenAIProviderOptions } from './openai';
import { buildAnthropicProviderOptions } from './anthropic';
import { buildGoogleProviderOptions } from './google';
import { buildOpenRouterExtraBody } from './openrouter';

export interface ReasoningBuildResult {
  providerOptions: Record<string, any>;
  extraBody?: Record<string, any>;
}

export function buildReasoningConfig(
  config: ModelConfig,
  overrides?: ReasoningOverride
): ReasoningBuildResult {
  const reasoning = config.reasoning;
  
  if (!reasoning || reasoning.style === 'none') {
    return { providerOptions: {} };
  }

  switch (config.provider) {
    case 'openai':
      return {
        providerOptions: buildOpenAIProviderOptions(
          reasoning as ReasoningConfigEffort,
          overrides
        ),
      };

    case 'anthropic':
      return {
        providerOptions: buildAnthropicProviderOptions(
          reasoning as ReasoningConfigBudget,
          config.parameters?.max_tokens ?? 64000,
          overrides
        ),
      };

    case 'google':
      return {
        providerOptions: buildGoogleProviderOptions(
          reasoning as ReasoningConfigLevel | ReasoningConfigBudget,
          overrides
        ),
      };

    case 'openrouter':
      return {
        providerOptions: {},
        extraBody: buildOpenRouterExtraBody(config, overrides),
      };

    case 'xai':
      // xAI Grok uses effort-based reasoning similar to OpenAI
      return {
        providerOptions: buildOpenAIProviderOptions(
          reasoning as ReasoningConfigEffort,
          overrides
        ),
      };

    default:
      return { providerOptions: {} };
  }
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
      return {
        ...base,
        default: override.enabled ?? base.default,
      };

    default:
      return base;
  }
}

export { buildOpenAIProviderOptions } from './openai';
export { buildAnthropicProviderOptions } from './anthropic';
export { buildGoogleProviderOptions } from './google';
export { buildOpenRouterExtraBody } from './openrouter';
