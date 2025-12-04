/**
 * Unit tests for Anthropic reasoning configuration builder
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { buildAnthropicProviderOptions } from '../../../src/reasoning/anthropic';

describe('Anthropic Reasoning', () => {
  describe('buildAnthropicProviderOptions', () => {
    beforeEach(() => {
      vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should use default budget when config has default but no override', () => {
      const config = {
        style: 'budget' as const,
        min: 1024,
        max: 200000,
        default: 8000,
        can_disable: true,
      };

      const result = buildAnthropicProviderOptions(config, 16000, undefined);

      expect(result).toEqual({
        anthropic: {
          thinking: {
            type: 'enabled',
            budgetTokens: 8000,
          },
        },
      });
    });

    it('should use override budget when provided', () => {
      const config = {
        style: 'budget' as const,
        min: 1024,
        max: 200000,
        default: 8000,
        can_disable: true,
      };
      const override = { budget: 16000 };

      const result = buildAnthropicProviderOptions(config, 32000, override);

      expect(result).toEqual({
        anthropic: {
          thinking: {
            type: 'enabled',
            budgetTokens: 16000,
          },
        },
      });
    });

    it('should clamp budget to minimum value', () => {
      const config = {
        style: 'budget' as const,
        min: 1024,
        max: 200000,
        default: 8000,
        can_disable: true,
      };
      const override = { budget: 500 }; // Below minimum

      const result = buildAnthropicProviderOptions(config, 16000, override);

      expect(result.anthropic.thinking.budgetTokens).toBe(1024);
      expect(console.warn).toHaveBeenCalledWith(
        '[Silkboard] Anthropic thinking budget clamped from 500 to 1024 (min: 1024, max: 200000, max_tokens: 16000)'
      );
    });

    it('should clamp budget to maximum value', () => {
      const config = {
        style: 'budget' as const,
        min: 1024,
        max: 200000,
        default: 8000,
        can_disable: true,
      };
      const override = { budget: 300000 }; // Above maximum

      const result = buildAnthropicProviderOptions(config, 250000, override);

      expect(result.anthropic.thinking.budgetTokens).toBe(200000);
      expect(console.warn).toHaveBeenCalledWith(
        '[Silkboard] Anthropic thinking budget clamped from 300000 to 200000 (min: 1024, max: 200000, max_tokens: 250000)'
      );
    });

    it('should clamp budget to max_tokens - 1', () => {
      const config = {
        style: 'budget' as const,
        min: 1024,
        max: 200000,
        default: 8000,
        can_disable: true,
      };
      const override = { budget: 50000 };
      const maxTokens = 16000; // budget must be < maxTokens

      const result = buildAnthropicProviderOptions(config, maxTokens, override);

      // Budget should be clamped to maxTokens - 1
      expect(result.anthropic.thinking.budgetTokens).toBe(15999);
    });

    it('should disable thinking when budget is 0 and can_disable is true', () => {
      const config = {
        style: 'budget' as const,
        min: 1024,
        max: 200000,
        default: 8000,
        can_disable: true,
      };
      const override = { budget: 0 };

      const result = buildAnthropicProviderOptions(config, 16000, override);

      expect(result).toEqual({
        anthropic: {
          thinking: {
            type: 'disabled',
          },
        },
      });
    });

    it('should handle dynamic thinking with budget -1', () => {
      const config = {
        style: 'budget' as const,
        min: 1024,
        max: 200000,
        default: 8000,
        can_disable: true,
      };
      const override = { budget: -1 };
      const maxTokens = 32000;

      const result = buildAnthropicProviderOptions(config, maxTokens, override);

      // Dynamic budget should be 25% of maxTokens, capped at 32K
      expect(result.anthropic.thinking.type).toBe('enabled');
      expect(result.anthropic.thinking.budgetTokens).toBe(8000); // 25% of 32000
    });
  });
});
