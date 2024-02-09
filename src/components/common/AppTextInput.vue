<script setup lang="ts">
const model = defineModel()
</script>

<template>
  <input
    class="rounded px-2 py-1 border border-slate-600 bg-slate-700 text-slate-200 w-full"
    v-model="model"
    type="text"
  />
</template>
