<script setup lang="ts">
import { reactive, ref } from 'vue'
import { type Account, AccountType, getAccountTypes } from '@/types/account'
import { useAccountsStore } from '@/stores/account'
import AppButton from '@/components/AppButton.vue'
import AppTextInput from '@/components/AppTextInput.vue'
import AppSelect from '@/components/AppSelect.vue'
import AppModal from '@/components/AppModal.vue'

const accountsStore = useAccountsStore()
const accountTypes = ref(getAccountTypes())
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
  <div class="float-end">
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
          <button
            type="button"
            class="text-cyan-700 hover:text-cyan-600 font-medium"
            @click="openForm(account)"
          >
            Edit
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <AppModal ref="modal">
    <h3 class="text-2xl mb-4">New account</h3>
    <div>
      <form @submit.prevent="save()">
        <div class="mb-2">
          <AppSelect v-model="accountModel.type" :options="accountTypes"></AppSelect>
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
    </div>
  </AppModal>
</template>
