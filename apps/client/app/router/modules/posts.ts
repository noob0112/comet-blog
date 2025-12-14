export const postRoute = {
  name: 'posts',
  path: '/posts',
  children: [
    {
      name: 'pagination-posts',
      path: '/posts/:page(\\d*)?',
      component: () => import('~/pages/posts/_pagination-post.vue'),
      meta: { ssr: true },
    },
    {
      name: 'posts-slug',
      path: '/posts/:slug',
      component: () => import('~/pages/posts/[slug]/index.vue'),
      meta: { ssr: true },
    },
  ],
};

export const postDetailRoute = {
  name: 'posts-slug',
  path: '/posts/:slug',
  component: () => import('~/pages/posts/[slug]/index.vue'),
  meta: { ssr: true },
};
