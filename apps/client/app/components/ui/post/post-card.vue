<script setup lang="ts">
import { NuxtLink } from '#components';
import type { SummaryPost } from '~/stores/post';
import { postDetailRoute } from '~/router';

const localePath = useLocalePath();

const { post } = defineProps<{
  post: SummaryPost;
}>();

const readMin = 10;

function formatDate(date: Date): string {
  return date.toDateString();
}
</script>

<template>
  <NuxtLink :to="localePath({ name: postDetailRoute.name, params: { slug: post.slug } })">
    <div class="card card-border shadow-md bg-base-100">
      <div class="card-body prose max-w-full">
        <article class="introduction-post flex flex-col justify-between">
          <h2 class="title content-center m-0! font-black">{{ post.title }}</h2>
          <p v-if="post.publishedAt" class="font-bold text-primary text-sm uppercase mt-1! mb-2">
            <!-- {{ new Intl.DateTimeFormat('en-CA').format(post.publishedAt) }}</span -->
            {{ formatDate(post.publishedAt) }} • {{ readMin }} min read
          </p>
          <p class="w-full order-2 sm:order-3 m-0!">{{ post.excerpt }}</p>
        </article>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.card {
  &:hover {
    .title {
      color: var(--color-primary);
    }
  }
}
</style>
