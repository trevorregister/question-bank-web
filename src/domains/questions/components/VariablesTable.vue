<template>
  <table aria-label="variables">
    <tr>
      <th class="text-body2"></th>
      <th class="text-body2">Min</th>
      <th class="text-body2">Max</th>
      <th class="text-body2">Step</th>
    </tr>
    <tr v-for="variable in variables">
      <td class="variable-label text-body2">
        {{ variable.label }}
      </td>
      <td>
        <NumberInput v-model.number="variable.min" />
      </td>
      <td>
        <NumberInput v-model.number="variable.max" />
      </td>
      <td>
        <NumberInput v-model.number="variable.step" />
      </td>
      <td>
        <!--                 <q-icon class="cursor-pointer q-ml-sm" @click="deleteVariable(variable.label)" name="fa-solid fa-shuffle" size="18px" color="positive"/> -->
        <q-icon
          class="cursor-pointer q-ml-sm"
          @click="deleteVariable(variable.id)"
          name="fa-solid fa-trash-can"
          size="18px"
          color="negative"
        />
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import NumberInput from "../../../shared/components/NumberInput.vue"
defineProps<{
  variables: {
    id: string
    label: string
    min: number
    max: number
    step: number
  }[]
}>()

const emit = defineEmits(["delete-variable"])
const deleteVariable = (id: string) => {
  emit("delete-variable", id)
}
</script>

<style lang="scss" scoped>
td {
  padding: 3px;
}

.variable-label {
  padding-right: 1rem;
}
</style>
