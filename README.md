# @gwrag/llm-service

A unified LLM service for managing 50+ models across multiple providers with proper reasoning configuration, caching, and cost tracking. Built on [Vercel AI SDK v6](https://ai-sdk.dev/).

## Features

- **Multi-Provider Support** - OpenAI, Anthropic, Google, Groq, Cerebras, xAI, Cohere, OpenRouter, Voyage AI
- **Provider-Specific Reasoning** - Correctly handles each provider's unique reasoning API
- **YAML Configuration** - Human-readable, git-diffable model and role definitions with JSON Schema validation
- **Role-Based Selection** - Define functional roles with variants (fast/balanced/accurate)
- **Cost Tracking** - Built-in usage tracking with auto-fetch pricing from OpenRouter
- **Caching** - Memory cache middleware + Anthropic prompt caching support
- **Type Safety** - Full TypeScript support with comprehensive type definitions

## Installation

```bash
npm install @gwrag/llm-service ai
```

## Quick Start

```typescript
import { LLMService } from '@gwrag/llm-service';

const llm = new LLMService({
  modelsConfig: './config/models.yaml',
  rolesConfig: './config/roles.yaml',
});

// Stream text by role (recommended)
const stream = await llm.streamText({
  role: 'answer',
  variant: 'balanced',
  messages: [{ role: 'user', content: 'Explain quantum computing' }],
});

// Generate text by model alias
const result = await llm.generateText({
  model: 'claude-sonnet-4.5',
  messages: [{ role: 'user', content: 'Hello!' }],
  reasoning: { budget: 16000 },
});

// Embeddings
const { embedding } = await llm.embed({
  role: 'embedding',
  value: 'Text to embed',
});

// Reranking with automatic fallback
const ranked = await llm.rerank({
  role: 'reranker',
  query: 'search query',
  documents: ['doc1', 'doc2', 'doc3'],
  topN: 10,
});

// Cost tracking
const usage = llm.getUsage();
console.log(usage.totalCost, usage.byModel, usage.byRole);
```

## Configuration

### models.yaml

Define available models with provider-specific settings:

```yaml
version: "1.0"

models:
  gpt-5.1:
    provider: openai
    model_id: gpt-5.1
    type: language
    reasoning:
      style: effort
      values: [low, medium, high]
      default: medium
    parameters:
      temperature: 1.0
    context_window: 400000
    pricing:
      input: 1.25
      output: 10.00

  claude-sonnet-4.5:
    provider: anthropic
    model_id: claude-sonnet-4-5-20250929
    type: language
    reasoning:
      style: budget
      min: 1024
      max: 200000
      default: 16000
    caching:
      style: manual
    pricing:
      input: 3.00
      output: 15.00

  text-embedding-3-large:
    provider: openai
    model_id: text-embedding-3-large
    type: embedding
    parameters:
      dimensions: 3072
    pricing:
      input: 0.13

  rerank-2.5:
    provider: voyage
    model_id: rerank-2.5
    type: reranker
```

### roles.yaml

Map functional roles to models with optional variants:

```yaml
version: "1.0"

roles:
  # Simple role
  query:
    model: glm-4.6-cerebras

  # Role with variants
  answer:
    fast:
      model: glm-4.6-cerebras
    balanced:
      model: claude-sonnet-4.5
      overrides:
        reasoning:
          budget: 8000
    accurate:
      model: claude-opus-4.5
      overrides:
        reasoning:
          budget: 32000

  # Role with fallback
  reranker:
    primary: rerank-2.5
    fallback: rerank-cohere

  embedding:
    model: text-embedding-3-large

# Environment-specific overrides
environments:
  development:
    answer.accurate:
      model: claude-sonnet-4.5
```

## Reasoning Configuration

Each provider has unique reasoning APIs. This service normalizes the interface while respecting provider-specific constraints:

| Provider | Style | Configuration | Range |
|----------|-------|---------------|-------|
| **OpenAI** | effort | `{ effort: 'low' \| 'medium' \| 'high' }` | - |
| **Anthropic** | budget | `{ budget: 16000 }` | 1,024 - 200,000 tokens |
| **Google Gemini 3** | level | `{ level: 'low' \| 'high' }` | Cannot disable |
| **Google Gemini 2.5** | budget | `{ budget: 8192 }` | 0 - 32,768 (Pro), 0 - 24,576 (Flash) |
| **xAI Grok** | effort | `{ effort: 'low' \| 'medium' \| 'high' }` | - |
| **OpenRouter** | unified | Auto-normalizes | Anthropic capped at 32K |

### Usage

```typescript
// Override reasoning at request time
await llm.streamText({
  model: 'claude-sonnet-4.5',
  messages,
  reasoning: { budget: 32000 }, // Anthropic: token budget
});

await llm.streamText({
  model: 'gpt-5.1',
  messages,
  reasoning: { effort: 'high' }, // OpenAI: effort level
});
```

## Environment Variables

```bash
# Required (at least one)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=...
GROQ_API_KEY=gsk_...

# Optional providers
CEREBRAS_API_KEY=...
XAI_API_KEY=...
COHERE_API_KEY=...
OPENROUTER_API_KEY=sk-or-...
VOYAGE_API_KEY=pa-...
```

## API Reference

### LLMService

```typescript
new LLMService({
  modelsConfig: string | ModelsConfigFile,  // Path to models.yaml or config object
  rolesConfig?: string | RolesConfigFile,   // Path to roles.yaml or config object
  pricingCache?: string,                     // Path to pricing cache file
  environment?: string,                      // 'development' | 'production'
})
```

#### Methods

| Method | Description |
|--------|-------------|
| `streamText(options)` | Stream text generation |
| `generateText(options)` | Generate text (non-streaming) |
| `embed(options)` | Generate embeddings |
| `rerank(options)` | Rerank documents |
| `getUsage()` | Get usage summary with costs |
| `on(event, handler)` | Subscribe to usage events |

#### Request Options

```typescript
interface TextRequestOptions {
  // Model selection (one required)
  model?: string;           // Model alias from config
  role?: string;            // Role name from config
  variant?: string;         // Role variant (fast/balanced/accurate)
  
  // Request
  messages: Message[];
  system?: string;
  tools?: Record<string, Tool>;
  abortSignal?: AbortSignal;
  
  // Reasoning override
  reasoning?: ReasoningOverride;
}
```

## Architecture

```
src/
├── types.ts              # TypeScript interfaces
├── service.ts            # Main LLMService class
├── index.ts              # Public exports
├── config/
│   └── loader.ts         # YAML config loader with validation
├── providers/
│   ├── factory.ts        # Lazy provider initialization
│   ├── registry.ts       # Model registry with AI SDK v6
│   └── adapters/
│       ├── voyage.ts     # Voyage AI embeddings/reranking
│       └── cohere.ts     # Cohere reranker
├── reasoning/
│   ├── index.ts          # Reasoning config router
│   ├── openai.ts         # Effort-based reasoning
│   ├── anthropic.ts      # Budget-based thinking
│   ├── google.ts         # Level/budget reasoning
│   └── openrouter.ts     # Unified reasoning interface
├── cost/
│   └── tracker.ts        # Usage tracking with pricing
└── caching/
    ├── middleware.ts     # AI SDK cache middleware
    └── anthropic.ts      # Anthropic cache_control support
```

## Development

```bash
# Install dependencies
npm install

# Type check
npm run typecheck

# Build
npm run build

# Run tests
npm test
```

## License

MIT
