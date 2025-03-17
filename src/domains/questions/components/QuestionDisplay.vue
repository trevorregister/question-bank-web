<template>
  <CardBody class="question-card">
    <CardSection v-html="prompt" />
    <CardSection v-for="variable in variables">
      {{ variable }}
    </CardSection>
    <CardSection>
      <NumberInput label="answer" v-model.number="answer" />
      <BaseButton label="Submit" @click="submitAnswer" />
    </CardSection>
    <CardSection v-for="condition in props.question.conditions">
      {{ condition }}
    </CardSection>
  </CardBody>
</template>

<script setup lang="ts">
import NumberInput from "../../../shared/components/NumberInput.vue"
import CardBody from "../../../shared/global/CardBody.vue"
import CardSection from "../../../shared/global/CardSection.vue"
import { Question, Variable } from "../../../shared/types"
import { evaluate } from "mathjs"
import { ref, onMounted } from "vue"
const props = defineProps<{ question: Question }>()
const variables = ref([])
const prompt = ref("")
const answer = ref<number | "">("")

const buildScope = (variables: { label: string; value: number }[]) => {
  const scope = new Map<string, number>()
  variables.forEach((variable) => scope.set(variable.label, variable.value))
  return scope
}
const submitAnswer = () => {
  const scope = buildScope(variables.value)
  props.question.conditions.forEach((condition) => {
    console.log(evaluate(condition.expression, scope), answer.value)
  })
}

onMounted(() => {
  prompt.value = props.question.prompt
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
    prompt.value = prompt.value.replace(
      regex,
      variables.value.find((v) => v.id === variable.id).value,
    )
  })
})
</script>

<style lang="scss">
.question-card {
  min-width: 500px;
}
</style>
