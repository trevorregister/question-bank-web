<template>
  <q-card class="modal-body q-pa-md" role="dialog">
    <slot></slot>
  </q-card>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.modal-body {
  min-width: 400px;
}
</style>
