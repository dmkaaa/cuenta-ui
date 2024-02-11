<script setup lang="ts">
defineProps<{
  message?: string
}>()
</script>

<template>
  <div class="text-red-600 font-normal overflow-hidden" v-if="message">
    {{ message }}
  </div>
</template>
