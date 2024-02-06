<script setup lang="ts">
import { useAccountsStore } from '@/stores/account'
import AppSelect from '@/components/common/AppSelect.vue'
import { computed } from 'vue'

const model = defineModel()

const accountsStore = useAccountsStore()
const options = computed(() =>
  accountsStore.accounts.map((item) => ({
    value: item.id!.toString(),
    name: item.code + ' - ' + item.name
  }))
)
</script>

<template>
  <AppSelect v-model="model" :options="options"></AppSelect>
</template>
