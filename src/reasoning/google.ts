import type {
  ReasoningConfigLevel,
  ReasoningConfigBudget,
  ReasoningOverride,
  ThinkingLevel,
} from '../types';

export interface GoogleProviderOptionsLevel {
  google: {
    thinkingConfig: {
      thinkingLevel: ThinkingLevel;
    };
  };
}

export interface GoogleProviderOptionsBudget {
  google: {
    thinkingConfig: {
      thinkingBudget: number;
    };
  };
}

export type GoogleProviderOptions = GoogleProviderOptionsLevel | GoogleProviderOptionsBudget;

export function buildGoogleProviderOptions(
  config: ReasoningConfigLevel | ReasoningConfigBudget | undefined,
  overrides?: ReasoningOverride
): GoogleProviderOptions {
  if (!config) {
    return {} as GoogleProviderOptions;
  }
  
  if (config.style === 'level') {
    return buildGoogleLevelOptions(config, overrides);
  }
  return buildGoogleBudgetOptions(config, overrides);
}

function buildGoogleLevelOptions(
  config: ReasoningConfigLevel,
  overrides?: ReasoningOverride
): GoogleProviderOptionsLevel {
  const level = overrides?.level ?? config.default;

  // Validate level is in allowed values
  if (!config.values.includes(level)) {
    console.warn(
      `[Silkboard] Invalid thinking level '${level}', using default '${config.default}'`
    );
    return {
      google: {
        thinkingConfig: {
          thinkingLevel: config.default,
        },
      },
    };
  }

  return {
    google: {
      thinkingConfig: {
        thinkingLevel: level,
      },
    },
  };
}

function buildGoogleBudgetOptions(
  config: ReasoningConfigBudget,
  overrides?: ReasoningOverride
): GoogleProviderOptionsBudget {
  const requestedBudget = overrides?.budget ?? config.default;

  // Handle disabled case
  if (requestedBudget === 0 && config.can_disable) {
    return {
      google: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    };
  }

  // Dynamic thinking (-1)
  if (requestedBudget === -1) {
    return {
      google: {
        thinkingConfig: {
          thinkingBudget: -1,
        },
      },
    };
  }

  // Clamp budget to valid range
  const clampedBudget = Math.max(config.min, Math.min(requestedBudget, config.max));

  if (clampedBudget !== requestedBudget) {
    console.warn(
      `[Silkboard] Google thinking budget clamped from ${requestedBudget} to ${clampedBudget} ` +
        `(min: ${config.min}, max: ${config.max})`
    );
  }

  return {
    google: {
      thinkingConfig: {
        thinkingBudget: clampedBudget,
      },
    },
  };
}
