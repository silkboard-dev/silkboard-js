# Silkboard

> **AI SDK, Supercharged**

A drop-in wrapper for [Vercel AI SDK](https://ai-sdk.dev/) that adds unified reasoning configuration, cost tracking, smart routing, and operational controls—without changing your existing code.

*Named after Silk Board Junction in Bengaluru - where all routes converge.*

> ⚠️ **Under Active Development** - APIs may change before v1.0. Not recommended for production use yet.

## Why Silkboard?

| Pain Point | AI SDK | Silkboard |
|------------|--------|-----------|
| **Reasoning APIs** | Raw `providerOptions` per provider | ✅ Unified interface across 12+ providers |
| **Cost Visibility** | Just token counts | ✅ Auto-calculated costs with pricing registry |
| **Model Selection** | Hardcoded strings | ✅ YAML config with role-based selection |
| **Fallbacks** | Manual try/catch | ✅ Declarative routing with auto-fallback |
| **Budget Control** | None | ✅ Per-user/team budget management |

## Features

### Core
- **Unified Reasoning API** - One interface for OpenAI, Anthropic, Google, xAI, DeepSeek, etc.
- **Cost Tracking** - Automatic cost calculation with tiered/cached token pricing
- **YAML Configuration** - Human-readable, git-diffable model and role definitions
- **Role-Based Selection** - Define roles with variants (fast/balanced/accurate)
- **Smart Routing** - 5 strategies + fallbacks + cooldowns
- **Budget Management** - Per-user/team spending limits

### Modular Architecture
- **Plugin System** - Only bundle what you need
- **Tree-Shakeable** - Subpath exports for minimal bundles
- **Drop-in Compatible** - Works with existing AI SDK code

## Why a Wrapper, Not a Fork?

Silkboard is a **wrapper** built on top of Vercel AI SDK, not a fork.

| Reason | Benefit |
|--------|---------|
| **Independent upgrades** | Update `ai` and `silkboard` separately |
| **Smaller surface area** | We focus on routing, reasoning, and cost—not HTTP transport |
| **Trust** | You get Vercel's battle-tested core + our operational layer |
| **Composable** | Use Silkboard features selectively; drop down to raw AI SDK anytime |

### What This Means For You

```bash
# You install both packages
npm install ai silkboard
```

```typescript
// Silkboard wraps AI SDK—you can always access the underlying result
const stream = await silk.streamText({ role: 'answer', messages });

// Or use AI SDK directly when needed
import { streamText } from 'ai';
```

### When We Might Fork

We may fork specific provider packages (`@ai-sdk/*`) in the future if:
- SSE stream handling needs fixes for non-standard providers
- Polling fallback is required for providers without streaming support

Core `ai` package will remain upstream. Any forks will be clearly documented.

## Installation

```bash
npm install silkboard ai
```

## Quick Start

```typescript
import { createSilkboard, reasoningPlugin, costPlugin } from 'silkboard';

const silk = await createSilkboard({
  modelsConfig: './config/models.yaml',
  rolesConfig: './config/roles.yaml',
  plugins: [reasoningPlugin(), costPlugin()],
});

// Stream text by role (recommended)
const stream = await silk.streamText({
  role: 'answer',
  variant: 'balanced',
  messages: [{ role: 'user', content: 'Explain quantum computing' }],
});

// Generate text with unified reasoning
const result = await silk.generateText({
  model: 'claude-sonnet-4.5',
  messages: [{ role: 'user', content: 'Hello!' }],
  reasoning: { budget: 16000 },  // Works for ANY provider
});

// Embeddings
const { embedding } = await silk.embed({
  role: 'embedding',
  value: 'Text to embed',
});

// Reranking with automatic fallback
const ranked = await silk.rerank({
  role: 'reranker',
  query: 'search query',
  documents: ['doc1', 'doc2', 'doc3'],
  topN: 10,
});

// Cost tracking (via costPlugin)
const usage = silk.getUsage();
console.log(usage.totalCost, usage.byModel, usage.byRole);
```

## Modular Architecture

Choose your bundle size:

```typescript
// FULL BUNDLE (~55KB) - All plugins included
import { Silkboard } from 'silkboard';
const silk = await Silkboard.create({ modelsConfig });

// MINIMAL (~12KB) - Only what you need
import { createSilkboard } from 'silkboard/core';
import { reasoningPlugin } from 'silkboard/plugins/reasoning';
import { costPlugin } from 'silkboard/plugins/cost';

const silk = await createSilkboard({
  modelsConfig,
  plugins: [reasoningPlugin(), costPlugin()],
});
```

| Import | Size | Use Case |
|--------|------|----------|
| `silkboard` | ~55KB | Full features, convenience |
| `silkboard/core` | ~12KB | Minimal core |
| `+ plugins/*` | +2-5KB each | Add only what you need |

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
await silk.streamText({
  model: 'claude-sonnet-4.5',
  messages,
  reasoning: { budget: 32000 }, // Anthropic: token budget
});

await silk.streamText({
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

### createSilkboard

```typescript
const silk = await createSilkboard({
  modelsConfig: string | ModelsConfig,    // Path to models.yaml or config object
  rolesConfig?: string | RolesConfig,     // Path to roles.yaml or config object
  routingConfig?: string | RoutingConfig, // Path to routing.yaml (optional)
  registryPath?: string,                  // Path to model registry
  plugins?: SilkboardPlugin[],            // Plugins to load
});
```

### Methods

| Method | Description |
|--------|-------------|
| `streamText(options)` | Stream text generation |
| `generateText(options)` | Generate text (non-streaming) |
| `embed(options)` | Generate embeddings |
| `rerank(options)` | Rerank documents |
| `getUsage()` | Get usage summary with costs |
| `onEvent(event, handler)` | Subscribe to events |
| `destroy()` | Cleanup plugins |

### Plugins

| Plugin | Export | Description |
|--------|--------|-------------|
| `reasoningPlugin()` | `silkboard/plugins/reasoning` | Unified reasoning across providers |
| `costPlugin()` | `silkboard/plugins/cost` | Cost tracking and analytics |

### Request Options

```typescript
interface TextOptions {
  // Model selection (one required)
  model?: string;           // Model alias from config
  role?: string;            // Role name from config
  variant?: string;         // Role variant (fast/balanced/accurate)
  
  // Request
  messages: Message[];
  system?: string;
  tools?: Record<string, Tool>;
  abortSignal?: AbortSignal;
  
  // Reasoning (unified across providers)
  reasoning?: {
    effort?: 'low' | 'medium' | 'high';  // OpenAI, xAI, DeepSeek
    budget?: number;                      // Anthropic, Google
  };
}
```

## Architecture

```
src/
├── index.ts                    # Public exports
├── core/                       # Plugin-based core
│   ├── service.ts              # SilkboardCore class
│   ├── plugin-manager.ts       # Plugin lifecycle
│   └── index.ts                # Core exports
├── plugins/                    # Feature plugins
│   ├── reasoning/              # Unified reasoning
│   └── cost/                   # Cost tracking
├── types/                      # TypeScript interfaces
├── loaders/                    # YAML config loaders
├── providers/                  # Provider factory & adapters
├── reasoning/                  # Reasoning mapper (12+ providers)
├── cost/                       # Cost tracker & pricing
├── router/                     # Smart routing strategies
├── budget/                     # Budget management
├── events/                     # Event system
└── registry/                   # Model metadata
```

## Provider Support

Works with all AI SDK providers + OpenAI-compatible APIs:

| Provider | Package | Reasoning |
|----------|---------|-----------|
| OpenAI | `@ai-sdk/openai` | `effort` |
| Anthropic | `@ai-sdk/anthropic` | `budget` |
| Google | `@ai-sdk/google` | `budget` |
| xAI | `@ai-sdk/xai` | `effort` |
| DeepSeek | `@ai-sdk/deepseek` | `effort` |
| Groq | `@ai-sdk/groq` | — |
| **Nvidia NIM** | OpenAI-compatible | via `extraBody` |
| **Minimax** | OpenAI-compatible | via `extraBody` |
| **Together AI** | OpenAI-compatible | via `extraBody` |
| **OpenRouter** | OpenAI-compatible | unified |

## Roadmap

| Version | Focus | Status |
|---------|-------|--------|
| **v0.2.x** | Core + Reasoning + Routing | ✅ Current |
| **v0.3.0** | Context tracking, Compaction, Caching | 🔄 Next |
| **v0.4.0** | Guardrails, Telemetry, Logging | Planned |
| **v0.5.0** | Document processing, Isomorphic tools | Planned |
| **v1.0.0** | Production ready | Planned |

## Development

```bash
npm install       # Install dependencies
npm run typecheck # Type check
npm run build     # Build
npm test          # Run tests
```

## License

Apache 2.0 - See [LICENSE](./LICENSE) and [NOTICE](./NOTICE)

---

<p align="center">
  <a href="https://silkboard.dev">silkboard.dev</a> · 
  <a href="https://github.com/silkboard-dev/silkboard-js">GitHub</a>
</p>
