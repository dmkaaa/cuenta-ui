<script setup lang="ts">
import AppInput from '@/components/common/AppInput.vue'
import { chunk } from '@/util/array'
import { addDays, addMonths, addYears, formatIsoDate, toIsoFormat } from '@/util/date'
import { computed, ref, watch } from 'vue'
import AppButtonLink from './AppButtonLink.vue'

const model = defineModel<string>()
const displayModel = ref('')

watch(model, (value) => {
  if (value) {
    displayModel.value = formatIsoDate(value)
    date.value = getFirstDayOfMonth(new Date(value))
  } else {
    displayModel.value = ''
    date.value = getFirstDayOfMonth(new Date())
  }
})

const visible = ref(false)
const date = ref(getFirstDayOfMonth(new Date()))
const monthName = computed(() => date.value.toLocaleString('en', { month: 'long' }))
const grid = computed(() => getGrid(date.value))

interface DateCell {
  value: Date
  sameMonth: boolean
  isToday: boolean
}

function getFirstDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function getGrid(date: Date): DateCell[][] {
  const now = new Date()
  const start = getFirstDayOfMonth(date)
  const dow = start.getDay()
  const daysBefore = dow === 1 ? 7 : dow - 1
  start.setDate(start.getDate() - daysBefore)

  const dates: DateCell[] = []
  for (let i = 0; i < 42; i++) {
    const cellValue = addDays(start, i)
    dates.push({
      value: cellValue,
      sameMonth: cellValue.getMonth() === date.getMonth(),
      isToday:
        cellValue.getFullYear() === now.getFullYear() &&
        cellValue.getMonth() === now.getMonth() &&
        cellValue.getDate() === now.getDate()
    })
  }

  return chunk(dates, 7)
}

function incMonth(amount: number) {
  date.value = addMonths(date.value, amount)
}

function incYear(amount: number) {
  date.value = addYears(date.value, amount)
}

function select(date: Date) {
  model.value = toIsoFormat(date)
  visible.value = false
}
</script>

<template>
  <AppInput @focus="visible = true" v-model="displayModel" />
  <div
    v-if="visible"
    class="absolute border rounded border-slate-600 bg-slate-700 text-slate-200 mt-1 p-1"
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
      <div
        v-for="cell in row"
        class="w-8 h-8 leading-8 text-center rounded-full cursor-pointer hover:bg-cyan-700 hover:text-slate-200"
        :class="{ 'text-slate-500': !cell.sameMonth, 'font-bold': cell.isToday }"
        @click="select(cell.value)"
      >
        {{ cell.value.getDate() }}
      </div>
    </div>
  </div>
</template>
