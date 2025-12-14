# Key Integration Points

## Notion Content Rendering

- Uses `vue3-notion` for rendering Notion pages
- Import pattern in post detail pages:

```typescript
import { NotionRenderer, getPageBlocks } from 'vue3-notion';
import 'vue3-notion/dist/style.css';
import 'prismjs/themes/prism.css'; // Code highlighting
import 'katex/dist/katex.min.css'; // Math rendering
```

- Fetch blocks client-side in `onMounted()` hook
- Notion page IDs are currently hardcoded (see `_detail-post.vue`)
