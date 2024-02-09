<script setup lang="ts">
type Option = {
  value: string
  name: string
}

const model = defineModel()
const props = defineProps<{
  options: Option[]
}>()
</script>

<template>
  <select
    class="rounded px-2 py-1 border border-slate-600 bg-slate-700 text-slate-200 w-full"
    v-model="model"
  >
    <option v-for="option in props.options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>
