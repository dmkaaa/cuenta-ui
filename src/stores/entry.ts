import { type Entry } from '@/types/entry'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const location = 'http://localhost:8080/v1/entries'
const defaultHeaders = {
  'Content-Type': 'application/json'
}

export const useEntriesStore = defineStore('entries', () => {
  const entries = ref<Entry[]>([])

  async function load() {
    const response = await fetch(location)
    entries.value = await response.json()
  }

  async function save(entry: Entry) {
    const response = await fetch(location + '/bulk', {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify([entry])
    })

    if (!response.ok) {
      throw new Error('Failed to save entry')
    }

    await load()
  }

  load()

  return {
    entries,
    save
  }
})
