<script setup lang="ts">
import { clearError } from '#app';

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[50vh] gap-y-8">
    <div class="text-center">
      <h1 class="heading-1 text-primary">404</h1>
      <h2 class="heading-2 mt-4">{{ $t('404.title') }}</h2>
      <p class="text-secondary mt-4">{{ $t('404.message') }}</p>
    </div>
    <NuxtLink to="/" class="interactive text-primary font-medium" @click="handleError">
      {{ $t('404.backToHome') }}
    </NuxtLink>
  </div>
</template>
