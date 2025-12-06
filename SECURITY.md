# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.x.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of Silkboard seriously. If you believe you have found a security vulnerability, please report it to us as described below.

**Please do not report security vulnerabilities through public GitHub issues.**

### How to Report

Send an email to **admin@silkboard.dev** with:

1. **Description** of the vulnerability
2. **Steps to reproduce** the issue
3. **Potential impact** of the vulnerability
4. **Any suggested fixes** (optional)

### What to Expect

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 7 days
- **Resolution Timeline**: Depends on severity, typically 30-90 days

### Disclosure Policy

- We will work with you to understand and resolve the issue quickly
- We will keep you informed of our progress
- We will credit you in the security advisory (unless you prefer to remain anonymous)

## Security Best Practices

When using Silkboard:

1. **Never commit API keys** - Use environment variables
2. **Keep dependencies updated** - Run `npm audit` regularly
3. **Use budget limits** - Protect against runaway costs
4. **Review model outputs** - Don't blindly trust LLM responses

Thank you for helping keep Silkboard and its users safe!
