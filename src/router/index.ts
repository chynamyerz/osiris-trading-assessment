import ActiveTabView from '@/views/ActiveTabView/ActiveTabView.vue'
import CheckoutView from '@/views/CheckoutView/CheckoutView.vue'
import TabBarView from '@/views/TabBarView/TabBarView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tab-bar',
      component: TabBarView
    },
    {
      path: '/active-tab/:owner',
      name: 'active-tab',
      component: ActiveTabView
    },
    {
      path: '/checkout/:owner',
      name: 'checkout',
      component: CheckoutView
    }
  ]
})

export default router
