# Navigation and Routing

## Critical Rule: Always Use NuxtLink

Despite using custom Vue Router, this is still a Nuxt application. Use Nuxt's navigation components for proper integration with i18n and middleware.

## Correct Navigation Patterns

✅ **Use NuxtLink for all internal links:**

```vue
<template>
  <!-- Simple link -->
  <NuxtLink to="/about">About</NuxtLink>

  <!-- With dynamic route -->
  <NuxtLink :to="`/posts/${post.slug}`">{{ post.title }}</NuxtLink>

  <!-- With query params -->
  <NuxtLink :to="{ path: '/search', query: { q: 'nuxt' } }">Search</NuxtLink>
</template>
```

❌ **Avoid RouterLink:**

```vue
<!-- DON'T do this -->
<RouterLink to="/about">About</RouterLink>
```

## Router Middleware

- Global locale middleware (`app/middleware/locale.global.ts`) automatically preserves locale when navigating between pages
- Uses Nuxt's `defineNuxtRouteMiddleware` for seamless integration with i18n module
- Automatically adds locale prefix (e.g., `/vi`) when navigating from localized pages
- Reads locale from `useI18n()` composable and `i18n_locale` cookie
- Runs globally for all route changes (`.global.ts` suffix ensures automatic registration)
- Works with both programmatic navigation (`navigateTo`) and `NuxtLink` components

## Programmatic Navigation

When navigating programmatically, prefer Nuxt's `navigateTo`:

```typescript
// ✅ Recommended
await navigateTo('/about');
await navigateTo({ path: '/posts', query: { page: 2 } });

// ⚠️ Acceptable but less preferred
router.push('/about');
```
