# Theme System

A comprehensive, reusable design system with:

- **HSL CSS Variables** for all theme colors (88 color variables across 8 color families)
- **Color Scale**: Primary, Secondary, Success, Warning, Error, Info, Accent, Neutral (each with 50-950 shades)
- **Composable** `useTheme()` for reactive theme management with localStorage persistence
- **Utility Classes** for common styling patterns
- **Light/Dark modes** with automatic system preference detection
- **Core location**: `app/assets/css/` with `variables.css` (color definitions), `app.css` (prose overrides), and `utilities.css`
- **Config location**: `app/theme/config.ts` for TypeScript theme configuration

## Theme Structure

```text
app/assets/css/
├── variables.css      # 88 HSL color variables (primary-50 to primary-950, etc.)
├── utilities.css      # Reusable utility classes for colors, backgrounds, borders
└── app.css           # Prose plugin overrides with custom color mappings

app/theme/
├── config.ts         # TypeScript theme config with getCSSVar helper
├── useTheme.ts       # Vue composable for theme switching
└── (Theme plugin in app/plugins/theme.ts)
```

## Color System Organization

- **Primary (Indigo)**: `--color-primary-{50,100,200,...,950}` - Main brand colors
- **Secondary (Slate/Gray)**: `--color-secondary-{50,100,200,...,950}` - Neutral text/surface colors
- **Semantic**: `--color-success-*`, `--color-warning-*`, `--color-error-*`, `--color-info-*` - Status colors
- **Accent (Cyan)**: `--color-accent-{50,100,200,...,950}` - Highlight colors
- **Neutral (True Gray)**: `--color-neutral-{50,100,200,...,950}` - Pure grayscale fallback

## Tailwind Typography (Prose) Overrides

- All prose elements (headings, links, code, blockquotes, tables) use design system colors
- Light mode: Dark text on light backgrounds with indigo links
- Dark mode: Light text on dark backgrounds with lighter indigo links
- Code blocks and blockquotes styled with appropriate background colors

## Theme Usage

```typescript
// In components
import { useTheme } from '~/theme/useTheme';
const { currentMode, toggleTheme } = useTheme();

// In CSS
background-color: var(--color-surface);
padding: var(--spacing-md);
border-radius: var(--radius-md);
color: var(--color-primary-600);
```

Key component: `<ThemeSwitcher />` enables dark/light mode toggle
