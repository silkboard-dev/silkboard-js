/**
 * Unit tests for Google reasoning configuration builder
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { buildGoogleProviderOptions } from '../../../src/reasoning/google';

describe('Google Reasoning', () => {
  describe('buildGoogleProviderOptions', () => {
    beforeEach(() => {
      vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should return empty config when no reasoning config provided', () => {
      const result = buildGoogleProviderOptions(undefined, undefined);
      
      expect(result).toEqual({});
    });

    describe('Level-based reasoning', () => {
      it('should use default level when no override provided', () => {
        const config = {
          style: 'level' as const,
          values: ['low', 'high'] as ['low', 'high'],
          default: 'low' as const,
        };
        
        const result = buildGoogleProviderOptions(config, undefined);
        
        expect(result).toEqual({
          google: {
            thinkingConfig: {
              thinkingLevel: 'low',
            },
          },
        });
      });

      it('should use override level when provided', () => {
        const config = {
          style: 'level' as const,
          values: ['low', 'high'] as ['low', 'high'],
          default: 'low' as const,
        };
        
        const result = buildGoogleProviderOptions(config, { level: 'high' });
        
        expect(result).toEqual({
          google: {
            thinkingConfig: {
              thinkingLevel: 'high',
            },
          },
        });
      });

      it('should fall back to default when override level is invalid', () => {
        const config = {
          style: 'level' as const,
          values: ['low', 'high'] as ['low', 'high'],
          default: 'low' as const,
        };
        
        const result = buildGoogleProviderOptions(config, { level: 'invalid' as any });
        
        expect(result).toEqual({
          google: {
            thinkingConfig: {
              thinkingLevel: 'low',
            },
          },
        });
        
        expect(console.warn).toHaveBeenCalledWith(
          '[Silkboard] Invalid thinking level \'invalid\', using default \'low\''
        );
      });
    });

    describe('Budget-based reasoning', () => {
      it('should use default budget when no override provided', () => {
        const config = {
          style: 'budget' as const,
          min: 1024,
          max: 32768,
          default: 8192,
          can_disable: true,
        };
        
        const result = buildGoogleProviderOptions(config, undefined);
        
        expect(result).toEqual({
          google: {
            thinkingConfig: {
              thinkingBudget: 8192,
            },
          },
        });
      });

      it('should use override budget when provided', () => {
        const config = {
          style: 'budget' as const,
          min: 1024,
          max: 32768,
          default: 8192,
          can_disable: true,
        };
        
        const result = buildGoogleProviderOptions(config, { budget: 16384 });
        
        expect(result).toEqual({
          google: {
            thinkingConfig: {
              thinkingBudget: 16384,
            },
          },
        });
      });

      it('should clamp budget to maximum when override exceeds max', () => {
        const config = {
          style: 'budget' as const,
          min: 1024,
          max: 32768,
          default: 8192,
          can_disable: true,
        };
        
        const result = buildGoogleProviderOptions(config, { budget: 50000 });
        
        expect(result).toEqual({
          google: {
            thinkingConfig: {
              thinkingBudget: 32768,
            },
          },
        });
        
        expect(console.warn).toHaveBeenCalledWith(
          '[Silkboard] Google thinking budget clamped from 50000 to 32768 (min: 1024, max: 32768)'
        );
      });

      it('should clamp budget to minimum when override is below min', () => {
        const config = {
          style: 'budget' as const,
          min: 1024,
          max: 32768,
          default: 8192,
          can_disable: true,
        };
        
        const result = buildGoogleProviderOptions(config, { budget: 512 });
        
        expect(result).toEqual({
          google: {
            thinkingConfig: {
              thinkingBudget: 1024,
            },
          },
        });
        
        expect(console.warn).toHaveBeenCalledWith(
          '[Silkboard] Google thinking budget clamped from 512 to 1024 (min: 1024, max: 32768)'
        );
      });

      it('should allow zero budget when can_disable is true', () => {
        const config = {
          style: 'budget' as const,
          min: 1024,
          max: 32768,
          default: 8192,
          can_disable: true,
        };
        
        const result = buildGoogleProviderOptions(config, { budget: 0 });
        
        expect(result).toEqual({
          google: {
            thinkingConfig: {
              thinkingBudget: 0,
            },
          },
        });
      });

      it('should handle dynamic thinking with budget -1', () => {
        const config = {
          style: 'budget' as const,
          min: 1024,
          max: 32768,
          default: 8192,
          can_disable: true,
        };
        
        const result = buildGoogleProviderOptions(config, { budget: -1 });
        
        expect(result).toEqual({
          google: {
            thinkingConfig: {
              thinkingBudget: -1,
            },
          },
        });
      });
    });
  });
});
