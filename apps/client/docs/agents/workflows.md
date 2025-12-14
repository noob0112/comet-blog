# Development Workflows

## Package Management

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server on localhost:3000
pnpm build            # Production build
pnpm generate         # Static site generation
```

## Code Quality

```bash
pnpm lint:eslint      # ESLint (auto-fix enabled)
pnpm lint:prettier    # Prettier formatting
pnpm lint:lint-staged # Pre-commit linting (Husky hooks configured)
```

**Linting Rules:**

- ESLint config extends `.nuxt/eslint.config.mjs` with Prettier integration
- Prettier rules override ESLint at the end of `eslint.config.mjs`
- Lint-staged runs on pre-commit for `.js`, `.ts`, `.vue`, `.json`, `.md` files

## Commit Conventions

- Uses Conventional Commits via `commitlint` and `czg`
- Scopes auto-generated from `app/` directory names (singular form, e.g., `component`, `layout`, `page`)
- Enforced commit types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`
- Example: `feat(post): add pagination support`
