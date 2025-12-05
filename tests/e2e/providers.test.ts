/**
 * E2E Tests for Provider Integration
 * 
 * These tests make real API calls to various providers.
 * Run with: npm run test:e2e
 * 
 * Required environment variables:
 * - OPENAI_API_KEY
 * - ANTHROPIC_API_KEY
 * - GEMINI_API_KEY
 * - GROQ_API_KEY (optional)
 * - XAI_API_KEY (optional)
 * - VOYAGE_API_KEY (optional)
 * - COHERE_API_KEY (optional)
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Silkboard } from '../../src/service';
import type { ModelsConfigFile, RolesConfigFile, UsageEvent, StartEvent, CompleteEvent } from '../../src/types';

// Skip all tests if no API keys are available
const hasOpenAI = !!process.env.OPENAI_API_KEY;
const hasAnthropic = !!process.env.ANTHROPIC_API_KEY;
const hasGoogle = !!process.env.GEMINI_API_KEY;
const hasGroq = !!process.env.GROQ_API_KEY;
const hasXAI = !!process.env.XAI_API_KEY;
const hasVoyage = !!process.env.VOYAGE_API_KEY;
const hasCohere = !!process.env.COHERE_API_KEY;

// Test configuration
const modelsConfig: ModelsConfigFile = {
  version: '1.0',
  models: {
    // OpenAI models
    'gpt-4o-mini': {
      provider: 'openai',
      model_id: 'gpt-4o-mini',
      type: 'language',
      pricing: { input: 0.15, output: 0.60 },
    },
    'gpt-4o': {
      provider: 'openai',
      model_id: 'gpt-4o',
      type: 'language',
      reasoning: {
        style: 'effort',
        values: ['low', 'medium', 'high'],
        default: 'medium',
      },
      pricing: { input: 2.50, output: 10.00 },
    },
    'text-embedding-3-small': {
      provider: 'openai',
      model_id: 'text-embedding-3-small',
      type: 'embedding',
      parameters: { dimensions: 1536 },
      pricing: { input: 0.02 },
    },
    
    // Anthropic models
    'claude-sonnet-4': {
      provider: 'anthropic',
      model_id: 'claude-sonnet-4-20250514',
      type: 'language',
      reasoning: {
        style: 'budget',
        min: 1024,
        max: 128000,
        default: 8000,
      },
      caching: { style: 'manual' },
      pricing: { input: 3.00, output: 15.00 },
    },
    
    // Google models
    'gemini-2.0-flash': {
      provider: 'google',
      model_id: 'gemini-2.0-flash-exp',
      type: 'language',
      pricing: { input: 0.075, output: 0.30 },
    },
    'gemini-2.5-flash': {
      provider: 'google',
      model_id: 'gemini-2.5-flash-preview-05-20',
      type: 'language',
      reasoning: {
        style: 'budget',
        min: 0,
        max: 24576,
        default: 8192,
      },
      pricing: { input: 0.15, output: 0.60, reasoning: 0.70 },
    },
    
    // Groq models
    'llama-3.3-70b-groq': {
      provider: 'groq',
      model_id: 'llama-3.3-70b-versatile',
      type: 'language',
      pricing: { input: 0.59, output: 0.79 },
    },
    
    // xAI models
    'grok-3-mini': {
      provider: 'xai',
      model_id: 'grok-3-mini-beta',
      type: 'language',
      reasoning: {
        style: 'effort',
        values: ['low', 'high'],
        default: 'low',
      },
      pricing: { input: 0.30, output: 0.50 },
    },
    
    // Voyage models
    'voyage-3-lite': {
      provider: 'voyage',
      model_id: 'voyage-3-lite',
      type: 'embedding',
      parameters: { dimensions: 512 },
      pricing: { input: 0.02 },
    },
    'rerank-2': {
      provider: 'voyage',
      model_id: 'rerank-2',
      type: 'reranker',
      pricing: { input: 0, per_search: 0.05 },
    },
    
    // Cohere models
    'rerank-v3': {
      provider: 'cohere',
      model_id: 'rerank-v3.5',
      type: 'reranker',
      pricing: { input: 0, per_search: 0.002 },
    },
  },
};

const rolesConfig: RolesConfigFile = {
  version: '1.0',
  roles: {
    'quick-answer': {
      model: 'gpt-4o-mini',
    },
    'deep-answer': {
      fast: { model: 'gpt-4o-mini' },
      balanced: { model: 'claude-sonnet-4' },
      accurate: { 
        model: 'claude-sonnet-4',
        overrides: { reasoning: { budget: 16000 } },
      },
    },
    'embedding': {
      model: 'text-embedding-3-small',
    },
    'reranker': {
      primary: 'rerank-2',
      fallback: 'rerank-v3',
    },
  },
};

describe('E2E: Provider Integration', () => {
  let silk: Silkboard;
  const events: { usage: UsageEvent[]; start: StartEvent[]; complete: CompleteEvent[] } = {
    usage: [],
    start: [],
    complete: [],
  };

  beforeAll(() => {
    silk = new Silkboard({
      modelsConfig,
      rolesConfig,
    });

    // Collect events
    silk.on('usage', (e) => events.usage.push(e));
    silk.on('start', (e) => events.start.push(e));
    silk.on('complete', (e) => events.complete.push(e));
  });

  afterAll(() => {
    // Log usage summary
    const usage = silk.getUsage();
    console.log('\n📊 E2E Test Usage Summary:');
    console.log(`   Total Cost: $${usage.totalCost.toFixed(4)}`);
    console.log(`   Total Input Tokens: ${usage.totalInputTokens}`);
    console.log(`   Total Output Tokens: ${usage.totalOutputTokens}`);
    console.log(`   By Model:`, usage.byModel);
  });

  describe('OpenAI', () => {
    it.skipIf(!hasOpenAI)('should generate text with gpt-4o-mini', async () => {
      const result = await silk.generateText({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: 'Say "Hello, E2E test!" and nothing else.' }],
      });

      expect(result.text).toContain('Hello');
      expect(result.usage).toBeDefined();
    });

    it.skipIf(!hasOpenAI)('should stream text with gpt-4o-mini', async () => {
      const result = await silk.streamText({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: 'Count from 1 to 5, one number per line.' }],
      });

      let text = '';
      for await (const chunk of result.textStream) {
        text += chunk;
      }

      expect(text).toContain('1');
      expect(text).toContain('5');
    });

    it.skipIf(!hasOpenAI)('should generate embeddings', async () => {
      const result = await silk.embed({
        model: 'text-embedding-3-small',
        value: 'Hello, world!',
      });

      expect(result.embedding).toHaveLength(1536);
      expect(result.embeddings).toHaveLength(1);
    });

    it.skipIf(!hasOpenAI)('should generate batch embeddings', async () => {
      const result = await silk.embed({
        model: 'text-embedding-3-small',
        value: ['Hello', 'World', 'Test'],
      });

      expect(result.embeddings).toHaveLength(3);
      expect(result.embedding).toHaveLength(1536);
    });

    it.skipIf(!hasOpenAI)('should use reasoning effort with gpt-4o', async () => {
      const result = await silk.generateText({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: 'What is 2+2? Answer with just the number.' }],
        reasoning: { effort: 'low' },
      });

      expect(result.text).toContain('4');
    });
  });

  describe('Anthropic', () => {
    it.skipIf(!hasAnthropic)('should generate text with claude-sonnet-4', async () => {
      const result = await silk.generateText({
        model: 'claude-sonnet-4',
        messages: [{ role: 'user', content: 'Say "Hello from Claude!" and nothing else.' }],
      });

      expect(result.text).toContain('Hello');
    });

    it.skipIf(!hasAnthropic)('should stream text with claude-sonnet-4', async () => {
      const result = await silk.streamText({
        model: 'claude-sonnet-4',
        messages: [{ role: 'user', content: 'List 3 colors, one per line.' }],
      });

      let text = '';
      for await (const chunk of result.textStream) {
        text += chunk;
      }

      expect(text.length).toBeGreaterThan(0);
    });

    it.skipIf(!hasAnthropic)('should use extended thinking with budget', async () => {
      const result = await silk.generateText({
        model: 'claude-sonnet-4',
        messages: [{ role: 'user', content: 'What is the capital of France? Answer briefly.' }],
        reasoning: { budget: 2000 },
      });

      expect(result.text.toLowerCase()).toContain('paris');
    });
  });

  describe('Google Gemini', () => {
    it.skipIf(!hasGoogle)('should generate text with gemini-2.0-flash', async () => {
      const result = await silk.generateText({
        model: 'gemini-2.0-flash',
        messages: [{ role: 'user', content: 'Say "Hello from Gemini!" and nothing else.' }],
      });

      expect(result.text).toContain('Hello');
    });

    it.skipIf(!hasGoogle)('should stream text with gemini-2.0-flash', async () => {
      const result = await silk.streamText({
        model: 'gemini-2.0-flash',
        messages: [{ role: 'user', content: 'Name 3 planets.' }],
      });

      let text = '';
      for await (const chunk of result.textStream) {
        text += chunk;
      }

      expect(text.length).toBeGreaterThan(0);
    });

    it.skipIf(!hasGoogle)('should use thinking budget with gemini-2.5-flash', async () => {
      const result = await silk.generateText({
        model: 'gemini-2.5-flash',
        messages: [{ role: 'user', content: 'What is 15 * 17? Show your work briefly.' }],
        reasoning: { budget: 4096 },
      });

      expect(result.text).toContain('255');
    });
  });

  describe('Groq', () => {
    it.skipIf(!hasGroq)('should generate text with llama-3.3-70b', async () => {
      const result = await silk.generateText({
        model: 'llama-3.3-70b-groq',
        messages: [{ role: 'user', content: 'Say "Hello from Groq!" and nothing else.' }],
      });

      expect(result.text).toContain('Hello');
    });

    it.skipIf(!hasGroq)('should stream text with llama-3.3-70b', async () => {
      const result = await silk.streamText({
        model: 'llama-3.3-70b-groq',
        messages: [{ role: 'user', content: 'Count to 3.' }],
      });

      let text = '';
      for await (const chunk of result.textStream) {
        text += chunk;
      }

      expect(text.length).toBeGreaterThan(0);
    });
  });

  describe('xAI Grok', () => {
    it.skipIf(!hasXAI)('should generate text with grok-3-mini', async () => {
      const result = await silk.generateText({
        model: 'grok-3-mini',
        messages: [{ role: 'user', content: 'Say "Hello from Grok!" and nothing else.' }],
      });

      expect(result.text).toContain('Hello');
    });

    it.skipIf(!hasXAI)('should use reasoning effort with grok-3-mini', async () => {
      const result = await silk.generateText({
        model: 'grok-3-mini',
        messages: [{ role: 'user', content: 'What is 7 * 8?' }],
        reasoning: { effort: 'high' },
      });

      expect(result.text).toContain('56');
    });
  });

  describe('Voyage AI', () => {
    it.skipIf(!hasVoyage)('should generate embeddings with voyage-3-lite', async () => {
      const result = await silk.embed({
        model: 'voyage-3-lite',
        value: 'Hello, Voyage!',
      });

      expect(result.embedding.length).toBeGreaterThan(0);
    });

    it.skipIf(!hasVoyage)('should rerank documents with rerank-2', async () => {
      const result = await silk.rerank({
        model: 'rerank-2',
        query: 'What is machine learning?',
        documents: [
          'Machine learning is a subset of artificial intelligence.',
          'The weather is nice today.',
          'Deep learning uses neural networks.',
        ],
        topN: 2,
      });

      expect(result).toHaveLength(2);
      expect(result[0].relevanceScore).toBeGreaterThan(result[1].relevanceScore);
    });
  });

  describe('Cohere', () => {
    it.skipIf(!hasCohere)('should rerank documents with rerank-v3', async () => {
      const result = await silk.rerank({
        model: 'rerank-v3',
        query: 'What is the capital of France?',
        documents: [
          'Paris is the capital of France.',
          'London is the capital of England.',
          'Berlin is the capital of Germany.',
        ],
        topN: 2,
      });

      expect(result).toHaveLength(2);
      expect(result[0].document).toContain('Paris');
    });
  });

  describe('Role-Based Selection', () => {
    it.skipIf(!hasOpenAI)('should use simple role', async () => {
      const result = await silk.generateText({
        role: 'quick-answer',
        messages: [{ role: 'user', content: 'Say "Role test passed!"' }],
      });

      expect(result.text).toBeDefined();
    });

    it.skipIf(!hasOpenAI)('should use role with variant', async () => {
      const result = await silk.generateText({
        role: 'deep-answer',
        variant: 'fast',
        messages: [{ role: 'user', content: 'Say "Variant test passed!"' }],
      });

      expect(result.text).toBeDefined();
    });

    it.skipIf(!hasAnthropic)('should use role with overrides', async () => {
      const result = await silk.generateText({
        role: 'deep-answer',
        variant: 'accurate',
        messages: [{ role: 'user', content: 'What is 2+2?' }],
      });

      expect(result.text).toContain('4');
    });
  });

  describe('Event System', () => {
    it.skipIf(!hasOpenAI)('should emit start and complete events', async () => {
      const startCount = events.start.length;
      const completeCount = events.complete.length;

      await silk.generateText({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: 'Hi' }],
      });

      expect(events.start.length).toBeGreaterThan(startCount);
      expect(events.complete.length).toBeGreaterThan(completeCount);

      const lastStart = events.start[events.start.length - 1];
      const lastComplete = events.complete[events.complete.length - 1];

      expect(lastStart.model).toBe('gpt-4o-mini');
      expect(lastStart.provider).toBe('openai');
      expect(lastStart.requestId).toBeDefined();

      expect(lastComplete.model).toBe('gpt-4o-mini');
      expect(lastComplete.latencyMs).toBeGreaterThan(0);
      expect(lastComplete.usage.inputTokens).toBeGreaterThan(0);
    });

    it.skipIf(!hasOpenAI)('should emit usage events', async () => {
      const usageCount = events.usage.length;

      await silk.generateText({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: 'Test' }],
      });

      expect(events.usage.length).toBeGreaterThan(usageCount);

      const lastUsage = events.usage[events.usage.length - 1];
      expect(lastUsage.model).toBe('gpt-4o-mini');
      expect(lastUsage.cost).toBeGreaterThan(0);
    });
  });

  describe('Cost Tracking', () => {
    it.skipIf(!hasOpenAI)('should track usage across requests', async () => {
      silk.clearUsage();

      await silk.generateText({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: 'One' }],
      });

      await silk.generateText({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: 'Two' }],
      });

      const usage = silk.getUsage();

      expect(usage.totalCost).toBeGreaterThan(0);
      expect(usage.byModel['gpt-4o-mini'].requests).toBe(2);
    });

    it.skipIf(!hasOpenAI)('should estimate cost before request', async () => {
      const estimate = await silk.estimateCost({
        model: 'gpt-4o-mini',
        inputTokens: 1000,
        outputTokens: 500,
      });

      expect(estimate).toBeGreaterThan(0);
      // gpt-4o-mini: $0.15/1M input + $0.60/1M output
      // Expected: (1000/1M * 0.15) + (500/1M * 0.60) = 0.00015 + 0.0003 = 0.00045
      expect(estimate).toBeCloseTo(0.00045, 5);
    });
  });
});
