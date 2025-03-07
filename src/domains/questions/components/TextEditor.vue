<template>
    <q-editor
        v-model="editorContents"
        :toolbar="toolbar"
        :definitions="definitions"
    >
    </q-editor>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
    (e: 'get-variables', rawVariableLabels: RegExpMatchArray): void
}>()
const editorContents = ref('')

const toolbar = [
    ['left', 'center', 'right', 'justify', 'ordered', 'unordered', 'italic', 'underline'],
    ['superscript', 'subscript'],
    ['undo', 'redo', 'getVariables'],
]

const getVariables = () => {
    const regex = /\{\{\s*([a-zA-Z.]+)\s*\}\}/g
    const rawVariableLabels = editorContents.value.match(regex)
    emit('get-variables', rawVariableLabels)
}
const definitions = {
    getVariables: {
        label: '+var',
        handler: getVariables,
        color: 'purple'
    }
}

</script>

<style scoped lang="scss">

</style>