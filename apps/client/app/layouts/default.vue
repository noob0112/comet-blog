<script setup lang="ts">
import LayoutFooter from '~/components/layout/footer/index.vue';
import LayoutHeader from '~/components/layout/header/index.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <LayoutHeader class="sticky top-0" />
    <main class="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
      <slot />
    </main>
    <LayoutFooter class="max-w-6xl w-full mx-auto p-4" />
  </div>
</template>
