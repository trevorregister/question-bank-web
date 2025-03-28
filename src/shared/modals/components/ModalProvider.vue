<template>
  <div>
    <slot></slot>
  </div>
  <q-dialog v-model="showModal">
    <component v-bind="modalProps" ref="modal" :is="modalComponent" />
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, provide, markRaw } from "vue"
import slugify from "../../utils/slugify"

const modalComponent = ref<any>()
const showModal = ref<boolean>(false)
const modalResolve = ref<any>(() => {})
const modalProps = ref({})

const show = async (component: any, props = {}) => {
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
const close = (status = "close") => {
  showModal.value = false
  modalComponent.value = null
  modalProps.value = {}
  modalResolve.value = modalResolve.value({ status: slugify(status) })
  modalResolve.value = null
}
const ok = (status = "ok", data = {}) => {
  showModal.value = false
  modalComponent.value = null
  modalProps.value = {}
  modalResolve.value = modalResolve.value({ status: slugify(status), data })
  modalResolve.value = null
}
const status = (status: string, data: any) => {
  showModal.value = false
  modalComponent.value = null
  modalProps.value = {}
  modalResolve.value = modalResolve.value({ status: slugify(status), data })
  modalResolve.value = null
}
export interface Modal {
  show: (component: any, props?: any) => Promise<any>
  close: (status?: string) => void
  ok: (status?: string, data?: any) => void
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
