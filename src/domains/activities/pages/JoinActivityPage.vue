<template>
  <div style="display: block">
    <div class="flex justify-center q-mb-md">
      <form-body header="Join Activity">
        <form-input label="Activity Code" type="text" v-model="activityCode" />
        <div class="row q-mt-lg q-mb-lg">
          <div class="col">Name</div>
          <div class="col flex justify-end">
            {{ name }}
          </div>
        </div>
        <div class="row">
          <div class="col">
            <form-action
              label="New Name"
              type="submit"
              @submit="generateNewName"
            />
          </div>
          <div class="col">
            <form-action label="Submit" type="submit" @submit="handleSubmit" />
          </div>
        </div>
      </form-body>
    </div>
  </div>
</template>

<script setup lang="ts">
import client from "../../../shared/api-client"
import { ref, inject, onMounted } from "vue"
import { Flash } from "../../../shared/components/FlashProvider.vue"
import generateName from "../../../shared/utils/generateName"
import useUserStore from "../../../stores/userStore"
//import { useRouter } from "vue-router"
import FormBody from "../../../shared/components/FormBody.vue"
import FormAction from "../../../shared/components/FormAction.vue"
import FormInput from "../../../shared/components/FormInput.vue"
import { Modal } from "../../../shared/modals/components/ModalProvider.vue"
import ConfirmModal from "../../../shared/modals/ConfirmModal.vue"

const activityCode = ref("")
const name = ref("")

const flash = inject<Flash>("$flash")!
const modal = inject<Modal>("$modal")!
const userStore = useUserStore()

const handleSubmit = async () => {
  try {
    const hasExistingResponse = userStore.getActivityResponse(
      activityCode.value,
    )
    if (hasExistingResponse) {
      const { status } = await modal.show(ConfirmModal, {
        content:
          "You've already started this activity. Do you want to load your previous work or start over from scratch?",
        confirmLabel: "Load Previous",
        cancelLabel: "Start Over",
      })

      if (status === "load-previous") {
        //router to existing response
      }
      if (status === "start-over") {
        const { status } = await modal.show(ConfirmModal, {
          content:
            "You will start this activity over. All previous work will be deleted. This cannot be undone.",
          confirmLabel: "Start Over",
        })
        if (status === "start-over") {
          const newResponse = await client.responses.create({
            activityCode: activityCode.value,
            student: name.value,
          })
          userStore.setActivityResponse(newResponse)
          //router to new response
        }
      }
    } else {
      const activityResponse = await client.responses.create({
        activityCode: activityCode.value,
        student: name.value,
      })
      userStore.setActivityResponse(activityResponse)
    }
  } catch (err) {
    flash.apiError(err)
  }
}

const generateNewName = () => {
  name.value = generateName()
}

onMounted(() => {
  name.value = generateName()
})
</script>

<style scoped></style>
