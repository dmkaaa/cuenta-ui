import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface ConfirmDialog {
  text: string
  ok: () => void
}

export const useConfirmDialogsStore = defineStore('confirmDialogs', () => {
  const dialogs = ref<ConfirmDialog[]>([])

  function open(text: string, ok: () => void) {
    dialogs.value.push({ text, ok })
  }

  function cancelLast() {
    dialogs.value.pop()
  }

  function confirmLast() {
    const last = dialogs.value.pop()
    last?.ok()
  }

  function length() {
    return computed(() => dialogs.value.length)
  }

  function lastText() {
    return computed(() => dialogs.value.at(-1)?.text)
  }

  return {
    open,
    cancelLast,
    confirmLast,
    length,
    lastText
  }
})
