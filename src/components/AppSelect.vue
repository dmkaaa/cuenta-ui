<script setup lang="ts">
const model = defineModel()
const props = defineProps<{
  options: string[]
}>()
</script>

<template>
  <select class="rounded px-2 py-1 bg-slate-200 text-slate-700 w-full" v-model="model">
    <option v-for="option in props.options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>
