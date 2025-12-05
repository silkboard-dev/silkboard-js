import { describe, it, expect } from 'vitest';
import { mapReasoningToProviderOptions, type ReasoningMapperConfig } from '../../../src/reasoning/mapper';

describe('mapReasoningToProviderOptions', () => {
  describe('OpenAI', () => {
    it('should map effort-based reasoning', () => {
      const config: ReasoningMapperConfig = {
        reasoning: { style: 'effort', values: ['low', 'medium', 'high'], default: 'medium' },
        defaultEffort: 'medium',
      };

      const result = mapReasoningToProviderOptions('openai', config, { effort: 'high' });

      expect(result.providerOptions).toEqual({
        openai: {
          reasoningEffort: 'high',
          reasoningSummary: 'auto',
        },
      });
    });

    it('should use default effort when no override', () => {
      const config: ReasoningMapperConfig = {
        reasoning: { style: 'effort', values: ['low', 'medium', 'high'], default: 'low' },
        defaultEffort: 'low',
      };

      const result = mapReasoningToProviderOptions('openai', config);
      const openaiOpts = (result.providerOptions as Record<string, any>)?.openai;

      expect(openaiOpts?.reasoningEffort).toBe('low');
    });

    it('should include summary when specified', () => {
      const config: ReasoningMapperConfig = {
        reasoning: { style: 'effort', values: ['low', 'medium', 'high'], default: 'medium' },
        defaultEffort: 'medium',
      };

      const result = mapReasoningToProviderOptions('openai', config, { summary: 'detailed' });
      const openaiOpts = (result.providerOptions as Record<string, any>)?.openai;

      expect(openaiOpts?.reasoningSummary).toBe('detailed');
    });
  });

  describe('Anthropic', () => {
    it('should map budget-based reasoning', () => {
      const config: ReasoningMapperConfig = {
        reasoning: { style: 'budget', min: 1024, max: 128000, default: 16000 },
        defaultBudget: 16000,
      };

      const result = mapReasoningToProviderOptions('anthropic', config, { budget: 32000 });

      expect(result.providerOptions).toEqual({
        anthropic: {
          thinking: {
            type: 'enabled',
            budgetTokens: 32000,
          },
        },
      });
    });

    it('should use default budget when no override', () => {
      const config: ReasoningMapperConfig = {
        reasoning: { style: 'budget', min: 1024, max: 128000, default: 16000 },
        defaultBudget: 16000,
      };

      const result = mapReasoningToProviderOptions('anthropic', config);
      const anthropicOpts = (result.providerOptions as Record<string, any>)?.anthropic;

      expect(anthropicOpts?.thinking?.budgetTokens).toBe(16000);
    });

    it('should return empty when budget is 0', () => {
      const config: ReasoningMapperConfig = {
        reasoning: { style: 'budget', min: 1024, max: 128000, default: 0 },
        defaultBudget: 0,
      };

      const result = mapReasoningToProviderOptions('anthropic', config);

      expect(result.providerOptions).toBeUndefined();
    });
  });

  describe('Google', () => {
    it('should map level-based reasoning for Gemini 3+', () => {
      const config: ReasoningMapperConfig = {
        reasoning: { style: 'level', values: ['low', 'medium', 'high'], default: 'medium' },
        defaultLevel: 'medium',
      };

      const result = mapReasoningToProviderOptions('google', config, { level: 'high' });

      expect(result.providerOptions).toEqual({
        google: {
          thinkingConfig: {
            thinkingLevel: 'high',
          },
        },
      });
    });

    it('should map budget-based reasoning for Gemini 2.5', () => {
      const config: ReasoningMapperConfig = {
        reasoning: { style: 'budget', min: 0, max: 32768, default: 8192 },
        defaultBudget: 8192,
      };

      const result = mapReasoningToProviderOptions('google', config, { budget: 16000 });

      expect(result.providerOptions).toEqual({
        google: {
          thinkingConfig: {
            thinkingBudget: 16000,
          },
        },
      });
    });

    it('should include includeThoughts when specified', () => {
      const config: ReasoningMapperConfig = {
        reasoning: { style: 'level', values: ['low', 'medium', 'high'], default: 'medium' },
        defaultLevel: 'medium',
      };

      const result = mapReasoningToProviderOptions('google', config, { includeThoughts: true });
      const googleOpts = (result.providerOptions as Record<string, any>)?.google;

      expect(googleOpts?.thinkingConfig?.includeThoughts).toBe(true);
    });
  });

  describe('DeepSeek', () => {
    it('should map toggle-based reasoning', () => {
      const config: ReasoningMapperConfig = {
        reasoning: { style: 'toggle', default: true },
        defaultEnabled: true,
      };

      const result = mapReasoningToProviderOptions('deepseek', config, { enabled: true });

      expect(result.providerOptions).toEqual({
        deepseek: {
          thinking: {
            type: 'enabled',
          },
        },
      });
    });

    it('should disable reasoning when enabled is false', () => {
      const config: ReasoningMapperConfig = {
        reasoning: { style: 'toggle', default: true },
        defaultEnabled: true,
      };

      const result = mapReasoningToProviderOptions('deepseek', config, { enabled: false });

      // When explicitly disabled, should return empty
      expect(result).toEqual({});
    });
  });

  describe('Cohere', () => {
    it('should map toggle + budget reasoning', () => {
      const config: ReasoningMapperConfig = {
        reasoning: { style: 'toggle_budget', default: true, defaultBudget: 8000 },
        defaultEnabled: true,
        defaultBudget: 8000,
      };

      const result = mapReasoningToProviderOptions('cohere', config, { enabled: true, budget: 16000 });

      expect(result.providerOptions).toEqual({
        cohere: {
          thinking: {
            type: 'enabled',
            tokenBudget: 16000,
          },
        },
      });
    });
  });

  describe('xAI', () => {
    it('should map effort-based reasoning (low/high only)', () => {
      const config: ReasoningMapperConfig = {
        reasoning: { style: 'effort', values: ['low', 'high'], default: 'high' },
        defaultEffort: 'high',
      };

      const result = mapReasoningToProviderOptions('xai', config, { effort: 'low' });

      expect(result.providerOptions).toEqual({
        xai: {
          reasoningEffort: 'low',
        },
      });
    });

    it('should map medium to high for xAI', () => {
      const config: ReasoningMapperConfig = {
        reasoning: { style: 'effort', values: ['low', 'high'], default: 'high' },
        defaultEffort: 'medium',
      };

      const result = mapReasoningToProviderOptions('xai', config);
      const xaiOpts = (result.providerOptions as Record<string, any>)?.xai;

      expect(xaiOpts?.reasoningEffort).toBe('high');
    });
  });

  describe('Groq', () => {
    it('should map effort + format reasoning', () => {
      const config: ReasoningMapperConfig = {
        reasoning: { style: 'effort', values: ['low', 'medium', 'high'], default: 'medium' },
        defaultEffort: 'medium',
      };

      const result = mapReasoningToProviderOptions('groq', config, { effort: 'high', outputFormat: 'raw' });

      expect(result.providerOptions).toEqual({
        groq: {
          reasoningEffort: 'high',
          reasoningFormat: 'raw',
        },
      });
    });
  });

  describe('Alibaba', () => {
    it('should map hybrid reasoning (enable_thinking + thinking_budget)', () => {
      const config: ReasoningMapperConfig = {
        reasoning: { style: 'hybrid', default: true, defaultBudget: 4096 },
        defaultEnabled: true,
        defaultBudget: 4096,
      };

      const result = mapReasoningToProviderOptions('alibaba', config, { enabled: true, budget: 8000 });

      expect(result.extraBody).toEqual({
        enable_thinking: true,
        thinking_budget: 8000,
      });
    });
  });

  describe('Minimax', () => {
    it('should map interleaved reasoning', () => {
      const config: ReasoningMapperConfig = {
        reasoning: { style: 'interleaved', default: true },
        defaultEnabled: true,
      };

      const result = mapReasoningToProviderOptions('minimax', config, { outputFormat: 'interleaved' });

      expect(result.extraBody).toEqual({
        reasoning_split: true,
      });
    });

    it('should set reasoning_split to false for parsed format', () => {
      const config: ReasoningMapperConfig = {
        reasoning: { style: 'interleaved', default: true },
        defaultEnabled: true,
      };

      const result = mapReasoningToProviderOptions('minimax', config, { outputFormat: 'parsed' });

      expect(result.extraBody).toEqual({
        reasoning_split: false,
      });
    });
  });

  describe('Moonshot', () => {
    it('should map toggle-based reasoning', () => {
      const config: ReasoningMapperConfig = {
        reasoning: { style: 'toggle', default: true },
        defaultEnabled: true,
      };

      const result = mapReasoningToProviderOptions('moonshot', config, { enabled: true });

      expect(result.extraBody).toEqual({
        use_reasoning: true,
      });
    });
  });

  describe('Mistral', () => {
    it('should map transparent reasoning via prompt_mode', () => {
      const config: ReasoningMapperConfig = {
        reasoning: { style: 'transparent', default: true },
        defaultEnabled: true,
      };

      const result = mapReasoningToProviderOptions('mistral', config, { enabled: true });

      expect(result.extraBody).toEqual({
        prompt_mode: 'reasoning',
      });
    });

    it('should set prompt_mode to default when disabled', () => {
      const config: ReasoningMapperConfig = {
        reasoning: { style: 'transparent', default: false },
        defaultEnabled: false,
      };

      const result = mapReasoningToProviderOptions('mistral', config);

      expect(result.extraBody).toEqual({
        prompt_mode: 'default',
      });
    });
  });

  describe('OpenRouter', () => {
    it('should map effort-based reasoning', () => {
      const config: ReasoningMapperConfig = {
        reasoning: { style: 'effort', values: ['low', 'medium', 'high'], default: 'medium' },
        defaultEffort: 'medium',
      };

      const result = mapReasoningToProviderOptions('openrouter', config, { effort: 'high' });

      expect(result.extraBody).toEqual({
        reasoning: {
          effort: 'high',
        },
      });
    });

    it('should map budget-based reasoning', () => {
      const config: ReasoningMapperConfig = {
        reasoning: { style: 'budget', min: 1024, max: 128000, default: 16000 },
        defaultBudget: 16000,
      };

      const result = mapReasoningToProviderOptions('openrouter', config, { budget: 32000 });

      expect(result.extraBody).toEqual({
        reasoning: {
          max_tokens: 32000,
        },
      });
    });
  });

  describe('Edge cases', () => {
    it('should return empty for no reasoning config', () => {
      const result = mapReasoningToProviderOptions('openai', {});

      expect(result).toEqual({});
    });

    it('should return empty for none style', () => {
      const config: ReasoningMapperConfig = {
        reasoning: { style: 'none' },
      };

      const result = mapReasoningToProviderOptions('openai', config);

      expect(result).toEqual({});
    });

    it('should return empty for unknown provider', () => {
      const config: ReasoningMapperConfig = {
        reasoning: { style: 'effort', values: ['low', 'medium', 'high'], default: 'medium' },
        defaultEffort: 'medium',
      };

      const result = mapReasoningToProviderOptions('unknown-provider', config);

      expect(result).toEqual({});
    });

    it('should return empty when user explicitly disables reasoning', () => {
      const config: ReasoningMapperConfig = {
        reasoning: { style: 'effort', values: ['low', 'medium', 'high'], default: 'medium' },
        defaultEffort: 'medium',
      };

      const result = mapReasoningToProviderOptions('openai', config, { enabled: false });

      expect(result).toEqual({});
    });
  });
});
