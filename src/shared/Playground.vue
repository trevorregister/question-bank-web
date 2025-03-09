<template>
    <!-- this is probably going to end up being a /bank/:bankId view -->
    <div class="row">
        <div class="col">
            <div class="row q-mb-sm" v-for="question in questions">
                <QuestionEditor 
                    :question="question"
                />
            </div>
            <div class="row q-mb-sm" v-for="question in pendingQuestions">
                <QuestionEditor 
                    @pending-question-saved="handlePendingQuestionSaved" 
                    :question="question"
                />
            </div>
            <div class="row flex flex-center">
                <q-btn 
                    @click="addNewQuestion" label="+Q" 
                    :disabled="isNewQuestionsDisabled"
                    :title="isNewQuestionsDisabled ? 'Enabled when pending question is saved' : ''" 
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import QuestionEditor from '../domains/questions/components/QuestionEditor.vue'
import randomId from './utils/randomId'
import { PendingQuestion, Question } from './types'
import { ref, computed } from 'vue'
const addNewQuestion = () => {
    pendingQuestions.value.push({
        tempId: randomId(),
        prompt: "",
        variables: [],
        conditions: [],
        pointValue: 0,
        isArchived: false,
        isDeleted: false,
        owner: "",
        type: "numerical"
    })
}
const isNewQuestionsDisabled = computed(() =>pendingQuestions.value.length > 0)
const handlePendingQuestionSaved = ({tempId, newQuestion}: {tempId: string, newQuestion: Question}) => {
    questions.value.push(newQuestion)
    pendingQuestions.value = pendingQuestions.value.filter(q => q.tempId !== tempId)
}
const pendingQuestions = ref<PendingQuestion[]>([])
const questions = ref<Question[]>([
    {
        "id": "67cb8bca441abf3caab3183f",
        "prompt": "<b>Tempus</b> optio {{newaje}} <gvar id='67cb8bca441abf3caab31840'>{{ caput }}</gvar> arcus cubitum.",
        "variables": [
            {
            "id": "67cb8bca441abf3caab31840",
            "label": "caput",
            "type": "random",
            "min": 41,
            "max": 152,
            "step": 4
            },
            {
            "id": "67cb8bca441abf3caab31841",
            "label": "amiculum",
            "type": "random",
            "min": 21,
            "max": 133,
            "step": 4
            },
        ],
        "conditions": [
            {
            "id": "67cb8bca441abf3caab31847",
            "expression": "cursus",
            "isCorrect": true,
            "feedback": "Defendo infit aliquid clibanus."
            },
            {
            "id": "67cb8bca441abf3caab31848",
            "expression": "vestigium",
            "isCorrect": true,
            "feedback": "Defluo tardus talis administratio suggero tumultus asperiores."
            },
            {
            "id": "67cb8bca441abf3caab31849",
            "expression": "terminatio",
            "isCorrect": true,
            "feedback": "Cohibeo sono amoveo sono valens."
            }
        ],
        "pointValue": 73,
        "type": "numerical",
        "isArchived": false,
        "isDeleted": false,
        "owner": "67cb8bca441abf3caab3182f"
    },
    {

  "id": "67cb8bca441abf3caab31830",
  "prompt": "Conicio suspendo decens adulatio cubicularis.",
  "variables": [
    {
      "id": "67cb8bca441abf3caab31831",
      "label": "taceo",
      "type": "random",
      "min": 26,
      "max": 118,
      "step": 3
    },
    {
      "id": "67cb8bca441abf3caab31833",
      "label": "perferendis",
      "type": "random",
      "min": 75,
      "max": 133,
      "step": 2
    },
    {
      "id": "67cb8bca441abf3caab31834",
      "label": "calco",
      "type": "random",
      "min": 36,
      "max": 164,
      "step": 1
    }
  ],
  "conditions": [
    {
      "id": "67cb8bca441abf3caab31836",
      "expression": "color",
      "isCorrect": true,
      "feedback": "Varietas vinco desipio quia ancilla comes."
    },
    {
      "id": "67cb8bca441abf3caab31837",
      "expression": "cuppedia",
      "isCorrect": true,
      "feedback": "Casso denuncio voro earum placeat animi trepide pax impedit."
    },
    {
      "id": "67cb8bca441abf3caab31838",
      "expression": "conicio",
      "isCorrect": true,
      "feedback": "Cur stabilis utique dolore sortitus."
    },
  ],
  "pointValue": 60,
  "type": "numerical",
  "isArchived": false,
  "isDeleted": false,
  "owner": "67cb8bca441abf3caab3182f",
    }
])

</script>

<style scoped lang="scss">

</style>
