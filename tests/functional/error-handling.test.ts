import { describe, it, expect } from 'vitest';
import { SilkboardError, SilkboardErrorCode } from '../../src/errors';

/**
 * Unit tests for SilkboardError class.
 * Tests error creation, codes, and context.
 */
describe('SilkboardError', () => {
  describe('error creation', () => {
    it('should have correct error code for model not found', () => {
      const error = SilkboardError.modelNotFound('unknown-model');
      expect(error.code).toBe(SilkboardErrorCode.MODEL_NOT_FOUND);
      expect(error.message).toContain('unknown-model');
    });

    it('should include context in API key missing error', () => {
      const error = SilkboardError.apiKeyMissing('openai', 'OPENAI_API_KEY');
      expect(error.code).toBe(SilkboardErrorCode.API_KEY_MISSING);
      expect(error.context?.provider).toBe('openai');
      expect(error.context?.envKey).toBe('OPENAI_API_KEY');
    });

    it('should be instanceof Error', () => {
      const error = SilkboardError.requestInvalid('Test error');
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(SilkboardError);
    });

    it('should have correct name', () => {
      const error = SilkboardError.requestInvalid('Test');
      expect(error.name).toBe('SilkboardError');
    });
  });

  describe('error codes', () => {
    it('should create config not loaded error', () => {
      const error = SilkboardError.configNotLoaded('roles');
      expect(error.code).toBe(SilkboardErrorCode.CONFIG_INVALID);
      expect(error.message).toContain('Roles');
    });

    it('should create provider not available error', () => {
      const error = SilkboardError.providerNotAvailable('anthropic');
      expect(error.code).toBe(SilkboardErrorCode.PROVIDER_NOT_AVAILABLE);
      expect(error.context?.provider).toBe('anthropic');
    });

    it('should create request failed error with cause', () => {
      const cause = new Error('Network error');
      const error = SilkboardError.requestFailed('API call failed', cause);
      expect(error.code).toBe(SilkboardErrorCode.REQUEST_FAILED);
      expect(error.cause).toBe(cause);
    });
  });

  describe('error serialization', () => {
    it('should include code in JSON output', () => {
      const error = SilkboardError.modelNotFound('test-model');
      const json = JSON.stringify(error);
      const parsed = JSON.parse(json);
      expect(parsed.code).toBe(SilkboardErrorCode.MODEL_NOT_FOUND);
    });

    it('should include context in JSON output', () => {
      const error = SilkboardError.apiKeyMissing('openai', 'OPENAI_API_KEY');
      const json = JSON.stringify(error);
      const parsed = JSON.parse(json);
      expect(parsed.context.provider).toBe('openai');
    });
  });
});
