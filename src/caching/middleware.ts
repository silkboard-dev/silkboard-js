import type { LanguageModelMiddleware } from 'ai';
import { simulateReadableStream } from 'ai';
import type { CacheStore } from '../types';

type StreamPart = { type: string; [key: string]: unknown };

export interface CacheMiddlewareOptions {
  store: CacheStore;
  ttlSeconds?: number;
  keyPrefix?: string;
}

export function createCacheMiddleware(
  options: CacheMiddlewareOptions
): LanguageModelMiddleware {
  const { store, ttlSeconds = 3600, keyPrefix = 'llm-cache:' } = options;

  return {
    specificationVersion: 'v3' as const,
    wrapGenerate: async ({ doGenerate, params }: any) => {
      const cacheKey = keyPrefix + hashParams(params);

      // Check cache
      const cached = await store.get(cacheKey);
      if (cached) {
        try {
          const result = JSON.parse(cached);
          // Restore Date objects
          if (result.response?.timestamp) {
            result.response.timestamp = new Date(result.response.timestamp);
          }
          return result;
        } catch {
          // Invalid cache entry, continue to generate
        }
      }

      // Generate and cache
      const result = await doGenerate();

      try {
        await store.set(cacheKey, JSON.stringify(result), ttlSeconds);
      } catch (error) {
        console.warn('[CacheMiddleware] Failed to cache result:', error);
      }

      return result;
    },

    wrapStream: async ({ doStream, params }: any) => {
      const cacheKey = keyPrefix + hashParams(params);

      // Check cache
      const cached = await store.get(cacheKey);
      if (cached) {
        try {
          const chunks = JSON.parse(cached) as StreamPart[];
          
          // Restore Date objects in cached chunks
          const formattedChunks = chunks.map((chunk) => {
            if (chunk.type === 'response-metadata' && 'timestamp' in chunk) {
              return { ...chunk, timestamp: new Date(chunk.timestamp as string) };
            }
            return chunk;
          });

          return {
            stream: simulateReadableStream({
              initialDelayInMs: 0,
              chunkDelayInMs: 5,
              chunks: formattedChunks,
            }),
          };
        } catch {
          // Invalid cache entry, continue to stream
        }
      }

      // Stream and cache
      const { stream, ...rest } = await doStream();
      const fullResponse: StreamPart[] = [];

      const transformStream = new TransformStream<StreamPart, StreamPart>({
        transform(chunk, controller) {
          fullResponse.push(chunk);
          controller.enqueue(chunk);
        },
        flush() {
          // Cache the full response after streaming completes
          store.set(cacheKey, JSON.stringify(fullResponse), ttlSeconds).catch((error) => {
            console.warn('[CacheMiddleware] Failed to cache stream:', error);
          });
        },
      });

      return {
        stream: stream.pipeThrough(transformStream),
        ...rest,
      };
    },
  };
}

function hashParams(params: unknown): string {
  const str = JSON.stringify(params);
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

export class MemoryCacheStore implements CacheStore {
  private cache = new Map<string, { value: string; expiresAt: number }>();

  async get(key: string): Promise<string | null> {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.value;
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    const expiresAt = Date.now() + (ttlSeconds ?? 3600) * 1000;
    this.cache.set(key, { value, expiresAt });
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}
