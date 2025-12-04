import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  SilkboardEventEmitter,
  generateRequestId,
  createEventEmitter,
} from '../../../src/events';
import type { StartEvent, CompleteEvent, ErrorEvent } from '../../../src/types';

describe('SilkboardEventEmitter', () => {
  let emitter: SilkboardEventEmitter;

  beforeEach(() => {
    emitter = new SilkboardEventEmitter();
  });

  describe('on', () => {
    it('should register an event handler', () => {
      const handler = vi.fn();
      emitter.on('start', handler);

      expect(emitter.listenerCount('start')).toBe(1);
    });

    it('should allow multiple handlers for the same event', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      emitter.on('start', handler1);
      emitter.on('start', handler2);

      expect(emitter.listenerCount('start')).toBe(2);
    });

    it('should not add duplicate handlers', () => {
      const handler = vi.fn();

      emitter.on('start', handler);
      emitter.on('start', handler);

      // Set doesn't allow duplicates
      expect(emitter.listenerCount('start')).toBe(1);
    });
  });

  describe('off', () => {
    it('should remove an event handler', () => {
      const handler = vi.fn();
      emitter.on('start', handler);
      emitter.off('start', handler);

      expect(emitter.listenerCount('start')).toBe(0);
    });

    it('should not throw when removing non-existent handler', () => {
      const handler = vi.fn();
      expect(() => emitter.off('start', handler)).not.toThrow();
    });
  });

  describe('emit', () => {
    it('should call registered handlers with event data', () => {
      const handler = vi.fn();
      emitter.on('start', handler);

      const event: StartEvent = {
        requestId: 'req_123',
        model: 'gpt-4o',
        provider: 'openai',
        role: 'answer',
        variant: 'balanced',
        timestamp: new Date(),
      };

      emitter.emit('start', event);

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(event);
    });

    it('should call all handlers for an event', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      emitter.on('complete', handler1);
      emitter.on('complete', handler2);

      const event: CompleteEvent = {
        requestId: 'req_123',
        model: 'gpt-4o',
        provider: 'openai',
        latencyMs: 500,
        usage: {
          inputTokens: 100,
          outputTokens: 50,
        },
        timestamp: new Date(),
      };

      emitter.emit('complete', event);

      expect(handler1).toHaveBeenCalledWith(event);
      expect(handler2).toHaveBeenCalledWith(event);
    });

    it('should not throw when emitting with no handlers', () => {
      const event: StartEvent = {
        requestId: 'req_123',
        model: 'gpt-4o',
        provider: 'openai',
        timestamp: new Date(),
      };

      expect(() => emitter.emit('start', event)).not.toThrow();
    });

    it('should isolate handler errors', () => {
      const errorHandler = vi.fn(() => {
        throw new Error('Handler error');
      });
      const successHandler = vi.fn();

      // Spy on console.error to suppress output during test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      emitter.on('error', errorHandler);
      emitter.on('error', successHandler);

      const event: ErrorEvent = {
        requestId: 'req_123',
        model: 'gpt-4o',
        provider: 'openai',
        error: new Error('Test error'),
        willRetry: false,
        timestamp: new Date(),
      };

      // Should not throw
      expect(() => emitter.emit('error', event)).not.toThrow();

      // Both handlers should be called
      expect(errorHandler).toHaveBeenCalled();
      expect(successHandler).toHaveBeenCalled();

      // Error should be logged
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('removeAllListeners', () => {
    it('should remove all handlers for a specific event', () => {
      emitter.on('start', vi.fn());
      emitter.on('start', vi.fn());
      emitter.on('complete', vi.fn());

      emitter.removeAllListeners('start');

      expect(emitter.listenerCount('start')).toBe(0);
      expect(emitter.listenerCount('complete')).toBe(1);
    });

    it('should remove all handlers when no event specified', () => {
      emitter.on('start', vi.fn());
      emitter.on('complete', vi.fn());
      emitter.on('error', vi.fn());

      emitter.removeAllListeners();

      expect(emitter.listenerCount('start')).toBe(0);
      expect(emitter.listenerCount('complete')).toBe(0);
      expect(emitter.listenerCount('error')).toBe(0);
    });
  });

  describe('listenerCount', () => {
    it('should return 0 for events with no handlers', () => {
      expect(emitter.listenerCount('start')).toBe(0);
    });

    it('should return correct count', () => {
      emitter.on('start', vi.fn());
      emitter.on('start', vi.fn());

      expect(emitter.listenerCount('start')).toBe(2);
    });
  });

  describe('hasListeners', () => {
    it('should return false when no handlers registered', () => {
      expect(emitter.hasListeners('start')).toBe(false);
    });

    it('should return true when handlers registered', () => {
      emitter.on('start', vi.fn());
      expect(emitter.hasListeners('start')).toBe(true);
    });
  });
});

describe('generateRequestId', () => {
  it('should generate unique IDs', () => {
    const id1 = generateRequestId();
    const id2 = generateRequestId();

    expect(id1).not.toBe(id2);
  });

  it('should start with req_ prefix', () => {
    const id = generateRequestId();
    expect(id).toMatch(/^req_/);
  });

  it('should contain timestamp', () => {
    const before = Date.now();
    const id = generateRequestId();
    const after = Date.now();

    // Extract timestamp from ID (format: req_<timestamp>_<random>)
    const parts = id.split('_');
    const timestamp = parseInt(parts[1], 10);

    expect(timestamp).toBeGreaterThanOrEqual(before);
    expect(timestamp).toBeLessThanOrEqual(after);
  });

  it('should have correct format', () => {
    const id = generateRequestId();
    // Format: req_<timestamp>_<random>
    expect(id).toMatch(/^req_\d+_[a-z0-9]+$/);
  });
});

describe('createEventEmitter', () => {
  it('should create a new SilkboardEventEmitter instance', () => {
    const emitter = createEventEmitter();
    expect(emitter).toBeInstanceOf(SilkboardEventEmitter);
  });
});
