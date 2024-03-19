<script setup lang="ts">
import AppInput from '@/components/common/AppInput.vue'
import { chunk } from '@/util/array'
import { addDays, addMonths, addYears } from '@/util/date'
import { computed, ref } from 'vue'
import AppButtonLink from './AppButtonLink.vue'

const visible = ref(false)
const date = ref(getFirstDayOfMonth(new Date()))
const monthName = computed(() => date.value.toLocaleString('en', { month: 'long' }))
const grid = computed(() => getGrid(date.value))

function show() {
  visible.value = true
}

function getFirstDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function getGrid(date: Date): Date[][] {
  const start = getFirstDayOfMonth(date)
  const dow = start.getDay()
  const daysBefore = dow === 1 ? 7 : dow - 1
  start.setDate(start.getDate() - daysBefore)

  const dates: Date[] = []
  for (let i = 0; i < 42; i++) {
    dates.push(addDays(start, i))
  }

  return chunk(dates, 7)
}

function incMonth(amount: number) {
  date.value = addMonths(date.value, amount)
}

function incYear(amount: number) {
  date.value = addYears(date.value, amount)
}
</script>

<template>
  <AppInput @click="show()" />
  <div
    v-if="visible"
    class="absolute border rounded border-slate-600 bg-slate-700 text-slate-200 mt-1"
  >
    <div class="flex justify-between">
      <div class="px-2">
        <AppButtonLink @click="incYear(-1)">&larr;</AppButtonLink>
      </div>
      <div class="font-semibold">{{ date.getFullYear() }}</div>
      <div class="px-2">
        <AppButtonLink @click="incYear(1)">&rarr;</AppButtonLink>
      </div>
    </div>
    <div class="flex justify-between">
      <div class="px-2">
        <AppButtonLink @click="incMonth(-1)">&larr;</AppButtonLink>
      </div>
      <div>{{ monthName }}</div>
      <div class="px-2">
        <AppButtonLink @click="incMonth(1)">&rarr;</AppButtonLink>
      </div>
    </div>
    <div v-for="row in grid" class="flex justify-around">
      <div v-for="cell in row" class="w-7 text-center py-1">
        {{ cell.getDate() }}
      </div>
    </div>
  </div>
</template>
