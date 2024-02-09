<script setup lang="ts">
import AppTextInput from '@/components/common/AppTextInput.vue'
import AccountTypeSelect from './AccountTypeSelect.vue'
import AppButton from '@/components/common/AppButton.vue'
import type { AccountType } from '@/types/account'

const typeModel = defineModel<AccountType>('type')
const codeModel = defineModel<string>('code')
const nameModel = defineModel<string>('name')
</script>

<template>
  <form>
    <div class="mb-2">
      <AccountTypeSelect v-model="typeModel"></AccountTypeSelect>
    </div>
    <div class="mb-2">
      <AppTextInput v-model="codeModel" placeholder="Code" />
    </div>
    <div class="mb-4">
      <AppTextInput v-model="nameModel" placeholder="Name" />
    </div>
    <div class="text-right">
      <AppButton type="submit">Save</AppButton>
    </div>
  </form>
</template>
