<script setup lang="ts">
import { useEntriesStore } from '@/stores/entry'
import { useAccountsStore } from '@/stores/account'
import AppModal from '@/components/common/AppModal.vue'
import AccountSelect from '@/components/AccountSelect.vue'
import AppButton from '@/components/common/AppButton.vue'
import AppButtonLink from '@/components/common/AppButtonLink.vue'
import AppTextInput from '@/components/common/AppTextInput.vue'
import { reactive, ref } from 'vue'
import type { Entry } from '@/types/entry'

const { getDisplayName } = useAccountsStore()
const entriesStore = useEntriesStore()
const entryModel = reactive<Entry>({
  debitAccountId: 0,
  creditAccountId: 0,
  amount: '',
  date: '',
  description: ''
})

const modal = ref<InstanceType<typeof AppModal> | null>(null)

function save() {
  entriesStore.save(entryModel).then(() => modal.value?.close())
}

function remove(entry: Entry) {
  entriesStore.remove(entry.id!)
}
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
        <td class="p-2 pl-0">{{ getDisplayName(entry.debitAccountId).value }}</td>
        <td class="p-2">{{ getDisplayName(entry.creditAccountId).value }}</td>
        <td class="p-2">{{ entry.amount }}</td>
        <td class="p-2">{{ entry.date }}</td>
        <td class="p-2">{{ entry.description }}</td>
        <td class="p-2 pr-0 text-right">
          <AppButtonLink>Edit</AppButtonLink>
          <AppButtonLink @click="remove(entry)" color="red">Delete</AppButtonLink>
        </td>
      </tr>
    </tbody>
  </table>

  <AppModal ref="modal">
    <template #header> New entry </template>
    <template #default>
      <form @submit.prevent="save()">
        <div class="mb-2">
          <AccountSelect v-model="entryModel.debitAccountId" />
        </div>
        <div class="mb-2">
          <AccountSelect v-model="entryModel.creditAccountId" />
        </div>
        <div class="mb-2">
          <AppTextInput v-model="entryModel.amount" placeholder="Amount" />
        </div>
        <div class="mb-2">
          <AppTextInput v-model="entryModel.date" placeholder="Date" />
        </div>
        <div class="mb-4">
          <AppTextInput v-model="entryModel.description" placeholder="Description" />
        </div>
        <div class="text-right">
          <AppButton type="submit">Save</AppButton>
        </div>
      </form>
    </template>
  </AppModal>
</template>
