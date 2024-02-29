import type { BalanceSheet } from '@/types/balanceSheet'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const location = 'http://localhost:8080/v1/reports/balance-sheet'

export const useBalanceSheetStore = defineStore('balance-sheet', () => {
  const balanceSheet = ref<BalanceSheet>()

  async function load(date: string) {
    const response = await fetch(location + '?' + new URLSearchParams({ date }))
    balanceSheet.value = await response.json()
  }

  return {
    balanceSheet,
    load
  }
})
