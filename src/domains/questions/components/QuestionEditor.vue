<template>
    <CollapsePanel label="Question">
        <div class="q-pa-md flex column">
                <q-editor ref="editor" v-model="editorContents" class="q-mb-md"></q-editor>
        </div>
        <q-card v-for="variable in variables" :label="variable">
            <q-card-section>
                {{ variable }}
            </q-card-section>
        </q-card>
    </CollapsePanel>
    <q-btn label="Get Variables" @click="getVariables"/>
</template>

<script setup lang="ts">
import CollapsePanel from '../../../shared/components/CollapsePanel.vue';
import { ref } from 'vue'
const editorContents = ref('{{ asdf }} {{ fdFda }} asdf23x {{ 2394aSSsdf }} {{ 23&&reas}} {{ asdf.fdei}}')
const editor = ref<InstanceType<typeof HTMLElement> | null>(null)
const variables = ref<string[]>([])

const getVariables = () => {
    const regex = /\{\{\s*([a-zA-Z.]+)\s*\}\}/g
    const rawVariables = editorContents.value.match(regex)

    //extract text within curly braces, i.e {{ asdf }} becomes asdf
    const allVariables = rawVariables? rawVariables.map(rawVariable => {
        let variable = '' 
        for (const character of rawVariable){
            if(character === "{" || character === "}" || character === " "){
                continue
            }
            variable = variable.concat(character)
        }
        return variable

    }) : []
    if(variables.value.length === 0){
        variables.value = allVariables
    } else{
        //makes sure to add new variables while retaining existing ones, even if 
        //existing one is deleted from the text editor.
        allVariables.forEach(allVariable => {
            if(!variables.value.find(variable => variable === allVariable)){
                console.log('found', allVariable)
                variables.value = [...variables.value, allVariable]
            }
        })
    }
}
</script>

<style lang="scss">

</style>