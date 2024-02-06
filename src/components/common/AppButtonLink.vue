<script setup lang="ts">
interface Props {
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'cyan'
})
</script>

<template>
  <button
    class="font-medium mx-2 last:me-0"
    :class="['text-' + props.color + '-700', 'hover:text-' + props.color + '-600']"
    type="button"
  >
    <slot />
  </button>
</template>
