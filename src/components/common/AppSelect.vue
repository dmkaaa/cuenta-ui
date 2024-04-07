<script setup lang="ts">
type Option = {
  value: string | number
  name: string
}

const model = defineModel<string | number | undefined>()
defineProps<{
  options: Option[]
}>()
</script>

<template>
  <select
    class="rounded px-2 py-1 border border-slate-600 bg-slate-700 text-slate-200 w-full"
    v-model="model"
  >
    <option :value="undefined" disabled hidden>Select your option</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>
