<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '@/components/common/AppButton.vue'
import YearOptions from '@/components/common/YearOptions.vue'
import AppInput from '@/components/common/AppInput.vue'

const emit = defineEmits<{
  select: [start: string, end: string]
}>()

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

selectYear(new Date().getFullYear())
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
    <YearOptions @select="selectYear" class="text-sm" />
  </div>
</template>
