<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

import PostsCard from '~/components/ui/post/posts-card.vue';
import ListTag from '~/components/ui/tag/list-tag.vue';
import { CardWrapper } from '~/components/core';

import { usePostStore } from '~/stores/post';
import { useTagStore } from '~/stores/tag';
import { AuthorInfo } from '~/constants';

const { t, locale } = useI18n();
const route = useRoute();

const postStore = usePostStore();
const { summaryPosts } = storeToRefs(postStore);
const { setSummaryPosts } = postStore;
const { data } = await useAsyncData(route.path, () => {
  const result = queryCollection('posts')
    .select('id', 'title', 'slug', 'description', 'publishedAt')
    .where('locale', '=', locale.value)
    .order('publishedAt', 'DESC')
    .limit(5)
    .all();
  return result;
});

setSummaryPosts(
  data.value?.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    readingMinutes: 10,
    excerpt: post.description,
    publishedAt: post.publishedAt ? new Date(post.publishedAt) : undefined,
  })) || [],
);

const tagStore = useTagStore();
const { tags } = storeToRefs(tagStore);
const { fetchTags } = tagStore;
fetchTags();
</script>

<template>
  <div class="home-page">
    <!-- Hero Section -->
    <CardWrapper class="introduction-hero">
      <div class="content prose-sm sm:prose">
        <h1 class="greeting font-black">
          <span class="-emoji">👋</span>
          {{ t('home.greeting', { name: AuthorInfo.NICK_NAME }) }}
        </h1>
        <p class="description">{{ t('home.intro') }}</p>
        <p class="description">{{ t('home.contentTypes') }}</p>
        <p class="description">{{ t('home.closing') }}</p>
        <p class="signature">{{ t('home.signature', { name: AuthorInfo.NICK_NAME }) }}</p>
      </div>
    </CardWrapper>

    <PostsCard :posts="summaryPosts" />

    <ListTag :tags="tags" />
  </div>
</template>

<style scoped lang="scss">
.home-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 100%;
}

/* Hero Section */
.introduction-hero {
  border: none;
  background: linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-accent-50) 100%);

  & .content {
    max-width: 100%;
  }

  & .greeting {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);

    & .-emoji {
      font-size: var(--font-size-3xl);
    }
  }

  & .description {
    color: var(--color-text);
  }

  & .signature {
    font-style: italic;
    color: var(--color-text-secondary);
  }
}

/* Section */
.home-page > .-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);

  & .-section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & .-section-title {
    font-size: var(--font-size-2xl);
    font-weight: 700;
    color: var(--color-text);
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }
}

/* Posts Card */
.-posts-card {
  :deep(.el-card__body) {
    padding: 0;
  }

  :deep(.el-card__footer) {
    padding: var(--spacing-lg) var(--spacing-xl);
    border-top: 1px solid var(--color-border);
  }

  & .-view-all {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: var(--font-size-base);
    font-weight: 500;
    color: var(--color-primary);
    text-decoration: none;
    transition: color var(--transition-base);

    &:hover {
      color: var(--color-primary-dark);
    }
  }
}

/* Post Item */
.post-item {
  border-bottom: 1px solid var(--color-border);
  padding: var(--spacing-lg) var(--spacing-xl);
  transition: background-color var(--transition-base);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: var(--color-surface-hover);
  }

  & .-link {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: var(--spacing-lg);
    text-decoration: none;
    color: inherit;

    & .-title {
      font-size: var(--font-size-lg);
      font-weight: 500;
      color: var(--color-text);
      margin: 0;
      flex: 1;
      transition: color var(--transition-base);
      line-height: var(--line-height-normal);
    }

    & .-date {
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
      flex-shrink: 0;
    }

    &:hover .-title {
      color: var(--color-primary);
    }
  }
}

/* Tags Card */
.-tags-card {
  :deep(.el-card__body) {
    padding: var(--spacing-xl);
  }

  & .-tag-link {
    text-decoration: none;
    color: inherit;
    transition: color var(--transition-base);

    &:hover {
      color: var(--color-primary);
    }
  }
}

/* Dark mode adjustments */
:deep(html[data-theme='dark']),
:deep(.dark-mode) {
  .introduction-hero {
    background: linear-gradient(135deg, var(--color-primary-950) 0%, var(--color-accent-950) 100%);
  }
}

/* Responsive */
@media (max-width: 640px) {
  .introduction-hero {
    :deep(.el-card__body) {
      padding: var(--spacing-xl);
    }

    & .greeting {
      & .-emoji {
        font-size: var(--font-size-2xl);
      }
    }

    & .description,
    & .signature {
      font-size: var(--font-size-base);
    }
  }

  .post-item {
    padding: var(--spacing-md) var(--spacing-lg);

    & .-link {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--spacing-sm);

      & .-title {
        font-size: var(--font-size-base);
      }
    }
  }

  .-posts-card {
    :deep(.el-card__footer) {
      padding: var(--spacing-md) var(--spacing-lg);
    }
  }

  .-tags-card {
    :deep(.el-card__body) {
      padding: var(--spacing-lg);
    }
  }
}
</style>
