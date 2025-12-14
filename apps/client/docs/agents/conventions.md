# Conventions & Patterns

## Semantic HTML Best Practices

**Always use semantic HTML elements** to improve accessibility, SEO, and code maintainability:

### Common Semantic Elements

- `<header>` - Page or section headers
- `<nav>` - Navigation sections
- `<main>` - Main content of the page
- `<article>` - Self-contained content
- `<section>` - Thematic grouping of content
- `<aside>` - Sidebar or related content
- `<footer>` - Page or section footers
- `<h1>-<h6>` - Headings (never skip levels, e.g., don't jump from h1 to h3)
- `<button>` - Clickable actions (not `<div>` or `<span>`)
- `<a>` - Links (not buttons)
- `<ul>`, `<ol>`, `<li>` - Lists (not `<div>` alternatives)
- `<form>`, `<input>`, `<label>`, `<textarea>`, `<select>` - Form elements
- `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` - Tabular data

### Anti-patterns to Avoid

❌ Don't use `<div>` for navigation - use `<nav>`
❌ Don't use `<span>` for buttons - use `<button>`
❌ Don't use `<div>` for clickable elements - use `<a>` or `<button>`
❌ Don't use `<div>` for lists - use `<ul>`, `<ol>`, `<li>`
❌ Don't skip heading levels (h1 → h2 → h3, not h1 → h3)

### Example: Proper Semantic Structure

```vue
<template>
  <header class="app-header">
    <nav class="navbar">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>

  <main class="main-content">
    <article class="post">
      <h1>Article Title</h1>
      <p>Content here...</p>
    </article>
  </main>

  <footer class="app-footer">
    <p>&copy; 2025 Blog Name</p>
  </footer>
</template>
```

## TypeScript Configuration

- Separate `tsconfig.json` for server code in `server/`
- Use `#app` and `#imports` for Nuxt auto-imports in composables/plugins

## Styling

- Tailwind CSS v4 via Vite plugin (`@tailwindcss/vite`)
- Typography plugin configured (`@tailwindcss/typography`)
- PrimeUI integration via `tailwindcss-primeui`
- Global styles in `app/assets/css/app.css`

## File Naming

- Vue components: PascalCase (e.g., `PostCard.vue`)
- Route component files: kebab-case with `_` prefix (e.g., `_detail-post.vue`)
- Store files: `index.ts` in domain folders
- Router modules: kebab-case (e.g., `posts.ts`)

## Import Aliases

- `~` or `@` → `app/` directory
- `#app`, `#imports` → Nuxt auto-imports
