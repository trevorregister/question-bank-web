<template>
    <ModalBody>
        <ModalHeader>
            Create Bank
        </ModalHeader>
        <ModalContent>
            <div class="q-mb-sm">
                Name
            </div>
            <div class="q-mb-sm">
                <TextInput v-model="name"/>
            </div>
            <div class="q-mb-sm">
                Description
            </div>
            <div class="q-mb-sm">
                <TextAreaInput v-model="description"/>
            </div>
        </ModalContent>
        <ModalActions>
            <ModalButtonClose label="Cancel"/>
            <ModalButtonOk label="Save" :data="{name: name, description: description}"/>
        </ModalActions>
    </ModalBody>
</template>

<script setup lang="ts">
import ModalBody from './components/ModalBody.vue'
import ModalHeader from './components/ModalHeader.vue'
import ModalContent from './components/ModalContent.vue'
import ModalActions from './components/ModalActions.vue'
import ModalButtonOk from './components/ModelButtonOk.vue'
import ModalButtonClose from './components/ModalButtonClose.vue'
import TextInput from '../components/TextInput.vue'
import TextAreaInput from '../components/TextAreaInput.vue'
import { ref } from 'vue'

const name = ref<string>('')
const description = ref<string>('')

</script>


<style scoped lang="scss">

</style>
