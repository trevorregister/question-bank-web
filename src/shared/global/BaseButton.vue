<template>
  <q-btn class="q-ml-sm q-mr-sm" :label="label" :color="color" />
</template>

<script setup lang="ts">
import { withDefaults } from "vue"
withDefaults(
  defineProps<{
    label: string
    color?: string
  }>(),
  {
    color: "primary",
  },
)
</script>
<style lang="scss">
.form-action {
  display: flex;
  justify-content: right;
}
</style>
