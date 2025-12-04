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

export interface MemoryCacheOptions {
  maxSize?: number;
  defaultTtlSeconds?: number;
}

/**
 * In-memory cache with LRU eviction and TTL support.
 */
export class MemoryCacheStore implements CacheStore {
  private cache = new Map<string, { value: string; expiresAt: number }>();
  private readonly maxSize: number;
  private readonly defaultTtlSeconds: number;

  constructor(options: MemoryCacheOptions = {}) {
    this.maxSize = options.maxSize ?? 1000;
    this.defaultTtlSeconds = options.defaultTtlSeconds ?? 3600;
  }

  async get(key: string): Promise<string | null> {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    // Move to end for LRU (most recently used)
    this.cache.delete(key);
    this.cache.set(key, entry);
    
    return entry.value;
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    // Evict oldest entries if at capacity (LRU eviction)
    while (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        this.cache.delete(oldestKey);
      } else {
        break;
      }
    }

    const expiresAt = Date.now() + (ttlSeconds ?? this.defaultTtlSeconds) * 1000;
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

  /**
   * Remove expired entries from the cache.
   */
  prune(): number {
    const now = Date.now();
    let pruned = 0;
    for (const [key, entry] of this.cache) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
        pruned++;
      }
    }
    return pruned;
  }
}
