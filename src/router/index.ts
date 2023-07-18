import { createRouter, createWebHashHistory } from "vue-router";
import { pagesNameTypeMap } from './pages';

export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: pagesNameTypeMap.home,
      component: () => import('@/views/Root.vue'),
      redirect: { name: pagesNameTypeMap.discover },
      children: [
        {
          path: pagesNameTypeMap.discover,
          name: pagesNameTypeMap.discover,
          component: () => import('@/views/discover/Discover.vue'),
          meta: {
            menu: pagesNameTypeMap.discover,
            keepAlive: true,
          }
        }
      ],
    },
  ],
})