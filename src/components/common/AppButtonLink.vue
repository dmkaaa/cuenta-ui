<script setup lang="ts">
interface Props {
  color?: string
}

withDefaults(defineProps<Props>(), {
  color: 'cyan'
})
</script>

<template>
  <button
    class="font-medium mx-2 last:me-0 first:ms-0"
    :class="['text-' + color + '-700', 'hover:text-' + color + '-600']"
    type="button"
  >
    <slot />
  </button>
</template>
