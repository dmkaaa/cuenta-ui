<script setup lang="ts">
import AppButtonLink from '@/components/common/AppButtonLink.vue'
import { range } from '@/util/number'

const emit = defineEmits<{
  select: [year: number]
}>()

const currentYear = new Date().getFullYear()
const numberOfYears = 7
const years = range(currentYear - numberOfYears, currentYear)
</script>

<template>
  <div>
    <AppButtonLink v-for="year in years" :key="year" @click="emit('select', year)">
      {{ year }}
    </AppButtonLink>
  </div>
</template>
