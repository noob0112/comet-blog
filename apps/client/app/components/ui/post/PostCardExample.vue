<template>
  <section class="post-card surface">
    <div class="flex items-start justify-between gap-x-4">
      <div class="flex-1">
        <NuxtLink :to="path" class="no-underline">
          <h3 class="heading-3 text-text hover:text-primary transition-fast">{{ title }}</h3>
        </NuxtLink>
        <p class="text-sm text-secondary mt-sm">{{ formattedDate }}</p>
        <p class="text-text mt-md">{{ excerpt }}</p>
      </div>
    </div>
    <NuxtLink :to="path" class="inline-block mt-lg text-primary font-medium hover:text-primary-dark transition-fast">
      Read more →
    </NuxtLink>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { formatDistanceToNow } from 'date-fns';

interface Props {
  title: string;
  excerpt: string;
  date: Date | string | number;
  path: string;
}

const props = defineProps<Props>();

const formattedDate = computed(() => {
  return formatDistanceToNow(new Date(props.date), { addSuffix: true });
});
</script>

<style scoped>
.post-card {
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  transition: all var(--transition-base);
}

.post-card:hover {
  border-color: var(--color-primary-light);
  background-color: var(--color-surface-hover);
  box-shadow: var(--shadow-md);
}

.heading-3 {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  line-height: var(--line-height-normal);
  color: var(--color-text);
}

.text-secondary {
  color: var(--color-text-secondary);
}

.text-primary {
  color: var(--color-primary);
}

.text-primary-dark {
  color: var(--color-primary-dark);
}

.transition-fast {
  transition: color var(--transition-fast);
}

/* Using Tailwind theme variables */
.mt-sm {
  margin-top: var(--spacing-sm);
}

.mt-md {
  margin-top: var(--spacing-md);
}

.mt-lg {
  margin-top: var(--spacing-lg);
}

.gap-x-4 {
  gap: var(--spacing-lg);
}

.font-medium {
  font-weight: 500;
}
</style>
