<template>
  <div class="row q-mb-sm justify-left">
    <p class="input-label column text-body2 q-mr-lg q-mb-none self-center">
      {{ label }}
    </p>
    <q-input
      class="column"
      :aria-label="label"
      filled
      outlined
      :dense="dense"
      :model-value="modelValue"
      @update:model-value="updateValue"
      :type="type"
    />
  </div>
</template>
<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    dense?: boolean
    modelValue: string | ""
    type?:
      | "number"
      | "text"
      | "search"
      | "textarea"
      | "time"
      | "password"
      | "email"
      | "tel"
      | "file"
      | "url"
      | "date"
      | "datetime-local"
  }>(),
  { type: "text", dense: true },
)
const emit = defineEmits(["update:modelValue"])

const updateValue = (newValue: string | number | null) => {
  emit("update:modelValue", newValue)
}
</script>
<style scoped lang="scss">
.input-label {
  min-width: 120px;
}
</style>
