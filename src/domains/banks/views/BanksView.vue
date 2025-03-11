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
                        <CardActions>
                            <router-link :to="{path: `/banks/${bank.id}`}">
                                <q-btn 
                                    label="View"
                                    outline
                                    color="primary"
                                />
                            </router-link>
                        </CardActions>
                    </CardBody>
                </div> 
            </div>
            <div class="row q-pa-sm flex flex-center">
                <q-btn label="+Bank" outline color="primary" @click="createBank"/>
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

const banks = ref<Bank[]>([])
const userStore = useUserStore()
const modal = inject<ModalMethods>('$modal')

const createBank = async() => {
    const { status, data } = await modal.show(CreateBankModal)
    if(status === 'ok'){
        const bank = await client.banks.create(data)
    } else return
} 

onBeforeMount(async () => {
    banks.value = await client.banks.getMyBanks(userStore.getId())
})
</script>

<style lang="scss">

.bank-card {
   width: 50%;
}

</style>