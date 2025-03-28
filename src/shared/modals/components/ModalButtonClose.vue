<template>
  <q-btn
    class="base-button q-ml-md"
    outline
    color="negative"
    :label="label"
    @click="onClick"
  />
</template>

<script setup lang="ts">
import { inject } from "vue"
import { Modal } from "./ModalProvider.vue"
import { withDefaults } from "vue"

const props = withDefaults(defineProps<{ label?: string }>(), {
  label: "Close",
})

const modal = inject<Modal>("$modal")!

const onClick = () => {
  modal.close(props.label)
}
</script>

<style lang="scss"></style>
