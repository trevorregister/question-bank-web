<template>
  <q-btn
    class="base-button q-ml-sm q-mr-sm"
    :label="label"
    :color="color"
    :disable="disable"
  />
</template>

<script setup lang="ts">
import { withDefaults } from "vue"
withDefaults(
  defineProps<{
    label: string
    color?: string
    disable?: boolean
  }>(),
  {
    color: "primary",
    disable: false,
  },
)
</script>
<style lang="scss">
.base-button {
  font-size: 0.75rem;
}
</style>
