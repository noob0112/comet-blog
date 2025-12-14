<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import CardWrapper from '~/components/core/card-wrapper/index.vue';
import type { SummaryPost } from '~/stores/post';

const { posts = [] } = defineProps<{
  posts?: SummaryPost[];
}>();

const { t } = useI18n();

const formatDate = (date: Date | number) => {
  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
};
</script>

<template>
  <CardWrapper>
    <section class="posts-section transition-shadow">
      <!-- <header class="header"> -->
      <h2 class="section-title">
        <span class="emoji">📝</span>
        {{ t('home.latestPosts') }}
      </h2>
      <!-- </header> -->

      <ul class="posts-list">
        <li v-for="post in posts" :key="post.id" class="item">
          <article class="post-card">
            <NuxtLink :to="`/posts/${post.slug}`" class="post-link">
              <h3 class="post-title">{{ post.title }}</h3>
              <time v-if="post.publishedAt" class="post-date" :datetime="new Date(post.publishedAt).toISOString()">
                {{ formatDate(post.publishedAt) }}
              </time>
            </NuxtLink>
          </article>
        </li>
      </ul>

      <footer class="footer">
        <NuxtLink to="/posts" class="view-all-link"> {{ t('home.viewAllPosts') }} → </NuxtLink>
      </footer>
    </section>
  </CardWrapper>
</template>

<style scoped lang="scss">
.posts-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.emoji {
  font-size: 1.5rem;
}

.posts-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;

  .item {
    margin: 0;
    border-bottom: 1px solid var(--color-border);
    padding: 1.25rem 0;

    &:first-child {
      border-top: 1px solid var(--color-border);
    }
  }
}

.post-card {
  /* padding: 1.25rem 0; */
  transition: all var(--transition-base);
  transition-duration: 0.2s;

  &:hover {
    padding-left: 0.5rem;
  }
}

.post-link {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
}

.post-link:hover .post-title {
  color: var(--color-primary);
}

.post-title {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--color-text);
  margin: 0;
  flex: 1;
  transition: color var(--transition-base);
  line-height: 1.5;
}

.post-date {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
}

.view-all-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-primary-600);
  text-decoration: none;
  transition: color var(--transition-base);
}

.view-all-link:hover {
  color: var(--color-primary-700);
}

@media (max-width: 640px) {
  .post-link {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .post-title {
    font-size: 1rem;
  }

  .post-date {
    font-size: 0.8125rem;
  }
}
</style>
