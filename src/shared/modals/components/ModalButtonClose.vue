<template>
    <q-btn 
        class="q-ml-md"
        outline 
        color="negative" 
        :label="label" 
        @click="onClick"
    />
</template>
  
<script setup lang="ts">
import { inject } from 'vue'
import { ModalMethods } from './ModalProvider.vue'
import { withDefaults } from 'vue'

withDefaults(defineProps<{label: string}>(), {
    label: 'Close'
})

const modal = inject<ModalMethods>('$modal')

const onClick = () => {
    modal.close()
}

</script>

<style lang="scss">

</style>