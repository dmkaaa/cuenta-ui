import type { Ledger } from '@/types/ledger'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const location = 'http://localhost:8080/v1/ledger'

export const useLedgerStore = defineStore('ledger', () => {
  const ledger = ref<Ledger>()

  async function load() {
    const response = await fetch(location)
    ledger.value = await response.json()
  }

  load()

  return {
    ledger
  }
})
