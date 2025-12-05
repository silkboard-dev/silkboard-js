# Task: Update Model Information

## Provider: {{PROVIDER_ID}}
## Model: {{MODEL_ID}}
## File: models/{{MODEL_FILE}}

---

## ⚠️ STRICT BOUNDARIES - READ FIRST

### ✅ GOALS (Do These)
1. Research THIS SPECIFIC MODEL: {{MODEL_ID}}
2. Find and fill in accurate pricing (per million tokens USD)
3. Find and fill in context window limits (input/output)
4. Verify modalities (text, image, audio, video support)
5. Verify capabilities (streaming, function calling, etc.)
6. Update the single file: `models/{{MODEL_FILE}}`

### ❌ NON-GOALS (Do NOT Do These)
- Do NOT modify any other model files
- Do NOT modify `_defaults.ts` or `index.ts`
- Do NOT research other models
- Do NOT create new files
- Do NOT run tests or validate TypeScript
- Do NOT create documentation or plans
- Do NOT modify files outside `models/{{MODEL_FILE}}`

### 🎯 SUCCESS CRITERIA
- `models/{{MODEL_FILE}}` has ALL fields filled with accurate data
- Pricing is accurate and from official source (per million tokens USD)
- Context window (input AND output) is filled in correctly
- Modalities match what the model actually supports
- Capabilities are verified against official docs
- Features are complete (batch API, caching, fine-tuning, etc.)
- Reasoning config is set if model supports reasoning
- Caching config is set if model supports caching

---

## Step 1: Research This Specific Model

### 🔍 USE YOUR MCP TOOLS FOR RESEARCH

You have access to MCP tools - USE THEM for accurate, up-to-date information:

**For Web Research (use whichever is available):**
- `mcp0_web_search_preview` - Search for model specs, pricing, capabilities
- `mcp0_web_fetch` - Fetch content from documentation URLs
- `exa_search` / `exa_get_contents` - Alternative web search if available
- `perplexity_search` - Alternative search if available

**For SDK/Library Documentation:**
- `mcp0_resolve-library-id` - Find Context7 library ID for provider SDK
- `mcp0_get-library-docs` - Get SDK docs for model usage patterns

**Example research workflow:**
```typescript
1. web_search_preview("{{MODEL_ID}} context window pricing specifications")
2. web_fetch(["https://provider.com/docs/models/{{MODEL_ID}}", "https://provider.com/pricing"])
3. resolve-library-id("{{PROVIDER_ID}}") → get library ID  
4. get-library-docs(libraryId, topic="{{MODEL_ID}}")
```

⚠️ **DO NOT rely on your training data alone** - pricing and specs change frequently. Always verify with live web searches.

Search for and gather ALL of the following information for {{MODEL_ID}}:

### Pricing Information
- Input token price (per million tokens USD)
- Output token price (per million tokens USD)
- Cached input price (if caching supported)
- Batch API pricing (if batch supported)
- Reasoning token price (if reasoning model)
- Tiered pricing (if different rates for >128K or >200K context)
- Prompt caching pricing (write/read costs if applicable)

### Context Window
- Maximum input tokens
- Maximum output tokens
- Any context-dependent pricing tiers

### Modalities
- Input: text, image, audio, video, file support
- Output: text, image, audio, video, embedding support

### Capabilities
- Streaming support
- Function/tool calling
- Parallel tool calls
- Structured output / JSON mode
- System prompt support
- Logprobs
- Seed for reproducibility
- Stop sequences

### Features
- Web search
- Code interpreter
- Image generation
- Computer use
- MCP support
- Fine-tuning available
- Prompt caching
- Batch API
- Realtime API
- Assistants API

### Reasoning (if applicable)
- Reasoning type (native, extended_thinking, reasoning_effort)
- Budget tokens (min, max, default)
- Effort levels (low, medium, high)

### Caching (if applicable)
- Caching type (automatic, explicit, ephemeral)
- Minimum tokens for caching
- TTL in seconds
- Discount percentage

### Model Metadata
- Release date
- Status (ga, preview, beta, deprecated)
- Family name
- Aliases (alternative model IDs)
- Description

Search queries to use:
- "{{PROVIDER_ID}} {{MODEL_ID}} pricing"
- "{{PROVIDER_ID}} {{MODEL_ID}} context window"
- "{{PROVIDER_ID}} {{MODEL_ID}} capabilities"
- "{{PROVIDER_ID}} API documentation models"

Fetch the official pricing page and model documentation to get exact numbers.

## Step 2: Update Model File

Fill in ALL fields accurately:

### Basic Info
```typescript
id: '{{MODEL_ID}}',           // Exact API model ID
name: 'Human Readable Name',
description: 'Brief description of the model',
type: 'chat',                 // chat, embedding, image-generation, audio, etc.
family: 'model-family',       // e.g., 'gpt-4', 'claude-3', 'gemini-2'
status: 'ga',                 // ga, preview, beta, deprecated
releaseDate: 'YYYY-MM-DD',
aliases: ['alias1', 'alias2'], // Alternative model IDs
```

### Context Window
```typescript
contextWindow: {
  input: 128000,    // Max input tokens
  output: 16384,    // Max output tokens
},
```

### Modalities
```typescript
modalities: {
  input: { text: true, image: true, audio: false, video: false, file: false },
  output: { text: true, image: false, audio: false, video: false, embedding: false },
},
```

### Pricing (per million tokens USD)
```typescript
pricing: {
  standard: {
    input: 2.50,
    output: 10.00,
    cachedInput: 1.25,    // If caching supported
    reasoning: 15.00,      // If reasoning model
  },
  batch: {                 // If batch API available
    input: 1.25,
    output: 5.00,
  },
  // For tiered pricing (e.g., Anthropic >200K):
  contextTiers: [
    { upTo: 200000, pricing: { input: 3.00, output: 15.00 } },
    { upTo: 'unlimited', pricing: { input: 6.00, output: 22.50 } },
  ],
  // For prompt caching (Anthropic style):
  promptCaching: {
    write: 3.75,
    read: 0.30,
    ttlSeconds: 300,
  },
},
```

### Capabilities
```typescript
capabilities: {
  streaming: true,
  functionCalling: true,
  parallelToolCalls: true,
  structuredOutput: true,
  jsonMode: true,
  systemPrompt: true,
  logprobs: false,
  seed: true,
  stopSequences: true,
},
```

### Features
```typescript
features: {
  webSearch: false,
  codeInterpreter: false,
  imageGeneration: false,
  computerUse: false,
  mcp: false,
  fineTuning: false,
  promptCaching: true,
  batchApi: true,
  realtimeApi: false,
},
```

### Reasoning (if applicable)
```typescript
reasoning: {
  supported: true,
  type: 'extended_thinking', // native, extended_thinking, reasoning_effort
  budgetTokens: { min: 1024, max: 128000, default: 16000 },
  // OR
  effortLevels: ['low', 'medium', 'high'],
},
```

### Caching (if applicable)
```typescript
caching: {
  supported: true,
  type: 'explicit',  // automatic, explicit, ephemeral
  minTokens: 1024,
  ttlSeconds: 300,
  discountPercent: 90,
},
```

## Output Requirements
- Use ONLY verified information from official sources
- Convert all pricing to USD per million tokens
- Omit fields that are false/not applicable (don't include `streaming: false`)
- Add `// TODO: Verify` for any uncertain values
- Ensure the file compiles (valid TypeScript)

## Pricing Conversion Reference
- If pricing is "per 1K tokens": multiply by 1000
- If pricing is "per 1M tokens": use as-is
- If pricing is in characters (Gemini): note `unit: 'characters'` in pricing

## Common Mistakes to Avoid
- Don't confuse input/output pricing
- Check for tiered pricing (many providers charge more for >128K or >200K context)
- Verify batch pricing is actually available for this model
- Don't assume capabilities - verify each one
- Don't leave fields as `0` if the real value is available
- Don't omit reasoning/caching config if the model supports it

---

## 🧪 REQUIRED: Run Validation Test

After completing your updates, you MUST run the validation test and fix any errors:

```bash
npx tsx ../../tests/validate-model.ts {{PROVIDER_ID}} {{MODEL_ID}}
```

### Test Requirements
- The test MUST pass with 0 errors before you are done
- Warnings should be addressed if possible
- **DO NOT modify the test file** - fix your code to pass the test
- **DO NOT cheat** - if you cannot find the real data, leave a TODO comment and note it, but do not fake values to pass tests

### What the Test Validates

**Imports:**
- ✓ Imports from `../../../base`
- ✓ Imports types from `../../../types`
- ✓ Imports from `../_defaults`
- ✓ Uses `withXxxDefaults()` wrapper

**Basic Info:**
- ✓ Has id matching the model ID
- ✓ Has descriptive name (at least 3 characters)
- ✓ Has valid type (chat, embedding, audio, etc.)
- ✓ Has valid status (ga, preview, beta, deprecated)
- ✓ Has family and description

**Context Window:**
- ✓ Has contextWindow block
- ✓ contextWindow.input is NOT 0 (must be real value)
- ✓ contextWindow.output is NOT 0 for chat/completion models

**Pricing:**
- ✓ Has pricing block with standard sub-block
- ✓ pricing.standard.input is NOT 0 (must be real price per million tokens)
- ✓ pricing.standard.output is NOT 0 for chat/completion models
- ✓ Pricing values are reasonable (0.01 - 100 per million tokens)
- ✓ Has batch pricing if batchApi feature is enabled
- ✓ Has cachedInput if promptCaching feature is enabled

**Modalities:**
- ✓ Has modalities block with input and output
- ✓ At least one input modality is true
- ✓ At least one output modality is true
- ✓ Vision capability matches image input modality

**Capabilities:**
- ✓ Chat models specify streaming
- ✓ Models with functionCalling specify parallelToolCalls

**Reasoning (if applicable):**
- ✓ Has valid type (native, extended_thinking, reasoning_effort, thinking_budget)
- ✓ Has budgetTokens or effortLevels

**Caching (if applicable):**
- ✓ Has valid type (automatic, explicit, ephemeral)
- ✓ Has ttlSeconds

**No Placeholders:**
- ✓ No critical fields with value 0 and TODO comment
- ✓ No placeholder descriptions

### If Test Fails
1. Read the error messages carefully
2. Fix the issues in your code
3. Run the test again
4. Repeat until all errors are resolved

### Integrity Notice

The test exists to ensure data quality. Fields are categorized as:

**CRITICAL FIELDS** (must have real values OR UNAVAILABLE comment):
- pricing (input, output, cached)
- contextWindow (input, output)
- capabilities
- reasoning config (if model supports it)
- caching config (if model supports it)

**FLEXIBLE FIELDS** (OK to estimate or omit):
- releaseDate
- knowledgeCutoff
- description
- aliases
- deprecationDate

### If You Cannot Find Critical Data

If after thorough research you cannot find accurate data for a CRITICAL field:

1. Use a reasonable default value (not 0)
2. Add an `// UNAVAILABLE:` comment explaining what you tried

Example:
```typescript
pricing: {
  standard: {
    input: 0.50,  // UNAVAILABLE: Pricing not listed on official docs, estimated based on similar models
    output: 1.50, // UNAVAILABLE: Pricing not listed on official docs, estimated based on similar models
  },
},
contextWindow: {
  input: 32_000,  // UNAVAILABLE: Not found in docs, using common default for this model family
  output: 4_096,  // UNAVAILABLE: Not found in docs, using common default
},
```

The test will accept `// UNAVAILABLE:` comments as valid acknowledgment that you tried but couldn't find the data.

### What is NOT Acceptable
- Leaving critical fields as `0` with just `// TODO`
- Making up values without any research
- Modifying the test file
- Skipping the test
