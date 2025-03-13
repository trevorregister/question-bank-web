<template>
    <div class="row">
        <div class="col">
            <div class="row q-pa-sm" v-for="bank in banks">
                <div class="col flex flex-center">
                    <CardBody class="bank-card":aria-label="bank.name">
                        <CardHeader>
                            {{ bank.name }}
                        </CardHeader>
                        <CardSection>
                            {{ bank.description }}
                        </CardSection>
                        <CardActions class="flex justify-end">
                            <router-link :to="{path: `/banks/${bank.id}`}">
                                <BaseButton 
                                    label="View"
                                />
                            </router-link>
                            <BaseButton 
                                label="Delete" 
                                color="negative" 
                                outline
                                @click="deleteBank(bank.id)"
                            />
                        </CardActions>
                    </CardBody>
                </div> 
            </div>
            <div class="row q-pa-sm flex flex-center" v-if="!isLoading">
                <BaseButton label="Create New Bank" @click="createBank"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, inject } from 'vue'
import { Bank } from '../../../shared/types'
import useUserStore from '../../../stores/userStore'
import client from '../../../shared/api-client'
import CreateBankModal from '../../../shared/modals/CreateBankModal.vue'
import { Modal } from '../../../shared/modals/components/ModalProvider.vue'
import ConfirmModal from '../../../shared/modals/ConfirmModal.vue'
import { Flash } from '../../../shared/components/FlashProvider.vue'

const banks = ref<Bank[]>([])
const userStore = useUserStore()
const modal = inject<Modal>('$modal')
const flash = inject<Flash>('$flash')
const isLoading = ref(true)

const createBank = async() => {
    try {
        const { status, data } = await modal.show(CreateBankModal)
        if(status === 'ok'){
            const bank = await client.banks.create(data)
            if(bank) banks.value.push(bank)
            flash.success('Bank created')
        }
    } catch (err) {
        console.log(err)
        flash.apiError(err)
    }
} 

const deleteBank = async(bankId: string) => {
    try {
        const { status } = await modal.show(ConfirmModal)
        if(status === 'ok'){
            banks.value = banks.value.filter(b => b.id !== bankId)
            await client.banks.deleteBank(bankId)
            flash.success('Bank deleted')
        }
    } catch (err) {
        flash.apiError(err.message)
    }
}

onMounted(async () => {
    try {
        banks.value = await client.banks.getMyBanks(userStore.getId())
        isLoading.value = false
    } catch (err) {
        flash.apiError(err)
    }
})
</script>

<style lang="scss">

.bank-card {
   width: 50vh;
}

</style>