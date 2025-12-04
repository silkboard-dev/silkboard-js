import type {
  ModelConfig,
  ReasoningOverride,
  ReasoningConfigEffort,
  ReasoningConfigBudget,
  ReasoningConfigToggle,
  EffortLevel,
} from '../types';

export interface OpenRouterReasoningConfig {
  effort?: EffortLevel | 'minimal' | 'none';
  max_tokens?: number;
  enabled?: boolean;
  exclude?: boolean;
}

export interface OpenRouterExtraBody {
  provider?: {
    only?: string[];
    order?: string[];
  };
  reasoning?: OpenRouterReasoningConfig;
}

export function buildOpenRouterExtraBody(
  config: ModelConfig,
  overrides?: ReasoningOverride
): OpenRouterExtraBody {
  const body: OpenRouterExtraBody = {};

  // Add provider routing if specified
  if (config.routing) {
    body.provider = {};
    if (config.routing.only) {
      body.provider.only = config.routing.only;
    }
    if (config.routing.order) {
      body.provider.order = config.routing.order;
    }
  }

  // Build reasoning configuration
  const reasoning = config.reasoning;
  if (!reasoning || reasoning.style === 'none') {
    return body;
  }

  switch (reasoning.style) {
    case 'effort':
      body.reasoning = buildEffortReasoning(reasoning as ReasoningConfigEffort, overrides);
      break;

    case 'budget':
      body.reasoning = buildBudgetReasoning(reasoning as ReasoningConfigBudget, overrides);
      break;

    case 'toggle':
      body.reasoning = buildToggleReasoning(reasoning as ReasoningConfigToggle, overrides);
      break;
  }

  return body;
}

function buildEffortReasoning(
  config: ReasoningConfigEffort,
  overrides?: ReasoningOverride
): OpenRouterReasoningConfig {
  const effort = overrides?.effort ?? config.default;

  // OpenRouter supports: high, medium, low, minimal, none
  return {
    effort: effort as EffortLevel | 'minimal' | 'none',
  };
}

function buildBudgetReasoning(
  config: ReasoningConfigBudget,
  overrides?: ReasoningOverride
): OpenRouterReasoningConfig {
  const requestedBudget = overrides?.budget ?? config.default;

  // Handle disabled case
  if (requestedBudget === 0 && config.can_disable) {
    return {
      enabled: false,
    };
  }

  // OpenRouter caps Anthropic reasoning at 32K
  const OPENROUTER_MAX = 32000;
  const clampedBudget = Math.max(
    config.min,
    Math.min(requestedBudget, config.max, OPENROUTER_MAX)
  );

  if (clampedBudget !== requestedBudget && requestedBudget > 0) {
    console.warn(
      `[LLMService] OpenRouter reasoning budget clamped from ${requestedBudget} to ${clampedBudget} ` +
        `(OpenRouter max: ${OPENROUTER_MAX})`
    );
  }

  return {
    max_tokens: clampedBudget,
  };
}

function buildToggleReasoning(
  config: ReasoningConfigToggle,
  overrides?: ReasoningOverride
): OpenRouterReasoningConfig {
  const enabled = overrides?.enabled ?? config.default;

  return {
    enabled,
  };
}
