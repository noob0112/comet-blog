<script setup lang="ts">
const props = defineProps<{ title: string }>();
</script>

<template>
  <DefaultLayout>
    <slot name="header"> </slot>
    <h1>
      <slot name="title">{{ props.title }}</slot>
    </h1>
    <slot name="content" />
  </DefaultLayout>
</template>
