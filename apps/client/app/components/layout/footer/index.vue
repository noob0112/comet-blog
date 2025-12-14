<script setup lang="ts">
import { Icon } from '~/components/core';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const mySocialInfos = {
  github: {
    href: 'https://github.com/noob0112',
    label: () => t('footer.github'),
    icon: 'ant-design:github-outlined',
  },
  linkedin: {
    href: '',
    label: () => t('footer.linkedin'),
    icon: 'ant-design:linkedin-outlined',
  },
  email: {
    href: 'mailto:hoang011220@gmail.com',
    label: () => t('footer.email'),
    icon: 'ant-design:mail-outlined',
  },
};
</script>

<template>
  <footer>
    <div class="divider mt-0"></div>

    <section class="flex flex-col md:flex-row justify-center items-center gap-4 text-center md:text-left">
      <p>
        <small>{{ $t('footer.copyright', { year: 2025 }) }}</small>
      </p>

      <!-- <div>
        <a
          href="/rss.xml"
          class="inline-flex items-center px-4 py-1 border border-primary text-primary rounded-full hover:bg-primary hover:text-base-content transition"
          aria-label="Subscribe via RSS"
        >
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M6.18 17.82a2.18 2.18 0 1 1 0-4.36 2.18 2.18 0 0 1 0 4.36zm4.37.73a.91.91 0 0 1-.91-.91c0-3.43-2.79-6.22-6.22-6.22a.91.91 0 0 1 0-1.82c4.46 0 8.05 3.63 8.05 8.05 0 .5-.41.91-.91.91zm4.37.73a.91.91 0 0 1-.91-.91c0-6.14-5-11.14-11.14-11.14a.91.91 0 1 1 0-1.82c7.16 0 12.95 5.79 12.95 12.95 0 .5-.41.91-.91.91z"
            />
          </svg>
          Subscribe via RSS
        </a>
      </div> -->

      <nav :aria-label="$t('footer.socialLinks')" class="flex space-x-4 text-(--color-base-content)">
        <a
          v-for="(mySocialInfo, socialPlatform) in mySocialInfos"
          :key="socialPlatform"
          :href="mySocialInfo.href"
          :aria-label="mySocialInfo.label()"
          target="_blank"
        >
          <Icon :icon="mySocialInfo.icon" width="24" height="24" class="hover:text-primary"></Icon>
        </a>
      </nav>
    </section>

    <!-- <section class="flex flex-col justify-center items-center gap-y-2 mt-4">
      <p class="inline-flex items-center justify-center gap-1">
        <span aria-hidden="true">©</span>
        <span class="text-xs px-1 rounded" aria-hidden="true">cc</span>
        <span
          >Content licensed under <abbr title="Creative Commons Attribution 4.0 International">CC BY 4.0</abbr></span
        >
      </p>
      <p>
        <a href="/imprint" class="hover:underline">Imprint</a> |
        <a href="/privacy" class="hover:underline">Data Privacy</a>
      </p>
    </section> -->
  </footer>
</template>
