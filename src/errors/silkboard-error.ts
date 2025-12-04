import { SilkboardErrorCode, ERROR_MESSAGES } from './codes';

export class SilkboardError extends Error {
  public readonly code: SilkboardErrorCode;
  public readonly cause?: Error;
  public readonly context?: Record<string, unknown>;

  constructor(
    code: SilkboardErrorCode,
    message?: string,
    cause?: Error,
    context?: Record<string, unknown>
  ) {
    const errorMessage = message || ERROR_MESSAGES[code];
    super(errorMessage);
    
    this.name = 'SilkboardError';
    this.code = code;
    this.cause = cause;
    this.context = context;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SilkboardError);
    }
  }

  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      context: this.context,
      cause: this.cause ? {
        name: this.cause.name,
        message: this.cause.message,
        stack: this.cause.stack,
      } : undefined,
      stack: this.stack,
    };
  }

  toString(): string {
    let str = `${this.name}: ${this.code} - ${this.message}`;
    
    if (this.context && Object.keys(this.context).length > 0) {
      str += `\nContext: ${JSON.stringify(this.context, null, 2)}`;
    }
    
    if (this.cause) {
      str += `\nCaused by: ${this.cause.toString()}`;
    }
    
    return str;
  }

  // Static factory methods for common errors
  static configNotFound(path?: string): SilkboardError {
    return new SilkboardError(
      SilkboardErrorCode.CONFIG_NOT_FOUND,
      `Configuration file not found: ${path}`,
      undefined,
      { path }
    );
  }

  static configInvalid(details?: string): SilkboardError {
    return new SilkboardError(
      SilkboardErrorCode.CONFIG_INVALID,
      `Configuration file is invalid: ${details}`,
      undefined,
      { details }
    );
  }

  static modelNotFound(alias: string): SilkboardError {
    return new SilkboardError(
      SilkboardErrorCode.MODEL_NOT_FOUND,
      `Model not found: ${alias}`,
      undefined,
      { alias }
    );
  }

  static providerNotAvailable(provider: string): SilkboardError {
    return new SilkboardError(
      SilkboardErrorCode.PROVIDER_NOT_AVAILABLE,
      `Provider not available: ${provider}`,
      undefined,
      { provider }
    );
  }

  static apiKeyMissing(provider: string, envKey: string): SilkboardError {
    return new SilkboardError(
      SilkboardErrorCode.API_KEY_MISSING,
      `API key not found for provider '${provider}'. Set the ${envKey} environment variable.`,
      undefined,
      { provider, envKey }
    );
  }

  static modelTypeMismatch(alias: string, expectedType: string, actualType: string): SilkboardError {
    return new SilkboardError(
      SilkboardErrorCode.MODEL_TYPE_MISMATCH,
      `Model '${alias}' is not a ${expectedType} model (type: ${actualType})`,
      undefined,
      { alias, expectedType, actualType }
    );
  }

  static requestInvalid(details: string): SilkboardError {
    return new SilkboardError(
      SilkboardErrorCode.REQUEST_INVALID,
      `Request parameters are invalid: ${details}`,
      undefined,
      { details }
    );
  }

  static requestFailed(alias: string, cause: Error): SilkboardError {
    return new SilkboardError(
      SilkboardErrorCode.REQUEST_FAILED,
      `Request failed for model: ${alias}`,
      cause,
      { alias }
    );
  }

  static internalError(message: string, cause?: Error): SilkboardError {
    return new SilkboardError(
      SilkboardErrorCode.INTERNAL_ERROR,
      message,
      cause
    );
  }

  static roleNotFound(role: string): SilkboardError {
    return new SilkboardError(
      SilkboardErrorCode.ROLE_NOT_FOUND,
      `Role not found: ${role}`,
      undefined,
      { role }
    );
  }

  static variantNotFound(role: string, variant: string): SilkboardError {
    return new SilkboardError(
      SilkboardErrorCode.ROLE_NOT_FOUND,
      `Variant '${variant}' not found for role '${role}'`,
      undefined,
      { role, variant }
    );
  }

  static configNotLoaded(type: 'models' | 'roles'): SilkboardError {
    return new SilkboardError(
      SilkboardErrorCode.CONFIG_INVALID,
      `${type.charAt(0).toUpperCase() + type.slice(1)} config not loaded`,
      undefined,
      { configType: type }
    );
  }

  static roleRequiresVariant(role: string): SilkboardError {
    return new SilkboardError(
      SilkboardErrorCode.REQUEST_INVALID,
      `Role '${role}' has variants. Please specify a variant.`,
      undefined,
      { role }
    );
  }
}
