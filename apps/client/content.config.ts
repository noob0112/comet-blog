import { defineContentConfig, defineCollection } from '@nuxt/content';
import { object, string, number, date, optional } from 'valibot'

export default defineContentConfig({
  collections: {
    content_en: defineCollection({
      type: 'page',
      source: {
        include: 'en/**',
        prefix: '',
      },
    }),
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
    }),
    posts: defineCollection({
      type: 'page',
      source: '**/posts/**/*.md',
      schema: object({
        status: string(),
        createdBy: string(),
        createdAt: date(),
        locale: string(),
        slug: string(),
        readMin: number(),
        updatedAt: optional(date()),
        publishedAt: optional(date()),
      })
    }),
  },
});
