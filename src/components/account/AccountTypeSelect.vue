<script setup lang="ts">
import { AccountType } from '@/types/account'
import AppSelect from '@/components/common/AppSelect.vue'

const model = defineModel<string>()
const options = [
  AccountType.Asset,
  AccountType.Liability,
  AccountType.Equity,
  AccountType.Revenue,
  AccountType.Expense,
  AccountType.Income
].map((item) => ({
  value: item,
  name: item
}))
</script>

<template>
  <AppSelect v-model="model" :options="options"></AppSelect>
</template>
