<script setup lang="ts">
import { Icon } from '~/components/core';
import { useI18n } from 'vue-i18n';
import { COPY_RIGHT_YEAR, AuthorInfo } from '~/constants';

const { t } = useI18n();

const mySocialInfos = {
  github: {
    href: AuthorInfo.GITHUB,
    label: () => t('footer.github'),
    icon: 'ant-design:github-outlined',
  },
  linkedin: {
    href: '#',
    label: () => t('footer.linkedin'),
    icon: 'ant-design:linkedin-outlined',
  },
  email: {
    href: `mailto:${AuthorInfo.EMAIL}`,
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
        <small>{{ $t('footer.copyright', { year: COPY_RIGHT_YEAR }) }}</small>
      </p>

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
  </footer>
</template>
