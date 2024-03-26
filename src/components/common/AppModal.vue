<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['close'])
const isOpen = ref(false)

function open() {
  document.body.classList.add('overflow-hidden')
  isOpen.value = true
}

function close() {
  document.body.classList.remove('overflow-hidden')
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
    <div
      class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      @click.self="close()"
    >
      <div
        class="max-h-[90%] overflow-scroll w-1/3 bg-slate-800 border border-slate-700 rounded-md px-5 py-3"
      >
        <h3 class="text-2xl mb-4">
          <slot name="header"></slot>
        </h3>
        <div>
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
