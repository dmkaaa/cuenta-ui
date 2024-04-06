import { type Entry } from '@/types/entry'
import { apiFetch } from '@/util/fetch'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const defaultHeaders = {
  'Content-Type': 'application/json'
}

export const useEntriesStore = defineStore('entries', () => {
  const entries = ref<Entry[]>([])

  function load() {
    apiFetch<Entry[]>('/entries').then((result) => (entries.value = result || []))
  }

  function save(entry: Entry) {
    return (entry.id ? update(entry) : create(entry)).then(() => load())
  }

  function create(entry: Entry) {
    return apiFetch('/entries/bulk', {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify([entry])
    })
  }

  function update(entry: Entry) {
    return apiFetch('/entries/' + entry.id, {
      method: 'PUT',
      headers: defaultHeaders,
      body: JSON.stringify(entry)
    })
  }

  function remove(id: number) {
    apiFetch('/entries/' + id, { method: 'DELETE' }).then(
      () => (entries.value = entries.value.filter((item) => item.id != id))
    )
  }

  load()

  return {
    entries,
    save,
    remove
  }
})
