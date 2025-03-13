<template>
  <div>
    <slot></slot>
  </div>
  <q-dialog v-model="showModal">
    <component v-bind="modalProps" ref="modal" :is="modalComponent" />
  </q-dialog>
</template>

<script setup lang="ts">
import { ComponentPublicInstance, ref, provide, markRaw, computed } from "vue"

const modalComponent = ref<ComponentPublicInstance>(null)
const showModal = ref<boolean>(false)
const modalResolve = ref(null)
const modalProps = ref(null)

const show = async (component: ComponentPublicInstance, props = {}) => {
  showModal.value = true
  const previousElement = document.activeElement as HTMLElement
  const result = await new Promise((resolve, reject) => {
    modalResolve.value = resolve
    modalProps.value = props
    modalComponent.value = markRaw(component)
  })
  try {
    if (previousElement && previousElement.focus) previousElement.focus()
  } catch {}
  return result
}
const close = () => {
  showModal.value = false
  modalComponent.value = null
  modalProps.value = {}
  modalResolve.value = modalResolve.value({ status: "closed" })
  modalResolve.value = null
}
const ok = (data = {}) => {
  showModal.value = false
  modalComponent.value = null
  modalProps.value = {}
  modalResolve.value = modalResolve.value({ status: "ok", data })
  modalResolve.value = null
}
const status = (status: string, data: any) => {
  showModal.value = false
  modalComponent.value = null
  modalProps.value = {}
  modalResolve.value = modalResolve.value({ status, data })
  modalResolve.value = null
}
export interface Modal {
  show: (component, props?) => Promise<any>
  close: () => void
  ok: (data?: any) => void
  status: (status: string, data: any) => void
}
const methods: Modal = {
  ok: ok,
  status: status,
  close: close,
  show: show,
}
provide("$modal", methods)
</script>

<style lang="scss"></style>
