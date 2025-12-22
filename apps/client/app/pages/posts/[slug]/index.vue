<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import TableOfContents from '~/components/ui/post/table-of-contents.vue';

const route = useRoute();
const { locale } = useI18n();

const { data: page } = await useAsyncData(
  `post-${route.params.slug}-${locale.value}`,
  () => {
    const result = queryCollection('posts')
      .where('locale', '=', locale.value)
      .where('slug', '=', route.params.slug)
      .first();
    return result;
  },
  {
    getCachedData: (key) => {
      return useNuxtData(key).data.value;
    },
  },
);
</script>

<template>
  <div class="post-layout">
    <article class="content-container prose max-w-full">
      <ContentRenderer v-if="page" :value="page" />
      <div v-else>Content not found</div>
    </article>
    <aside class="toc-sidebar">
      <TableOfContents :toc="page?.body?.toc" />
    </aside>
  </div>
</template>

<style scoped lang="scss">
.post-layout {
  display: flex;
  gap: 1rem;
  align-items: start;

  @media (max-width: 1023px) {
    flex-direction: column;
  }
}

.toc-sidebar {
  position: sticky;
  top: 5rem;
  align-self: flex-start;
  flex: 0 0 240px;

  @media (max-width: 1023px) {
    position: static;
    flex: none;
    width: 100%;
    order: -1;
  }
}

.content-container {
  scroll-behavior: smooth;
}
</style>
