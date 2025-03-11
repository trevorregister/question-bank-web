<template>
    <div>
        <slot></slot>
    </div>
    <div v-if="modalComponent">
        <component v-bind="modalProps" ref="modal" :is="modalComponent" />
    </div>
</template>

<script setup lang="ts">
import { ComponentPublicInstance, ref, provide, markRaw } from 'vue'

const modalComponent = ref<ComponentPublicInstance>(null)
const modalResolve = ref(null)
const modalProps = ref(null)

const show = async (component: ComponentPublicInstance, props = {}) => {
    const previousElement = document.activeElement as HTMLElement
    const result = await new Promise(resolve => {
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
    modalComponent.value = null
    modalProps.value = {}
    modalResolve.value = modalResolve.value({status: 'closed'})
    modalResolve.value = null
}
const ok = (data: any) => {
    modalComponent.value = null
    modalProps.value = {}
    modalResolve.value = modalResolve.value({status: 'ok', data})
    modalResolve.value = null
}
const status = (status: string, data: any) => {
    modalComponent.value = null
    modalProps.value = {}
    modalResolve.value = modalResolve.value({ status, data })
    modalResolve.value = null
}
export interface ModalMethods {
    show: (component,  props?) => Promise<any>
    close: () => void
    ok: (data: any) => void
    status: (status: string, data: any) => void
}
const methods: ModalMethods = {
    ok: ok, 
    status: status, 
    close: close, 
    show: show
}
provide('$modal', methods)

</script>

<style lang="scss">

</style>