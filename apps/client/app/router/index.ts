import { createMemoryHistory, createWebHistory, createRouter } from 'vue-router';
import { postRoute, postDetailRoute } from './modules/posts';

export const homeRoute = {
  name: 'index',
  path: '/',
  label: 'Home',
  component: () => import('~/pages/index.vue'),
  meta: { ssr: true },
};

export const aboutRoute = {
  name: 'about',
  path: '/about',
  label: 'About',
  component: () => import('~/pages/about/index.vue'),
  meta: { ssr: false },
};

export { postRoute, postDetailRoute };

export const routes = [
  homeRoute,
  aboutRoute,
  postRoute,
  {
    name: 'test-colors',
    path: '/test-colors',
    component: () => import('~/pages/test-colors.vue'),
    meta: { ssr: false },
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('~/pages/error.vue') },
];

export function createAppRouter(ssr = false) {
  const router = createRouter({
    history: ssr ? createMemoryHistory() : createWebHistory(),
    routes,
    scrollBehavior(to, _from, savedPosition) {
      if (savedPosition) return savedPosition;

      const isHash = to.hash ? to.hash.split('#') : undefined;
      if (isHash) {
        // let tmp = new Promise((resolve) => {
        //   setTimeout(() => {
        //     document.getElementById(isHash[1]).scrollIntoView();
        //     clearTimeout(tmp);
        //   }, 0);
        // });
      }

      return {
        top: 0,
        behavior: 'smooth',
      };
    },
  });

  return router;
}
