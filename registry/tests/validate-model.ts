/**
 * Model Validation Test
 * 
 * This test validates that a model file contains all required information
 * with correct types, values, and no placeholder data.
 * 
 * DO NOT MODIFY THIS TEST - Fix your code to pass it.
 * 
 * ## Field Categories:
 * 
 * CRITICAL FIELDS (must have real values OR "// UNAVAILABLE: <reason>" comment):
 * - pricing (input, output)
 * - contextWindow (input, output)
 * - capabilities (streaming, functionCalling, etc.)
 * - reasoning config (if model supports reasoning)
 * - caching config (if model supports caching)
 * 
 * FLEXIBLE FIELDS (acceptable to be missing or estimated):
 * - releaseDate
 * - knowledgeCutoff
 * - description
 * - aliases
 * - deprecationDate
 * 
 * Usage: npx tsx registry/tests/validate-model.ts <provider_id> <model_id>
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// TEST CONFIGURATION
// ============================================================================

interface ValidationResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
}

interface TestContext {
  providerId: string;
  modelId: string;
  modelFile: string;
  content: string;
  errors: string[];
  warnings: string[];
}

// ============================================================================
// VALIDATION RULES
// ============================================================================

const VALID_MODEL_TYPES = [
  'chat',
  'completion',
  'embedding',
  'image-generation',
  'image-edit',
  'audio',
  'audio-transcription',
  'audio-speech',
  'video',
  'moderation',
  'rerank',
  'code',
] as const;

const VALID_MODEL_STATUS = [
  'ga',
  'preview',
  'beta',
  'deprecated',
  'experimental',
] as const;

const VALID_REASONING_TYPES = [
  'native',
  'extended_thinking',
  'reasoning_effort',
  'thinking_budget',
] as const;

const VALID_CACHING_TYPES = [
  'automatic',
  'explicit',
  'ephemeral',
] as const;

// Pattern to detect "UNAVAILABLE" comments which are acceptable for critical fields
// Format: // UNAVAILABLE: <reason why data couldn't be found>
const UNAVAILABLE_PATTERN = /\/\/\s*UNAVAILABLE:/i;

// Check if a field has an UNAVAILABLE comment nearby
function hasUnavailableComment(content: string, fieldPattern: RegExp): boolean {
  const match = content.match(fieldPattern);
  if (!match || match.index === undefined) return false;
  
  // Look for UNAVAILABLE comment within 100 chars before or after the field
  const start = Math.max(0, match.index - 100);
  const end = Math.min(content.length, match.index + match[0].length + 100);
  const context = content.slice(start, end);
  
  return UNAVAILABLE_PATTERN.test(context);
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

function readFile(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8');
}

function getModelFilePath(providerId: string, modelId: string): string {
  const registryDir = path.join(__dirname, '..');
  const modelFileName = modelId.replace(/\//g, '_').replace(/:/g, '_') + '.ts';
  return path.join(registryDir, 'providers', providerId, 'models', modelFileName);
}

function extractNumber(content: string, pattern: RegExp): number | null {
  const match = content.match(pattern);
  if (match) {
    // Handle underscore-separated numbers like 128_000
    const numStr = match[1].replace(/_/g, '');
    const num = parseFloat(numStr);
    return isNaN(num) ? null : num;
  }
  return null;
}

function extractString(content: string, pattern: RegExp): string | null {
  const match = content.match(pattern);
  return match ? match[1] : null;
}

function hasProperty(content: string, propName: string): boolean {
  const regex = new RegExp(`\\b${propName}\\s*:`, 'm');
  return regex.test(content);
}

function extractBlock(content: string, blockName: string): string | null {
  // Find the block and extract its content (handles nested braces)
  const startRegex = new RegExp(`${blockName}\\s*:\\s*\\{`);
  const match = content.match(startRegex);
  if (!match) return null;
  
  const startIndex = match.index! + match[0].length - 1;
  let depth = 1;
  let endIndex = startIndex + 1;
  
  while (depth > 0 && endIndex < content.length) {
    if (content[endIndex] === '{') depth++;
    if (content[endIndex] === '}') depth--;
    endIndex++;
  }
  
  return content.slice(startIndex, endIndex);
}

// ============================================================================
// VALIDATION TESTS
// ============================================================================

function validateBasicInfo(ctx: TestContext): void {
  // Test 1: Has id field
  if (!hasProperty(ctx.content, 'id')) {
    ctx.errors.push('Model must have an id field');
  } else {
    const id = extractString(ctx.content, /id:\s*['"`]([^'"`]+)['"`]/);
    if (!id) {
      ctx.errors.push('Model id must be a non-empty string');
    } else if (id !== ctx.modelId) {
      ctx.warnings.push(`Model id '${id}' does not match expected '${ctx.modelId}'`);
    }
  }
  
  // Test 2: Has name field
  if (!hasProperty(ctx.content, 'name')) {
    ctx.errors.push('Model must have a name field');
  } else {
    const name = extractString(ctx.content, /name:\s*['"`]([^'"`]+)['"`]/);
    if (!name || name.length < 3) {
      ctx.errors.push('Model name must be a descriptive string (at least 3 characters)');
    }
  }
  
  // Test 3: Has type field with valid value
  if (!hasProperty(ctx.content, 'type')) {
    ctx.errors.push('Model must have a type field');
  } else {
    const type = extractString(ctx.content, /type:\s*['"`]([^'"`]+)['"`]/);
    if (type && !VALID_MODEL_TYPES.includes(type as any)) {
      ctx.errors.push(`Invalid model type '${type}'. Must be one of: ${VALID_MODEL_TYPES.join(', ')}`);
    }
  }
  
  // Test 4: Has status field with valid value
  if (!hasProperty(ctx.content, 'status')) {
    ctx.warnings.push('Model should have a status field');
  } else {
    const status = extractString(ctx.content, /status:\s*['"`]([^'"`]+)['"`]/);
    if (status && !VALID_MODEL_STATUS.includes(status as any)) {
      ctx.errors.push(`Invalid model status '${status}'. Must be one of: ${VALID_MODEL_STATUS.join(', ')}`);
    }
  }
  
  // Test 5: Has family field
  if (!hasProperty(ctx.content, 'family')) {
    ctx.warnings.push('Model should have a family field');
  }
  
  // Test 6: Has description
  if (!hasProperty(ctx.content, 'description')) {
    ctx.warnings.push('Model should have a description');
  }
}

function validateContextWindow(ctx: TestContext): void {
  const contextBlock = extractBlock(ctx.content, 'contextWindow');
  
  if (!contextBlock) {
    ctx.errors.push('Model must have a contextWindow block');
    return;
  }
  
  // Test 1: Has input limit (CRITICAL FIELD)
  const inputLimit = extractNumber(ctx.content, /contextWindow[\s\S]*?input:\s*([\d_]+)/);
  if (inputLimit === null) {
    ctx.errors.push('contextWindow must have an input limit');
  } else if (inputLimit === 0) {
    // Check for UNAVAILABLE comment
    if (hasUnavailableComment(ctx.content, /contextWindow[\s\S]*?input:\s*0/)) {
      ctx.warnings.push('contextWindow.input is 0 with UNAVAILABLE comment - acceptable but should be verified later');
    } else {
      ctx.errors.push('contextWindow.input cannot be 0 - must be filled with actual value OR add "// UNAVAILABLE: <reason>" comment');
    }
  } else if (inputLimit < 1000) {
    ctx.warnings.push(`contextWindow.input (${inputLimit}) seems too low - verify this is correct`);
  }
  
  // Test 2: Has output limit (for chat/completion models) (CRITICAL FIELD)
  const modelType = extractString(ctx.content, /type:\s*['"`]([^'"`]+)['"`]/);
  if (modelType === 'chat' || modelType === 'completion') {
    const outputLimit = extractNumber(ctx.content, /contextWindow[\s\S]*?output:\s*([\d_]+)/);
    if (outputLimit === null) {
      ctx.warnings.push('Chat/completion models should have contextWindow.output');
    } else if (outputLimit === 0) {
      if (hasUnavailableComment(ctx.content, /contextWindow[\s\S]*?output:\s*0/)) {
        ctx.warnings.push('contextWindow.output is 0 with UNAVAILABLE comment - acceptable but should be verified later');
      } else {
        ctx.errors.push('contextWindow.output cannot be 0 - must be filled with actual value OR add "// UNAVAILABLE: <reason>" comment');
      }
    }
  }
}

function validatePricing(ctx: TestContext): void {
  const pricingBlock = extractBlock(ctx.content, 'pricing');
  
  if (!pricingBlock) {
    ctx.errors.push('Model must have a pricing block');
    return;
  }
  
  // Test 1: Has standard pricing (CRITICAL)
  const standardBlock = extractBlock(ctx.content, 'standard');
  if (!standardBlock) {
    ctx.errors.push('pricing must have a standard block');
    return;
  }
  
  // Test 2: Standard pricing has input (CRITICAL FIELD)
  const inputPrice = extractNumber(ctx.content, /standard[\s\S]*?input:\s*([\d_.]+)/);
  if (inputPrice === null) {
    ctx.errors.push('pricing.standard must have input price');
  } else if (inputPrice === 0) {
    // Check if this is a free model (some models are genuinely free like moderation)
    const modelType = extractString(ctx.content, /type:\s*['"`]([^'"`]+)['"`]/);
    if (modelType === 'moderation') {
      // Moderation models are often free - this is OK
    } else if (hasUnavailableComment(ctx.content, /standard[\s\S]*?input:\s*0/)) {
      ctx.warnings.push('pricing.standard.input is 0 with UNAVAILABLE comment - acceptable but should be verified later');
    } else {
      ctx.errors.push('pricing.standard.input cannot be 0 - must be filled with actual price (per million tokens USD) OR add "// UNAVAILABLE: <reason>" comment');
    }
  }
  
  // Test 3: Standard pricing has output (for generative models) (CRITICAL FIELD)
  const modelType = extractString(ctx.content, /type:\s*['"`]([^'"`]+)['"`]/);
  if (modelType === 'chat' || modelType === 'completion') {
    const outputPrice = extractNumber(ctx.content, /standard[\s\S]*?output:\s*([\d_.]+)/);
    if (outputPrice === null) {
      ctx.errors.push('pricing.standard must have output price for chat/completion models');
    } else if (outputPrice === 0) {
      if (hasUnavailableComment(ctx.content, /standard[\s\S]*?output:\s*0/)) {
        ctx.warnings.push('pricing.standard.output is 0 with UNAVAILABLE comment - acceptable but should be verified later');
      } else {
        ctx.errors.push('pricing.standard.output cannot be 0 - must be filled with actual price OR add "// UNAVAILABLE: <reason>" comment');
      }
    }
  }
  
  // Test 4: Pricing values are reasonable (per million tokens)
  if (inputPrice !== null && inputPrice > 0) {
    if (inputPrice > 100) {
      ctx.warnings.push(`pricing.standard.input (${inputPrice}) seems very high - verify this is per million tokens`);
    }
    if (inputPrice < 0.01) {
      ctx.warnings.push(`pricing.standard.input (${inputPrice}) seems very low - verify this is per million tokens`);
    }
  }
  
  // Test 5: Check for batch pricing if batchApi feature is enabled
  if (ctx.content.includes('batchApi: true') && !ctx.content.includes('batch:')) {
    ctx.warnings.push('Model has batchApi feature but no batch pricing defined');
  }
  
  // Test 6: Check for cachedInput if promptCaching feature is enabled (CRITICAL if feature enabled)
  if (ctx.content.includes('promptCaching: true') && !ctx.content.includes('cachedInput')) {
    if (hasUnavailableComment(ctx.content, /promptCaching:\s*true/)) {
      ctx.warnings.push('Model has promptCaching but no cachedInput - UNAVAILABLE comment found');
    } else {
      ctx.errors.push('Model has promptCaching: true but no cachedInput price - add price OR add "// UNAVAILABLE: <reason>" comment');
    }
  }
}

function validateModalities(ctx: TestContext): void {
  const modalitiesBlock = extractBlock(ctx.content, 'modalities');
  
  if (!modalitiesBlock) {
    ctx.errors.push('Model must have a modalities block');
    return;
  }
  
  // Test 1: Has input modalities
  if (!modalitiesBlock.includes('input:')) {
    ctx.errors.push('modalities must have an input block');
  } else {
    // At least one input modality should be true
    const inputBlock = extractBlock(ctx.content, 'input');
    if (inputBlock && !inputBlock.includes('true')) {
      ctx.errors.push('modalities.input must have at least one modality set to true');
    }
  }
  
  // Test 2: Has output modalities
  if (!modalitiesBlock.includes('output:')) {
    ctx.errors.push('modalities must have an output block');
  } else {
    // At least one output modality should be true
    const outputBlock = extractBlock(ctx.content, 'output');
    if (outputBlock && !outputBlock.includes('true')) {
      ctx.errors.push('modalities.output must have at least one modality set to true');
    }
  }
  
  // Test 3: Vision capability matches image input modality
  if (ctx.content.includes('vision: true')) {
    if (!ctx.content.includes('image: true')) {
      ctx.warnings.push('Model has vision capability but image modality is not set to true');
    }
  }
}

function validateCapabilities(ctx: TestContext): void {
  const capsBlock = extractBlock(ctx.content, 'capabilities');
  
  if (!capsBlock) {
    ctx.warnings.push('Model should have a capabilities block');
    return;
  }
  
  // Test 1: Chat models should have streaming
  const modelType = extractString(ctx.content, /type:\s*['"`]([^'"`]+)['"`]/);
  if (modelType === 'chat') {
    if (!ctx.content.includes('streaming:')) {
      ctx.warnings.push('Chat models should specify streaming capability');
    }
  }
  
  // Test 2: If functionCalling is true, should specify parallelToolCalls
  if (ctx.content.includes('functionCalling: true')) {
    if (!ctx.content.includes('parallelToolCalls:')) {
      ctx.warnings.push('Models with functionCalling should specify parallelToolCalls');
    }
  }
}

function validateFeatures(ctx: TestContext): void {
  // Features block is optional but if present, should be valid
  const featuresBlock = extractBlock(ctx.content, 'features');
  
  if (!featuresBlock) {
    return; // Features are optional
  }
  
  // Test 1: If promptCaching is true, should have caching block
  if (ctx.content.includes('promptCaching: true')) {
    if (!ctx.content.includes('caching:')) {
      ctx.warnings.push('Model has promptCaching feature but no caching configuration');
    }
  }
}

function validateReasoning(ctx: TestContext): void {
  const reasoningBlock = extractBlock(ctx.content, 'reasoning');
  
  if (!reasoningBlock) {
    return; // Reasoning is optional
  }
  
  // Test 1: If reasoning.supported is true, must have type
  if (ctx.content.includes('supported: true')) {
    const reasoningType = extractString(ctx.content, /reasoning[\s\S]*?type:\s*['"`]([^'"`]+)['"`]/);
    if (!reasoningType) {
      ctx.errors.push('reasoning block with supported: true must have a type');
    } else if (!VALID_REASONING_TYPES.includes(reasoningType as any)) {
      ctx.errors.push(`Invalid reasoning type '${reasoningType}'. Must be one of: ${VALID_REASONING_TYPES.join(', ')}`);
    }
    
    // Test 2: Should have budgetTokens or effortLevels
    if (!ctx.content.includes('budgetTokens:') && !ctx.content.includes('effortLevels:')) {
      ctx.warnings.push('reasoning should have budgetTokens or effortLevels configuration');
    }
  }
}

function validateCaching(ctx: TestContext): void {
  const cachingBlock = extractBlock(ctx.content, 'caching');
  
  if (!cachingBlock) {
    return; // Caching is optional
  }
  
  // Test 1: If caching.supported is true, must have type
  if (cachingBlock.includes('supported: true')) {
    const cachingType = extractString(ctx.content, /caching[\s\S]*?type:\s*['"`]([^'"`]+)['"`]/);
    if (!cachingType) {
      ctx.errors.push('caching block with supported: true must have a type');
    } else if (!VALID_CACHING_TYPES.includes(cachingType as any)) {
      ctx.errors.push(`Invalid caching type '${cachingType}'. Must be one of: ${VALID_CACHING_TYPES.join(', ')}`);
    }
    
    // Test 2: Should have ttlSeconds
    if (!ctx.content.includes('ttlSeconds:')) {
      ctx.warnings.push('caching should have ttlSeconds');
    }
  }
}

function validateNoPlaceholders(ctx: TestContext): void {
  // Test 1: No TODO comments for critical fields WITHOUT UNAVAILABLE marker
  // UNAVAILABLE comments are acceptable, plain TODO comments are not
  const criticalTodos = [
    { pattern: /contextWindow[\s\S]*?input:\s*0[\s\S]{0,50}?\/\/\s*TODO/i, field: 'contextWindow.input' },
    { pattern: /pricing[\s\S]*?input:\s*0[\s\S]{0,50}?\/\/\s*TODO/i, field: 'pricing.input' },
    { pattern: /pricing[\s\S]*?output:\s*0[\s\S]{0,50}?\/\/\s*TODO/i, field: 'pricing.output' },
  ];
  
  for (const { pattern, field } of criticalTodos) {
    if (pattern.test(ctx.content)) {
      // Check if there's also an UNAVAILABLE comment
      if (!UNAVAILABLE_PATTERN.test(ctx.content)) {
        ctx.errors.push(`${field} has value 0 with TODO comment - must fill with real data OR change to "// UNAVAILABLE: <reason>"`);
      }
    }
  }
  
  // Test 2: No generic placeholder descriptions (FLEXIBLE - just warning)
  const placeholderDescriptions = [
    /description:\s*['"`]TODO/i,
    /description:\s*['"`]Fill in/i,
    /description:\s*['"`]Placeholder/i,
    /description:\s*['"`]$/,
  ];
  
  for (const pattern of placeholderDescriptions) {
    if (pattern.test(ctx.content)) {
      ctx.warnings.push('Description appears to be a placeholder - should be a real description');
    }
  }
}

function validateImports(ctx: TestContext): void {
  // Test 1: Imports defineModel
  if (!ctx.content.includes("from '../../../base'") && !ctx.content.includes('from "../../../base"')) {
    ctx.errors.push('Model must import from ../../../base');
  }
  
  // Test 2: Imports types
  if (!ctx.content.includes("from '../../../types'") && !ctx.content.includes('from "../../../types"')) {
    ctx.errors.push('Model must import types from ../../../types');
  }
  
  // Test 3: Imports provider defaults
  if (!ctx.content.includes("from '../_defaults'") && !ctx.content.includes('from "../_defaults"')) {
    ctx.errors.push('Model must import from ../_defaults');
  }
  
  // Test 4: Uses withXxxDefaults wrapper
  if (!ctx.content.match(/with\w+Defaults\s*\(/)) {
    ctx.errors.push('Model must use withXxxDefaults() wrapper from _defaults');
  }
}

// ============================================================================
// MAIN
// ============================================================================

function runValidation(providerId: string, modelId: string): ValidationResult {
  const modelPath = getModelFilePath(providerId, modelId);
  
  // Check file exists
  if (!fileExists(modelPath)) {
    return {
      passed: false,
      errors: [`Model file not found: ${modelPath}`],
      warnings: [],
    };
  }
  
  const content = readFile(modelPath);
  const modelFile = path.basename(modelPath);
  
  const ctx: TestContext = {
    providerId,
    modelId,
    modelFile,
    content,
    errors: [],
    warnings: [],
  };
  
  // Run all validations
  validateImports(ctx);
  validateBasicInfo(ctx);
  validateContextWindow(ctx);
  validatePricing(ctx);
  validateModalities(ctx);
  validateCapabilities(ctx);
  validateFeatures(ctx);
  validateReasoning(ctx);
  validateCaching(ctx);
  validateNoPlaceholders(ctx);
  
  return {
    passed: ctx.errors.length === 0,
    errors: ctx.errors,
    warnings: ctx.warnings,
  };
}

function main() {
  const providerId = process.argv[2];
  const modelId = process.argv[3];
  
  if (!providerId || !modelId) {
    console.error('Usage: npx tsx registry/tests/validate-model.ts <provider_id> <model_id>');
    process.exit(1);
  }
  
  console.log(`\n🧪 Validating model: ${providerId}/${modelId}\n`);
  console.log('─'.repeat(50));
  
  const result = runValidation(providerId, modelId);
  
  // Print errors
  if (result.errors.length > 0) {
    console.log('\n❌ ERRORS (must fix):');
    for (const error of result.errors) {
      console.log(`   • ${error}`);
    }
  }
  
  // Print warnings
  if (result.warnings.length > 0) {
    console.log('\n⚠️  WARNINGS (should fix):');
    for (const warning of result.warnings) {
      console.log(`   • ${warning}`);
    }
  }
  
  // Print summary
  console.log('\n' + '─'.repeat(50));
  if (result.passed) {
    console.log('✅ PASSED - All validations passed!');
    process.exit(0);
  } else {
    console.log(`❌ FAILED - ${result.errors.length} error(s), ${result.warnings.length} warning(s)`);
    process.exit(1);
  }
}

main();
