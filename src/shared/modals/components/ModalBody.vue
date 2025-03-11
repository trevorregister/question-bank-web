<template>
    <q-dialog v-model="show">
        <q-card class="q-pa-sm">
            <slot></slot>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const show = ref<boolean>(true)

onMounted(async () => {
    setTimeout(() => show.value = !show.value, 3000)
})
</script>

<style lang="scss">

</style>