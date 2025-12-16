<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface FlattedTocItem {
  id: string;
  text: string;
  level: number;
}

interface TocItem {
  id: string;
  text: string;
  depth: number;
  children?: TocItem[];
}

interface Toc {
  depth: number;
  searchDepth: number;
  links: TocItem[];
  title: string;
}

const props = defineProps<{ toc?: Toc }>();
const tocItems = ref<FlattedTocItem[]>(flattedToc(props.toc?.links || []));
const activeId = ref<string>('');
const observer = ref<IntersectionObserver | null>(null);

function flattedToc(items: TocItem[], result: FlattedTocItem[] = []): FlattedTocItem[] {
  for (const item of items) {
    result.push({ id: item.id, text: item.text, level: item.depth });
    if (item.children && item.children.length > 0) {
      flattedToc(item.children, result);
    }
  }

  return result;
}

function updateActiveId(id: string) {
  activeId.value = id;
}

onMounted(() => {
  // Set up intersection observer for active section highlighting
  const observerOptions = {
    rootMargin: '-80px 0px -80% 0px',
    threshold: 0,
  };

  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeId.value = entry.target.id;
      }
    });
  }, observerOptions);

  // Observe all headings based on TOC items
  tocItems.value.forEach((item) => {
    const element = document.getElementById(item.id);
    if (element) {
      observer.value?.observe(element);
    }
  });
});

onUnmounted(() => {
  observer.value?.disconnect();
});

const getIndentClass = (level: number) => {
  const indentMap: Record<number, string> = {
    1: 'pl-0',
    2: 'pl-0',
    3: 'pl-4 border-l border-base-300',
    4: 'pl-6',
    5: 'pl-8',
    6: 'pl-10',
  };
  return indentMap[level] || 'pl-0';
};

const hasItems = computed(() => tocItems.value.length > 0);
</script>

<template>
  <nav v-if="hasItems" class="toc-container" aria-label="Table of Contents">
    <header class="toc-header">
      <h2 class="toc-title">Table of Contents</h2>
    </header>
    <ol class="toc-list">
      <li v-for="item in tocItems" :key="item.id" :class="[getIndentClass(item.level)]" class="toc-item">
        <a
          :href="`#${item.id}`"
          :class="{ active: activeId === item.id }"
          class="toc-link"
          @click="updateActiveId(item.id)"
        >
          {{ item.text }}
        </a>
      </li>
    </ol>
  </nav>
</template>

<style scoped lang="scss">
.toc-container {
  position: sticky;
  top: 5rem;
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
  padding: 0;
  background-color: transparent;
}

.toc-header {
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-base-300);
}

.toc-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-base-content);
  opacity: 0.8;
  letter-spacing: 0.025em;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.toc-item {
  margin: 0;
  position: relative;

  // Add bullet symbols before items
  &::before {
    content: '◆';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-base-content);
    opacity: 0.4;
    font-size: 0.625rem;
    line-height: 1.6;
  }

  // Different symbol for level 3+
  &.pl-4::before {
    content: '○';
    left: 1rem;
  }

  &.pl-6::before {
    content: '○';
    left: 1.5rem;
  }

  &.pl-8::before {
    content: '○';
    left: 2rem;
  }

  &.pl-10::before {
    content: '○';
    left: 2.5rem;
  }
}

.toc-link {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.25rem 0.5rem 0.25rem 0.75rem;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--color-base-content);
  opacity: 0.65;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.15s ease;
  font-weight: 400;
  border-left: 2px solid transparent;

  &:hover {
    opacity: 1;
    color: var(--color-primary);
    padding-left: 1.5rem;
  }

  &.active {
    opacity: 1;
    color: var(--color-primary);
    font-weight: 500;
  }
}
/*
.pl-6 .toc-link {
  padding-left: 2.75rem;

  &:hover {
    padding-left: 3rem;
  }
}

.pl-8 .toc-link {
  padding-left: 3.25rem;

  &:hover {
    padding-left: 3.5rem;
  }
}

.pl-10 .toc-link {
  padding-left: 3.75rem;

  &:hover {
    padding-left: 4rem;
  }
} */

/* Scrollbar styling */
.toc-container {
  scrollbar-width: thin;
  scrollbar-color: var(--color-base-300) transparent;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-base-300);
    border-radius: 2px;

    &:hover {
      background-color: var(--color-base-content);
    }
  }
}

/* Responsive design */
@media (max-width: 1024px) {
  .toc-container {
    position: relative;
    top: 0;
    max-height: none;
    margin-bottom: var(--spacing-lg);
  }
}
</style>
