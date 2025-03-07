<template>
    <div class="q-pa-xs">
        <q-expansion-item
            expand-separator
            :label=label
            class="collapse-panel q-pa-xs shadow-1"
        >
        <slot></slot>
        </q-expansion-item>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    label: String
}>()

</script>

<style lang="scss">
.collapse-panel {
    min-width: 100vh;
/*     border-color: $secondary;
    border-style: solid;
    border-radius: 5px; */
}
</style>