<script setup lang="ts">
import { useAccountsStore } from '@/stores/account'
import { useBalanceSheetStore } from '@/stores/balanceSheet'
import { formatMoney } from '@/util/number'
import { storeToRefs } from 'pinia'
import YearOptions from '@/components/common/YearOptions.vue'

const balanceSheetStore = useBalanceSheetStore()
const { getDisplayName } = useAccountsStore()

const { balanceSheet } = storeToRefs(balanceSheetStore)

function selectYear(year: number) {
  balanceSheetStore.load(year + '-12-31')
}

selectYear(new Date().getFullYear())
</script>

<template>
  <div v-if="balanceSheet">
    <div class="mb-5">
      <YearOptions @select="selectYear" />
    </div>
    <div class="flex mb-2">
      <div class="w-1/2 px-2">
        <h3 class="text-lg text-center font-normal mb-5">Assets</h3>

        <div
          v-for="row in balanceSheet.activus.rows"
          :key="row.accountId"
          class="flex justify-between"
        >
          <div>
            {{ getDisplayName(row.accountId).value }}
          </div>
          <div class="text-right">
            {{ formatMoney(row.balance.value) }}
          </div>
        </div>
      </div>
      <div class="w-1/2 px-2">
        <h3 class="text-lg text-center font-normal mb-5">Liabilities and Owners' Equity</h3>

        <div
          v-for="row in balanceSheet.passivus.rows"
          :key="row.accountId"
          class="flex justify-between"
        >
          <div>
            {{ getDisplayName(row.accountId).value }}
          </div>
          <div class="text-right">
            {{ formatMoney(row.balance.value) }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex border-t border-slate-700 pt-2">
      <div class="w-1/2 px-2 text-right font-semibold">
        {{ formatMoney(balanceSheet.activus.total) }}
      </div>
      <div class="w-1/2 px-2 text-right font-semibold">
        {{ formatMoney(balanceSheet.activus.total) }}
      </div>
    </div>
  </div>
</template>
