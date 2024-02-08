<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['close'])
const isOpen = ref(false)

function open() {
  isOpen.value = true
}

function close() {
  if (isOpen.value) {
    isOpen.value = false
    emit('close')
  }
}

defineExpose({
  open,
  close
})
</script>

<template>
  <Teleport to="body" v-if="isOpen">
    <div class="fixed top-0 left-0 w-full h-full bg-black opacity-50" @click="close()"></div>
    <div
      class="absolute top-1/4 left-0 right-0 w-1/3 mx-auto bg-slate-800 border border-slate-700 rounded-md px-5 py-3"
    >
      <h3 class="text-2xl mb-4">
        <slot name="header"></slot>
      </h3>
      <div>
        <slot />
      </div>
    </div>
  </Teleport>
</template>
