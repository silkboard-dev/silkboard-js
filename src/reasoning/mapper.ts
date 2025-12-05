/**
 * Unified Reasoning Mapper
 * 
 * Maps Silkboard's unified ReasoningOverride interface to AI SDK's
 * provider-specific providerOptions. This is the ONLY place we translate
 * our interface to provider-specific format.
 * 
 * Philosophy: Translate, Don't Duplicate
 * - We DON'T validate or clamp values (AI SDK does that)
 * - We DON'T build complex option objects (AI SDK has schemas)
 * - We just translate our unified interface to provider format
 */

import type { ReasoningOverride, ReasoningConfig } from '../types';

// =============================================================================
// Types
// =============================================================================

export interface ReasoningMapperConfig {
  /** Model's reasoning configuration from registry/YAML */
  reasoning?: ReasoningConfig;
  /** Default effort level for effort-based providers */
  defaultEffort?: string;
  /** Default budget for budget-based providers */
  defaultBudget?: number;
  /** Default thinking level for level-based providers */
  defaultLevel?: string;
  /** Whether reasoning is enabled by default */
  defaultEnabled?: boolean;
}

export interface MappedReasoningOptions {
  /** Provider options to pass to AI SDK */
  providerOptions?: Record<string, unknown>;
  /** Extra body for OpenAI-compatible providers */
  extraBody?: Record<string, unknown>;
}

// =============================================================================
// Main Mapper
// =============================================================================

/**
 * Maps Silkboard's unified ReasoningOverride to AI SDK's providerOptions.
 * 
 * @param provider - Provider name (openai, anthropic, google, etc.)
 * @param config - Model's reasoning configuration
 * @param override - User's runtime reasoning override
 * @returns Mapped options for AI SDK
 */
export function mapReasoningToProviderOptions(
  provider: string,
  config?: ReasoningMapperConfig,
  override?: ReasoningOverride
): MappedReasoningOptions {
  // No reasoning config or explicitly disabled
  if (!config?.reasoning || config.reasoning.style === 'none') {
    return {};
  }

  // If user explicitly disabled reasoning
  if (override?.enabled === false) {
    return {};
  }

  switch (provider) {
    case 'openai':
      return mapOpenAI(config, override);
    case 'anthropic':
      return mapAnthropic(config, override);
    case 'google':
      return mapGoogle(config, override);
    case 'deepseek':
      return mapDeepSeek(config, override);
    case 'cohere':
      return mapCohere(config, override);
    case 'xai':
      return mapXai(config, override);
    case 'groq':
      return mapGroq(config, override);
    case 'alibaba':
    case 'dashscope':
      return mapAlibaba(config, override);
    case 'minimax':
      return mapMinimax(config, override);
    case 'moonshot':
    case 'kimi':
      return mapMoonshot(config, override);
    case 'mistral':
      return mapMistral(config, override);
    case 'openrouter':
      return mapOpenRouter(config, override);
    default:
      return {};
  }
}

// =============================================================================
// Tier 1: AI SDK Provider Packages (providerOptions)
// =============================================================================

/**
 * OpenAI: effort-based reasoning
 * Maps to: providerOptions.openai.reasoningEffort, reasoningSummary
 */
function mapOpenAI(
  config: ReasoningMapperConfig,
  override?: ReasoningOverride
): MappedReasoningOptions {
  const effort = override?.effort ?? config.defaultEffort ?? 'medium';
  const summary = override?.summary ?? 'auto';

  return {
    providerOptions: {
      openai: {
        reasoningEffort: effort,
        reasoningSummary: summary,
      },
    },
  };
}

/**
 * Anthropic: budget-based extended thinking
 * Maps to: providerOptions.anthropic.thinking
 */
function mapAnthropic(
  config: ReasoningMapperConfig,
  override?: ReasoningOverride
): MappedReasoningOptions {
  const budget = override?.budget ?? config.defaultBudget;
  
  // No budget means no thinking
  if (!budget || budget === 0) {
    return {};
  }

  return {
    providerOptions: {
      anthropic: {
        thinking: {
          type: 'enabled',
          budgetTokens: budget,
        },
      },
    },
  };
}

/**
 * Google: level-based (Gemini 3+) or budget-based (Gemini 2.5)
 * Maps to: providerOptions.google.thinkingConfig
 */
function mapGoogle(
  config: ReasoningMapperConfig,
  override?: ReasoningOverride
): MappedReasoningOptions {
  const reasoning = config.reasoning;
  
  if (reasoning?.style === 'level') {
    // Gemini 3+ uses thinking levels
    const level = override?.level ?? config.defaultLevel ?? 'medium';
    return {
      providerOptions: {
        google: {
          thinkingConfig: {
            thinkingLevel: level,
            ...(override?.includeThoughts !== undefined && {
              includeThoughts: override.includeThoughts,
            }),
          },
        },
      },
    };
  }
  
  // Gemini 2.5 uses thinking budget
  const budget = override?.budget ?? config.defaultBudget;
  if (!budget) {
    return {};
  }

  return {
    providerOptions: {
      google: {
        thinkingConfig: {
          thinkingBudget: budget,
          ...(override?.includeThoughts !== undefined && {
            includeThoughts: override.includeThoughts,
          }),
        },
      },
    },
  };
}

/**
 * DeepSeek: toggle-based thinking
 * Maps to: providerOptions.deepseek.thinking
 */
function mapDeepSeek(
  config: ReasoningMapperConfig,
  override?: ReasoningOverride
): MappedReasoningOptions {
  const enabled = override?.enabled ?? config.defaultEnabled ?? true;

  return {
    providerOptions: {
      deepseek: {
        thinking: {
          type: enabled ? 'enabled' : 'disabled',
        },
      },
    },
  };
}

/**
 * Cohere: toggle + optional budget
 * Maps to: providerOptions.cohere.thinking
 */
function mapCohere(
  config: ReasoningMapperConfig,
  override?: ReasoningOverride
): MappedReasoningOptions {
  const enabled = override?.enabled ?? config.defaultEnabled ?? true;
  const budget = override?.budget ?? config.defaultBudget;

  return {
    providerOptions: {
      cohere: {
        thinking: {
          type: enabled ? 'enabled' : 'disabled',
          ...(budget && { tokenBudget: budget }),
        },
      },
    },
  };
}

/**
 * xAI: effort-based reasoning (low/high only)
 * Maps to: providerOptions.xai.reasoningEffort
 */
function mapXai(
  config: ReasoningMapperConfig,
  override?: ReasoningOverride
): MappedReasoningOptions {
  // xAI only supports 'low' and 'high'
  let effort = override?.effort ?? config.defaultEffort ?? 'high';
  
  // Map medium to high for xAI
  if (effort === 'medium' || effort === 'minimal' || effort === 'default') {
    effort = 'high';
  }
  if (effort === 'none') {
    return {};
  }

  return {
    providerOptions: {
      xai: {
        reasoningEffort: effort as 'low' | 'high',
      },
    },
  };
}

/**
 * Groq: effort + output format
 * Maps to: providerOptions.groq.reasoningEffort, reasoningFormat
 */
function mapGroq(
  config: ReasoningMapperConfig,
  override?: ReasoningOverride
): MappedReasoningOptions {
  const effort = override?.effort ?? config.defaultEffort ?? 'medium';
  const format = override?.outputFormat ?? 'parsed';

  return {
    providerOptions: {
      groq: {
        reasoningEffort: effort,
        reasoningFormat: format === 'interleaved' ? 'raw' : format,
      },
    },
  };
}

// =============================================================================
// Tier 2: OpenAI-Compatible Providers (extraBody)
// =============================================================================

/**
 * Alibaba/Qwen: hybrid (enable_thinking + thinking_budget)
 * Maps to: extraBody
 */
function mapAlibaba(
  config: ReasoningMapperConfig,
  override?: ReasoningOverride
): MappedReasoningOptions {
  const enabled = override?.enabled ?? config.defaultEnabled ?? true;
  const budget = override?.budget ?? config.defaultBudget;

  return {
    extraBody: {
      enable_thinking: enabled,
      ...(budget && { thinking_budget: budget }),
    },
  };
}

/**
 * Minimax: interleaved reasoning
 * Maps to: extraBody.reasoning_split
 */
function mapMinimax(
  config: ReasoningMapperConfig,
  override?: ReasoningOverride
): MappedReasoningOptions {
  const format = override?.outputFormat ?? 'parsed';
  const enabled = override?.enabled ?? config.defaultEnabled ?? true;

  if (!enabled) {
    return {};
  }

  return {
    extraBody: {
      // reasoning_split: true returns reasoning interleaved with response
      reasoning_split: format === 'interleaved',
    },
  };
}

/**
 * Moonshot/Kimi: toggle-based reasoning
 * Maps to: extraBody.use_reasoning
 */
function mapMoonshot(
  config: ReasoningMapperConfig,
  override?: ReasoningOverride
): MappedReasoningOptions {
  const enabled = override?.enabled ?? config.defaultEnabled ?? true;

  return {
    extraBody: {
      use_reasoning: enabled,
    },
  };
}

/**
 * Mistral: transparent reasoning via prompt_mode
 * Maps to: extraBody.prompt_mode
 */
function mapMistral(
  config: ReasoningMapperConfig,
  override?: ReasoningOverride
): MappedReasoningOptions {
  const enabled = override?.enabled ?? config.defaultEnabled ?? true;

  return {
    extraBody: {
      prompt_mode: enabled ? 'reasoning' : 'default',
    },
  };
}

// =============================================================================
// Tier 3: Gateway Providers
// =============================================================================

/**
 * OpenRouter: unified reasoning interface
 * Maps to: extraBody.reasoning
 */
function mapOpenRouter(
  config: ReasoningMapperConfig,
  override?: ReasoningOverride
): MappedReasoningOptions {
  const reasoning: Record<string, unknown> = {};
  const style = config.reasoning?.style;

  // Handle different styles
  if (style === 'effort') {
    reasoning.effort = override?.effort ?? config.defaultEffort ?? 'medium';
  } else if (style === 'budget' || style === 'toggle_budget' || style === 'hybrid') {
    const budget = override?.budget ?? config.defaultBudget;
    if (budget) {
      reasoning.max_tokens = budget;
    }
  }

  // Check if reasoning should be excluded
  if (override?.enabled === false) {
    reasoning.exclude = true;
  }

  // Only return if we have reasoning config
  if (Object.keys(reasoning).length === 0) {
    return {};
  }

  return {
    extraBody: {
      reasoning,
    },
  };
}

// =============================================================================
// Exports
// =============================================================================

export {
  mapOpenAI,
  mapAnthropic,
  mapGoogle,
  mapDeepSeek,
  mapCohere,
  mapXai,
  mapGroq,
  mapAlibaba,
  mapMinimax,
  mapMoonshot,
  mapMistral,
  mapOpenRouter,
};
