<script setup lang="ts">
import AppButton from '@/components/common/AppButton.vue'
import AppInput from '@/components/common/AppInput.vue'
import AccountSelect from '@/components/account/AccountSelect.vue'
import DateInput from '../common/DateInput.vue'

const debitAccountIdModel = defineModel<number>('debitAccountId')
const creditAccountIdModel = defineModel<number>('creditAccountId')
const amountModel = defineModel<number>('amount')
const dateModel = defineModel<string>('date')
const descriptionModel = defineModel<string>('description')
</script>

<template>
  <form>
    <div class="mb-2">
      <AccountSelect v-model="debitAccountIdModel" />
    </div>
    <div class="mb-2">
      <AccountSelect v-model="creditAccountIdModel" />
    </div>
    <div class="mb-2">
      <AppInput v-model="amountModel" placeholder="Amount" type="number" step="0.01" />
    </div>
    <div class="mb-2">
      <DateInput v-model="dateModel" placeholder="Date (dd.mm.yyyy)" />
    </div>
    <div class="mb-4">
      <AppInput v-model="descriptionModel" placeholder="Description" />
    </div>
    <div class="text-right">
      <slot></slot>
    </div>
  </form>
</template>
