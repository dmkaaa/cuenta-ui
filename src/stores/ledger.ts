import type { Ledger } from '@/types/ledger'
import type { Period } from '@/util/date'
import { apiFetch } from '@/util/fetch'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLedgerStore = defineStore('ledger', () => {
  const ledger = ref<Ledger>()

  function load(period: Period) {
    apiFetch<Ledger>('/reports/ledger?' + new URLSearchParams({ ...period })).then(
      (result) => (ledger.value = result)
    )
  }

  return {
    ledger,
    load
  }
})
