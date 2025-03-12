<template>
    <h5>Text</h5>
</template>

<script setup lang="ts">
import { onMounted, inject } from 'vue'
import { Modal } from './modals/components/ModalProvider.vue'
import ConfirmModal from './modals/ConfirmModal.vue'
const modal = inject<Modal>('$modal')

</script>

<style scoped lang="scss">

</style>
