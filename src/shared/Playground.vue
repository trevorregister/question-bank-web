<template>
  <h5>Playground</h5>
</template>

<script setup lang="ts">
import { onMounted, inject } from "vue"
import { Flash } from "./components/FlashProvider.vue"
const flash = inject<Flash>("$flash")

onMounted(() => {
  flash.success("success")
})
</script>

<style scoped lang="scss"></style>
