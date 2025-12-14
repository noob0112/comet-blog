<script setup lang="ts">
import { NuxtLink } from '#components';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
  path: {
    type: String,
    required: false,
    default: '',
  },
});
</script>

<template>
  <NuxtLink :to="props.path" :class="[{ 'menu-active': props.active }]">
    {{ props.label }}
  </NuxtLink>
</template>

<style scoped lang="scss"></style>
