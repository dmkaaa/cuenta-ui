<script setup lang="ts">
import { AccountType } from '@/types/account'
import AppSelect from '@/components/AppSelect.vue'

const model = defineModel()
const options = [AccountType.Asset, AccountType.Liability].map((item) => ({
  value: item,
  name: item
}))
</script>

<template>
  <AppSelect v-model="model" :options="options"></AppSelect>
</template>
