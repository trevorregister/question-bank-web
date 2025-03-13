<template>
    <div class="form-action">
        <BaseButton :label="label"  :type="type" @click="handleAction"></BaseButton>
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