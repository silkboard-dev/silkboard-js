/**
 * Mock factories for testing
 */
import { vi } from 'vitest';
import type { ModelsConfigFile, RolesConfigFile, ModelConfig } from '../../src/types';

/**
 * Create a mock model configuration
 */
export function createMockModelConfig(overrides: Partial<ModelConfig> = {}): ModelConfig {
  return {
    provider: 'openai',
    model_id: 'gpt-4o',
    type: 'language',
    context_window: 128000,
    parameters: {
      temperature: 1.0,
    },
    pricing: {
      input: 2.50,
      output: 10.00,
    },
    ...overrides,
  };
}

/**
 * Create a mock models config file
 */
export function createMockModelsConfig(overrides: Partial<ModelsConfigFile> = {}): ModelsConfigFile {
  return {
    version: '1.0',
    models: {
      'gpt-4o': createMockModelConfig(),
      'claude-sonnet': createMockModelConfig({
        provider: 'anthropic',
        model_id: 'claude-sonnet-4-20250514',
        reasoning: {
          style: 'budget',
          min: 1024,
          max: 200000,
          default: 8000,
        },
      }),
      'text-embedding-3-large': createMockModelConfig({
        provider: 'openai',
        model_id: 'text-embedding-3-large',
        type: 'embedding',
        parameters: {
          dimensions: 3072,
        },
      }),
    },
    ...overrides,
  };
}

/**
 * Create a mock roles config file
 */
export function createMockRolesConfig(overrides: Partial<RolesConfigFile> = {}): RolesConfigFile {
  return {
    version: '1.0',
    roles: {
      query: {
        model: 'gpt-4o',
      },
      answer: {
        fast: { model: 'gpt-4o' },
        balanced: { model: 'claude-sonnet' },
        accurate: { 
          model: 'claude-sonnet',
          overrides: {
            reasoning: { budget: 16000 },
          },
        },
      },
      embedding: {
        primary: 'text-embedding-3-large',
      },
    },
    ...overrides,
  };
}

/**
 * Create a mock AI SDK language model
 */
export function createMockLanguageModel() {
  return {
    modelId: 'mock-model',
    provider: 'mock-provider',
    specificationVersion: 'v1',
    doGenerate: vi.fn(),
    doStream: vi.fn(),
  };
}

/**
 * Create a mock stream response
 */
export function createMockStreamResponse(text: string) {
  const encoder = new TextEncoder();
  const chunks = text.split(' ').map(word => word + ' ');
  
  let index = 0;
  return new ReadableStream({
    pull(controller) {
      if (index < chunks.length) {
        controller.enqueue(encoder.encode(chunks[index]));
        index++;
      } else {
        controller.close();
      }
    },
  });
}

/**
 * Create mock usage data
 */
export function createMockUsage(overrides: Partial<{
  inputTokens: number;
  outputTokens: number;
  cachedTokens: number;
  reasoningTokens: number;
}> = {}) {
  return {
    inputTokens: 100,
    outputTokens: 50,
    cachedTokens: 0,
    reasoningTokens: 0,
    ...overrides,
  };
}
