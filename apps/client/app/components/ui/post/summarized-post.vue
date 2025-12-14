<script setup lang="ts">
import type { SummaryPost } from '~/stores/post';

const { post } = defineProps<{
  post: SummaryPost;
}>();
</script>

<template>
  <article class="introduction-post flex flex-col sm:flex-row justify-between flex-wrap gap-y-4">
    <NuxtLink class="sm:max-w-[80%]">
      <h2 class="content-center order-1break-words text-xl hover:text-primary">{{ post.title }}</h2>
    </NuxtLink>
    <span class="self-end sm:self-center shrink-0 order-3 sm:order-2 text-sm">
      {{ new Intl.DateTimeFormat('en-CA').format(post.publishedAt) }}</span
    >
    <p class="w-full order-2 sm:order-3">{{ post.excerpt }}</p>
  </article>
</template>
