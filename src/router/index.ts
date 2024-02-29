import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AccountsView from '@/views/AccountsView.vue'
import EntriesView from '@/views/EntriesView.vue'
import LedgerView from '@/views/LedgerView.vue'
import BalanceSheetView from '@/views/BalanceSheetView.vue'

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
    },
    {
      path: '/balance-sheet',
      name: 'balance-sheet',
      component: BalanceSheetView
    }
  ]
})

export default router
