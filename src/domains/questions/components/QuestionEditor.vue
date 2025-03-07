<template>
    <CollapsePanel label="Question">
        <div class="row q-col-gutter-sm">
            <div class="col-sm-12 col-md-7 q-pa-md flex flex-center">
                <TextEditor @get-variables="handleGetVariables" @save-question="handleSaveQuestion"/>
            </div>
            <div v-if="variables.length>0" class="col-sm-12 col-md-5 q-pa-md flex flex-center">
                <VariablesTable :variables="variables" @delete-variable="handleDeleteVariable"/>
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
import { ref } from 'vue'
import randomId from '../../../shared/utils/randomId'

const variables = ref<{
    id: string,
    label: string,
    min: number,
    max: number,
    step: number
}[]>([])
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

const handleSaveQuestion = () => {
    console.log('save event')
}
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