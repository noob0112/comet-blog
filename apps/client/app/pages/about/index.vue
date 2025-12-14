<script setup lang="ts">
import TagComponent from '~/components/ui/tag/tag.vue';
import type { Tag } from '~/stores/tag';

type TechStack = Pick<Tag, 'slug' | 'label' | 'icon'>;

interface DateObject {
  year: number;
  month?: number;
  day?: number;
}

interface Experience {
  startDate: DateObject;
  endDate?: DateObject;
  companyInfo?: {
    name: string;
    url?: string;
    logo: string;
  };
  position: string;
  descriptions: string[];
  techStacks?: TechStack[];
}

const experiences: Experience[] = [
  {
    startDate: {
      year: 2021,
    },
    companyInfo: {
      name: 'Self-working',
      logo: '/self-working-logo.png',
    },
    position: 'Full Stack Web Developer',
    descriptions: [
      'I have been working as a self learning developer for many years. I do small projects to serve my work in life and also to improve my skills.',
    ],
  },
  {
    startDate: { year: 2022, month: 8 },
    companyInfo: {
      name: 'Azoom Inc.',
      logo: '/logos/azoom.png',
    },
    position: 'Full Stack Web Developer',
    descriptions: [
      'Azoom is a solution that transforms idle assets into active ones through the power of IT. Began as a Japanese parking lot management and leasing company with an online platform for monthly reservations. It has since expanded to online reservations for rental spaces, such as conference rooms and gyms, and to match advertisers with outdoor advertising providers',
      'My job is to understand how things work both on the backend, frontend and GCP, and then maintain and develop new features for the main platform.',
    ],
    techStacks: [
      {
        slug: 'git',
        icon: 'logos:git-icon',
        label: 'Git',
      },
      {
        slug: 'php',
        icon: 'logos:php',
        label: 'PHP',
      },
      {
        slug: 'cakephp',
        icon: 'logos:cakephp-icon',
        label: 'CakePHP',
      },
      {
        slug: 'javascript',
        icon: 'logos:javascript',
        label: 'JavaScript',
      },
      {
        slug: 'vue',
        label: 'Vue.js',
        icon: 'logos:vue',
      },
      {
        slug: 'nuxtjs',
        icon: 'logos:nuxt-icon',
        label: 'Nuxt.js',
      },
      {
        slug: 'scss',
        icon: 'logos:sass',
        label: 'SCSS',
      },
      {
        slug: 'vuetify',
        icon: 'logos:vuetifyjs',
        label: 'Vuetify',
      },
      {
        slug: 'nodejs',
        icon: 'devicon:nodejs',
        label: 'Node.js',
      },
      {
        slug: 'firebase',
        icon: 'logos:firebase',
        label: 'Firebase',
      },
      {
        slug: 'mysql',
        icon: 'logos:mysql',
        label: 'MySQL',
      },
      {
        slug: 'docker',
        icon: 'logos:docker-icon',
        label: 'Docker',
      },
      {
        slug: 'gcp',
        icon: 'material-icon-theme:gcp',
        label: 'Google Cloud Platform',
      },
      {
        slug: 'google-calendar-api',
        icon: 'logos:google-calendar',
        label: 'Google Calendar API',
      },
      {
        slug: 'nginx',
        icon: 'logos:nginx',
        label: 'Nginx',
      },
    ],
  },
  {
    startDate: { year: 2022, month: 5 },
    endDate: { year: 2022, month: 8 },
    companyInfo: {
      name: 'Freelance',
      url: 'https://www.freelance.com',
      logo: '/vite.svg',
    },
    position: 'Backend Developer',
    descriptions: [
      'My job is to understand how things work both on the backend and on the frontend, and then integrate some Natural Language Processing services into the main platform.',
    ],
    techStacks: [
      {
        slug: 'git',
        icon: 'logos:git-icon',
        label: 'Git',
      },
      {
        slug: 'javascript',
        label: 'JavaScript',
        icon: 'logos:javascript',
      },
      {
        slug: 'typescript',
        label: 'TypeScript',
        icon: 'logos:typescript-icon',
      },
      {
        slug: 'nodejs',
        label: 'Node.js',
        icon: 'devicon:nodejs',
      },
      {
        slug: 'nestjs',
        label: 'NestJS',
        icon: 'logos:nestjs',
      },
      {
        slug: 'mongodb',
        label: 'MongoDB',
        icon: 'logos:mongodb-icon',
      },
      {
        slug: 'jest',
        label: 'JestJs',
        icon: 'logos:jest',
      },
    ],
  },
];

function formatDateFull(date: DateObject): string {
  if (!date.year) {
    return '';
  }

  if (!date.month) {
    return String(date.year);
  }

  const month = String(date.month).padStart(2, '0');
  if (!date.day) {
    return `${date.year}-${month}`;
  }

  const day = date.day ? String(date.day).padStart(2, '0') : '01';

  return `${date.year}-${month}-${day}`;
}

function formatDateFullDisplay(date: DateObject): string {
  if (!date.year) {
    return '';
  }

  if (!date.month) {
    return String(date.year);
  }

  return new Date(date.year, date.month - 1).toLocaleDateString('en-US', {
    year: 'numeric',
  });
}
</script>

<template>
  <article class="prose prose-pink max-w-full">
    <h1 class="flex gap-x-4">About<span>&#128270;</span></h1>
    <p>Full Stack Developer | Web Enthusiast</p>
    <p>
      I’m a full stack developer passionate about crafting exceptional web experiences. With a background in media
      informatics, I thrive on bridging the gap between user-facing interfaces and robust backend systems.
    </p>
    <p>
      My journey is fueled by continuous learning and a desire to share knowledge. When I’m not coding, you’ll find me
      exploring the latest tech trends, or lost in the pages of a good book or manga.
    </p>

    <section aria-labelledby="tech-stack">
      <h2>Tech Stack</h2>
      <ul>
        <li><strong>Languages:</strong> JavaScript, TypeScript, PHP, Node.js</li>
        <li><strong>Frameworks:</strong> Nuxt, Vue.js, Nestjs, CakePHP</li>
        <li><strong>Databases:</strong> MySQL, Postgres, MongoDB</li>
        <li><strong>Tools:</strong> Git, Docker, Docker Compose</li>
        <li><strong>Cloud:</strong> GCP</li>
        <li><strong>Other:</strong> RESTful APIs</li>
      </ul>
    </section>

    <section aria-labelledby="work-experience">
      <h2>Experiences</h2>
      <div :class="['card', 'flex flex-col p-2 rounded-box', 'sm:p-6']">
        <template v-for="(experience, index) in experiences" :key="index">
          <article
            :class="[
              { 'border-t border-(--card-border-color)': index !== 0 },
              'flex gap-x-4 gap-y-2 px-4 py-6',
              'flex-col',
              'sm:flex-row',
            ]"
          >
            <header :class="['not-prose flex flex-col justify-center items-center gap-y-1', '', 'min-w-40']">
              <a :href="experience?.companyInfo?.url" class="flex items-center justify-center">
                <img class="h-auto w-20" :src="experience?.companyInfo?.logo" alt="" />
              </a>
              <div class="text-center">
                <a :href="experience?.companyInfo?.url" class="text-lg font-bold hover:text-primary hover:underline">
                  {{ experience?.companyInfo?.name }}
                </a>
                <p v-if="experience.startDate.year !== experience.endDate?.year">
                  <time :datetime="formatDateFull(experience.startDate)">{{
                    formatDateFullDisplay(experience.startDate)
                  }}</time>
                  -
                  <time v-if="experience.endDate" :datetime="formatDateFull(experience.endDate)">{{
                    formatDateFullDisplay(experience.endDate)
                  }}</time>
                  <span v-else>Present</span>
                </p>
                <p v-else>
                  <time :datetime="formatDateFull(experience.startDate)">{{
                    formatDateFullDisplay(experience.startDate)
                  }}</time>
                </p>
              </div>
            </header>
            <section class="prose flex-1 self-center">
              <h3 :class="['', 'text-center', 'sm:text-left']">{{ experience.position }}</h3>
              <p v-for="(description, idx) in experience.descriptions" :key="idx">{{ description }}</p>
              <ul class="flex gap-2 flex-wrap not-prose">
                <li v-for="techStack in experience.techStacks" :key="techStack.slug">
                  <TagComponent
                    class="h-[unset] p-1.5"
                    :tag="techStack"
                    :is-link="false"
                    :display-label="false"
                    :display-post-count="false"
                    :disabled="true"
                  />
                </li>
              </ul>
            </section>
          </article>
        </template>
      </div>
    </section>
  </article>
</template>

<style scoped>
.card {
  --card-background: #fff;
  --card-border-color: #e0e0e0;

  background: var(--card-background);
  border: 1px solid var(--card-border-color);
  border-radius: 10px;
  margin-bottom: 1rem;
}
</style>
