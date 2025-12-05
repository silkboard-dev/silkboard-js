# Provider Metadata Update Recipe

Use this recipe to update provider metadata files with complete, accurate and latest information.

## Task Parameters

```
PROVIDER: [provider name]
CATEGORY: [official | third-party | cloud | gateways]
FILE: registry/{CATEGORY}/{provider_id}.yaml
```

## Instructions

### Step 1: Research Using Parallel MCP

Use the **Parallel Search MCP** tools to gather comprehensive information. Make parallel calls when possible to speed up research.

#### 1.1 Web Search (use `web_search_preview`)

Search for the following information in parallel:

```
# Search 1: Pricing information
Objective: "Find [PROVIDER] API pricing for all models including input, output, cached, and batch pricing"
Queries: ["[PROVIDER] API pricing 2024", "[PROVIDER] model pricing per token"]

# Search 2: Model documentation
Objective: "Find [PROVIDER] model specifications including context windows and capabilities"
Queries: ["[PROVIDER] API models documentation", "[PROVIDER] model context window limits"]

# Search 3: Rate limits
Objective: "Find [PROVIDER] API rate limits by tier"
Queries: ["[PROVIDER] API rate limits", "[PROVIDER] API usage tiers"]

# Search 4: Features and capabilities
Objective: "Find [PROVIDER] API features like function calling, streaming, structured output"
Queries: ["[PROVIDER] API function calling", "[PROVIDER] structured output JSON mode"]
```

#### 1.2 Fetch Specific URLs (use `web_fetch`)

After identifying key URLs from search, fetch detailed content:

```
URLs to fetch (adjust for provider):
- Official pricing page (e.g., https://[provider].com/pricing)
- API documentation (e.g., https://docs.[provider].com/api)
- Model cards page
- Rate limits documentation

Objective: "Extract model names, pricing tiers, context windows, and capabilities"
```

#### 1.3 Key Information to Extract

From your research, gather:
- **All model IDs** (exact API identifiers)
- **Pricing** (input, output, cached, batch, reasoning tokens)
- **Context windows** (input limit, output limit)
- **Modalities** (text, image, audio, video support)
- **Capabilities** (streaming, function calling, JSON mode, etc.)
- **Features** (web search, code interpreter, fine-tuning, etc.)
- **Rate limits** (by tier if applicable)
- **Tiered pricing** (e.g., different prices above 200K tokens)

### Step 2: Update Provider Section

Verify and populate:
- `base_url`, `docs_url`, `pricing_url`, `status_url`
- `api_format` (openai-completions, anthropic-messages, google-gemini, cohere, bedrock, vertex, azure, custom)
- `auth` configuration (type, header, prefix, env_var)

### Step 3: Populate Each Model

For EVERY model offered by this provider, populate the following fields:

#### Basic Info
- `name`, `description`, `type`, `family`, `status`, `release_date`
- `aliases` (alternative model IDs)
- `context_window` (input, output limits)

#### Modalities
```yaml
modalities:
  input:
    text: true/false
    image: true/false
    audio: true/false
    video: true/false
    file: true/false
  output:
    text: true/false
    image: true/false
    audio: true/false
    video: true/false
    embedding: true/false
```

#### Pricing (per million tokens in USD unless noted)

**Standard pricing:**
```yaml
pricing:
  input: X.XX
  output: X.XX
  cached_input: X.XX      # if caching supported
  reasoning: X.XX         # if reasoning model
```

**Context-based tiered pricing** (e.g., Anthropic Sonnet 4.5 charges more above 200K tokens):
```yaml
pricing:
  input: 3.00             # Base rate (for prompts ≤200K)
  output: 15.00
  cached_input: 0.30
  tiered:
    - up_to: 200000       # First tier: up to 200K tokens
      input: 3.00
      output: 15.00
      cached_input: 0.30
    - up_to: "unlimited"  # Second tier: above 200K tokens
      input: 6.00
      output: 22.50
      cached_input: 0.60
```

**Modality-specific pricing** (e.g., OpenAI realtime has different text/audio/image rates):
```yaml
pricing:
  modality_pricing:
    text:
      input: 4.00
      output: 16.00
      cached_input: 0.40
    audio:
      input: 32.00
      output: 64.00
      cached_input: 0.40
    image:
      input: 5.00
      cached_input: 0.50
```

**Batch API pricing:**
```yaml
pricing:
  input: 2.50
  output: 10.00
  batch:
    input: 1.25           # 50% discount
    output: 5.00
    discount_percent: 50
```

**Prompt caching pricing** (Anthropic style - write/read costs):
```yaml
pricing:
  input: 3.00
  output: 15.00
  prompt_caching:
    write: 3.75           # 1.25x input price to write to cache
    read: 0.30            # 10% of input price to read from cache
    ttl_seconds: 300      # 5-minute TTL
```

**Fine-tuning pricing:**
```yaml
pricing:
  input: 2.00
  output: 8.00
  fine_tuning:
    training: 25.00       # Per million training tokens
    input: 3.00           # Inference input after fine-tuning
    output: 12.00         # Inference output after fine-tuning
    per_hour: 100.00      # For time-based billing (e.g., reinforcement fine-tuning)
```

**Per-unit pricing** (for non-token models):
```yaml
pricing:
  per_image: 0.04         # Image generation
  per_second: 0.10        # Audio/video
  per_search: 10.00       # Web search per 1K calls
  unit: characters        # Override billing unit (e.g., Gemini)
```

#### Capabilities
```yaml
capabilities:
  streaming: true/false
  function_calling: true/false
  parallel_tool_calls: true/false
  structured_output: true/false
  json_mode: true/false
  system_prompt: true/false
  logprobs: true/false
  seed: true/false
  stop_sequences: true/false
```

#### Features
```yaml
features:
  web_search: true/false
  file_search: true/false
  code_interpreter: true/false
  image_generation: true/false
  computer_use: true/false
  mcp: true/false
  fine_tuning: true/false
  distillation: true/false
  prompt_caching: true/false
  batch_api: true/false
  realtime_api: true/false
  assistants_api: true/false
```

#### Reasoning (if applicable)
```yaml
reasoning:
  supported: true
  type: native | extended_thinking | reasoning_effort | thinking_budget
  effort_levels: [low, medium, high]  # or
  budget_tokens:
    min: XXXX
    max: XXXXX
    default: XXXX
```

#### Caching (if applicable)
```yaml
caching:
  supported: true
  type: automatic | explicit | ephemeral
  min_tokens: XXXX
  ttl_seconds: XXX
  discount_percent: XX
```

#### Quantization (for inference providers)
```yaml
quantization:
  available: [fp16, fp8, int8, int4, awq, gptq, gguf, exl2]
  default: fp16
```

#### Rate Limits
```yaml
rate_limits:
  rpm: XXXX
  tpm: XXXXXX
  rpd: XXXXX
  tpd: XXXXXXX
```

### Step 4: Finalize

- Set `last_updated` to today's date
- Add `# TODO: Verify` comments for uncertain values
- Remove any `false` values from modalities/capabilities (omit instead)

## Requirements

- Use ONLY verified information from official sources
- Include ALL models currently offered (chat, embedding, image, audio, etc.)
- Convert all pricing to USD per million tokens
- Follow template structure in `registry/official/openai.yaml`
- **Check for tiered pricing** - many providers charge more for large context windows
- **Check for modality-specific pricing** - multimodal models often have different rates

## Verification Checklist

After updating, confirm:
- [ ] All models from official docs are included
- [ ] Pricing matches official pricing page (check for tiered pricing!)
- [ ] Modalities are accurate per model
- [ ] Features verified against API documentation
- [ ] Rate limits documented (per tier if applicable)
- [ ] Context windows are accurate (input AND output limits)
- [ ] Batch API pricing included if available
- [ ] Prompt caching pricing included if available

## Common Pricing Patterns by Provider

| Provider | Pricing Pattern | Notes |
|----------|-----------------|-------|
| **OpenAI** | Standard + Batch (50% off) | Realtime has modality-specific pricing |
| **Anthropic** | Tiered (>200K costs more) | Prompt caching: write 1.25x, read 0.1x |
| **Google** | Tiered (>200K costs more) | Some models use character billing |
| **Cohere** | Standard | Rerank uses per-search pricing |
| **Together/Fireworks** | Standard | May vary by quantization |

## Example MCP Tool Calls

### Parallel Web Search
```javascript
// Call these in parallel for faster research
mcp0_web_search_preview({
  objective: "Find OpenAI API pricing for GPT-4o, o1, and embedding models",
  search_queries: ["OpenAI API pricing 2024", "OpenAI GPT-4o pricing per token"]
})

mcp0_web_search_preview({
  objective: "Find OpenAI model context windows and capabilities",
  search_queries: ["OpenAI GPT-4o context window", "OpenAI o1 model specifications"]
})
```

### Fetch Specific Pages
```javascript
mcp0_web_fetch({
  urls: [
    "https://openai.com/api/pricing",
    "https://platform.openai.com/docs/models"
  ],
  objective: "Extract model pricing, context windows, and capabilities"
})
```

## Reference

- Schema: `config/provider-metadata.schema.json`
- Example: `registry/official/openai.yaml`
- Example with tiered pricing: `registry/official/anthropic.yaml`
- Documentation: `registry/README.md`

## Troubleshooting

### Pricing Not Found
1. Check the provider's main pricing page
2. Look for "API pricing" vs consumer pricing
3. Check developer documentation for per-token rates
4. Some providers list pricing in their model cards

### Tiered Pricing Detection
Look for phrases like:
- "Up to X tokens" / "Above X tokens"
- "Standard context" / "Extended context"
- "Prompts ≤200K" / "Prompts >200K"

### Modality Pricing Detection
Look for separate pricing tables for:
- Text input/output
- Audio input/output
- Image input/output
- Video processing
