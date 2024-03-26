<script setup lang="ts">
import AppInput from '@/components/common/AppInput.vue'
import { ref, watch } from 'vue'

const model = defineModel<string>()
const displayModel = ref('')
const showError = ref(false)
const valid = ref(true)

watch(model, onModelUpdate, { immediate: true })
watch(displayModel, onDisplayModelUpdate)

function onModelUpdate(value?: string) {
  const date = toDisplayValue(value)

  if (displayModel.value !== date) {
    displayModel.value = date
  }
}

function onDisplayModelUpdate(value: string) {
  const date = toModelValue(value)

  valid.value = !value || !!date

  if (valid.value && model.value !== date) {
    model.value = date
  }
}

function toModelValue(str: string): string | undefined {
  const re = /\d{2}\.\d{2}\.\d{4}/

  if (re.test(str)) {
    const parts = str.split('.')
    const transformed = [...parts].reverse().join('-')
    const date = new Date(transformed)
    const isValid =
      date.getDate() === parseInt(parts[0], 10) &&
      date.getMonth() + 1 === parseInt(parts[1], 10) &&
      date.getFullYear() === parseInt(parts[2], 10)

    if (isValid) {
      return transformed
    }
  }
}

function toDisplayValue(str?: string): string {
  const re = /\d{4}-\d{2}-\d{2}/

  if (str && re.test(str)) {
    const parts = str.split('-')
    const transformed = [...parts].reverse().join('.')
    const date = new Date(str)
    const isValid =
      date.getDate() === parseInt(parts[2], 10) &&
      date.getMonth() + 1 === parseInt(parts[1], 10) &&
      date.getFullYear() === parseInt(parts[0], 10)

    if (isValid) {
      return transformed
    }
  }

  return ''
}
</script>

<template>
  <AppInput
    type="text"
    v-model="displayModel"
    @focus="showError = false"
    @blur="showError = true"
    :class="{ '!border-red-600': showError && !valid }"
  ></AppInput>
</template>
