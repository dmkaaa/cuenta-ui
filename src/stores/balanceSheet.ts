import type { BalanceSheet } from '@/types/balanceSheet'
import { apiFetch } from '@/util/fetch'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBalanceSheetStore = defineStore('balance-sheet', () => {
  const balanceSheet = ref<BalanceSheet>()

  function load(date: string) {
    apiFetch<BalanceSheet>('/reports/balance-sheet?' + new URLSearchParams({ date })).then(
      (result) => (balanceSheet.value = result)
    )
  }

  return {
    balanceSheet,
    load
  }
})
