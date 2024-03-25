import type { Ledger } from '@/types/ledger'
import type { Period } from '@/util/date'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const location = 'http://localhost:8080/v1/reports/ledger'

export const useLedgerStore = defineStore('ledger', () => {
  const ledger = ref<Ledger>()

  async function load(period: Period) {
    const response = await fetch(
      location + '?' + new URLSearchParams({ periodStart: period.start, periodEnd: period.end })
    )
    ledger.value = await response.json()
  }

  return {
    ledger,
    load
  }
})
