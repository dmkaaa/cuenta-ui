<script setup lang="ts">
import { reactive, ref } from 'vue'
import { type Account, AccountType, getAccountTypes } from '@/types/account'
import AppButton from '@/components/AppButton.vue'
import AppTextInput from '@/components/AppTextInput.vue'
import AppSelect from '@/components/AppSelect.vue'

const accounts = ref<Account[]>([])
const accountTypes = ref(getAccountTypes())
const accountModel = reactive<Account>({ code: '', type: AccountType.Asset, name: '' })

fetch('http://localhost:8080/v1/accounts')
  .then((response) => response.json())
  .then((result) => (accounts.value = result))
</script>

<template>
  <ul>
    <li v-for="account in accounts" :key="account.id">
      {{ account.code }},
      {{ account.name }}
    </li>
  </ul>

  <h3>New account</h3>
  <div class="flex flex-row">
    <div class="basis-1/4">
      <div class="mb-1">
        <AppSelect v-model="accountModel.type" :options="accountTypes"></AppSelect>
      </div>
      <div class="mb-1">
        <AppTextInput v-model="accountModel.code" placeholder="Code" />
      </div>
      <div class="mb-1">
        <AppTextInput v-model="accountModel.name" placeholder="Name" />
      </div>
      <div class="mb-1">
        <AppButton>Save</AppButton>
      </div>
    </div>
  </div>
</template>
