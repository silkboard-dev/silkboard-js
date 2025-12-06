# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Plugin architecture with `createSilkboard()` factory
- `reasoningPlugin()` for unified reasoning across providers
- `costPlugin()` for cost tracking and analytics
- Subpath exports for tree-shaking (`silkboard/core`, `silkboard/plugins/*`)
- Smart routing with 5 strategies (shuffle, latency, cost, round-robin, weighted)
- Budget management per user/team
- Support for 12+ LLM providers

### Changed
- Migrated from monolithic `Silkboard` class to plugin-based `SilkboardCore`
- Updated to AI SDK v6 beta

## [0.1.0] - 2025-01-XX

### Added
- Initial release
- Multi-provider support (OpenAI, Anthropic, Google, Groq, xAI, Cerebras, Cohere)
- Unified reasoning configuration
- YAML-based model and role configuration
- Cost tracking with pricing registry
- Voyage AI and Cohere reranking support
- Anthropic prompt caching support
- Role-based model selection with variants

[Unreleased]: https://github.com/silkboard-dev/silkboard-js/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/silkboard-dev/silkboard-js/releases/tag/v0.1.0
