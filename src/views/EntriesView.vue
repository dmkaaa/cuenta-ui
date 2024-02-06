<script setup lang="ts">
import { useEntriesStore } from '@/stores/entry'
import AppModal from '@/components/AppModal.vue'
import AccountSelect from '@/components/AccountSelect.vue'
import AppButton from '@/components/AppButton.vue'
import AppButtonLink from '@/components/AppButtonLink.vue'
import { ref } from 'vue'

const entriesStore = useEntriesStore()

const modal = ref<InstanceType<typeof AppModal> | null>(null)
</script>

<template>
  <div class="text-end">
    <AppButton @click="modal?.open()">Add</AppButton>
  </div>
  <table class="table-fixed w-full">
    <thead>
      <tr class="text-slate-400 text-left border-b border-slate-700">
        <th class="font-medium p-2 pl-0">Debit</th>
        <th class="font-medium p-2">Credit</th>
        <th class="font-medium p-2">Amount</th>
        <th class="font-medium p-2">Date</th>
        <th class="font-medium p-2">Description</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in entriesStore.entries" :key="entry.id">
        <td class="p-2 pl-0">{{ entry.debitAccount.name }}</td>
        <td class="p-2">{{ entry.creditAccount.name }}</td>
        <td class="p-2">{{ entry.amount }}</td>
        <td class="p-2">{{ entry.date }}</td>
        <td class="p-2">{{ entry.description }}</td>
        <td class="p-2 pr-0 text-right">
          <AppButtonLink>Edit</AppButtonLink>
        </td>
      </tr>
    </tbody>
  </table>

  <AppModal ref="modal">
    <template #header> New entry </template>
    <template #default>
      <AccountSelect></AccountSelect>
    </template>
  </AppModal>
</template>
