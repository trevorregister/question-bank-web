<template>
    <ModalBody>
        <ModalHeader>
            {{ header }}
        </ModalHeader>
        <ModalContent>
            {{ content }}
        </ModalContent>
        <ModalActions>
            <ModalButtonClose label="Cancel"/>
            <ModalButtonOk/>
        </ModalActions>
    </ModalBody>
</template>

<script setup lang="ts">
import ModalBody from './components/ModalBody.vue'
import ModalHeader from './components/ModalHeader.vue'
import ModalContent from './components/ModalContent.vue'
import ModalActions from './components/ModalActions.vue'
import ModalButtonOk from './components/ModelButtonOk.vue'
import { withDefaults } from 'vue'
import ModalButtonClose from './components/ModalButtonClose.vue'

withDefaults(defineProps<{header?: string, content?: string}>(), {
    header: 'Are you sure?',
    content: ' '
})

</script>


<style scoped lang="scss">

</style>
