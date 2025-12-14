import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Tag {
  id: string;
  slug: string;
  icon?: string;
  label: string;
  postCount?: number;
}

export const useTagStore = defineStore('tag', () => {
  const tags = ref<Tag[]>([]);

  function fetchTags() {
    tags.value = [
      {
        id: '1',
        slug: 'vue',
        icon: 'logos:vue',
        label: 'Vue',
        postCount: 10,
      },
      {
        id: '2',
        slug: 'javascript',
        icon: 'logos:javascript',
        label: 'JavaScript',
        postCount: 5,
      },
      {
        id: '3',
        slug: 'css',
        icon: 'logos:css-3',
        label: 'CSS',
        postCount: 3,
      },
      {
        id: '4',
        slug: 'html',
        icon: 'logos:html-5',
        label: 'HTML',
        postCount: 2,
      },
      {
        id: '5',
        slug: 'typescript',
        icon: 'logos:typescript-icon',
        label: 'TypeScript',
        postCount: 1,
      },
      {
        id: '6',
        slug: 'react',
        icon: 'logos:react',
        label: 'React',
        postCount: 4,
      },
      {
        id: '6',
        slug: 'angular',
        icon: 'logos:angular-icon',
        label: 'Angular',
        postCount: 2,
      },
      {
        id: '7',
        slug: 'nodejs',
        icon: 'logos:nodejs-icon',
        label: 'Node.js',
        postCount: 3,
      },
      {
        id: '8',
        slug: 'express',
        icon: 'logos:express',
        label: 'Express',
        postCount: 2,
      },
      {
        id: '9',
        slug: 'mongodb',
        icon: 'logos:mongodb-icon',
        label: 'MongoDB',
        postCount: 1,
      },
      {
        id: '10',
        slug: 'graphql',
        icon: 'logos:graphql',
        label: 'GraphQL',
        postCount: 2,
      },
      {
        id: '11',
        slug: 'rest-api',
        label: 'REST API',
        postCount: 3,
      },
      {
        id: '12',
        slug: 'websocket',
        icon: 'logos:websocket',
        label: 'WebSocket',
        postCount: 1,
      },
      {
        id: '13',
        slug: 'firebase',
        icon: 'logos:firebase',
        label: 'Firebase',
        postCount: 2,
      },
      {
        id: '14',
        slug: 'aws',
        icon: 'logos:aws',
        label: 'AWS',
        postCount: 1,
      },
      {
        id: '15',
        slug: 'docker',
        icon: 'logos:docker-icon',
        label: 'Docker',
        postCount: 2,
      },
      {
        id: '16',
        slug: 'kubernetes',
        icon: 'logos:kubernetes',
        label: 'Kubernetes',
        postCount: 1,
      },
      {
        id: '17',
        slug: 'scss',
        icon: 'logos:sass',
        label: 'SCSS',
        postCount: 2,
      },

      {
        id: '18',
        slug: 'tailwind',
        icon: 'logos:tailwindcss-icon',
        label: 'Tailwind CSS',
        postCount: 3,
      },
      {
        id: '19',
        slug: 'vuetify',
        icon: 'logos:vuetifyjs',
        label: 'Vuetify',
        postCount: 1,
      },
      {
        id: '20',
        slug: 'php',
        icon: 'logos:php',
        label: 'PHP',
        postCount: 2,
      },
      {
        id: '21',
        slug: 'laravel',
        icon: 'logos:laravel',
        label: 'Laravel',
        postCount: 1,
      },
      {
        id: '22',
        slug: 'python',
        icon: 'logos:python',
        label: 'Python',
        postCount: 2,
      },
      {
        id: '23',
        slug: 'cakephp',
        icon: 'logos:cakephp',
        label: 'CakePHP',
        postCount: 1,
      },
      {
        id: '24',
        slug: 'jquery',
        icon: 'logos:jquery',
        label: 'jQuery',
        postCount: 2,
      },
      {
        id: '25',
        slug: 'mysql',
        icon: 'logos:mysql',
        label: 'MySQL',
        postCount: 1,
      },
      {
        id: '26',
        slug: 'gcp',
        icon: 'material-icon-theme:gcp',
        label: 'Google Cloud Platform',
        postCount: 2,
      },
      {
        id: '27',
        slug: 'nuxtjs',
        icon: 'logos:nuxt-icon',
        label: 'Nuxt.js',
        postCount: 1,
      },
      {
        id: '28',
        slug: 'google-calendar-api',
        icon: 'logos:google-calendar',
        label: 'Google Calendar API',
        postCount: 2,
      },
    ];
  }

  return {
    tags,
    fetchTags,
  };
});
