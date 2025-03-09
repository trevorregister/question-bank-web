<template>
<!--     <q-intersection
      transition="flip-left"
    > -->
      <q-input
      class="text-input" 
      outlined 
      dense 
      label=""
      :model-value="modelValue" 
      @update:model-value="updateValue"
      />
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
      max-width: 100%;
  }
  </style>