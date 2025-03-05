<template>
    <div class="form-action">
        <q-btn :label="label"  :type="type" color="primary" @click="handleAction"></q-btn>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    label: string
    type: 'submit' | 'reset'
}>()
const emit = defineEmits(['submit', 'reset'])

const handleAction = () => {
    switch(props.type){
        case 'submit':
            emit('submit')
            break
        case 'reset':
            emit('reset')
            break
    }
}
</script>
<style lang="scss">
.form-action {
    display: flex;
    justify-content: right;
}
</style>