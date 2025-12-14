<template>
  <div class="card-wrapper"><slot /></div>
</template>

<style scoped lang="scss">
.card-wrapper {
  background-color: var(--color-base-100);
  border: 1px solid var(--color-base-300);
  border-radius: var(--radius-lg);
  padding: var(--card-padding, 1.5rem);
}
</style>
