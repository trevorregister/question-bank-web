<template>
  <q-btn
    class="base-button q-ml-md"
    color="primary"
    :label="label"
    @click="onClick"
  />
</template>

<script setup lang="ts">
import { inject } from "vue"
import { Modal } from "./ModalProvider.vue"
const props = withDefaults(defineProps<{ label?: string; data?: any }>(), {
  label: "Ok",
  data: {},
})
const modal = inject<Modal>("$modal")!

const onClick = () => {
  modal.ok(props.data)
}
</script>

<style lang="scss"></style>
