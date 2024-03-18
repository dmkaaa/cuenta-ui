<script setup lang="ts">
import AppInput from '@/components/common/AppInput.vue'
import { chunk } from '@/util/array'
import { addDays } from '@/util/date'
import { computed, ref } from 'vue'

const now = new Date()

const visible = ref(false)
const year = ref(now.getFullYear())
const month = ref(now.getMonth())
const grid = computed(() => getGrid(year.value, month.value))

function show() {
  visible.value = true
}

function getGrid(year: number, month: number): Date[][] {
  const start = new Date(year, month, 1)
  const dow = start.getDay()
  const daysBefore = dow === 1 ? 7 : dow - 1
  start.setDate(start.getDate() - daysBefore)

  const dates: Date[] = []
  for (let i = 0; i < 42; i++) {
    dates.push(addDays(start, i))
  }

  return chunk(dates, 7)
}
</script>

<template>
  <AppInput @click="show()" />
  <div v-if="visible">
    <div v-for="row in grid" class="flex justify-around">
      <div v-for="cell in row" class="p-1">
        {{ cell.getDate() }}
      </div>
    </div>
  </div>
</template>
