<template>
    <q-banner
        dense
        rounded
        class="flash-banner q-pa-sm q-mb-sm text-body2"
        :color="flashType"
    >
        {{ message }}
    </q-banner>
</template>

<script setup lang="ts">
import { ComponentPublicInstance, ref, provide, markRaw, computed } from 'vue'

const props = defineProps<{message: string, type: string}>()

const flashType = (): string => {
    switch(props.type){
        case 'success':
            return 'positive'
        case 'warning':
            return 'warning'
        case 'error':
            return 'negative'
    }
}

/* export interface Flash = {

}
const methods: Flash = {
    ok: ok, 
    status: status, 
    close: close, 
    show: show
}
provide('$flash', methods) */

</script>

<style lang="scss">
.flash-banner {
    display: block;
}

</style>