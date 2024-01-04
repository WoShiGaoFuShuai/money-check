<template>
  <TopNavbar
    :title="'Date'"
    :right-icons="[{ icon: 'fa-solid fa-check', handler: editDateConfirm, label: 'Confirm' }]"
  >
    <template #left-icons>
      <font-awesome-icon
        icon="fa-solid fa-xmark"
        role="closeBtn"
        @click="closeEditDateCalendar"
      />
    </template>
  </TopNavbar>

  <div class="calendar__wrapper">
    <DatePicker
      v-model.number="date"
      mode="date"
    />
  </div>
</template>
<script lang="ts" setup>
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import { DatePicker } from "v-calendar"
import "v-calendar/style.css"
import type { SpendCardInfo } from "@/stores/accounts"
import type { PropType } from "vue"

import { ref } from "vue"

const emit = defineEmits(["editDateConfirm", "closeEditDateCalendar"])

const props = defineProps({
  editItem: {
    type: Object as PropType<SpendCardInfo | null>,
    required: true,
    validator: (value: unknown): value is SpendCardInfo | null => {
      return value === null || value instanceof Object
    }
  }
})

const date = ref(props.editItem?.timestamp)

const editDateConfirm = () => {
  emit("editDateConfirm", date.value)
  closeEditDateCalendar()
}

const closeEditDateCalendar = () => {
  emit("closeEditDateCalendar", false)
}
</script>
<style lang="css" scoped>
.calendar__wrapper {
  padding: 56px 16px 0 16px;
  text-align: center;
  max-width: 580px;
  margin: 0 auto;
}

.vc-pane-container {
  min-width: 280px;
}

.vc-bordered {
  width: 100%;
  max-width: 580px;
}
</style>
