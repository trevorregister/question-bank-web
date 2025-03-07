<template>
    <q-btn label="Get Variables" @click="getVariables"/>
    <q-btn @click="log" label="log"/>
    <CollapsePanel label="Question">
        <div class="row q-col-gutter-sm">
            <div class="col-sm-12 col-md-7 q-pa-md flex flex-center">
                <q-editor ref="editor" v-model="editorContents"></q-editor>
            </div>
            <div v-if="variables.length>0" class="col-sm-12 col-md-5 q-pa-md flex flex-center">
                <VariablesTable :variables="variables" @delete-variable="handleDeleteVariable"/>
            </div>            
        </div>
    </CollapsePanel>
</template>

<script setup lang="ts">
import CollapsePanel from '../../../shared/components/CollapsePanel.vue'
import VariablesTable from './VariablesTable.vue'
import { ref } from 'vue'
import randomId from '../../../shared/utils/randomId'
const editorContents = ref('{{ asdf }} {{eoiruwkj}}  {{fjoiewjd}} {{ fdFda }} asdf23x {{ 2394aSSsdf }} {{ 23&&reas}} {{ asdf.fdei}}')
const editor = ref<InstanceType<typeof HTMLElement> | null>(null)
const variables = ref<{
    id: string,
    label: string,
    min: number,
    max: number,
    step: number
}[]>([])

const log = () => {
    variables.value.forEach( variable => {console.log(variable.id)})
}
const getVariables = () => {
    const regex = /\{\{\s*([a-zA-Z.]+)\s*\}\}/g
    const rawVariableLabels = editorContents.value.match(regex)

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
/* .editor {
    max-width: 70%;
} */

/* .number-input {
    border-radius: 5px;
    border-color: $accent;
    border-style: solid;
    width: 10rem;
} */
</style>