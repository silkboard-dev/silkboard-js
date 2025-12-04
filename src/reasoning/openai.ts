import type { ReasoningConfigEffort, ReasoningOverride, EffortLevel } from '../types';

export interface OpenAIProviderOptions {
  openai: {
    reasoningEffort?: EffortLevel;
    reasoningSummary?: 'auto' | 'detailed';
  };
}

export function buildOpenAIProviderOptions(
  config: ReasoningConfigEffort,
  overrides?: ReasoningOverride
): OpenAIProviderOptions {
  const effort = overrides?.effort ?? config.default;

  // Validate effort level is in allowed values
  if (!config.values.includes(effort)) {
    console.warn(
      `[LLMService] Invalid reasoning effort '${effort}', using default '${config.default}'`
    );
    return {
      openai: {
        reasoningEffort: config.default,
        reasoningSummary: 'auto',
      },
    };
  }

  return {
    openai: {
      reasoningEffort: effort,
      reasoningSummary: 'auto',
    },
  };
}
