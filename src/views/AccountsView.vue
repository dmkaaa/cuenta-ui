<script setup lang="ts">
import { reactive, ref } from 'vue'
import { type Account, AccountType, getAccountTypes } from '@/types/account'
import AppButton from '@/components/AppButton.vue'
import AppTextInput from '@/components/AppTextInput.vue'
import AppSelect from '@/components/AppSelect.vue'

const accounts = ref<Account[]>([])
const accountTypes = ref(getAccountTypes())
const accountModel = reactive<Account>({ code: '', type: AccountType.Asset, name: '' })

const modalOpen = ref(false)

fetch('http://localhost:8080/v1/accounts')
  .then((response) => response.json())
  .then((result) => (accounts.value = result))
</script>

<template>
  <div class="float-end">
    <AppButton @click="modalOpen = true">Add</AppButton>
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
      <tr v-for="account in accounts" :key="account.id">
        <td class="p-2 pl-0">{{ account.type }}</td>
        <td class="p-2">{{ account.code }}</td>
        <td class="p-2">{{ account.name }}</td>
        <td class="p-2 pr-0 text-right">
          <button type="button" class="text-cyan-700 hover:text-cyan-600 font-medium">Edit</button>
        </td>
      </tr>
    </tbody>
  </table>

  <Teleport to="body">
    <div
      v-if="modalOpen"
      class="fixed top-0 left-0 w-full h-full bg-slate-800 opacity-50"
      @click="modalOpen = false"
    ></div>

    <div
      v-if="modalOpen"
      class="absolute top-1/4 left-0 right-0 w-1/3 mx-auto bg-slate-800 border border-slate-700 rounded-md px-5 py-3"
    >
      <h3 class="text-xl mb-4">New account</h3>
      <div>
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
          <AppButton>Save</AppButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>
