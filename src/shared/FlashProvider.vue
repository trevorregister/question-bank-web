<template>
    <div>
        <slot></slot>
    </div>
    <div v-for="flash in flashes" :key="flash.id">
        <Flash :message="flash.message" :type="flash.type"/>
    </div>
</template>

<script setup lang="ts">
import { ComponentPublicInstance, ref, provide, markRaw, computed } from 'vue'
import Flash from './Flash.vue'
import randomId from './utils/randomId'

type FlashType = 'success' | 'warning' | 'error'
const FLASH_REMOVE_TIMEOUT = 3000

const flashes = ref<{id: string, message: string, type: FlashType}[]>([])
const success = (message: string): void => {
    flashes.value.push({
        message: message,
        type: 'success',
        id: randomId()
    })
    
}
const warning = (message: string): void => {
    flashes.value.push({
        message: message,
        type: 'warning',
        id: randomId()
    })
    
}
const error = (message: string): void => {
    flashes.value.push({
        message: message,
        type: 'error',
        id: randomId()
    })
    
}
const remove = (id: string): void => {
    flashes.value = flashes.value.filter(flash => flash.id !== id)
}
export interface Flash {
    success: (message: string) => void
    warning: (message: string) => void
    error: (message: string) => void
}
const methods: Flash = {
    success: success, 
    warning: warning,
    error: error
}
provide('$flash', methods)

</script>

<style lang="scss">
.flash-banner {
    display: block;
}

</style>