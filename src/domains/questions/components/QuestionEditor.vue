<template>
  <CollapsePanel
    :label="shortPrompt"
    :aria-label="
      question.prompt.length === 0 ? 'Pending question' : question.prompt
    "
  >
    <div class="row q-col-gutter-sm">
      <div class="col-sm-12 col-md-7 q-pa-md flex flex-center">
        <TextEditor
          @get-variables="handleGetVariables"
          @save-question="handleSaveQuestion"
          @add-condition="handleAddCondition"
          @delete-question="handleDeleteQuestion"
          :prompt="props.question?.prompt ?? 'New Question'"
          :isPending="!('id' in props.question)"
        />
      </div>
      <div
        v-if="variables.length > 0"
        class="col-sm-12 col-md-5 q-pa-md q-mb-xl flex flex-center"
      >
        <VariablesTable
          :variables="variables"
          @delete-variable="handleDeleteVariable"
        />
      </div>
      <div v-else class="col-sm-12 col-md-5 q-pa-md flex flex-center text-h5">
        Add some variables
      </div>
    </div>
    <div class="row q-col-gutter-sm q-pa-sm">
      <div class="col" style="margin-left: 1rem">
        Point Value
        <NumberInput
          label="Point Value"
          :model-value="pointValue"
          class="q-ml-md"
        />
      </div>
    </div>
    <div class="row q-col-gutter-sm q-pa-sm flex flex-center">
      <div class="col-12">
        <div
          v-if="conditions.length > 0"
          class="col-md-10 col-sm-12 flex justify-start q-pa-sm"
        >
          <ConditionsTable
            :conditions="conditions"
            @delete-condition="handleDeleteCondition"
          />
        </div>
        <div v-else class="col flex flex-center text-h5">
          Add some conditions
        </div>
      </div>
    </div>
  </CollapsePanel>
</template>

<script setup lang="ts">
import CollapsePanel from "../../../shared/components/CollapsePanel.vue"
import VariablesTable from "./VariablesTable.vue"
import ConditionsTable from "./ConditionsTable.vue"
import TextEditor from "./TextEditor.vue"
import NumberInput from "../../../shared/components/NumberInput.vue"
import { ref, onBeforeMount, computed } from "vue"
import client from "../../../shared/api-client"
import randomId from "../../../shared/utils/randomId"
import {
  Variable,
  Question,
  Condition,
  PendingQuestion,
} from "../../../shared/types"

const props = defineProps<{ question: Question | PendingQuestion }>()
const emit = defineEmits<{
  (e: "pending-question-saved", { tempId, newQuestion }): void
  (e: "existing-question-saved", question: Question): void
  (e: "delete-question", question: Question): void
}>()
const variables = ref<Variable[]>()
const conditions = ref<Condition[]>()
const pointValue = ref<number>()

const shortPrompt = computed((): string =>
  props.question
    ? props.question.prompt.substring(0, 25).concat("...")
    : "New Question",
)

const handleAddCondition = () => {
  conditions.value.push({
    id: randomId(),
    expression: "",
    feedback: "",
    isCorrect: false,
  })
}
const extractLabelFromBraces = (variableWithBraces: string) => {
  let label = ""
  for (const character of variableWithBraces) {
    if (character === "{" || character === "}" || character === " ") {
      continue
    }
    label = label.concat(character)
  }
  return label
}

const handleGetVariables = (rawVariableLabels: string[]) => {
  const allVariables = rawVariableLabels
    ? rawVariableLabels.map((label) => {
        const variableLabel = extractLabelFromBraces(label)
        const variable: Variable = {
          id: randomId(),
          label: variableLabel,
          min: 0,
          max: 0,
          step: 0,
          type: "random",
        }
        return variable
      })
    : []

  if (variables.value.length === 0) {
    variables.value = allVariables
  } else {
    //makes sure to add new variables while retaining existing ones, even if
    //existing one is deleted from the text editor.
    allVariables.forEach((allVariable) => {
      if (
        !variables.value.find(
          (variable) => variable.label === allVariable.label,
        )
      ) {
        variables.value = [...variables.value, allVariable]
      }
    })
  }
}

const handleDeleteVariable = (id: string) => {
  variables.value = variables.value.filter((variable) => variable.id !== id)
}
const handleDeleteCondition = (id: string) => {
  conditions.value = conditions.value.filter((condition) => condition.id !== id)
}
const handleDeleteQuestion = () => {
  if ("id" in props.question) {
    emit("delete-question", props.question)
  }
}
const handleSaveQuestion = async (editorContents: string) => {
  //finds instances of a variable without the gvar tag and adds it.
  //example: "A car travels {{distance}}" returns "A car travels <gvar class='var-variableId'>{{distance}}</gvar>
  const regex = /(?<!<gvar[^>]*>)\{\{\s*(.*?)\s*\}\}(?!<\/gvar>)/g
  editorContents = editorContents.replace(regex, (match, label) => {
    const id = variables.value.find((variable) => variable.label === label).id
    return `<gvar class='var-${id}'>{{${extractLabelFromBraces(match)}}}</gvar>`
  })
  const questionComponents = {
    prompt: editorContents,
    variables: variables.value,
    conditions: conditions.value,
    pointValue: pointValue.value,
    type: "numerical",
  }
  if ("tempId" in props.question) {
    const newQuestion = await client.questions.create({
      ...questionComponents,
    })
    emit("pending-question-saved", {
      tempId: props.question.tempId,
      newQuestion: newQuestion,
    })
  } else {
    const question = await client.questions.updateQuestion({
      questionId: props.question.id,
      payload: { ...questionComponents },
    })
    emit("existing-question-saved", question)
    console.log(question)
  }
}
onBeforeMount(async () => {
  if (props.question) {
    variables.value = props.question.variables
    conditions.value = props.question.conditions
    pointValue.value = props.question.pointValue
  } else {
    variables.value = []
    conditions.value = []
    pointValue.value = 0
  }
})
</script>

<style scoped lang="scss">
.point-attempts-container {
  margin-top: 1.9rem;
}
</style>
