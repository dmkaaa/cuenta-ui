import type { EntryResponse } from '@/types/entry'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const location = 'http://localhost:8080/v1/entries'

export const useEntriesStore = defineStore('entries', () => {
  const entries = ref<EntryResponse[]>([])

  async function load() {
    const response = await fetch(location)
    entries.value = await response.json()
  }

  load()

  return {
    entries
  }
})
