<template>
  <table class="full-width" aria-label="conditions">
    <tr>
      <th class="text-body2">Answer Expression</th>
      <th class="text-body2">Feedback</th>
      <th class="text-body2">Correct</th>
    </tr>
    <tr v-for="condition in conditions">
      <td class="condition-expression">
        <TextInput v-model="condition.expression" label="Expression" />
      </td>
      <td class="condition-feedback">
        <!-- <TextInput v-model="condition.feedback"/> -->
        <q-editor
          v-model="condition.feedback"
          class="condition-editor"
          :toolbar="toolbar"
          data-testid="feedback-editor"
        />
      </td>
      <td>
        <q-checkbox size="sm" v-model="condition.isCorrect" />
      </td>
      <td>
        <!--                 <q-icon class="cursor-pointer q-ml-sm" @click="deleteVariable(variable.label)" name="fa-solid fa-shuffle" size="18px" color="positive"/> -->
        <q-icon
          class="cursor-pointer q-ml-sm"
          @click="deleteCondition(condition.id)"
          name="fa-solid fa-trash-can"
          size="18px"
          color="negative"
          aria-label="delete"
        />
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import TextInput from "../../../shared/components/TextInput.vue"
import { Condition } from "../../../shared/types"
defineProps<{
  conditions: Condition[]
}>()

const emit = defineEmits<{
  (e: "delete-condition", id: string): void
}>()
const deleteCondition = (id: string) => {
  emit("delete-condition", id)
}
const toolbar = [
  ["bold", "italic", "underline", "ordered", "unordered"],
  ["superscript", "subscript"],
  ["undo", "redo", "getVariables", "addCondition", "save"],
]
</script>

<style lang="scss" scoped>
td {
  padding: 5px;
}
.condition-expression {
  padding-top: 5px;
  width: 100%;
  display: flex;
  align-items: start;
}

.condition-feedback {
  width: 70%;
}
.condition-editor {
  height: 8rem;
}
</style>
