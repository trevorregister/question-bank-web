<template>
  <CardBody class="question-card" :flat="flat" :bordered="bordered">
    <CardSection class="bg-primary text-white">
      Question {{ questionNumber ?? "" }}
    </CardSection>
    <CardSection v-html="prompt" class="q-ml-sm" />
    <CardSection>
      <div class="row flex flex-center">
        <div
          class="col-md-8 col-sm-12 q-ma-sm flex justify-md-end justify-sm-center justify-xs-center"
        >
          <NumberInput
            class="answer-input"
            label="answer"
            v-model.number="answer"
          />
        </div>
        <div class="col-md-2 col-sm-12 q-ma-sm flex flex-center">
          <BaseButton label="Submit" @click="submitAnswer" />
        </div>
      </div>
    </CardSection>
    <CardSection>
      <FeedbackPanel
        :answerResponse="answerResponse"
        :maxPoints="pointValue"
        :submissionCount="submissionCount"
      />
    </CardSection>
  </CardBody>
</template>

<script setup lang="ts">
import NumberInput from "../../../shared/components/NumberInput.vue"
import CardBody from "../../../shared/global/CardBody.vue"
import CardSection from "../../../shared/global/CardSection.vue"
import FeedbackPanel from "./FeedbackPanel.vue"
import { Question } from "../../../shared/types"
import { evaluate } from "mathjs"
import { ref, onMounted } from "vue"
const props = withDefaults(
  defineProps<{
    question: Question
    questionNumber?: number
    flat?: boolean
    bordered?: boolean
  }>(),
  {
    flat: false,
    bordered: false,
  },
)
const variables = ref<{ label: string; value: number; id: string }[]>([])
const prompt = ref("")
const answer = ref<number | undefined>()
const submissionCount = ref<number>(0)
const pointValue = ref(0)
const answerResponse = ref<{
  feedback: string
  isCorrect: boolean
  pointValue: number
}>({
  feedback: "",
  isCorrect: false,
  pointValue: 0,
})
const BASE_TOLERANCE = 0.01

const buildScope = (variables: { label: string; value: number }[]) => {
  const scope = new Map<string, number>()
  variables.forEach((variable) => scope.set(variable.label, variable.value))
  return scope
}
const submitAnswer = () => {
  submissionCount.value++
  const scope = buildScope(variables.value)
  for (const condition of props.question.conditions) {
    const upperBound =
      evaluate(condition.expression, scope) * (1 + BASE_TOLERANCE)
    const lowerBound =
      evaluate(condition.expression, scope) * (1 - BASE_TOLERANCE)
    if (
      (answer.value as number) <= upperBound &&
      (answer.value as number) >= lowerBound
    ) {
      answerResponse.value = {
        feedback: condition.feedback,
        isCorrect: condition.isCorrect,
        pointValue: props.question.pointValue,
      }
      break
    } else {
      answerResponse.value = {
        feedback: "",
        isCorrect: false,
        pointValue: 0,
      }
    }
  }
}
const setVariableValues = () => {
  variables.value = props.question.variables.map((variable) => {
    const decimals = (variable.step.toString().split(".")[1] || "").length
    const range = Math.floor((variable.max - variable.min) / variable.step)
    const randomStep = Math.floor(Math.random() * (range + 1))
    return {
      id: variable.id,
      value: parseFloat(
        (variable.min + randomStep * variable.step).toFixed(decimals),
      ),
      label: variable.label,
    }
  })
  props.question.variables.forEach((variable) => {
    const regex = RegExp(`{{${variable.label}}}`, "g")
    const variableToReplace = variables.value.find((v) => v.id === variable.id)
    if (variableToReplace) {
      prompt.value = prompt.value.replace(
        regex,
        variableToReplace.value.toString(),
      )
    }
  })
}

onMounted(() => {
  prompt.value = props.question.prompt
  pointValue.value = props.question.pointValue
  setVariableValues()
})
</script>

<style lang="scss">
.question-card {
  min-width: 80%;
}
.answer-input {
  min-width: 30% !important;
}
</style>
