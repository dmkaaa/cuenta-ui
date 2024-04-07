<script setup lang="ts">
import type { BalanceSheetSide } from '@/types/balanceSheet'
import { useAccountsStore } from '@/stores/account'
import { formatMoney } from '@/util/number'

defineProps<{
  name: string
  side: BalanceSheetSide
}>()

const { getDisplayName } = useAccountsStore()
</script>
<template>
  <div>
    <h3 class="text-lg text-center font-normal mb-5">
      {{ name }}
    </h3>

    <div v-for="row in side.rows" :key="row.accountId" class="flex justify-between">
      <div>
        {{ getDisplayName(row.accountId).value }}
      </div>
      <div class="text-right">
        {{ formatMoney(row.balance.value) }}
      </div>
    </div>
  </div>
</template>
