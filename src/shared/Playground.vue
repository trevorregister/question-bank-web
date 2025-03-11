<template>
    <ModalBody>
        <ModalHeader>
            Header
        </ModalHeader>
        <ModalContent>
            content
        </ModalContent>
        <ModalActions>
            <q-btn label="ok"/>
        </ModalActions>
    </ModalBody>
</template>

<script setup lang="ts">
import ModalBody from './modals/components/ModalBody.vue'
import ModalContent from './modals/components/ModalContent.vue'
import ModalHeader from './modals/components/ModalHeader.vue'
import ModalActions from './modals/components/ModalActions.vue'
</script>

<style scoped lang="scss">

</style>
