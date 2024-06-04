import ActiveTabView from '@/views/ActiveTabView/ActiveTabView.vue'
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
    }
  ]
})

export default router
