<template>
<!--     <q-intersection
        transition="slide-left"
    > -->
        <CollapsePanel :label="shortPrompt">
            <div class="row q-col-gutter-sm">
                <div class="col-sm-12 col-md-7 q-pa-md flex flex-center">
                    <TextEditor 
                        @get-variables="handleGetVariables" 
                        @save-question="handleSaveQuestion" 
                        @add-condition="handleAddCondition"
                        :prompt="props.question?.prompt ?? 'New Question'"
                    />
                </div>
                <div v-if="variables.length>0" class="col-sm-12 col-md-5 q-pa-md flex flex-center">
                    <VariablesTable 
                        :variables="variables" 
                        @delete-variable="handleDeleteVariable"
                    />
                </div>  
                <div v-else class="col-sm-12 col-md-5 q-pa-md flex flex-center text-h5">
                    Add some variables
                </div>         
            </div>
             <div class="row q-col-gutter-sm q-pa-md">
                <div class="col-md-2 col-sm-12">
                    <div class="point-attempts-container row text-body4">
                        <div class="col flex flex-center">
                            Points
                        </div>
                        <div class="col">
                            <NumberInput v-model.number="question.pointValue"/>
                        </div>
                    </div>
                    <div class="point-attempts-container row q-pa-sm">
                        <div class="col flex flex-center">
                            Attempts
                        </div>
                        <div class="col">
                            <input style="width:100%;">
                        </div>
                    </div>
                </div>
                <div v-if="conditions.length > 0" class="col-md-10 col-sm-12 flex justify-start q-pa-sm">
                    <ConditionsTable 
                        :conditions="conditions"
                        @delete-condition="handleDeleteCondition"
                />
                </div>
                <div v-else class="col flex flex-center text-h5">
                    Add some conditions
                </div> 
             </div>
        </CollapsePanel>
<!--     </q-intersection> -->

</template>

<script setup lang="ts">
import CollapsePanel from '../../../shared/components/CollapsePanel.vue'
import VariablesTable from './VariablesTable.vue'
import ConditionsTable from './ConditionsTable.vue'
import TextEditor from './TextEditor.vue'
import NumberInput from '../../../shared/components/NumberInput.vue'
import { ref, onBeforeMount, computed } from 'vue'
import randomId from '../../../shared/utils/randomId'
import { Variable, Question, Condition, PendingQuestion } from '../../../shared/types'

const props = defineProps<{question: Question | PendingQuestion}>()
const emit = defineEmits<{
    (e: 'pending-question-saved', {tempId, newQuestion}): void,
}>()
const variables = ref<Variable[]>()
const conditions = ref<Condition[]>()

const shortPrompt = computed((): string => props.question ? props.question.prompt.substring(0, 25).concat('...') : 'New Question')

const handleAddCondition = () => {
    conditions.value.push({
        id: randomId(),
        expression: "",
        feedback: "",
        isCorrect: false
    })
}
const handleGetVariables = (rawVariableLabels: RegExpMatchArray) => {
    //extract text within curly braces, i.e {{ asdf }} becomes asdf
    const allVariables = rawVariableLabels? rawVariableLabels.map(label => {
        let variableLabel = '' 
        for (const character of label){
            if(character === "{" || character === "}" || character === " "){
                continue
            }
            variableLabel = variableLabel.concat(character)
        }
        const variable: Variable = {
            id: randomId(),
            label: variableLabel,
            min: 0,
            max: 0,
            step: 0,
            type: 'random'
        }
        return variable

    }) : []

    if(variables.value.length === 0){
        variables.value = allVariables
    } else{

        //makes sure to add new variables while retaining existing ones, even if 
        //existing one is deleted from the text editor.
        allVariables.forEach(allVariable => {
            if(!variables.value.find(variable => variable.label === allVariable.label)){
                variables.value = [...variables.value, allVariable]
            }
        })
    }
}

const handleDeleteVariable = (id: string) => {
    variables.value = variables.value.filter(variable => variable.id !== id)
}
const handleDeleteCondition = (id: string) => {
    conditions.value = conditions.value.filter(condition => condition.id !== id)
}
const handleSaveQuestion = async (editorContents: string) => {
        const questionComponents = {
            prompt: editorContents,
            variables: variables.value,
            conditions: conditions.value,
            pointValue: 0,
            owner: 'asdf',
            isArchived: false,
            isDeleted: false,
            type: 'numerical'
        }
        if('tempId' in props.question) {
            //replace newQuestion with return of client creating new question
            const newQuestion: Question = {
                id: randomId(),
                prompt: questionComponents.prompt,
                variables: questionComponents.variables,
                conditions: questionComponents.conditions,
                pointValue: questionComponents.pointValue,
                owner: questionComponents.owner,
                isArchived: false,
                isDeleted: false,
                type: 'numerical'
            }
            emit('pending-question-saved', {tempId: props.question.tempId, newQuestion})
        } else {
            //handle api client of updating existing question
            const updatedQuestion: Question = {
                id: props.question.id,
                ...questionComponents
            }
        }
}
onBeforeMount(async () => {
    if(props.question){
        variables.value = props.question.variables
        conditions.value = props.question.conditions
    } else {
        variables.value = []
        conditions.value = []
    }
})
</script>

<style scoped lang="scss">
.point-attempts-container {
    margin-top: 1.9rem;
}
</style>