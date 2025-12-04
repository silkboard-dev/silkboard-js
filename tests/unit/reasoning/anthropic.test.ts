/**
 * Unit tests for Anthropic reasoning configuration builder
 */
import { describe, it, expect } from 'vitest';
import { buildAnthropicReasoningConfig } from '../../../src/reasoning/anthropic';

describe('Anthropic Reasoning', () => {
  describe('buildAnthropicReasoningConfig', () => {
    it('should return empty config when no reasoning config provided', () => {
      const result = buildAnthropicReasoningConfig(undefined, undefined);
      
      expect(result).toEqual({});
    });

    it('should use default budget when config has default but no override', () => {
      const config = {
        style: 'budget' as const,
        min: 1024,
        max: 200000,
        default: 8000,
      };
      
      const result = buildAnthropicReasoningConfig(config, undefined);
      
      expect(result).toEqual({
        thinking: {
          type: 'enabled',
          budgetTokens: 8000,
        },
      });
    });

    it('should use override budget when provided', () => {
      const config = {
        style: 'budget' as const,
        min: 1024,
        max: 200000,
        default: 8000,
      };
      const override = { budget: 16000 };
      
      const result = buildAnthropicReasoningConfig(config, override);
      
      expect(result).toEqual({
        thinking: {
          type: 'enabled',
          budgetTokens: 16000,
        },
      });
    });

    it('should clamp budget to minimum value', () => {
      const config = {
        style: 'budget' as const,
        min: 1024,
        max: 200000,
        default: 8000,
      };
      const override = { budget: 500 }; // Below minimum
      
      const result = buildAnthropicReasoningConfig(config, override);
      
      expect(result.thinking?.budgetTokens).toBe(1024);
    });

    it('should clamp budget to maximum value', () => {
      const config = {
        style: 'budget' as const,
        min: 1024,
        max: 200000,
        default: 8000,
      };
      const override = { budget: 300000 }; // Above maximum
      
      const result = buildAnthropicReasoningConfig(config, override);
      
      expect(result.thinking?.budgetTokens).toBe(200000);
    });

    it('should disable thinking when budget is 0', () => {
      const config = {
        style: 'budget' as const,
        min: 0,
        max: 200000,
        default: 8000,
      };
      const override = { budget: 0 };
      
      const result = buildAnthropicReasoningConfig(config, override);
      
      // Either no thinking object or type: 'disabled'
      expect(
        result.thinking === undefined || 
        result.thinking.type === 'disabled' ||
        result.thinking.budgetTokens === 0
      ).toBe(true);
    });
  });
});
