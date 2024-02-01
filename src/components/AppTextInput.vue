<script setup lang="ts">
const model = defineModel()
const props = defineProps<{
  placeholder?: string
}>()
</script>

<template>
  <input
    class="rounded px-2 py-1 bg-slate-200 text-slate-700 w-full"
    v-model="model"
    type="text"
    :placeholder="props.placeholder"
  />
</template>
