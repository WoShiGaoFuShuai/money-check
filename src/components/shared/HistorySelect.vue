<template>
  <div class="history-select__wrapper">
    <div class="history-select__block">
      <select
        v-model="selectedItem"
        class="history-select"
        role="history-select"
      >
        <option value="">{{ props.title }}</option>
        <option
          v-for="monthYear in props.items"
          :key="monthYear"
          :value="monthYear"
        >
          {{ monthYear }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue"
import type { Ref } from "vue"

const selectedItem: Ref<string> = ref("")

const props = defineProps({
  items: {
    type: Array as () => string[],
    required: true
  },
  title: {
    type: String as () => string,
    required: false,
    default: () => "All Month"
  }
})

const emit = defineEmits(["newSelectedItem"])

const currentMonthYear = computed(() => {
  const date = new Date()
  const currentMonth = date.toLocaleString("en-US", { month: "long" })
  const year = date.getFullYear()

  return `${currentMonth} ${year}`
})

onMounted(() => {
  // selectedItem.value = currentMonthYear.value
})

watch(selectedItem, () => {
  emit("newSelectedItem", selectedItem.value)
})
</script>

<style lang="css" scoped>
.history-select__wrapper {
  display: flex;
  justify-content: center;
}

.history-select__block {
  background-color: var(--blue-primary);
  padding: 8px 16px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.history-select {
  border: none;
  background-color: transparent;
  color: white;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  min-width: 150px;
}

.history-select option {
  background-color: var(--blue-primary);
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
  outline: none;
}
</style>
