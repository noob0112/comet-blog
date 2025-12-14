# Agent Instructions for Nuxt Blog

This is the main entry point for AI agents working on this Nuxt blog project. For detailed information, see the modular documentation in `docs/agents/`:

- **[Architecture Decisions](docs/agents/architecture.md)** - Routing, state management, components, UI framework
- **[Theme System](docs/agents/theme.md)** - HSL color system, design tokens, dark/light mode
- **[Internationalization](docs/agents/i18n.md)** - Multi-language support, translation files
- **[Navigation & Routing](docs/agents/navigation.md)** - NuxtLink usage, middleware, programmatic navigation
- **[Conventions & Patterns](docs/agents/conventions.md)** - Semantic HTML, TypeScript, styling, file naming
- **[Development Workflows](docs/agents/workflows.md)** - Package management, code quality, commits
- **[Key Integrations](docs/agents/integrations.md)** - Notion rendering and other integrations
- **[Implementation Status](docs/agents/status.md)** - Completed features and known incomplete areas
- **[Documentation Guidelines](docs/agents/documentation-guidelines.md)** - How to update docs when making changes

## Project Overview

This is a Nuxt 3 blog application with custom Vue Router configuration, Pinia state management, Tailwind CSS with DaisyUI for styling, and Notion integration for content rendering. The project uses **pnpm** as the package manager and has strict linting/commit conventions.

## Quick Reference

### Most Important Rules

1. **Always use NuxtLink** (not RouterLink) for internal links - see [Navigation](docs/agents/navigation.md)
2. **Use semantic HTML** - see [Conventions](docs/agents/conventions.md#semantic-html-best-practices)
3. **Update documentation immediately** after code changes - see [Documentation Guidelines](docs/agents/documentation-guidelines.md)
4. **Import from barrel exports** - `import { Button } from '~/components/core'` not from libraries directly

### Common Patterns

```typescript
// Theme
import { useTheme } from '~/theme/useTheme';
const { currentMode, toggleTheme } = useTheme();

// i18n
const { t } = useI18n();
const message = t('common.readMore');

// Components
import { LanguageSwitcher, Icon, CardWrapper } from '~/components/core';
```

### Essential Commands

```bash
pnpm dev              # Start dev server (port 3000)
pnpm lint:eslint      # Run ESLint
pnpm lint:prettier    # Format code
```

---

**For detailed information on specific topics, always refer to the modular documentation in `docs/agents/` listed above.**
