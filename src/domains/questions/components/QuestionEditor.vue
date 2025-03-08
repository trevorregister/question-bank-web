<template>
    <CollapsePanel :label="shortPrompt">
        <div class="row q-col-gutter-sm">
            <div class="col-sm-12 col-md-7 q-pa-md flex flex-center">
                <TextEditor 
                    @get-variables="handleGetVariables" 
                    @save-question="handleSaveQuestion" 
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
    </CollapsePanel>
</template>

<script setup lang="ts">
import CollapsePanel from '../../../shared/components/CollapsePanel.vue'
import VariablesTable from './VariablesTable.vue'
import TextEditor from './TextEditor.vue'
import { ref, onBeforeMount, computed } from 'vue'
import randomId from '../../../shared/utils/randomId'
import { Variable, Question, Condition } from '../../../shared/types'

const props = defineProps<{question?: Question}>()
const variables = ref<Variable[]>()
const conditions = ref<Condition[]>()

const shortPrompt = computed((): string => props.question ? props.question.prompt.substring(0, 25).concat('...') : 'New Question')

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
        return {
            id: randomId(),
            label: variableLabel,
            min: 0,
            max: 0,
            step: 0
        }

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
const handleSaveQuestion = async (editorContents: string) => {
        const questionComponents = {
            prompt: editorContents,
            variables: variables.value,
            conditions: conditions.value,
            pointValue: 0,
            owner: 'asdf',
            isArchived: false,
            isDeleted: false
        }
        if(!props.question) {
            console.log('api client create new question', questionComponents)
        } else {
            const updatedQuestion: Question = {
                id: props.question.id,
                ...questionComponents
            }
            console.log('api client update existing question', updatedQuestion)
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
.variable-parameters {
    input {
        margin-left: 1rem;
        max-width: 8rem;
    }
}
.variable-label {
    min-width: 8rem;
}
</style>