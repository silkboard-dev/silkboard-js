# Contributing to Silkboard

Thank you for your interest in contributing to Silkboard! 🎉

## Getting Started

```bash
# Clone the repo
git clone https://github.com/silkboard-dev/silkboard-js.git
cd silkboard-js

# Install dependencies
npm install

# Run tests
npm test

# Type check
npm run typecheck

# Build
npm run build
```

## Development Workflow

1. **Fork** the repository
2. **Create a branch** for your feature: `git checkout -b feature/my-feature`
3. **Make your changes** and add tests
4. **Run tests**: `npm test`
5. **Commit** with a descriptive message
6. **Push** to your fork and open a **Pull Request**

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new reasoning provider
fix: correct cost calculation for cached tokens
docs: update README examples
chore: update dependencies
test: add unit tests for router
```

## Code Style

- TypeScript strict mode
- No `any` types unless absolutely necessary
- Add JSDoc comments for public APIs
- Keep functions small and focused

## Testing

- Write tests for new features
- Ensure existing tests pass
- Aim for meaningful coverage, not 100%

## Questions?

Open an issue or start a discussion on GitHub.

---

By contributing, you agree that your contributions will be licensed under the Apache 2.0 License.
