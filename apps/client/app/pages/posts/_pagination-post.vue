<script setup lang="ts">
// import SummarizedPost from '~/components/ui/post/summarized-post.vue';

// import { usePostStore } from '~/stores/post';
// import { storeToRefs } from 'pinia';

// const postStore = usePostStore();
// const { fetchSummaryPosts } = postStore;
// const { summaryPosts } = storeToRefs(postStore);
// fetchSummaryPosts();
</script>

<template>
  <div class="prose max-w-full mb-6">
    <h1 class="mb-0">Posts &#9999;&#65039;</h1>
    <p class="mt-0"><i>All the articles I've posted.</i></p>
  </div>
  <!-- <ul class="flex flex-col"> -->
  <!-- <li v-for="post in summaryPosts" :key="post.id">
      <SummarizedPost :post="post" />
      <div class="divider"></div>
    </li> -->
  <!-- </ul> -->
</template>
