import tailwindcss from '@tailwindcss/vite';

// const githubConfig = {
//   studioGithubClientId: process.env.STUDIO_GITHUB_CLIENT_ID || '',
//   studioGithubClientSecret: process.env.STUDIO_GITHUB_CLIENT_SECRET || '',
// };
const config = {
  baseURL: process.env.BASE_URL || '/',
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: config.baseURL,
    head: {
      htmlAttrs: {
        'data-theme': 'light',
      },
    },
  },
  css: ['~/assets/css/app.css'],
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/icon', '@pinia/nuxt', '@nuxtjs/i18n', '@nuxt/content', 'nuxt-studio'],
  router: {
    options: {
      strict: false,
    },
  },
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en/index.ts',
      },
      {
        code: 'vi',
        name: 'Tiếng Việt',
        file: 'vi.json',
      },
    ],
    defaultLocale: 'en',
    langDir: 'locales',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
    },
  },
  content: {
    experimental: { nativeSqlite: true },
  },
  studio: {
    route: '/admin',
    // Git repository configuration (owner and repo are required)
    repository: {
      provider: 'github', // 'github' or 'gitlab'
      owner: 'your-username', // your GitHub/GitLab username or organization
      repo: 'your-repo', // your repository name
      branch: 'main', // the branch to commit to (default: 'main')
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
