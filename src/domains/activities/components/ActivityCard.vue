<template>
  <CardBody :aria-label="activity.name">
    <CardHeader class="bg-primary">
      {{ activity.name }}
    </CardHeader>
    <CardSection>
      <TagChip v-for="tag in activity.tags" :tag="tag" />
    </CardSection>
    <CardActions class="flex justify-end">
      <router-link :to="{ path: `/activities/${activity.id}` }">
        <BaseButton label="Preview" />
      </router-link>
      <BaseButton label="Edit" />
      <BaseButton
        label="Delete"
        outline
        color="negative"
        @click="deleteActivity"
      />
    </CardActions>
  </CardBody>
</template>

<script setup lang="ts">
import TagChip from "./TagChip.vue"
import ConfirmModal from "../../../shared/modals/ConfirmModal.vue"
//import client from "../../../shared/api-client"
import { Activity } from "../../../shared/types"
import { Modal } from "../../../shared/modals/components/ModalProvider.vue"
import { inject } from "vue"

defineProps<{ activity: Activity }>()
const emit = defineEmits(["delete-activity"])

const modal = inject<Modal>("$modal")!

const deleteActivity = async () => {
  const { status } = await modal.show(ConfirmModal)

  if (status === "ok") {
    emit("delete-activity")
  } else return
}
</script>

<style lang="scss"></style>
