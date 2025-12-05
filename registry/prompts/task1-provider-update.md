# Task: Update Provider Information

## Provider: {{PROVIDER_ID}}

---

## ⚠️ STRICT BOUNDARIES - READ FIRST

### ✅ GOALS (Do These)
1. Research {{PROVIDER_ID}} official API documentation
2. Update `_defaults.ts` with accurate capabilities, features, usage tiers
3. Update `index.ts` with correct provider metadata (URLs, auth)
4. Create SCAFFOLD files for NEW models (minimal info, TODOs for details)
5. Move deprecated/removed models to `models/_deprecated/`
6. Update `index.ts` imports to only include ACTIVE models

### ❌ NON-GOALS (Do NOT Do These)
- Do NOT fill in detailed model pricing - just put `0` with TODO comments
- Do NOT fill in detailed context windows - just put `0` with TODO comments  
- Do NOT research individual model specifications in depth
- Do NOT modify files outside this provider directory
- Do NOT spend time on deprecated models beyond moving them
- Do NOT create elaborate documentation or plans
- Do NOT run tests or validate TypeScript compilation

### 🎯 SUCCESS CRITERIA
- `_defaults.ts` has accurate provider-wide capabilities and usage tiers
- `index.ts` has correct URLs, auth config, and imports only active models
- Each CURRENTLY AVAILABLE model has a scaffold file in `models/`
- Deprecated models are moved to `models/_deprecated/`

---

## Files to Update (relative to current directory)
- `_defaults.ts` - Provider defaults
- `index.ts` - Provider definition and model imports
- `models/*.ts` - Create scaffolds for NEW models only
- `models/_deprecated/*.ts` - Move old/removed models here

## Step 0: Get COMPLETE Model List FIRST

**THIS IS THE MOST IMPORTANT STEP. Before doing anything else:**

1. Search for the official models list:
   - "{{PROVIDER_ID}} API models list"
   - "{{PROVIDER_ID}} available models"
   - "{{PROVIDER_ID}} supported models"

2. Fetch the official documentation page that lists ALL models

3. **Extract EVERY model ID** - providers often have 20-100+ models including:
   - Chat/completion models (GPT, Claude, Llama, Mistral, etc.)
   - Embedding models
   - Image generation models
   - Audio/speech models
   - Moderation models
   - Code models
   - Reranking models

4. **Write down the complete list** before proceeding

⚠️ **CRITICAL**: Do not just grab a few example models. Get the COMPLETE list.
Many providers have 50+ models. If you only find 3-5, you're missing most of them.

This list determines:
- Which existing files to KEEP in `models/`
- Which existing files to MOVE to `models/_deprecated/`
- Which NEW scaffold files to CREATE

**If the provider has a models API endpoint, use it to get the authoritative list.**

## Step 1: Research Provider

### 🔍 USE YOUR MCP TOOLS FOR RESEARCH

You have access to MCP tools - USE THEM:

**For Web Research (use whichever is available):**
- `mcp0_web_search_preview` - Search the web for documentation, pricing, model lists
- `mcp0_web_fetch` - Fetch and extract content from specific URLs
- `exa_search` / `exa_get_contents` - Alternative web search if available
- `perplexity_search` - Alternative search if available

**For SDK/Library Documentation:**
- `mcp0_resolve-library-id` - Find the Context7 library ID for any SDK
- `mcp0_get-library-docs` - Get up-to-date documentation for SDKs

**Example research workflow:**
```
1. web_search_preview("{{PROVIDER_ID}} API models list pricing")
2. web_fetch(["https://docs.{{PROVIDER_ID}}.com/api/models", "https://{{PROVIDER_ID}}.com/pricing"])
3. resolve-library-id("{{PROVIDER_ID}}") → get library ID
4. get-library-docs(libraryId, topic="models")
```

⚠️ **DO NOT rely on your training data alone** - it may be outdated. Always verify with live web searches.

Use web search to find:
1. Official API documentation URL
2. Pricing page URL
3. Status page URL
4. Authentication method (API key header, env var name)
5. List of ALL available models
6. Rate limits by usage tier (free, tier1, tier2, etc.)
7. Common capabilities across models (streaming, function calling, etc.)

Search queries to use:
- "{{PROVIDER_ID}} API documentation"
- "{{PROVIDER_ID}} API pricing"
- "{{PROVIDER_ID}} API rate limits tiers"
- "{{PROVIDER_ID}} API models list"

## Step 2: Update _defaults.ts

Update the file with:

```typescript
// Default capabilities (common across most models)
export const defaultCapabilities: Partial<ModelCapabilities> = {
  streaming: true/false,
  functionCalling: true/false,
  structuredOutput: true/false,
  systemPrompt: true/false,
  // ... other common capabilities
};

// Default features
export const defaultFeatures: Partial<ModelFeatures> = {
  // ... common features
};

// Usage tiers (rate limits)
export const usageTiers: Record<string, RateLimits> = {
  free: { rpm: X, tpm: X },
  tier1: { rpm: X, tpm: X },
  // ... other tiers from provider docs
};
```

## Step 3: Update index.ts Provider Definition

Ensure these fields are accurate:
- `baseUrl` - API endpoint
- `docsUrl` - Documentation URL
- `pricingUrl` - Pricing page URL
- `statusUrl` - Status page URL
- `auth.type` - Usually 'api_key'
- `auth.header` - Header name (e.g., 'Authorization', 'x-api-key')
- `auth.envVar` - Environment variable name

## Step 4: Create Model Scaffolds

For each model found that doesn't have a file in `models/`, create a basic scaffold:

```typescript
import { defineModel } from '../../../base';
import type { ModelDefinition } from '../../../types';
import { with{{PROVIDER_PASCAL}}Defaults } from '../_defaults';

const {{MODEL_VAR}}: ModelDefinition = with{{PROVIDER_PASCAL}}Defaults(defineModel({
  id: '{{MODEL_ID}}',
  name: '{{MODEL_NAME}}',
  type: 'chat', // or embedding, image-generation, etc.
  family: '{{FAMILY}}',
  status: 'ga',
  contextWindow: { input: 0 }, // TODO: Fill in
  modalities: { input: { text: true }, output: { text: true } },
  pricing: { standard: { input: 0, output: 0 } }, // TODO: Fill in
  capabilities: {},
  features: {},
}));

export default {{MODEL_VAR}};
```

## Output Requirements
- Only modify files in the current directory
- Use accurate information from official sources only
- Add `// TODO: Verify` comments for uncertain values
- Model scaffolds should have `input: 0, output: 0` pricing with TODO
- Move deprecated/removed models to `models/_deprecated/`
- Update `index.ts` to only import ACTIVE models

## Reference
- Types: `../../types/index.ts`
- Base: `../../base/index.ts`

---

## 🧪 REQUIRED: Run Validation Test

After completing your updates, you MUST run the validation test and fix any errors:

```bash
npx tsx ../../tests/validate-provider.ts {{PROVIDER_ID}}
```

### Test Requirements
- The test MUST pass with 0 errors before you are done
- Warnings should be addressed if possible
- **DO NOT modify the test file** - fix your code to pass the test
- **DO NOT cheat** - if you cannot find the real data, leave a TODO comment and note it, but do not fake values to pass tests

### What the Test Validates

**_defaults.ts:**
- ✓ Exports `defaultCapabilities` with at least one capability
- ✓ Exports `defaultFeatures`
- ✓ Exports `usageTiers` with at least one tier containing rpm/tpm
- ✓ Exports `withXxxDefaults` helper function
- ✓ Imports types correctly

**index.ts:**
- ✓ Exports `provider` with id, name, category, apiFormat, baseUrl
- ✓ Provider id matches directory name
- ✓ Category is valid (official, third-party, cloud, gateways)
- ✓ apiFormat is valid
- ✓ baseUrl is a valid HTTPS URL
- ✓ Has docsUrl
- ✓ Has auth configuration with type and envVar
- ✓ Exports `models`
- ✓ All model files in models/ are imported
- ✓ Re-exports from _defaults

**models/*.ts:**
- ✓ Each file uses defineModel()
- ✓ Each file has default export
- ✓ Each model has id, name, type

### If Test Fails
1. Read the error messages carefully
2. Fix the issues in your code
3. Run the test again
4. Repeat until all errors are resolved

### If You Cannot Find Critical Data

For provider-level data like usage tiers (rate limits), if you cannot find accurate information:

1. Use reasonable default values based on similar providers
2. Add an `// UNAVAILABLE:` comment explaining what you tried

Example:
```typescript
export const usageTiers: Record<string, RateLimits> = {
  free: { 
    rpm: 60,   // UNAVAILABLE: Rate limits not published, using common free tier defaults
    tpm: 40_000,
  },
  tier1: { 
    rpm: 500,  // UNAVAILABLE: Rate limits not published, estimated based on similar providers
    tpm: 200_000,
  },
};
```

**CRITICAL fields for providers:**
- usageTiers (must have at least one tier with rpm/tpm)
- baseUrl, docsUrl
- auth configuration

**FLEXIBLE fields:**
- pricingUrl, statusUrl
- Individual capability defaults (can be empty if varies by model)
