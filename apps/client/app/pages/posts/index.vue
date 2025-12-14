<script setup lang="ts">
import PostCard from '~/components/ui/post/post-card.vue';

import { usePostStore } from '~/stores/post';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const postStore = usePostStore();
const { setSummaryPosts } = postStore;
const { summaryPosts } = storeToRefs(postStore);

const route = useRoute();
const { data } = await useAsyncData(route.path, () => {
  return queryCollection('posts')
    .select('id', 'title', 'slug', 'description', 'publishedAt')
    .where('locale', '=', locale.value)
    .all();
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
</script>

<template>
  <div>
    <div class="prose max-w-full mb-6">
      <h1 class="mb-0">Posts &#9999;&#65039;</h1>
      <p class="mt-0"><i>All the articles I've posted.</i></p>
    </div>
    <ul class="flex flex-col gap-y-8">
      <li v-for="post in summaryPosts" :key="post.id">
        <PostCard :post="post" />
      </li>
    </ul>
  </div>
</template>
