<template>
    <q-btn 
        class="q-ml-md"
        color="primary" 
        label="Ok" 
        @click="onClick"
    />
</template>
  
<script setup lang="ts">
import { inject } from 'vue'
import { ModalMethods } from './ModalProvider.vue'

const modal = inject<ModalMethods>('$modal')

const onClick = () => {
    modal.ok({stuff: 'stuff'})
}

</script>

<style lang="scss">

</style>