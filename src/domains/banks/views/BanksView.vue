<template>
    <div class="row q-pa-sm" v-for="bank in banks">
        <div class="col flex flex-center">
            <CardBody class="bank-card":aria-label="bank.name">
                <CardHeader>
                    {{ bank.name }}
                </CardHeader>
                <CardSection>
                    Lorem ipsum odor amet, consectetuer adipiscing elit. 
                    Ornare suspendisse adipiscing nostra dolor fermentum sagittis id. 
                    Mauris ad massa in; litora porta sodales. 
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
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Bank } from '../../../shared/types'
import client from '../../../shared/api-client'

const banks = ref<Bank[]>([])

onMounted(async () => {
    banks.value = await client.banks.getMyBanks("67c4ca846db8f49f2e98aaba")
})
</script>

<style lang="scss">

.bank-card {
    max-width: 80%;
}

</style>