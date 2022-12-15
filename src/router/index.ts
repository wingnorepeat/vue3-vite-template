import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pageList',
      component: () => import('../views/page-list/index.vue')
    }
  ]
})

export default router
