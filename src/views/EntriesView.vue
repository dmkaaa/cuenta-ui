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
import { formatIsoDate } from '@/util/date'
import { formatMoney } from '@/util/number'

const { getDisplayName } = useAccountsStore()
const confirmDialogsStore = useConfirmDialogsStore()
const entriesStore = useEntriesStore()
const entryModel = reactive<Entry>({
  amount: 0,
  date: '',
  description: ''
})

const modal = ref<InstanceType<typeof AppModal> | undefined>()
const errorMessage = ref('')

function save(close = false) {
  entriesStore
    .save(entryModel)
    .then(() => {
      entryModel.id = undefined
      if (close) {
        modal.value?.close()
      }
    })
    .catch((err) => (errorMessage.value = err.message))
}

function remove(entry: Entry) {
  confirmDialogsStore.open('Are you sure?', () => {
    entriesStore.remove(entry.id!)
  })
}

function openForm(entry?: Entry) {
  entryModel.id = entry?.id
  entryModel.debitAccountId = entry?.debitAccountId
  entryModel.creditAccountId = entry?.creditAccountId
  entryModel.amount = entry?.amount || 0.01
  entryModel.date = entry?.date || ''
  entryModel.description = entry?.description || ''
  modal.value?.open()
}
</script>

<template>
  <div class="text-end">
    <AppButton @click="openForm()">Add</AppButton>
  </div>
  <table>
    <thead>
      <tr>
        <th class="w-1/4">Debit</th>
        <th class="w-1/4">Credit</th>
        <th class="text-right w-1/12">Amount</th>
        <th class="text-center w-1/12">Date</th>
        <th>Description</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in entriesStore.entries" :key="entry.id">
        <td>{{ getDisplayName(entry.debitAccountId).value }}</td>
        <td>{{ getDisplayName(entry.creditAccountId).value }}</td>
        <td class="text-right">{{ formatMoney(entry.amount) }}</td>
        <td class="text-center">{{ formatIsoDate(entry.date) }}</td>
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
      >
        <AppButton type="button" @click="save(true)">Save</AppButton>
        <AppButton type="submit" class="ml-1">Save &amp; repeat</AppButton>
      </EntryForm>
    </template>
  </AppModal>
</template>
