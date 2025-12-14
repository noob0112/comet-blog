<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-8">Color System Test</h1>

    <!-- Primary Colors -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Primary Colors (Indigo)</h2>
      <div class="grid grid-cols-11 gap-2">
        <div
          v-for="shade in [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]"
          :key="shade"
          :style="{ backgroundColor: `var(--color-primary-${shade})` }"
          class="h-20 rounded flex items-end justify-center p-2"
        >
          <span :class="shade >= 600 ? 'text-white' : 'text-black'" class="text-xs">{{ shade }}</span>
        </div>
      </div>
    </section>

    <!-- Secondary Colors -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Secondary Colors (Slate)</h2>
      <div class="grid grid-cols-11 gap-2">
        <div
          v-for="shade in [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]"
          :key="shade"
          :style="{ backgroundColor: `var(--color-secondary-${shade})` }"
          class="h-20 rounded flex items-end justify-center p-2"
        >
          <span :class="shade >= 600 ? 'text-white' : 'text-black'" class="text-xs">{{ shade }}</span>
        </div>
      </div>
    </section>

    <!-- Semantic Colors -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Semantic Colors</h2>
      <div class="grid grid-cols-4 gap-4">
        <div
          v-for="color in ['success', 'warning', 'error', 'info']"
          :key="color"
          :style="{ backgroundColor: `var(--color-${color})` }"
          class="h-32 rounded flex items-center justify-center text-white font-semibold capitalize"
        >
          {{ color }}
        </div>
      </div>
    </section>

    <!-- Typography Test -->
    <section class="mb-8 prose max-w-none">
      <h2>Typography with Prose</h2>
      <p>This is a paragraph with <a href="#">a link</a> and <code>inline code</code> to test the prose colors.</p>
      <blockquote>This is a blockquote to test the quote styling.</blockquote>
      <pre><code>const test = 'code block';</code></pre>
    </section>

    <!-- Current Theme Colors -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Current Theme</h2>
      <div class="grid grid-cols-3 gap-4">
        <div class="p-4 rounded border" :style="{ backgroundColor: 'var(--color-background)' }">
          <div class="font-semibold">Background</div>
          <div class="text-sm text-secondary">--color-background</div>
        </div>
        <div class="p-4 rounded border" :style="{ backgroundColor: 'var(--color-surface)' }">
          <div class="font-semibold">Surface</div>
          <div class="text-sm text-secondary">--color-surface</div>
        </div>
        <div class="p-4 rounded border" :style="{ backgroundColor: 'var(--color-primary)' }">
          <div class="font-semibold text-white">Primary</div>
          <div class="text-sm text-white opacity-80">--color-primary</div>
        </div>
      </div>
    </section>

    <!-- CSS Variable Values -->
    <section>
      <h2 class="text-xl font-semibold mb-4">CSS Variable Values</h2>
      <div class="bg-surface p-4 rounded font-mono text-sm space-y-1">
        <div v-for="varName in cssVars" :key="varName">
          <span class="text-secondary-600">{{ varName }}:</span>
          <span class="text-primary-700">{{ getCSSVarValue(varName) }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const cssVars = ref([
  '--color-primary-600',
  '--color-secondary-900',
  '--color-success-600',
  '--color-warning-600',
  '--color-error-600',
  '--color-info-600',
  '--color-accent-600',
  '--color-background',
  '--color-text',
]);

const getCSSVarValue = (varName: string) => {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
};

onMounted(() => {
  console.log('Color System Check:');
  cssVars.value.forEach((varName) => {
    console.log(`${varName}: ${getCSSVarValue(varName)}`);
  });
});
</script>
