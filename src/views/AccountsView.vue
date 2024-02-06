<script setup lang="ts">
import { reactive, ref } from 'vue'
import { type Account, AccountType } from '@/types/account'
import { useAccountsStore } from '@/stores/account'
import AppButton from '@/components/common/AppButton.vue'
import AppButtonLink from '@/components/common/AppButtonLink.vue'
import AppTextInput from '@/components/common/AppTextInput.vue'
import AccountTypeSelect from '@/components/AccountTypeSelect.vue'
import AppModal from '@/components/common/AppModal.vue'

const accountsStore = useAccountsStore()
const accountModel = reactive<Account>({ code: '', type: AccountType.Asset, name: '' })

const modal = ref<InstanceType<typeof AppModal> | null>(null)

function save() {
  accountsStore.save(accountModel).then(() => modal.value?.close())
}

function openForm(account?: Account) {
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
  <table class="table-fixed w-full">
    <thead>
      <tr class="text-slate-400 text-left border-b border-slate-700">
        <th class="font-medium p-2 pl-0">Type</th>
        <th class="font-medium p-2">Code</th>
        <th class="font-medium p-2">Name</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="account in accountsStore.accounts" :key="account.id">
        <td class="p-2 pl-0">{{ account.type }}</td>
        <td class="p-2">{{ account.code }}</td>
        <td class="p-2">{{ account.name }}</td>
        <td class="p-2 pr-0 text-right">
          <AppButtonLink @click="openForm(account)">Edit</AppButtonLink>
        </td>
      </tr>
    </tbody>
  </table>

  <AppModal ref="modal">
    <template #header> New account </template>
    <template #default>
      <form @submit.prevent="save()">
        <div class="mb-2">
          <AccountTypeSelect v-model="accountModel.type"></AccountTypeSelect>
        </div>
        <div class="mb-2">
          <AppTextInput v-model="accountModel.code" placeholder="Code" />
        </div>
        <div class="mb-4">
          <AppTextInput v-model="accountModel.name" placeholder="Name" />
        </div>
        <div class="text-right">
          <AppButton type="submit">Save</AppButton>
        </div>
      </form>
    </template>
  </AppModal>
</template>
