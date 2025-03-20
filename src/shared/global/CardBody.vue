<template>
  <q-card :flat="flat">
    <slot></slot>
  </q-card>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ flat?: boolean }>(), {
  flat: false,
})
</script>

<style lang="scss"></style>
