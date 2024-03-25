<script setup lang="ts">
import { reactive } from 'vue'
import AppButton from '@/components/common/AppButton.vue'
import YearOptions from '@/components/common/YearOptions.vue'
import DateInput from '@/components/common/DateInput.vue'
import type { Period } from '@/util/date'

const emit = defineEmits<{
  select: [period: Period]
}>()

const period = reactive<Period>(initState())

function initState(): Period {
  const currentYear = new Date().getFullYear()
  return {
    start: currentYear + '-01-01',
    end: currentYear + '-12-31'
  }
}

function selectYear(year: number) {
  period.start = year + '-01-01'
  period.end = year + '-12-31'
  submit()
}

function submit() {
  emit('select', { ...period })
}

submit()
</script>

<template>
  <div class="flex align-center">
    <div>
      <DateInput placeholder="Period start (dd.mm.yyyy)" v-model="period.start" />
    </div>
    <div class="mx-2">
      <DateInput placeholder="Period end (dd.mm.yyyy)" v-model="period.end" />
    </div>
    <div>
      <AppButton @click="submit()">Generate</AppButton>
    </div>
  </div>
  <div>
    <YearOptions @select="selectYear" class="text-sm" />
  </div>
</template>
