<template>
    <div class="row q-mb-sm justify-left">
        <p class="input-label column text-body1 q-mr-lg q-mb-none self-center">{{ label }}</p>
        <q-input class="column" 
            filled 
            outlined 
            :dense="dense" 
            :model-value="modelValue" 
            @update:model-value="updateValue"
            :type="type"
            />
    </div>
</template>
<script setup lang="ts">
defineProps({
    label: {type: String, required: true},
    dense: {type: Boolean, default: true},
    modelValue: {type: String, required: true},
    type: {type: String, default: 'text'}
})
const emit = defineEmits(['update:modelValue'])

const updateValue = (newValue: string | number | null) => {
    emit('update:modelValue', newValue)
}
</script>
<style scoped lang="scss">
.input-label {
    min-width: 120px;
}
</style>