<script setup lang="ts">
import { useEntriesStore } from '@/stores/entry'
import { useAccountsStore } from '@/stores/account'
import AppModal from '@/components/common/AppModal.vue'
import AppButton from '@/components/common/AppButton.vue'
import AppButtonLink from '@/components/common/AppButtonLink.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import EntryForm from '@/components/entry/EntryForm.vue'
import { reactive, ref } from 'vue'
import type { Entry } from '@/types/entry'
import { useConfirmDialogsStore } from '@/stores/confirmDialog'

const { getDisplayName } = useAccountsStore()
const confirmDialogsStore = useConfirmDialogsStore()
const entriesStore = useEntriesStore()
const entryModel = reactive<Entry>({
  debitAccountId: 0,
  creditAccountId: 0,
  amount: 0,
  date: '',
  description: ''
})

const modal = ref<InstanceType<typeof AppModal> | null>(null)
const errorMessage = ref('')

function save() {
  entriesStore
    .save(entryModel)
    .then(() => modal.value?.close())
    .catch((err) => (errorMessage.value = err.message))
}

function remove(entry: Entry) {
  confirmDialogsStore.open('Are you sure?', () => {
    entriesStore.remove(entry.id!)
  })
}

function openForm(entry?: Entry) {
  entryModel.id = entry?.id
  entryModel.debitAccountId = entry?.debitAccountId || 0
  entryModel.creditAccountId = entry?.creditAccountId || 0
  entryModel.amount = entry?.amount || 0.01
  entryModel.date = entry?.date || ''
  entryModel.description = entry?.description || ''
  modal.value?.open()
}

function formatDate(isoDate: string) {
  return isoDate.split('-').reverse().join('.')
}
</script>

<template>
  <div class="text-end">
    <AppButton @click="openForm()">Add</AppButton>
  </div>
  <table>
    <thead>
      <tr>
        <th>Debit</th>
        <th>Credit</th>
        <th>Amount</th>
        <th>Date</th>
        <th>Description</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in entriesStore.entries" :key="entry.id">
        <td>{{ getDisplayName(entry.debitAccountId).value }}</td>
        <td>{{ getDisplayName(entry.creditAccountId).value }}</td>
        <td>{{ entry.amount }}</td>
        <td>{{ formatDate(entry.date) }}</td>
        <td class="break-words">{{ entry.description }}</td>
        <td class="text-right">
          <AppButtonLink @click="openForm(entry)">Edit</AppButtonLink>
          <AppButtonLink @click="remove(entry)" color="red">Delete</AppButtonLink>
        </td>
      </tr>
    </tbody>
  </table>

  <AppModal ref="modal">
    <template #header> {{ entryModel.id ? 'Edit entry' : 'New entry' }} </template>
    <template #default>
      <ErrorMessage :message="errorMessage" class="mb-3" />
      <EntryForm
        @submit.prevent="save()"
        v-model:debit-account-id="entryModel.debitAccountId"
        v-model:credit-account-id="entryModel.creditAccountId"
        v-model:amount="entryModel.amount"
        v-model:date="entryModel.date"
        v-model:description="entryModel.description"
      />
    </template>
  </AppModal>
</template>
