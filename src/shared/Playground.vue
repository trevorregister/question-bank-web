<template>
    <h5>Text</h5>
</template>

<script setup lang="ts">
import { onMounted, inject } from 'vue'
import { ModalMethods } from './modals/components/ModalProvider.vue'
import ConfirmModal from './modals/ConfirmModal.vue'
const modal = inject<ModalMethods>('$modal')

</script>

<style scoped lang="scss">

</style>
