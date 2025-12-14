<template>
  <NuxtLink
    :to="switchLocalePath(nextLocale)"
    class="language-switcher"
    :aria-label="$t('language.toggle')"
    :title="$t('language.toggle')"
  >
    <Icon v-if="locale === 'en'" icon="circle-flags:vn" width="20" height="20" />
    <Icon v-else icon="circle-flags:us" width="20" height="20" />
  </NuxtLink>
</template>

<script setup lang="ts">
import { Icon } from '~/components/core';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const { locale, availableLocales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const nextLocale = computed(() => {
  const currentIndex = availableLocales.indexOf(locale.value);
  const nextIndex = (currentIndex + 1) % availableLocales.length;
  return availableLocales[nextIndex];
});
</script>

<style scoped>
.language-switcher {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: var(--spacing-sm);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.language-switcher:hover {
  background-color: var(--color-surface-hover);
  border-color: var(--color-primary-light);
}

.language-switcher:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.1);
}

.language-switcher:active {
  transform: scale(0.95);
}
</style>
