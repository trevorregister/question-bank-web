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
                <BaseButton label="+Bank" @click="createBank"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, inject } from 'vue'
import { Bank } from '../../../shared/types'
import useUserStore from '../../../stores/userStore'
import client from '../../../shared/api-client'
import CreateBankModal from '../../../shared/modals/CreateBankModal.vue'
import { ModalMethods } from '../../../shared/modals/components/ModalProvider.vue'
import ConfirmModal from '../../../shared/modals/ConfirmModal.vue'

const banks = ref<Bank[]>([])
const userStore = useUserStore()
const modal = inject<ModalMethods>('$modal')
const isLoading = ref(true)

const createBank = async() => {
    const { status, data } = await modal.show(CreateBankModal)
    if(status === 'ok'){
        const bank = await client.banks.create(data)
        if(bank) banks.value.push(bank)
    }
} 

const deleteBank = async(bankId: string) => {
    const { status } = await modal.show(ConfirmModal)
    if(status === 'ok'){
        banks.value = banks.value.filter(b => b.id !== bankId)
        await client.banks.deleteBank(bankId)
    }
}

onBeforeMount(async () => {
    banks.value = await client.banks.getMyBanks(userStore.getId())
    isLoading.value = false
})
</script>

<style lang="scss">

.bank-card {
   width: 50%;
}

</style>