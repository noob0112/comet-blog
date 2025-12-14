<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { homeRoute, aboutRoute, postRoute } from '~/router';
import MenuItem from './menu-item.vue';

const localePath = useLocalePath();

interface MenuItem {
  key: string;
  path: string;
  active: boolean;
}

const route = useRoute();
const router = useRouter();

const menu = ref<MenuItem[]>([
  {
    key: 'home',
    path: homeRoute.path,
    active: false,
  },
  {
    key: 'about',
    path: aboutRoute.path,
    active: false,
  },
  {
    key: 'posts',
    path: localePath({ name: postRoute.name }),
    active: false,
  },
]);

updateMenuActive(router.currentRoute.value.path);

function updateMenuActive(currentPath: string) {
  menu.value.forEach((item) => {
    if (item.path === homeRoute.path) {
      item.active = item.path === currentPath;
    } else {
      item.active = currentPath.startsWith(item.path);
    }
  });
}

watch(
  () => route.fullPath,
  async () => {
    updateMenuActive(router.currentRoute.value.path);
  },
);
</script>

<template>
  <header class="app-header">
    <nav class="navbar max-w-4xl mx-auto flex items-center justify-between gap-x-4">
      <ul class="menu menu-horizontal gap-2">
        <li v-for="menuItem in menu" :key="menuItem.path">
          <MenuItem :active="menuItem.active" :label="$t(`common.${menuItem.key}`)" :path="menuItem.path" />
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  background-color: var(--color-base-100);
  border-bottom: 1px solid var(--color-base-300);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 40;
  transition: all var(--transition-base);
}

.navbar {
  padding: var(--spacing-md) var(--spacing-lg);
}

:deep(.p-menubar-item-content) {
  padding: 0.5rem 0.75rem;
}
</style>
