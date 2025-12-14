<script setup lang="ts">
import { NuxtLink } from '#components';
import { Icon } from '~/components/core';
import type { Tag } from '~/stores/tag';

type TagProps = Pick<Tag, 'slug' | 'label' | 'icon' | 'postCount'>;

interface Props {
  tag: TagProps;
  tooltip?: boolean;
  disabled?: boolean;
  isLink?: boolean;
  displayLabel?: boolean;
  displayPostCount?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isLink: true,
  tooltip: true,
  disabled: false,
  displayLabel: true,
  displayPostCount: true,
});

const { tag, isLink, displayLabel, displayPostCount } = props;

const tagClass = 'flex items-center gap-x-1 flex-wrap-0 font-medium h-[unset]';
</script>

<template>
  <button class="post-tag btn btn-xs" :disabled="props.disabled">
    <component :is="isLink ? NuxtLink : 'span'" :to="`/tags/${tag.slug}`" :class="[tagClass]" :data-tip="tag.label">
      <Icon v-if="tag.icon" :icon="`${tag.icon}`" alt="Tag icon" :aria-label="`${tag.label} icon`" class="w-4 h-4" />
      <p v-if="displayLabel" class="text-sm leading-none">{{ tag.label }}</p>
      <span v-if="displayPostCount" class="text-xs opacity-75">({{ tag.postCount }})</span>
    </component>
  </button>
</template>

<style scoped lang="scss">
.post-tag {
  border-radius: calc(infinity * 1px);
}

.post-tag:not([disabled='true']) {
  &:hover {
    background-color: color-mix(in oklab, var(--btn-color, var(--color-base-200)), #000 7%);
  }
}
</style>
