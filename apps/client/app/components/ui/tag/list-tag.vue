<script setup lang="ts">
import type { Tag } from '~/stores/tag';
import CardWrapper from '~/components/core/card-wrapper/index.vue';
import TagComponent from '~/components/ui/tag/tag.vue';

const { tags = [] } = defineProps<{
  tags?: Tag[];
}>();
</script>

<template>
  <CardWrapper>
    <section class="flex flex-col gap-y-4">
      <h2 class="flex gap-x-2 text-2xl"><span>&#x1F3F7;&#xFE0F;</span>Categories</h2>
      <div v-if="true">
        <p>Comming soon...</p>
      </div>
      <ul v-else class="flex gap-2 flex-wrap items-end">
        <li v-for="tag in tags" :key="tag.id" class="transition duration-150 hover:-translate-y-1">
          <TagComponent :tag="tag" />
        </li>
      </ul>
    </section>
  </CardWrapper>
</template>
