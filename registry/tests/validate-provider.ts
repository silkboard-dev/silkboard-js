/**
 * Provider Validation Test
 * 
 * This test validates that a provider's _defaults.ts and index.ts files
 * contain all required information with correct types and values.
 * 
 * DO NOT MODIFY THIS TEST - Fix your code to pass it.
 * 
 * Usage: npx tsx registry/tests/validate-provider.ts <provider_id>
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
  providerDir: string;
  errors: string[];
  warnings: string[];
}

// ============================================================================
// VALIDATION RULES
// ============================================================================

const VALID_CATEGORIES = ['official', 'third-party', 'cloud', 'gateways'] as const;

const VALID_API_FORMATS = [
  'openai-completions',
  'openai-responses',
  'anthropic-messages',
  'google-gemini',
  'cohere',
  'bedrock',
  'vertex',
  'azure',
  'custom',
] as const;

const VALID_AUTH_TYPES = ['api_key', 'bearer', 'oauth', 'aws_sig_v4', 'custom'] as const;

const VALID_CAPABILITIES = [
  'streaming',
  'functionCalling',
  'parallelToolCalls',
  'structuredOutput',
  'jsonMode',
  'systemPrompt',
  'logprobs',
  'seed',
  'stopSequences',
  'vision',
  'embeddings',
] as const;

// Features list for reference (used in model validation)
// const VALID_FEATURES = [
//   'webSearch', 'fileSearch', 'codeInterpreter', 'imageGeneration',
//   'computerUse', 'mcp', 'fineTuning', 'distillation', 'promptCaching',
//   'batchApi', 'realtimeApi', 'assistantsApi',
// ] as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

function readFile(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8');
}

function extractExport(content: string, exportName: string): string | null {
  // Match: export const NAME = { ... } or export const NAME: Type = { ... }
  const regex = new RegExp(
    `export\\s+const\\s+${exportName}[^=]*=\\s*({[\\s\\S]*?});`,
    'm'
  );
  const match = content.match(regex);
  return match ? match[1] : null;
}

// Helper for extracting properties (kept for potential future use)
// function extractProperty(content: string, propName: string): string | null {
//   const regex = new RegExp(`${propName}:\\s*['"\`]?([^'"\`},\\n]+)['"\`]?`, 'm');
//   const match = content.match(regex);
//   return match ? match[1].trim() : null;
// }

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// ============================================================================
// VALIDATION TESTS
// ============================================================================

function validateDefaultsFile(ctx: TestContext): void {
  const defaultsPath = path.join(ctx.providerDir, '_defaults.ts');
  
  // Test 1: File exists
  if (!fileExists(defaultsPath)) {
    ctx.errors.push('_defaults.ts file does not exist');
    return;
  }
  
  const content = readFile(defaultsPath);
  
  // Test 2: Has defaultCapabilities export
  if (!content.includes('export const defaultCapabilities')) {
    ctx.errors.push('_defaults.ts must export defaultCapabilities');
  } else {
    // Test 2a: defaultCapabilities has at least one capability
    const capsBlock = extractExport(content, 'defaultCapabilities');
    if (capsBlock) {
      const hasCaps = VALID_CAPABILITIES.some(cap => capsBlock.includes(cap));
      if (!hasCaps) {
        ctx.warnings.push('defaultCapabilities appears to be empty - verify this is intentional');
      }
    }
  }
  
  // Test 3: Has defaultFeatures export
  if (!content.includes('export const defaultFeatures')) {
    ctx.errors.push('_defaults.ts must export defaultFeatures');
  }
  
  // Test 4: Has usageTiers export
  if (!content.includes('export const usageTiers')) {
    ctx.errors.push('_defaults.ts must export usageTiers');
  } else {
    // Test 4a: usageTiers is not empty (has at least one tier)
    const tiersBlock = extractExport(content, 'usageTiers');
    if (tiersBlock && tiersBlock.trim() === '{}') {
      ctx.errors.push('usageTiers must have at least one tier defined (e.g., free, tier1)');
    }
    
    // Test 4b: Each tier has rpm or tpm
    if (tiersBlock && !tiersBlock.includes('rpm') && !tiersBlock.includes('tpm')) {
      ctx.errors.push('usageTiers tiers must include rpm (requests per minute) or tpm (tokens per minute)');
    }
  }
  
  // Test 5: Has withXxxDefaults helper function
  const helperRegex = /export\s+function\s+with\w+Defaults/;
  if (!helperRegex.test(content)) {
    ctx.errors.push('_defaults.ts must export a withXxxDefaults helper function');
  }
  
  // Test 6: Imports types correctly
  if (!content.includes("from '../../types'") && !content.includes('from "../../types"')) {
    ctx.errors.push('_defaults.ts must import types from ../../types');
  }
}

function validateIndexFile(ctx: TestContext): void {
  const indexPath = path.join(ctx.providerDir, 'index.ts');
  
  // Test 1: File exists
  if (!fileExists(indexPath)) {
    ctx.errors.push('index.ts file does not exist');
    return;
  }
  
  const content = readFile(indexPath);
  
  // Test 2: Has provider export
  if (!content.includes('export const provider')) {
    ctx.errors.push('index.ts must export provider');
  }
  
  // Test 3: Has models export
  if (!content.includes('export const models')) {
    ctx.errors.push('index.ts must export models');
  }
  
  // Test 4: Provider has required fields
  const requiredFields = ['id', 'name', 'category', 'apiFormat', 'baseUrl'];
  for (const field of requiredFields) {
    if (!content.includes(`${field}:`)) {
      ctx.errors.push(`Provider definition must include ${field}`);
    }
  }
  
  // Test 5: Provider ID matches directory name
  const idMatch = content.match(/id:\s*['"`](\w+)['"`]/);
  if (idMatch && idMatch[1] !== ctx.providerId) {
    ctx.errors.push(`Provider id '${idMatch[1]}' does not match directory name '${ctx.providerId}'`);
  }
  
  // Test 6: Has valid category
  const categoryMatch = content.match(/category:\s*['"`](\w+)['"`]/);
  if (categoryMatch) {
    const category = categoryMatch[1];
    if (!VALID_CATEGORIES.includes(category as any)) {
      ctx.errors.push(`Invalid category '${category}'. Must be one of: ${VALID_CATEGORIES.join(', ')}`);
    }
  }
  
  // Test 7: Has valid apiFormat
  const formatMatch = content.match(/apiFormat:\s*['"`]([\w-]+)['"`]/);
  if (formatMatch) {
    const format = formatMatch[1];
    if (!VALID_API_FORMATS.includes(format as any)) {
      ctx.errors.push(`Invalid apiFormat '${format}'. Must be one of: ${VALID_API_FORMATS.join(', ')}`);
    }
  }
  
  // Test 8: baseUrl is a valid URL
  const baseUrlMatch = content.match(/baseUrl:\s*['"`](https?:\/\/[^'"`]+)['"`]/);
  if (baseUrlMatch) {
    if (!isValidUrl(baseUrlMatch[1])) {
      ctx.errors.push(`Invalid baseUrl: ${baseUrlMatch[1]}`);
    }
  } else {
    ctx.errors.push('baseUrl must be a valid HTTPS URL');
  }
  
  // Test 9: Has docsUrl
  if (!content.includes('docsUrl:')) {
    ctx.warnings.push('Provider should have docsUrl');
  } else {
    const docsMatch = content.match(/docsUrl:\s*['"`](https?:\/\/[^'"`]+)['"`]/);
    if (docsMatch && !isValidUrl(docsMatch[1])) {
      ctx.errors.push(`Invalid docsUrl: ${docsMatch[1]}`);
    }
  }
  
  // Test 10: Has auth configuration
  if (!content.includes('auth:')) {
    ctx.errors.push('Provider must have auth configuration');
  } else {
    // Test 10a: auth.type is valid
    const authTypeMatch = content.match(/type:\s*['"`](\w+)['"`]/);
    if (authTypeMatch) {
      const authType = authTypeMatch[1];
      if (!VALID_AUTH_TYPES.includes(authType as any)) {
        ctx.errors.push(`Invalid auth.type '${authType}'. Must be one of: ${VALID_AUTH_TYPES.join(', ')}`);
      }
    }
    
    // Test 10b: Has envVar for API key auth
    if (!content.includes('envVar:')) {
      ctx.errors.push('auth must include envVar (environment variable name)');
    }
  }
  
  // Test 11: Re-exports _defaults
  if (!content.includes("from './_defaults'") && !content.includes('from "./_defaults"')) {
    ctx.warnings.push('index.ts should re-export from _defaults');
  }
  
  // Test 12: Models directory has files
  const modelsDir = path.join(ctx.providerDir, 'models');
  if (fileExists(modelsDir)) {
    const modelFiles = fs.readdirSync(modelsDir).filter(f => 
      f.endsWith('.ts') && !f.startsWith('_')
    );
    if (modelFiles.length === 0) {
      ctx.errors.push('models/ directory exists but has no model files');
    }
    
    // Test 12a: Each model file is imported in index.ts
    for (const modelFile of modelFiles) {
      const modelName = modelFile.replace('.ts', '');
      if (!content.includes(`from './models/${modelName}'`)) {
        ctx.warnings.push(`Model file ${modelFile} is not imported in index.ts`);
      }
    }
  } else {
    ctx.errors.push('models/ directory does not exist');
  }
}

function validateModelsDirectory(ctx: TestContext): void {
  const modelsDir = path.join(ctx.providerDir, 'models');
  
  if (!fileExists(modelsDir)) {
    return; // Already reported in validateIndexFile
  }
  
  const modelFiles = fs.readdirSync(modelsDir).filter(f => 
    f.endsWith('.ts') && !f.startsWith('_')
  );
  
  for (const modelFile of modelFiles) {
    const modelPath = path.join(modelsDir, modelFile);
    const content = readFile(modelPath);
    
    // Test: Model file has required structure
    if (!content.includes('defineModel(')) {
      ctx.errors.push(`${modelFile}: Must use defineModel() to define the model`);
    }
    
    if (!content.includes('export default')) {
      ctx.errors.push(`${modelFile}: Must have a default export`);
    }
    
    // Test: Model has id
    if (!content.includes("id:")) {
      ctx.errors.push(`${modelFile}: Model must have an id`);
    }
    
    // Test: Model has name
    if (!content.includes("name:")) {
      ctx.errors.push(`${modelFile}: Model must have a name`);
    }
    
    // Test: Model has type
    if (!content.includes("type:")) {
      ctx.errors.push(`${modelFile}: Model must have a type`);
    }
  }
}

// ============================================================================
// MAIN
// ============================================================================

function runValidation(providerId: string): ValidationResult {
  const registryDir = path.join(__dirname, '..');
  const providerDir = path.join(registryDir, 'providers', providerId);
  
  const ctx: TestContext = {
    providerId,
    providerDir,
    errors: [],
    warnings: [],
  };
  
  // Check provider directory exists
  if (!fileExists(providerDir)) {
    return {
      passed: false,
      errors: [`Provider directory not found: ${providerDir}`],
      warnings: [],
    };
  }
  
  // Run all validations
  validateDefaultsFile(ctx);
  validateIndexFile(ctx);
  validateModelsDirectory(ctx);
  
  return {
    passed: ctx.errors.length === 0,
    errors: ctx.errors,
    warnings: ctx.warnings,
  };
}

function main() {
  const providerId = process.argv[2];
  
  if (!providerId) {
    console.error('Usage: npx tsx registry/tests/validate-provider.ts <provider_id>');
    process.exit(1);
  }
  
  console.log(`\n🧪 Validating provider: ${providerId}\n`);
  console.log('─'.repeat(50));
  
  const result = runValidation(providerId);
  
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
