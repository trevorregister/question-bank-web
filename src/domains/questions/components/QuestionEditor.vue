<template>
    <q-btn label="Get Variables" @click="getVariables"/>
    <CollapsePanel label="Question">
        <div class="row q-pa-md justify-center">
            <q-editor ref="editor" v-model="editorContents" class="full-width q-mb-md"></q-editor>
        </div>
        <div class="row q-pa-md">
            <VariablesTable :variables="variables"/>
        </div>
    </CollapsePanel>
</template>

<script setup lang="ts">
import CollapsePanel from '../../../shared/components/CollapsePanel.vue'
import VariablesTable from './VariablesTable.vue'
import { ref } from 'vue'
const editorContents = ref('{{ asdf }} {{eoiruwkj}}  {{fjoiewjd}} {{ fdFda }} asdf23x {{ 2394aSSsdf }} {{ 23&&reas}} {{ asdf.fdei}}')
const editor = ref<InstanceType<typeof HTMLElement> | null>(null)
const variables = ref<{
    label: string,
    min: number,
    max: number,
    step: number
}[]>([])

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

const deleteVariable = (label: string) => {
    variables.value = variables.value.filter(variable => variable.label !== label)
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

/* .number-input {
    border-radius: 5px;
    border-color: $accent;
    border-style: solid;
    width: 10rem;
} */

//hides increment/decrement buttons on number inputs
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>