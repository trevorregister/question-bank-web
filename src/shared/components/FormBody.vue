<template>
  <div class="form-body q-pa-lg shadow-1 rounded-borders">
    <div class="q-mb-lg text-h5">{{ header }}</div>
    <q-separator class="q-mb-lg" />
    <q-form @submit.prevent :aria-label="header">
      <slot></slot>
    </q-form>
  </div>
</template>
<script setup lang="ts">
defineProps<{ header: string }>()
</script>
<style lang="scss"></style>
