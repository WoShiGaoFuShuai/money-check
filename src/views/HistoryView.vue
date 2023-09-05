<template>
  <TopNavbar :title="'History'" />

  <HistorySelect
    :all-month="spendStore.allMonths"
    @new-selected-item="changeSelectedItem"
  />

  <SpendCardContainer :spend-sorted="filteredSpend" />
</template>
<script setup lang="ts">
import SpendCardContainer from "@/components/spendCard/SpendCardContainer.vue"
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import HistorySelect from "@/components/shared/HistorySelect.vue"

import { ref, computed } from "vue"
import type { Ref } from "vue"
import { useSpendStore } from "@/stores/spend"

const spendStore = useSpendStore()

const selectedMonth: Ref<string> = ref("")

const filteredSpend = computed(() => {
  if (selectedMonth.value === "") {
    return spendStore.sortedSpends
  } else {
    return spendStore.sortedSpends.filter((spendItem) => {
      const date = new Date(spendItem.timestamp)
      const month = date.toLocaleString("en-US", { month: "long" })
      return month === selectedMonth.value.slice(0, -5)
    })
  }
})

const changeSelectedItem = (value: string) => {
  selectedMonth.value = value
}
</script>
<style lang="css" scoped></style>
