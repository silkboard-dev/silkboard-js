import type { ModelConfig } from '../types';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
  providerOptions?: Record<string, unknown>;
}

export function addAnthropicCacheControl(
  messages: Message[],
  config: ModelConfig
): Message[] {
  // Only apply for Anthropic models with manual caching
  if (config.provider !== 'anthropic' || config.caching?.style !== 'manual') {
    return messages;
  }

  const minTokens = config.caching?.min_tokens ?? 1024;

  return messages.map((msg, idx) => {
    // Add cache_control to system message if it's long enough
    if (msg.role === 'system' && idx === 0) {
      // Rough token estimate: ~4 chars per token
      const estimatedTokens = msg.content.length / 4;
      
      if (estimatedTokens >= minTokens) {
        return {
          ...msg,
          providerOptions: {
            ...msg.providerOptions,
            anthropic: {
              ...(msg.providerOptions?.anthropic as Record<string, unknown> ?? {}),
              cacheControl: { type: 'ephemeral' },
            },
          },
        };
      }
    }

    return msg;
  });
}

export function createCachedSystemMessage(
  systemPrompt: string,
  config: ModelConfig
): Message {
  const baseMessage: Message = {
    role: 'system',
    content: systemPrompt,
  };

  if (config.provider === 'anthropic' && config.caching?.style === 'manual') {
    return {
      ...baseMessage,
      providerOptions: {
        anthropic: {
          cacheControl: { type: 'ephemeral' },
        },
      },
    };
  }

  return baseMessage;
}
