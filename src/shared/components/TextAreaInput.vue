<template>
    <textarea
      class="text-area-input" 
      label=""
      :value="modelValue" 
      @input="updateValue"
      />
  </template>
  
  <script setup lang="ts">
  const emit = defineEmits(['update:modelValue'])
  defineProps<{
      modelValue: string
  }>()
  
  const updateValue = (event: Event) => {
    const target = event.target as HTMLInputElement
      emit('update:modelValue', target.value)
  }
  </script>
  
  <style lang="scss" scoped>
  .text-area-input {
      width: 100%;
      border: 1px solid lightgray;
      height: 5rem;
      border-radius: 3px;

      &:focus{
        outline: none;
        border: 2px solid $primary;
      }
     }
  </style>