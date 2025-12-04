import type { ReasoningConfigBudget, ReasoningOverride } from '../types';

export interface AnthropicProviderOptions {
  anthropic: {
    thinking: {
      type: 'enabled' | 'disabled';
      budgetTokens?: number;
    };
  };
}

export function buildAnthropicProviderOptions(
  config: ReasoningConfigBudget,
  maxTokens: number,
  overrides?: ReasoningOverride
): AnthropicProviderOptions {
  const requestedBudget = overrides?.budget ?? config.default;

  // Handle disabled case
  if (requestedBudget === 0 && config.can_disable) {
    return {
      anthropic: {
        thinking: {
          type: 'disabled',
        },
      },
    };
  }

  // Dynamic thinking (-1) means let the model decide
  if (requestedBudget === -1) {
    // For dynamic, use a reasonable default based on max_tokens
    const dynamicBudget = Math.min(
      Math.floor(maxTokens * 0.25), // 25% of max_tokens
      config.max,
      32000 // Cap at 32K for most use cases
    );

    return {
      anthropic: {
        thinking: {
          type: 'enabled',
          budgetTokens: Math.max(config.min, dynamicBudget),
        },
      },
    };
  }

  // Clamp budget to valid range
  // budget_tokens must be < max_tokens
  const clampedBudget = Math.max(
    config.min,
    Math.min(requestedBudget, config.max, maxTokens - 1)
  );

  if (clampedBudget !== requestedBudget) {
    console.warn(
      `[Silkboard] Anthropic thinking budget clamped from ${requestedBudget} to ${clampedBudget} ` +
        `(min: ${config.min}, max: ${config.max}, max_tokens: ${maxTokens})`
    );
  }

  return {
    anthropic: {
      thinking: {
        type: 'enabled',
        budgetTokens: clampedBudget,
      },
    },
  };
}
