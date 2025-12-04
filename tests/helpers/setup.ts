/**
 * Test setup and configuration
 */
import { vi } from 'vitest';

// Reset all mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
});

// Clean up after all tests
afterAll(() => {
  vi.restoreAllMocks();
});

/**
 * Helper to create a mock logger
 */
export function createMockLogger() {
  return {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  };
}

/**
 * Helper to create a mock metrics collector
 */
export function createMockMetrics() {
  return {
    increment: vi.fn(),
    timing: vi.fn(),
    gauge: vi.fn(),
  };
}

/**
 * Helper to check if API keys are available for E2E tests
 */
export function hasApiKey(provider: string): boolean {
  const keyMap: Record<string, string> = {
    openai: 'OPENAI_API_KEY',
    anthropic: 'ANTHROPIC_API_KEY',
    google: 'GEMINI_API_KEY',
    groq: 'GROQ_API_KEY',
    openrouter: 'OPENROUTER_API_KEY',
    voyage: 'VOYAGE_API_KEY',
    cohere: 'COHERE_API_KEY',
  };

  const envKey = keyMap[provider];
  return envKey ? !!process.env[envKey] : false;
}

/**
 * Skip test if API key is not available
 */
export function skipWithoutApiKey(provider: string) {
  if (!hasApiKey(provider)) {
    return it.skip;
  }
  return it;
}
