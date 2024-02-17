import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AccountsView from '@/views/AccountsView.vue'
import EntriesView from '@/views/EntriesView.vue'
import LedgerView from '@/views/LedgerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: AccountsView
    },
    {
      path: '/entries',
      name: 'entries',
      component: EntriesView
    },
    {
      path: '/ledger',
      name: 'ledger',
      component: LedgerView
    }
  ]
})

export default router
