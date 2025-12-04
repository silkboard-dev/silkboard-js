/**
 * Unit tests for OpenAI reasoning configuration builder
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { buildOpenAIProviderOptions } from '../../../src/reasoning/openai';

describe('OpenAI Reasoning', () => {
  describe('buildOpenAIProviderOptions', () => {
    beforeEach(() => {
      vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should use default effort when config has default but no override', () => {
      const config = {
        style: 'effort' as const,
        values: ['low', 'medium', 'high'] as ('low' | 'medium' | 'high')[],
        default: 'medium' as const,
      };

      const result = buildOpenAIProviderOptions(config, undefined);

      expect(result).toEqual({
        openai: {
          reasoningEffort: 'medium',
          reasoningSummary: 'auto',
        },
      });
    });

    it('should use override effort when provided', () => {
      const config = {
        style: 'effort' as const,
        values: ['low', 'medium', 'high'] as ('low' | 'medium' | 'high')[],
        default: 'medium' as const,
      };
      const override = { effort: 'high' as const };

      const result = buildOpenAIProviderOptions(config, override);

      expect(result).toEqual({
        openai: {
          reasoningEffort: 'high',
          reasoningSummary: 'auto',
        },
      });
    });

    it('should validate effort value against allowed values and fallback to default', () => {
      const config = {
        style: 'effort' as const,
        values: ['low', 'medium', 'high'] as ('low' | 'medium' | 'high')[],
        default: 'medium' as const,
      };
      const override = { effort: 'invalid' as any };

      // Should fall back to default when invalid
      const result = buildOpenAIProviderOptions(config, override);

      expect(result.openai.reasoningEffort).toBe('medium');
      expect(console.warn).toHaveBeenCalledWith(
        '[Silkboard] Invalid reasoning effort \'invalid\', using default \'medium\''
      );
    });

    it('should use low effort when specified', () => {
      const config = {
        style: 'effort' as const,
        values: ['low', 'medium', 'high'] as ('low' | 'medium' | 'high')[],
        default: 'medium' as const,
      };
      const override = { effort: 'low' as const };

      const result = buildOpenAIProviderOptions(config, override);

      expect(result).toEqual({
        openai: {
          reasoningEffort: 'low',
          reasoningSummary: 'auto',
        },
      });
    });
  });
});
