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
    const response = await (entry.id ? update(entry) : create(entry))

    if (!response.ok) {
      throw new Error('Failed to save entry')
    }

    await load()
  }

  async function create(entry: Entry) {
    return fetch(location + '/bulk', {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify([entry])
    })
  }

  async function update(entry: Entry) {
    return fetch(location + '/' + entry.id, {
      method: 'PUT',
      headers: defaultHeaders,
      body: JSON.stringify(entry)
    })
  }

  async function remove(id: number) {
    const response = await fetch(location + '/' + id, { method: 'DELETE' })

    if (!response.ok) {
      throw new Error('Failed to delete entry')
    }

    entries.value = entries.value.filter((item) => item.id != id)
  }

  load()

  return {
    entries,
    save,
    remove
  }
})
