<template>
  <div class="row q-mb-md">
    <div class="col">
      <q-editor
        v-model="editorContents"
        :toolbar="toolbar"
        :definitions="definitions"
        class="editor"
        data-testid="prompt-editor"
      >
      </q-editor>
    </div>
  </div>
  <div class="row flex justify-start full-width">
    <div class="col">
      <BaseButton label="Save" @click="saveQuestion" />
      <BaseButton
        label="Delete"
        @click="deleteQuestion"
        outline
        color="negative"
        :disable="isPending"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue"
import { Modal } from "../../../shared/modals/components/ModalProvider.vue"
import ConfirmModal from "../../../shared/modals/ConfirmModal.vue"

const props = defineProps<{
  prompt?: string
  isPending: boolean
}>()
const emit = defineEmits<{
  (e: "get-variables", rawVariableLabels: string[]): void
  (e: "save-question", prompt: string): void
  (e: "add-condition"): void
  (e: "delete-question"): void
}>()
const modal = inject<Modal>("$modal")
const editorContents = ref("")

const toolbar = [
  ["bold", "italic", "underline", "ordered", "unordered"],
  ["superscript", "subscript"],
  ["undo", "redo", "getVariables", "addCondition", "save"],
]

const getVariables = () => {
  //captures only letters within double curly's, no spaces. {{text}} is captured but {{ text}} isn't.
  const regex = /\{\{([a-zA-Z]+)\}\}/g

  //prevents duplicate entries with same label from being created, i.e.
  //"{{distance}} {{distance}}" will only create one distance variable
  const rawVariableLabels = Array.from(
    new Set(editorContents.value.match(regex)),
  )

  emit("get-variables", rawVariableLabels)
}

const saveQuestion = () => {
  getVariables()
  emit("save-question", editorContents.value)
}
const addCondition = () => {
  emit("add-condition")
}
const deleteQuestion = async () => {
  const { status } = await modal.show(ConfirmModal)
  if (status === "ok") {
    emit("delete-question")
  } else return
}
const definitions = {
  getVariables: {
    label: "+var",
    handler: getVariables,
    color: "purple",
  },
  save: {
    icon: "fa-solid fa-save",
    handler: saveQuestion,
    color: "green",
  },
  addCondition: {
    label: "+cond",
    handler: addCondition,
    color: "blue",
  },
}
onMounted(() => {
  if (props.prompt) {
    editorContents.value = props.prompt
  }
})
</script>

<style scoped lang="scss">
.editor {
  width: 550px;
}
</style>
