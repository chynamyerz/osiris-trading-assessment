import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tab-bar',
      component: () => import('../views/TabBarView/TabBarView.vue')
    },
    {
      path: '/active-tab/:owner',
      name: 'active-tab',
      component: () => import('../views/ActiveTabView/ActiveTabView.vue')
    },
    {
      path: '/checkout/:owner',
      name: 'checkout',
      component: () => import('../views/CheckoutView/CheckoutView.vue')
    }
  ]
})

export default router
