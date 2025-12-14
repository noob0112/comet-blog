# Architecture Decisions

This document details the core architectural decisions for the Nuxt blog project.

## Custom Router Over Nuxt Pages Auto-routing

- **Does NOT use** Nuxt's file-based routing despite having a `pages/` directory
- Uses Vue Router manually configured in `app/router/index.ts` with modular route definitions
- Route modules are in `app/router/modules/` (e.g., `posts.ts`, `home.ts`)
- Pages in `app/pages/` exist but are imported via `component: () => import('~/pages/...')` in route config
- Files prefixed with `_` (e.g., `_detail-post.vue`, `_pagination-post.vue`) are route components, not Nuxt conventions

## State Management Pattern

- Pinia stores in `app/stores/` follow domain-based organization (`post/`, `tag/`)
- Currently using **mock data** in store fetch functions (see `fetchSummaryPosts()`, `fetchTagStatistics()`)
- Use Composition API pattern with `defineStore()` and `ref()` for state
- Export typed interfaces for state objects (e.g., `SummaryPost`, `TagStatistic`)

## Component Organization

```text
app/components/
├── core/index.ts          # Central exports for shared components & Iconify
├── layout/                # Header/Footer layout components
└── ui/                    # Feature-specific UI components (post, tag, search)
```

**Important:** Import shared components from `~/components/core` barrel export, NOT directly from libraries.

Example:

```typescript
import { LanguageSwitcher, Icon, CardWrapper } from '~/components/core';
```

## UI Framework Configuration

- Uses **Tailwind CSS v4** with **DaisyUI** plugin for styling
- Custom design tokens defined in `app/assets/css/variables.css` using HSL color system
- DaisyUI configured with light/dark themes in `app.css`
- Tailwind utility classes extend custom CSS properties (see `tailwind.config.js`)
- No component library like PrimeVue or Element Plus - uses custom components

## Routing Behavior

- Custom scroll behavior configured in `app/router/index.ts`
- SSR/client history switches via `createMemoryHistory()` vs `createWebHistory()`
- All routes have `meta.ssr` property (currently mixed true/false values)

## Layout System

- Uses Nuxt's `<NuxtLayout>` and `<NuxtPage>` in `app.vue`
- Default layout (`layouts/default.vue`) has sticky header, centered max-w-4xl content, footer
- RouterView from Vue Router, NOT NuxtPage, is used in layouts
