import { describe, it, expect } from 'vitest';
import { createMockModelsConfig, createMockRolesConfig } from '../helpers/mocks';
import { Registry } from '../../src/providers/registry';
import { CostTracker } from '../../src/cost/tracker';
import { MemoryCacheStore } from '../../src/caching/middleware';

/**
 * Functional tests for core components.
 * These test the components in isolation without requiring mocks for the full service.
 */
describe('Registry', () => {
  const modelsConfig = createMockModelsConfig();

  it('should create registry with models config', () => {
    const registry = new Registry(modelsConfig);
    expect(registry).toBeInstanceOf(Registry);
  });

  it('should list all models', () => {
    const registry = new Registry(modelsConfig);
    const models = registry.listModels();
    expect(models).toContain('gpt-4o');
    expect(models).toContain('claude-sonnet');
    expect(models).toContain('text-embedding-3-large');
  });

  it('should filter models by type', () => {
    const registry = new Registry(modelsConfig);
    const embeddingModels = registry.listModels('embedding');
    expect(embeddingModels).toContain('text-embedding-3-large');
    expect(embeddingModels).not.toContain('gpt-4o');
  });

  it('should get model config', () => {
    const registry = new Registry(modelsConfig);
    const config = registry.getModelConfig('gpt-4o');
    expect(config.provider).toBe('openai');
    expect(config.model_id).toBe('gpt-4o');
  });

  it('should throw for unknown model', () => {
    const registry = new Registry(modelsConfig);
    expect(() => registry.getModelConfig('unknown-model')).toThrow();
  });
});

describe('CostTracker', () => {
  const modelsConfig = createMockModelsConfig();

  it('should start with empty usage', () => {
    const tracker = new CostTracker(modelsConfig.models);
    const summary = tracker.getSummary();
    expect(summary.totalInputTokens).toBe(0);
    expect(summary.totalOutputTokens).toBe(0);
    expect(summary.totalCost).toBe(0);
  });

  it('should track usage', async () => {
    const tracker = new CostTracker(modelsConfig.models);
    await tracker.track({
      model: 'gpt-4o',
      inputTokens: 100,
      outputTokens: 50,
      latencyMs: 500,
    });

    const summary = tracker.getSummary();
    expect(summary.totalInputTokens).toBe(100);
    expect(summary.totalOutputTokens).toBe(50);
  });

  it('should clear usage', async () => {
    const tracker = new CostTracker(modelsConfig.models);
    await tracker.track({
      model: 'gpt-4o',
      inputTokens: 100,
      outputTokens: 50,
      latencyMs: 500,
    });

    tracker.clearUsage();
    const summary = tracker.getSummary();
    expect(summary.totalInputTokens).toBe(0);
  });

  it('should emit usage events when event emitter is provided', async () => {
    const { SilkboardEventEmitter } = await import('../../src/events');
    const emitter = new SilkboardEventEmitter();
    const tracker = new CostTracker(modelsConfig.models, undefined, emitter);
    const events: unknown[] = [];
    emitter.on('usage', (event) => events.push(event));

    await tracker.track({
      model: 'gpt-4o',
      inputTokens: 100,
      outputTokens: 50,
      latencyMs: 500,
    });

    expect(events).toHaveLength(1);
  });
});

describe('MemoryCacheStore', () => {
  it('should store and retrieve values', async () => {
    const cache = new MemoryCacheStore();
    await cache.set('key1', 'value1');
    const result = await cache.get('key1');
    expect(result).toBe('value1');
  });

  it('should return null for missing keys', async () => {
    const cache = new MemoryCacheStore();
    const result = await cache.get('nonexistent');
    expect(result).toBeNull();
  });

  it('should delete values', async () => {
    const cache = new MemoryCacheStore();
    await cache.set('key1', 'value1');
    await cache.delete('key1');
    const result = await cache.get('key1');
    expect(result).toBeNull();
  });

  it('should respect maxSize (LRU eviction)', async () => {
    const cache = new MemoryCacheStore({ maxSize: 2 });
    await cache.set('key1', 'value1');
    await cache.set('key2', 'value2');
    await cache.set('key3', 'value3'); // Should evict key1

    expect(await cache.get('key1')).toBeNull();
    expect(await cache.get('key2')).toBe('value2');
    expect(await cache.get('key3')).toBe('value3');
  });

  it('should expire entries based on TTL', async () => {
    const cache = new MemoryCacheStore();
    await cache.set('key1', 'value1', 0); // Immediate expiry

    // Wait a tiny bit for the entry to expire
    await new Promise((resolve) => setTimeout(resolve, 10));
    const result = await cache.get('key1');
    expect(result).toBeNull();
  });

  it('should report correct size', async () => {
    const cache = new MemoryCacheStore();
    expect(cache.size()).toBe(0);
    
    await cache.set('key1', 'value1');
    expect(cache.size()).toBe(1);
    
    await cache.set('key2', 'value2');
    expect(cache.size()).toBe(2);
  });

  it('should clear all entries', async () => {
    const cache = new MemoryCacheStore();
    await cache.set('key1', 'value1');
    await cache.set('key2', 'value2');
    cache.clear();
    expect(cache.size()).toBe(0);
  });
});
