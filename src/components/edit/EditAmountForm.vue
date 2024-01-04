<template>
  <TopNavbar
    :title="'Amount'"
    :right-icons="[{ icon: 'fa-solid fa-check', handler: approveEditAmountForm, label: 'Approve' }]"
  >
    <template #left-icons>
      <font-awesome-icon
        icon="fa-solid fa-xmark"
        role="closeBtn"
        @click="closeEditAmountForm"
      />
    </template>
  </TopNavbar>

  <div class="amount__wrapper">
    <div class="amount__current-wrapper">
      <p class="amount__current">Current amount:</p>
      <span class="amount__number">{{ props.editItem?.sum }}</span>
    </div>

    <div class="amount__new-wrapper">
      <p class="amount__new">New amount:</p>
      <input
        v-model="input"
        class="amount__new-input"
        type="number"
        role="input__amount"
      />
    </div>
  </div>

  <AppError
    v-if="error.length"
    :error="error"
    :mb="8"
  />

  <div
    data-testId="amount__difference"
    class="amount__difference"
  >
    {{ differeneAmount }}
  </div>
</template>
<script lang="ts" setup>
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import AppError from "@/components/shared/AppError.vue"
import { ref, computed, watch } from "vue"
import type { SpendCardInfo } from "@/stores/accounts"
import type { PropType } from "vue"

const emit = defineEmits(["toggleEditAmountForm", "editAmountConfirm"])

const closeEditAmountForm = () => {
  emit("toggleEditAmountForm", false)
}

const props = defineProps({
  editItem: {
    type: Object as PropType<SpendCardInfo | null>,
    required: true,
    validator: (value: unknown): value is SpendCardInfo | null => {
      return value === null || value instanceof Object
    }
  }
})

const input = ref("")
const error = ref("")

const differeneAmount = computed(() => {
  const result = (props.editItem?.sum ?? 0) - parseFloat(input.value)

  if (result > 0) {
    return `${result} less`
  } else if (result < 0) {
    return `${Math.abs(result)} more`
  }
  return ""
})

watch(input, (newVal) => {
  if (newVal.length >= 2 && newVal[0] === "0") {
    input.value = newVal.slice(1)
  }
})

// APPROVE EDIT AMOUNT FORM (Tick button)
const approveEditAmountForm = () => {
  const numericValue = Number(input.value)
  error.value = ""

  if (!input.value.toString()) {
    error.value = "New amount field is empty"
    return
  }

  if (numericValue < 0) {
    error.value = "New amount can not be negative"
    return
  } else if (numericValue === props.editItem?.sum) {
    error.value = "Current and New numbers are the same"
    return
  } else if (props.editItem && numericValue - props.editItem?.sum > 0) {
    error.value = ""
    emit("editAmountConfirm", parseFloat(input.value))
    return
  } else if (numericValue === 0) {
    error.value = "New number can not be 0"
    return
  } else {
    emit("editAmountConfirm", parseFloat(input.value))
  }
}
</script>
<style lang="css" scoped>
.amount__wrapper {
  padding: 56px 16px 0 16px;
}

.amount__current-wrapper,
.amount__new-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}

.amount__difference {
  text-align: center;
}
</style>
