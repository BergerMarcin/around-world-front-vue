import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainMapView',
      component: MainView,
    },
    {
      path: '/project-dev-docs',
      name: 'ProjectDevDocsView',
      component: () => import('@/views/ProjectDevDocsView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFoundView',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

export default router
