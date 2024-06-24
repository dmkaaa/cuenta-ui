<script setup lang="ts">
import { useBalanceSheetStore } from '@/stores/balanceSheet'
import { formatMoney } from '@/util/number'
import { formatIsoDate } from '@/util/date'
import { storeToRefs } from 'pinia'
import YearOptions from '@/components/common/YearOptions.vue'
import BalanceSheetSide from '@/components/balance/BalanceSheetSide.vue'

const balanceSheetStore = useBalanceSheetStore()

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

    <div class="mb-5 text-3xl text-center">
      {{ formatIsoDate(balanceSheet.date) }}
    </div>

    <div class="flex mb-2">
      <BalanceSheetSide name="Assets" :side="balanceSheet.activus" class="w-1/2 px-2" />
      <BalanceSheetSide
        name="Liabilities and Owners' Equity"
        :side="balanceSheet.passivus"
        class="w-1/2 px-2"
      />
    </div>

    <div class="flex border-t border-slate-700 pt-2">
      <div class="w-1/2 px-2 text-right font-semibold">
        {{ formatMoney(balanceSheet.activus.total) }}
      </div>
      <div class="w-1/2 px-2 text-right font-semibold">
        {{ formatMoney(balanceSheet.passivus.total) }}
      </div>
    </div>
  </div>
</template>
