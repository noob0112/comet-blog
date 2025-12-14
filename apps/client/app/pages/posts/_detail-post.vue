<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { NotionRenderer, getPageBlocks } from 'vue3-notion';

import 'vue3-notion/dist/style.css';
import 'prismjs/themes/prism.css';
import 'katex/dist/katex.min.css';

const data = ref();

if (import.meta.env.SSR) {
  // SSR is not supported for Notion content
}

onMounted(async () => {
  data.value = await getPageBlocks('1dd304a12f83808689efd51e51bb1f84');
});

// const { data } = useGetPageBlocks('1dd304a12f83808689efd51e51bb1f84');
// import { onMounted, ref } from 'vue';

// const highlightedHtml = ref('');

// onMounted(async () => {
//   const response = await fetch('/api/render-code');
//   const data = await response.json();
//   highlightedHtml.value = data.html;
// });
</script>

<template>
  <NotionRenderer v-if="data" :block-map="data" full-page />

  <!-- eslint-disable-next-line vue/no-v-html -->
  <!-- <div v-html="highlightedHtml"></div> -->
</template>
