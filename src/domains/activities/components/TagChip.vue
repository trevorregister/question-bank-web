<template>
  <q-chip outline color="accent" text-color="white" :aria-label="tag" dense>
    {{ tag }}
  </q-chip>
</template>

<script setup lang="ts">
defineProps<{ tag: string }>()
</script>

<style lang="scss"></style>
