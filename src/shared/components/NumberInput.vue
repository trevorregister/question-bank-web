<template>
    <input
    class="number-input no-spinner" 
    type="number"
    :value="modelValue" 
    @input="updateValue"
    />
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
defineProps<{
    modelValue: number | ""
}>()

const updateValue = (event: Event) => {
    const target = event.target as HTMLInputElement
      emit('update:modelValue', target.value)
  }
</script>

<style lang="scss" scoped>
.number-input {
    max-width: 70px;
    border: 1px solid lightgrey;
    height: 1.8rem;
    border-radius: 3px;
    text-align: center;

      &:focus{
        outline: none;
        border: 2px solid $primary;
      }
}
.no-spinner {
    -webkit-appearance: textfield;
}

.no-spinner::-webkit-outer-spin-button,
.no-spinner::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* For Firefox */
.no-spinner[type=number] {
    -moz-appearance: textfield;
}
</style>