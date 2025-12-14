import { ref } from 'vue';
import { defineStore } from 'pinia';

interface Post {
  id: number | string;
  title: string;
  slug: string;
  readingMinutes?: number;
  excerpt?: string;
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TagStatistic {
  id: string;
  name: string;
  icon?: string;
  label: string;
  postCount: number;
}

export type SummaryPost = Pick<Post, 'id' | 'title' | 'slug' | 'readingMinutes' | 'excerpt' | 'publishedAt'>;

export const usePostStore = defineStore('post', () => {
  const summaryPosts = ref<SummaryPost[]>([]);
  const postDetail = ref<Post | null>(null);
  const postLoading = ref(false);
  const tagStatistics = ref<TagStatistic[]>([]);

  function fetchSummaryPosts() {
    summaryPosts.value = [
      {
        id: 1,
        title: 'The Computed Inlining Refactoring Pattern in Vue',
        slug: 'computed-inlining-refactoring-pattern',
        excerpt:
          'This post discusses the Computed Inlining Refactoring Pattern in Vue, which can help improve performance and readability of your Vue components.',
        publishedAt: new Date('2023-01-01'),
      },
      {
        id: 2,
        title: 'Are LLMs Creative?',
        slug: 'are-llms-creative',
        excerpt:
          'This post explores the question of whether large language models (LLMs) can be considered creative, discussing various perspectives and implications.',
        publishedAt: new Date('2023-01-02'),
      },
      {
        id: 3,
        title: 'The Inline Vue Composables Refactoring pattern',
        slug: 'inline-vue-composables-refactoring-pattern',
        excerpt:
          'This post discusses the Inline Vue Composables Refactoring pattern, which can help improve the organization and readability of your Vue components.',
        publishedAt: new Date('2023-01-03'),
      },
      {
        id: 4,
        title: 'The Vue Composition API Refactoring Pattern',
        slug: 'vue-composition-api-refactoring-pattern',
        excerpt:
          'This post discusses the Vue Composition API Refactoring pattern, which can help improve the organization and readability of your Vue components.',
        publishedAt: new Date('2023-01-04'),
      },
      {
        id: 5,
        title: 'The Vue 3.0 Refactoring Pattern',
        slug: 'vue-3-refactoring-pattern',
        excerpt:
          'This post discusses the Vue 3.0 Refactoring pattern, which can help improve the organization and readability of your Vue components.',
        publishedAt: new Date('2023-01-05'),
      },
    ];
  }

  function fetchTagStatistics() {
    tagStatistics.value = [
      {
        id: '1',
        name: 'vue',
        icon: 'logos:vue',
        label: 'Vue',
        postCount: 10,
      },
      {
        id: '2',
        name: 'javascript',
        icon: 'logos:javascript',
        label: 'JavaScript',
        postCount: 5,
      },
      {
        id: '3',
        name: 'css',
        icon: 'logos:css-3',
        label: 'CSS',
        postCount: 3,
      },
      {
        id: '4',
        name: 'html',
        icon: 'logos:html-5',
        label: 'HTML',
        postCount: 2,
      },
      {
        id: '5',
        name: 'typescript',
        icon: 'logos:typescript-icon',
        label: 'TypeScript',
        postCount: 1,
      },
      {
        id: '6',
        name: 'react',
        icon: 'logos:react',
        label: 'React',
        postCount: 4,
      },
      {
        id: '6',
        name: 'angular',
        icon: 'logos:angular-icon',
        label: 'Angular',
        postCount: 2,
      },
      {
        id: '7',
        name: 'nodejs',
        icon: 'logos:nodejs-icon',
        label: 'Node.js',
        postCount: 3,
      },
      {
        id: '8',
        name: 'express',
        label: 'Express',
        postCount: 2,
      },
      {
        id: '9',
        name: 'mongodb',
        icon: 'logos:mongodb-icon',
        label: 'MongoDB',
        postCount: 1,
      },
      {
        id: '10',
        name: 'graphql',
        icon: 'logos:graphql',
        label: 'GraphQL',
        postCount: 2,
      },
      {
        id: '11',
        name: 'rest-api',
        label: 'REST API',
        postCount: 3,
      },
      {
        id: '12',
        name: 'websocket',
        icon: 'logos:websocket',
        label: 'WebSocket',
        postCount: 1,
      },
      {
        id: '13',
        name: 'firebase',
        icon: 'logos:firebase',
        label: 'Firebase',
        postCount: 2,
      },
      {
        id: '14',
        name: 'aws',
        icon: 'logos:aws',
        label: 'AWS',
        postCount: 1,
      },
    ];
  }

  function setSummaryPosts(list: SummaryPost[]) {
    summaryPosts.value = list;
  }

  function setPostDetail(detail: Post) {
    postDetail.value = detail;
  }

  function setPostLoading(loading: boolean) {
    postLoading.value = loading;
  }

  return {
    summaryPosts,
    postDetail,
    postLoading,
    tagStatistics,
    fetchSummaryPosts,
    fetchTagStatistics,
    setSummaryPosts,
    setPostDetail,
    setPostLoading,
  };
});
