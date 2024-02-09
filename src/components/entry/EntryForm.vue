<script setup lang="ts">
import AppButton from '@/components/common/AppButton.vue'
import AppTextInput from '@/components/common/AppTextInput.vue'
import AccountSelect from '@/components/account/AccountSelect.vue'

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
      <AppTextInput v-model="amountModel" placeholder="Amount" />
    </div>
    <div class="mb-2">
      <AppTextInput v-model="dateModel" placeholder="Date" />
    </div>
    <div class="mb-4">
      <AppTextInput v-model="descriptionModel" placeholder="Description" />
    </div>
    <div class="text-right">
      <AppButton type="submit">Save</AppButton>
    </div>
  </form>
</template>
