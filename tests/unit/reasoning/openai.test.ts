/**
 * Unit tests for OpenAI reasoning configuration builder
 */
import { describe, it, expect } from 'vitest';
import { buildOpenAIReasoningConfig } from '../../../src/reasoning/openai';

describe('OpenAI Reasoning', () => {
  describe('buildOpenAIReasoningConfig', () => {
    it('should return empty config when no reasoning config provided', () => {
      const result = buildOpenAIReasoningConfig(undefined, undefined);
      
      expect(result).toEqual({});
    });

    it('should use default effort when config has default but no override', () => {
      const config = {
        style: 'effort' as const,
        values: ['low', 'medium', 'high'],
        default: 'medium',
      };
      
      const result = buildOpenAIReasoningConfig(config, undefined);
      
      expect(result).toEqual({
        reasoningEffort: 'medium',
      });
    });

    it('should use override effort when provided', () => {
      const config = {
        style: 'effort' as const,
        values: ['low', 'medium', 'high'],
        default: 'medium',
      };
      const override = { effort: 'high' as const };
      
      const result = buildOpenAIReasoningConfig(config, override);
      
      expect(result).toEqual({
        reasoningEffort: 'high',
      });
    });

    it('should validate effort value against allowed values', () => {
      const config = {
        style: 'effort' as const,
        values: ['low', 'medium', 'high'],
        default: 'medium',
      };
      const override = { effort: 'invalid' as any };
      
      // Should fall back to default when invalid
      const result = buildOpenAIReasoningConfig(config, override);
      
      expect(result.reasoningEffort).toBe('medium');
    });

    it('should handle missing default gracefully', () => {
      const config = {
        style: 'effort' as const,
        values: ['low', 'medium', 'high'],
      };
      
      const result = buildOpenAIReasoningConfig(config, undefined);
      
      // Should return empty or first valid value
      expect(result).toBeDefined();
    });
  });
});
