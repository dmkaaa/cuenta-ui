<script setup lang="ts">
import { useAccountsStore } from '@/stores/account'
import { useLedgerStore } from '@/stores/ledger'

const ledgerStore = useLedgerStore()
const { getDisplayName } = useAccountsStore()
</script>

<template>
  <div v-for="subLedger in ledgerStore.ledger?.subLedgers" :key="subLedger.accountId" class="mb-4">
    <h3 class="text-lg font-normal mb-2">{{ getDisplayName(subLedger.accountId).value }}</h3>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Debit</th>
          <th>Credit</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td colspan="2" class="text-center font-semibold">{{ subLedger.openingBalance }}</td>
        </tr>
        <tr v-for="entry in subLedger.entries" :key="entry.id">
          <td>{{ entry.date }}</td>
          <td class="whitespace-nowrap overflow-hidden text-ellipsis">{{ entry.description }}</td>
          <td>{{ entry.debitAccountId == subLedger.accountId ? entry.amount : '' }}</td>
          <td>{{ entry.creditAccountId == subLedger.accountId ? entry.amount : '' }}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td colspan="2" class="text-center font-semibold">{{ subLedger.closingBalance }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
