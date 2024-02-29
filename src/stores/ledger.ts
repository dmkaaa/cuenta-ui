import type { Ledger } from '@/types/ledger'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const location = 'http://localhost:8080/v1/reports/ledger'

export const useLedgerStore = defineStore('ledger', () => {
  const ledger = ref<Ledger>()

  async function load(periodStart: string, periodEnd: string) {
    const response = await fetch(location + '?' + new URLSearchParams({ periodStart, periodEnd }))
    ledger.value = await response.json()
  }

  return {
    ledger,
    load
  }
})
