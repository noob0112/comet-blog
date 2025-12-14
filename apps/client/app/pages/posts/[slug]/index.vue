<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const { locale } = useI18n();

console.log('Route params slug:', route.params.slug);

const { data: page } = await useAsyncData(route.path, () => {
  const result = queryCollection('posts')
    .where('locale', '=', locale.value)
    .where('slug', '=', route.params.slug)
    .first();
  return result;
});
</script>

<template>
  <div class="content-container prose max-w-full">
    <ContentRenderer v-if="page" :value="page" />
    <div v-else>Content not found</div>
  </div>
</template>

<style scoped lang="scss">
.content-container {
  scroll-behavior: smooth;
}
</style>
