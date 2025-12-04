import type { ProviderType, ProviderConfig } from '../types';
import { SilkboardError } from '../errors';

type ProviderInstance = any; // Provider instances are dynamic, using any for flexibility

const providerCache = new Map<ProviderType, ProviderInstance>();

export async function getProvider(
  providerType: ProviderType,
  config?: ProviderConfig
): Promise<ProviderInstance> {
  // Return cached instance if available
  if (providerCache.has(providerType)) {
    return providerCache.get(providerType)!;
  }

  const instance = await createProviderInstance(providerType, config);
  providerCache.set(providerType, instance);
  return instance;
}

async function createProviderInstance(providerType: ProviderType, config?: ProviderConfig): Promise<any> {
  const envKey = config?.env_key ?? getDefaultEnvKey(providerType);
  const apiKey = process.env[envKey];

  if (!apiKey && providerType !== 'voyage') {
    throw SilkboardError.apiKeyMissing(providerType, envKey);
  }

  switch (providerType) {
    case 'openai': {
      const { createOpenAI } = await import('@ai-sdk/openai');
      return createOpenAI({ apiKey });
    }

    case 'anthropic': {
      const { createAnthropic } = await import('@ai-sdk/anthropic');
      return createAnthropic({ apiKey });
    }

    case 'google': {
      const { createGoogleGenerativeAI } = await import('@ai-sdk/google');
      return createGoogleGenerativeAI({ apiKey });
    }

    case 'groq': {
      const { createGroq } = await import('@ai-sdk/groq');
      return createGroq({ apiKey });
    }

    case 'cerebras': {
      const { createCerebras } = await import('@ai-sdk/cerebras');
      return createCerebras({ apiKey });
    }

    case 'xai': {
      const { createXai } = await import('@ai-sdk/xai');
      return createXai({ apiKey });
    }

    case 'cohere': {
      const { createCohere } = await import('@ai-sdk/cohere');
      return createCohere({ apiKey });
    }

    case 'openrouter': {
      const { createOpenAICompatible } = await import('@ai-sdk/openai-compatible');
      return createOpenAICompatible({
        name: 'openrouter',
        apiKey,
        baseURL: config?.base_url ?? 'https://openrouter.ai/api/v1',
        headers: {
          'HTTP-Referer': process.env.OPENROUTER_REFERRER ?? 'https://app.local',
          'X-Title': process.env.OPENROUTER_TITLE ?? 'LLM Service',
          ...config?.headers,
        },
      });
    }

    case 'voyage': {
      // Voyage uses native SDK, not AI SDK
      // Return null - handled separately in adapters
      return null;
    }

    default:
      throw SilkboardError.internalError(`Unknown provider: ${providerType}`);
  }
}

function getDefaultEnvKey(providerType: ProviderType): string {
  const envKeys: Record<ProviderType, string> = {
    openai: 'OPENAI_API_KEY',
    anthropic: 'ANTHROPIC_API_KEY',
    google: 'GEMINI_API_KEY',
    groq: 'GROQ_API_KEY',
    cerebras: 'CEREBRAS_API_KEY',
    xai: 'XAI_API_KEY',
    cohere: 'COHERE_API_KEY',
    openrouter: 'OPENROUTER_API_KEY',
    voyage: 'VOYAGE_API_KEY',
  };
  return envKeys[providerType];
}

export function isProviderAvailable(providerType: ProviderType): boolean {
  const envKey = getDefaultEnvKey(providerType);
  return !!process.env[envKey];
}

export function clearProviderCache(): void {
  providerCache.clear();
}
