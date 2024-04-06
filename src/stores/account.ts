import type { Account } from '@/types/account'
import { apiFetch } from '@/util/fetch'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const defaultHeaders = {
  'Content-Type': 'application/json'
}

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])

  function getDisplayName(id?: number) {
    return computed(() => {
      const account = accounts.value.filter((item) => item.id === id)[0]
      return account ? account.code + ' - ' + account.name : ''
    })
  }

  function load() {
    apiFetch<Account[]>('/accounts').then((result) => (accounts.value = result || []))
  }

  function save(account: Account) {
    const path = account.id ? `/accounts/${account.id}` : '/accounts'
    const method = account.id ? 'PUT' : 'POST'
    return apiFetch(path, {
      method,
      headers: defaultHeaders,
      body: JSON.stringify(account)
    }).then(() => load())
  }

  load()

  return {
    accounts,
    getDisplayName,
    save
  }
})
