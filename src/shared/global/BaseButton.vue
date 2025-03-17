<template>
  <q-btn
    class="q-ml-sm q-mr-sm"
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
.form-action {
  display: flex;
  justify-content: right;
}
</style>
