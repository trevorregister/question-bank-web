<template>
    <q-editor
        v-model="editorContents"
        :toolbar="toolbar"
        :definitions="definitions"
        class="editor"
    >
    </q-editor>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const props = defineProps<{
    prompt?: string
}>()
const emit = defineEmits<{
    (e: 'get-variables', rawVariableLabels: RegExpMatchArray): void,
    (e: 'save-question', prompt: string): void
}>()
const editorContents = ref('')

const toolbar = [
    ['left', 'center', 'right', 'justify', 'ordered', 'unordered', 'italic', 'underline'],
    ['superscript', 'subscript'],
    ['undo', 'redo', 'getVariables', 'save'],
]

const getVariables = () => {
    const regex = /\{\{\s*([a-zA-Z.]+)\s*\}\}/g
    const rawVariableLabels = editorContents.value.match(regex)
    emit('get-variables', rawVariableLabels)
}

const saveQuestion = () => {
    emit('save-question', editorContents.value)
}
const definitions = {
    getVariables: {
        label: '+var',
        handler: getVariables,
        color: 'purple'
    },
    save: {
        icon: 'fa-solid fa-save',
        handler: saveQuestion,
        color: 'green'
    }
}
onMounted(() => {
    if(props.prompt){
        editorContents.value = props.prompt
    }
})

</script>

<style scoped lang="scss">
.editor{
    width: 550px;
}

</style>