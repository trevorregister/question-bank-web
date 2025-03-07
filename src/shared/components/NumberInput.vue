<template>
    <q-input
    class="number-input no-spinner" 
    outlined 
    dense 
    label=""
    type="number"
    input-mode="decimal"
    :model-value="modelValue" 
    @update:model-value="updateValue"
    />
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
defineProps<{
    modelValue: number | ""
}>()

const updateValue = (newValue: number) => {
    emit('update:modelValue', newValue)
}
</script>

<style lang="scss" scoped>
.number-input {
    max-width: 70px;
}
.no-spinner :deep(input) {
  /* Remove spinner buttons for Webkit browsers (Chrome, Safari, etc.) */
  -webkit-appearance: textfield;
}

.no-spinner :deep(input::-webkit-outer-spin-button),
.no-spinner :deep(input::-webkit-inner-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}

/* For Firefox */
.no-spinner :deep(input[type=number]) {
  -moz-appearance: textfield;
}
</style>