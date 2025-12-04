import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { EnvVault, VaultManager } from '../../../src/vault';
import type { VaultService } from '../../../src/types';

describe('EnvVault', () => {
  let vault: EnvVault;
  const originalEnv = process.env;

  beforeEach(() => {
    vault = new EnvVault();
    // Reset env for each test
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('getSecret', () => {
    it('should return environment variable value', async () => {
      process.env.TEST_API_KEY = 'secret-123';

      const value = await vault.getSecret('TEST_API_KEY');

      expect(value).toBe('secret-123');
    });

    it('should return empty string for missing variable', async () => {
      const value = await vault.getSecret('NONEXISTENT_KEY');

      expect(value).toBe('');
    });

    it('should return empty string for empty variable', async () => {
      process.env.EMPTY_KEY = '';

      const value = await vault.getSecret('EMPTY_KEY');

      expect(value).toBe('');
    });
  });

  describe('hasSecret', () => {
    it('should return true for existing variable', async () => {
      process.env.TEST_KEY = 'value';

      const exists = await vault.hasSecret('TEST_KEY');

      expect(exists).toBe(true);
    });

    it('should return true for empty variable', async () => {
      process.env.EMPTY_KEY = '';

      const exists = await vault.hasSecret('EMPTY_KEY');

      expect(exists).toBe(true);
    });

    it('should return false for missing variable', async () => {
      const exists = await vault.hasSecret('NONEXISTENT_KEY');

      expect(exists).toBe(false);
    });
  });

  describe('listSecrets', () => {
    it('should return all environment variable names', async () => {
      process.env.TEST_KEY_1 = 'value1';
      process.env.TEST_KEY_2 = 'value2';

      const secrets = await vault.listSecrets();

      expect(secrets).toContain('TEST_KEY_1');
      expect(secrets).toContain('TEST_KEY_2');
    });
  });
});

describe('VaultManager', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('basic operations', () => {
    it('should use EnvVault by default', async () => {
      process.env.TEST_KEY = 'test-value';
      const manager = new VaultManager();

      const value = await manager.getSecret('TEST_KEY');

      expect(value).toBe('test-value');
    });

    it('should use custom vault when provided', async () => {
      const customVault: VaultService = {
        getSecret: vi.fn().mockResolvedValue('custom-value'),
      };
      const manager = new VaultManager({ vault: customVault });

      const value = await manager.getSecret('any-key');

      expect(value).toBe('custom-value');
      expect(customVault.getSecret).toHaveBeenCalledWith('any-key');
    });
  });

  describe('key mappings', () => {
    it('should apply key mappings', async () => {
      process.env.OPENAI_API_KEY = 'sk-123';
      const manager = new VaultManager({
        keyMappings: {
          openai: 'OPENAI_API_KEY',
        },
      });

      const value = await manager.getSecret('openai');

      expect(value).toBe('sk-123');
    });

    it('should pass through unmapped keys', async () => {
      process.env.DIRECT_KEY = 'direct-value';
      const manager = new VaultManager({
        keyMappings: {
          openai: 'OPENAI_API_KEY',
        },
      });

      const value = await manager.getSecret('DIRECT_KEY');

      expect(value).toBe('direct-value');
    });

    it('should support addKeyMapping', async () => {
      process.env.NEW_KEY = 'new-value';
      const manager = new VaultManager();

      manager.addKeyMapping('alias', 'NEW_KEY');
      const value = await manager.getSecret('alias');

      expect(value).toBe('new-value');
    });
  });

  describe('key prefix', () => {
    it('should apply key prefix', async () => {
      process.env.SILKBOARD_OPENAI = 'prefixed-key';
      const manager = new VaultManager({
        keyPrefix: 'SILKBOARD_',
      });

      const value = await manager.getSecret('OPENAI');

      expect(value).toBe('prefixed-key');
    });

    it('should apply prefix after mapping', async () => {
      process.env.APP_OPENAI_KEY = 'mapped-prefixed';
      const manager = new VaultManager({
        keyPrefix: 'APP_',
        keyMappings: {
          openai: 'OPENAI_KEY',
        },
      });

      const value = await manager.getSecret('openai');

      expect(value).toBe('mapped-prefixed');
    });
  });

  describe('caching', () => {
    it('should cache secrets by default', async () => {
      const customVault: VaultService = {
        getSecret: vi.fn().mockResolvedValue('cached-value'),
      };
      const manager = new VaultManager({ vault: customVault });

      await manager.getSecret('key');
      await manager.getSecret('key');

      expect(customVault.getSecret).toHaveBeenCalledTimes(1);
    });

    it('should return fromCache metadata', async () => {
      process.env.TEST_KEY = 'value';
      const manager = new VaultManager();

      const first = await manager.getSecretWithMetadata('TEST_KEY');
      const second = await manager.getSecretWithMetadata('TEST_KEY');

      expect(first.fromCache).toBe(false);
      expect(second.fromCache).toBe(true);
    });

    it('should not cache when disabled', async () => {
      const customVault: VaultService = {
        getSecret: vi.fn().mockResolvedValue('value'),
      };
      const manager = new VaultManager({
        vault: customVault,
        cacheSecrets: false,
      });

      await manager.getSecret('key');
      await manager.getSecret('key');

      expect(customVault.getSecret).toHaveBeenCalledTimes(2);
    });

    it('should clear cache', async () => {
      const customVault: VaultService = {
        getSecret: vi.fn().mockResolvedValue('value'),
      };
      const manager = new VaultManager({ vault: customVault });

      await manager.getSecret('key');
      manager.clearCache();
      await manager.getSecret('key');

      expect(customVault.getSecret).toHaveBeenCalledTimes(2);
    });

    it('should invalidate specific cache entry', async () => {
      const customVault: VaultService = {
        getSecret: vi.fn().mockResolvedValue('value'),
      };
      const manager = new VaultManager({ vault: customVault });

      await manager.getSecret('key1');
      await manager.getSecret('key2');
      manager.invalidateCache('key1');
      await manager.getSecret('key1');
      await manager.getSecret('key2');

      // key1: 2 calls, key2: 1 call
      expect(customVault.getSecret).toHaveBeenCalledTimes(3);
    });

    it('should expire cache after TTL', async () => {
      vi.useFakeTimers();
      const customVault: VaultService = {
        getSecret: vi.fn().mockResolvedValue('value'),
      };
      const manager = new VaultManager({
        vault: customVault,
        cacheTtlMs: 1000, // 1 second
      });

      await manager.getSecret('key');
      vi.advanceTimersByTime(500);
      await manager.getSecret('key'); // Still cached
      vi.advanceTimersByTime(600); // Total 1100ms
      await manager.getSecret('key'); // Expired, refetch

      expect(customVault.getSecret).toHaveBeenCalledTimes(2);
      vi.useRealTimers();
    });
  });

  describe('hasSecret', () => {
    it('should check cache first', async () => {
      const customVault: VaultService = {
        getSecret: vi.fn().mockResolvedValue('value'),
        hasSecret: vi.fn().mockResolvedValue(true),
      };
      const manager = new VaultManager({ vault: customVault });

      await manager.getSecret('key'); // Populate cache
      const exists = await manager.hasSecret('key');

      expect(exists).toBe(true);
      expect(customVault.hasSecret).not.toHaveBeenCalled();
    });

    it('should use vault hasSecret if available', async () => {
      const customVault: VaultService = {
        getSecret: vi.fn().mockResolvedValue(''),
        hasSecret: vi.fn().mockResolvedValue(true),
      };
      const manager = new VaultManager({
        vault: customVault,
        cacheSecrets: false,
      });

      const exists = await manager.hasSecret('key');

      expect(exists).toBe(true);
      expect(customVault.hasSecret).toHaveBeenCalled();
    });

    it('should fallback to getSecret if hasSecret not available', async () => {
      const customVault: VaultService = {
        getSecret: vi.fn().mockResolvedValue('value'),
      };
      const manager = new VaultManager({
        vault: customVault,
        cacheSecrets: false,
      });

      const exists = await manager.hasSecret('key');

      expect(exists).toBe(true);
      expect(customVault.getSecret).toHaveBeenCalled();
    });
  });

  describe('rotateSecret', () => {
    it('should call underlying vault rotateSecret', async () => {
      const customVault: VaultService = {
        getSecret: vi.fn().mockResolvedValue('old-value'),
        rotateSecret: vi.fn().mockResolvedValue('new-value'),
      };
      const manager = new VaultManager({ vault: customVault });

      const newValue = await manager.rotateSecret('key');

      expect(newValue).toBe('new-value');
      expect(customVault.rotateSecret).toHaveBeenCalledWith('key');
    });

    it('should update cache after rotation', async () => {
      const customVault: VaultService = {
        getSecret: vi.fn().mockResolvedValue('old-value'),
        rotateSecret: vi.fn().mockResolvedValue('new-value'),
      };
      const manager = new VaultManager({ vault: customVault });

      await manager.getSecret('key'); // Cache old value
      await manager.rotateSecret('key');
      const value = await manager.getSecret('key');

      expect(value).toBe('new-value');
      expect(customVault.getSecret).toHaveBeenCalledTimes(1); // Only initial call
    });

    it('should throw if rotation not supported', async () => {
      const customVault: VaultService = {
        getSecret: vi.fn().mockResolvedValue('value'),
      };
      const manager = new VaultManager({ vault: customVault });

      await expect(manager.rotateSecret('key')).rejects.toThrow(
        'Secret rotation is not supported'
      );
    });
  });

  describe('getSecretWithMetadata', () => {
    it('should return resolved key name', async () => {
      process.env.OPENAI_API_KEY = 'key';
      const manager = new VaultManager({
        keyMappings: { openai: 'OPENAI_API_KEY' },
      });

      const result = await manager.getSecretWithMetadata('openai');

      expect(result.resolvedKey).toBe('OPENAI_API_KEY');
    });

    it('should include prefix in resolved key', async () => {
      process.env.APP_KEY = 'value';
      const manager = new VaultManager({
        keyPrefix: 'APP_',
      });

      const result = await manager.getSecretWithMetadata('KEY');

      expect(result.resolvedKey).toBe('APP_KEY');
    });
  });
});
