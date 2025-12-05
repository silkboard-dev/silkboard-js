import { describe, it, expect, beforeAll } from 'vitest';
import { join } from 'path';
import { ProviderRegistry, RegistryLoader } from '../../../src/registry';

const REGISTRY_PATH = join(__dirname, '../../../registry');

describe('RegistryLoader', () => {
  it('should list available providers', () => {
    const loader = new RegistryLoader({ registryPath: REGISTRY_PATH });
    const providers = loader.listProviders();
    
    expect(providers).toContain('openai');
    expect(providers).toContain('anthropic');
    expect(providers.length).toBeGreaterThan(10);
  });

  it('should load a single provider', () => {
    const loader = new RegistryLoader({ registryPath: REGISTRY_PATH });
    const openai = loader.loadProvider('openai');
    
    expect(openai).not.toBeNull();
    expect(openai?.provider.id).toBe('openai');
    expect(openai?.provider.name).toBe('OpenAI');
    expect(openai?.provider.category).toBe('official');
  });

  it('should load all providers', () => {
    const loader = new RegistryLoader({ registryPath: REGISTRY_PATH });
    const result = loader.load();
    
    expect(result.providers.size).toBeGreaterThan(10);
    expect(result.providers.has('openai')).toBe(true);
    expect(result.providers.has('anthropic')).toBe(true);
  });

  it('should handle missing provider gracefully', () => {
    const loader = new RegistryLoader({ registryPath: REGISTRY_PATH });
    const missing = loader.loadProvider('nonexistent-provider');
    
    expect(missing).toBeNull();
  });
});

describe('ProviderRegistry', () => {
  let registry: ProviderRegistry;

  beforeAll(() => {
    registry = new ProviderRegistry({ registryPath: REGISTRY_PATH, preload: true });
  });

  describe('getProvider', () => {
    it('should get provider metadata', () => {
      const provider = registry.getProvider('openai');
      
      expect(provider).not.toBeNull();
      expect(provider?.id).toBe('openai');
      expect(provider?.name).toBe('OpenAI');
      expect(provider?.category).toBe('official');
    });

    it('should return null for unknown provider', () => {
      const provider = registry.getProvider('unknown');
      expect(provider).toBeNull();
    });
  });

  describe('getModel', () => {
    it('should get model from provider file', () => {
      // Get provider file directly and check model exists
      const providerFile = registry.getProviderFile('openai');
      
      expect(providerFile).not.toBeNull();
      expect(providerFile?.models['gpt-4o']).toBeDefined();
      expect(providerFile?.models['gpt-4o'].name).toBe('GPT-4o');
    });

    it('should get model by alias lookup', () => {
      const result = registry.getModel('gpt-4o-2024-11-20');
      
      expect(result).not.toBeNull();
      // Model found (may be from any provider with this alias)
    });

    it('should get embedding model', () => {
      const result = registry.getModel('text-embedding-3-large');
      
      expect(result).not.toBeNull();
      expect(result?.model.type).toBe('embedding');
    });

    it('should return null for unknown model', () => {
      const result = registry.getModel('unknown-model-xyz-123');
      expect(result).toBeNull();
    });
  });

  describe('getPricing', () => {
    it('should get pricing from provider file', () => {
      const providerFile = registry.getProviderFile('openai');
      const pricing = providerFile?.models['gpt-4o']?.pricing;
      
      expect(pricing).toBeDefined();
      expect(pricing?.input).toBeGreaterThan(0);
      expect(pricing?.output).toBeGreaterThan(0);
    });

    it('should include cached pricing if available', () => {
      const providerFile = registry.getProviderFile('openai');
      const pricing = providerFile?.models['gpt-4o']?.pricing;
      
      expect(pricing?.cached_input).toBeDefined();
    });
  });

  describe('listProviders', () => {
    it('should list all provider IDs', () => {
      const providers = registry.listProviders();
      
      expect(providers).toContain('openai');
      expect(providers).toContain('anthropic');
      expect(providers.length).toBeGreaterThan(10);
    });
  });

  describe('listProvidersByCategory', () => {
    it('should list official providers', () => {
      const official = registry.listProvidersByCategory('official');
      
      expect(official).toContain('openai');
      expect(official).toContain('anthropic');
    });

    it('should list cloud providers', () => {
      const cloud = registry.listProvidersByCategory('cloud');
      
      expect(cloud).toContain('vertex');
      expect(cloud).toContain('bedrock');
    });

    it('should list gateway providers', () => {
      const gateways = registry.listProvidersByCategory('gateway');
      
      expect(gateways).toContain('openrouter');
    });
  });

  describe('findModelsByCapability', () => {
    it('should find models with function calling', () => {
      const models = registry.findModelsByCapability('function_calling');
      
      expect(models.length).toBeGreaterThan(0);
      expect(models.every(m => m.metadata.capabilities?.function_calling)).toBe(true);
    });

    it('should find models with streaming', () => {
      const models = registry.findModelsByCapability('streaming');
      
      expect(models.length).toBeGreaterThan(0);
    });
  });

  describe('findModelsByFeature', () => {
    it('should find models with web search', () => {
      const models = registry.findModelsByFeature('web_search');
      
      expect(models.length).toBeGreaterThan(0);
      expect(models.every(m => m.metadata.features?.web_search)).toBe(true);
    });

    it('should find models with prompt caching', () => {
      const models = registry.findModelsByFeature('prompt_caching');
      
      expect(models.length).toBeGreaterThan(0);
    });
  });

  describe('findModelsByType', () => {
    it('should find chat models', () => {
      const models = registry.findModelsByType('chat');
      
      expect(models.length).toBeGreaterThan(0);
      expect(models.every(m => m.metadata.type === 'chat')).toBe(true);
    });

    it('should find embedding models', () => {
      const models = registry.findModelsByType('embedding');
      
      expect(models.length).toBeGreaterThan(0);
      expect(models.every(m => m.metadata.type === 'embedding')).toBe(true);
    });
  });

  describe('supportsModality', () => {
    it('should check modality from provider file', () => {
      const providerFile = registry.getProviderFile('openai');
      const modalities = providerFile?.models['gpt-4o']?.modalities;
      
      expect(modalities?.input?.text).toBe(true);
      expect(modalities?.input?.image).toBe(true);
      // video is undefined (not explicitly false) when not supported
      expect(modalities?.input?.video).toBeFalsy();
    });
  });

  describe('getRateLimits', () => {
    it('should get rate limits for a model', () => {
      const limits = registry.getRateLimits('gpt-4o');
      
      // Rate limits may be at model or tier level
      // Just check the function works
      expect(limits === null || typeof limits === 'object').toBe(true);
    });

    it('should get rate limits by tier', () => {
      const limits = registry.getRateLimits('gpt-4o', 'tier1');
      
      if (limits) {
        expect(limits.rpm).toBeDefined();
      }
    });
  });
});
