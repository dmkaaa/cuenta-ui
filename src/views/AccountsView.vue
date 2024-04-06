<script setup lang="ts">
import { reactive, ref } from 'vue'
import { type Account, AccountType } from '@/types/account'
import { useAccountsStore } from '@/stores/account'
import AppButton from '@/components/common/AppButton.vue'
import AppButtonLink from '@/components/common/AppButtonLink.vue'
import AppModal from '@/components/common/AppModal.vue'
import AccountForm from '@/components/account/AccountForm.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'

const accountsStore = useAccountsStore()
const accountModel = reactive<Account>({ code: '', type: AccountType.Asset, name: '' })

const modal = ref<InstanceType<typeof AppModal> | null>(null)
const errorMessage = ref('')

function save() {
  accountsStore
    .save(accountModel)
    .then(() => modal.value?.close())
    .catch((err) => (errorMessage.value = err.message))
}

function openForm(account?: Account) {
  errorMessage.value = ''
  accountModel.id = account?.id
  accountModel.type = account?.type || AccountType.Asset
  accountModel.code = account?.code || ''
  accountModel.name = account?.name || ''
  modal.value?.open()
}
</script>

<template>
  <div class="text-end">
    <AppButton @click="openForm()">Add</AppButton>
  </div>
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Code</th>
        <th>Name</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="account in accountsStore.accounts" :key="account.id">
        <td>{{ account.type }}</td>
        <td>{{ account.code }}</td>
        <td>{{ account.name }}</td>
        <td class="text-right">
          <AppButtonLink @click="openForm(account)">Edit</AppButtonLink>
        </td>
      </tr>
    </tbody>
  </table>

  <AppModal ref="modal">
    <template #header> {{ accountModel.id ? 'Edit account' : 'New account' }} </template>
    <template #default>
      <ErrorMessage :message="errorMessage" class="mb-3" />
      <AccountForm
        @submit.prevent="save()"
        v-model:type="accountModel.type"
        v-model:code="accountModel.code"
        v-model:name="accountModel.name"
      />
    </template>
  </AppModal>
</template>
