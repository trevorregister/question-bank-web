<template>
    <table>
        <tr>
            <th class="text-body1">
            </th>
            <th class="text-body1">
                Min
            </th>
            <th class="text-body1">
                Max
            </th>
            <th class="text-body1">
                Step
            </th>
            <th class="text-body1">
                Action
            </th>
        </tr>
        <tr v-for="variable in variables">
            <td class="variable-label q-pa-md text-body1">
                {{ variable.label }}
            </td>
            <td class="q-pa-md">
                <input class="col-1 number-input" type="number" label="Min" v-model="variable.min">
            </td>
            <td class="q-pa-md">
                <input class="col-1 number-input q-ml-sm" type="number" label="Max" v-model="variable.max">
            </td>
            <td class="q-pa-md">
                <input class="col-1 number-input q-ml-sm" type="number" label="Step" v-model="variable.step"> 
            </td>
            <td class="q-pa-md">
                <q-icon class="col-1 cursor-pointer q-ml-sm" @click="deleteVariable(variable.label)" name="fa-solid fa-trash-can" size="18px" color="negative"/>                           
            </td>
        </tr>
    </table>
</template>

<script setup lang="ts">
defineProps<{
    variables: {
        label: string
        min: number
        max: number
        step: number
    }[]
}>()

const emit = defineEmits(['delete-variable'])
const deleteVariable = (id: string) => {
    emit('delete-variable', id)
}


</script>


<style lang="scss" scoped>
td {
    padding: 3px;
}

input {
    width:50px;
}
</style>