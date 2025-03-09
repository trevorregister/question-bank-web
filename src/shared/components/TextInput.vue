<template>
<!--     <q-intersection
      transition="flip-left"
    > -->
    <input
      class="text-input" 
      label=""
      :model-value="modelValue" 
      @update:model-value="updateValue"
      />
<!--       <q-input
      class="text-input" 
      outlined 
      dense 
      label=""
      :model-value="modelValue" 
      @update:model-value="updateValue"
      /> -->
<!--     </q-intersection> -->
  </template>
  
  <script setup lang="ts">
  const emit = defineEmits(['update:modelValue'])
  defineProps<{
      modelValue: string
  }>()
  
  const updateValue = (newValue: string) => {
      emit('update:modelValue', newValue)
  }
  </script>
  
  <style lang="scss" scoped>
  .text-input {
      width: 100%;
      border: 1px solid;
      height: 2rem;
      border-radius: 3px;

      &:focus{
        outline: none;
        border: 2px solid $primary;
      }
     }
  </style>