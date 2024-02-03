import type { Account } from '@/types/account'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const location = 'http://localhost:8080/v1/accounts'
const defaultHeaders = {
  'Content-Type': 'application/json'
}

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])

  async function load() {
    const response = await fetch(location)
    accounts.value = await response.json()
  }

  async function save(account: Account) {
    let url = location
    let method = 'POST'

    if (account.id) {
      url = location + '/' + account.id
      method = 'PUT'
    }

    const response = await fetch(url, {
      method,
      headers: defaultHeaders,
      body: JSON.stringify(account)
    })

    if (!response.ok) {
      throw new Error('Failed to save account')
    }

    await load()
  }

  load()

  return {
    accounts,
    save
  }
})
