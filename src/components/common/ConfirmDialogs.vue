<script setup lang="ts">
import AppModal from '@/components/common/AppModal.vue'
import AppButtonLink from './AppButtonLink.vue'
import { useConfirmDialogsStore } from '@/stores/confirmDialog'
import { ref, watch } from 'vue'

const store = useConfirmDialogsStore()
const modal = ref<InstanceType<typeof AppModal> | null>(null)

watch(store.length(), (length) => {
  if (length > 0) {
    modal.value?.open()
  } else {
    modal.value?.close()
  }
})
</script>

<template>
  <AppModal ref="modal" @close="store.cancelLast()">
    <template #header> Confirmation </template>
    <template #default>
      <div class="mb-4">{{ store.lastText().value }}</div>
      <div class="text-end">
        <AppButtonLink @click="store.confirmLast()">Yes</AppButtonLink>
        <AppButtonLink @click="store.cancelLast()">Cancel</AppButtonLink>
      </div>
    </template>
  </AppModal>
</template>
