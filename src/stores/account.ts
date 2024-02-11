import type { Account } from '@/types/account'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const location = 'http://localhost:8080/v1/accounts'
const defaultHeaders = {
  'Content-Type': 'application/json'
}

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])

  function getDisplayName(id: number) {
    return computed(() => {
      const account = accounts.value.filter((item) => item.id == id)[0]
      return account ? account.code + ' - ' + account.name : ''
    })
  }

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
      const defaultMessage = 'Failed to save account'
      const body = await response.json()
      throw new Error(body?.message || defaultMessage)
    }

    await load()
  }

  load()

  return {
    accounts,
    getDisplayName,
    save
  }
})
