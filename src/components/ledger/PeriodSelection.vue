<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '@/components/common/AppButton.vue'
import AppButtonLink from '@/components/common/AppButtonLink.vue'
import AppInput from '@/components/common/AppInput.vue'
import { range } from '@/util/number'

const emit = defineEmits<{
  select: [start: string, end: string]
}>()

const currentYear = new Date().getFullYear()
const numberOfYears = 7;
const years = range(currentYear - numberOfYears, currentYear)

const startModel = ref('')
const endModel = ref('')

function selectYear(year: number) {
  startModel.value = year + '-01-01'
  endModel.value = year + '-12-31'
  submit()
}

function submit() {
  emit('select', startModel.value, endModel.value)
}

selectYear(currentYear)
</script>

<template>
  <div class="flex align-center">
    <div>
      <AppInput type="date" placeholder="Period start" v-model="startModel"></AppInput>
    </div>
    <div class="mx-2">
      <AppInput type="date" placeholder="Period end" v-model="endModel"></AppInput>
    </div>
    <div>
      <AppButton @click="submit()">Generate</AppButton>
    </div>
  </div>
  <div>
    <AppButtonLink v-for="year in years" :key="year" @click="selectYear(year)" class="mx-1 text-sm">
      {{ year }}
    </AppButtonLink>
  </div>
</template>
