<script setup lang="ts">
import { useAccountsStore } from '@/stores/account'
import { useLedgerStore } from '@/stores/ledger'

const ledgerStore = useLedgerStore()
const { getDisplayName } = useAccountsStore()
</script>

<template>
  <div v-for="subLedger in ledgerStore.ledger?.subLedgers" :key="subLedger.accountId" class="mb-5">
    <h3 class="text-lg font-normal mb-2">{{ getDisplayName(subLedger.accountId).value }}</h3>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th class="text-right">Debit</th>
          <th class="text-right">Credit</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover:bg-slate-700">
          <td></td>
          <td>Opening balance</td>
          <td></td>
          <td class="text-right font-semibold">
            {{ subLedger.openingBalance }}
          </td>
        </tr>
        <tr v-for="entry in subLedger.entries" :key="entry.id" class="hover:bg-slate-700">
          <td>{{ entry.date }}</td>
          <td class="whitespace-nowrap overflow-hidden text-ellipsis">{{ entry.description }}</td>
          <td class="text-right">
            {{ entry.debitAccountId == subLedger.accountId ? entry.amount : '' }}
          </td>
          <td class="text-right">
            {{ entry.creditAccountId == subLedger.accountId ? entry.amount : '' }}
          </td>
        </tr>
        <tr class="hover:bg-slate-700">
          <td></td>
          <td>Total</td>
          <td class="text-right">{{ subLedger.totalDebit }}</td>
          <td class="text-right">{{ subLedger.totalCredit }}</td>
        </tr>
        <tr class="hover:bg-slate-700">
          <td></td>
          <td>Closing balance</td>
          <td></td>
          <td class="text-right font-semibold">
            {{ subLedger.closingBalance }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
