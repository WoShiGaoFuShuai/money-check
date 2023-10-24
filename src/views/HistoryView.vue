<template>
  <TopNavbar
    :bg-color="bgColor"
    :title="'History'"
  />

  <HistorySelect
    :all-month="activeStore.allMonths"
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
import { useEarnStore } from "@/stores/earn"
import { previousRoute } from "@/router/index"

const spendStore = useSpendStore()
const earnStore = useEarnStore()

const activeStore = previousRoute.value === "income" ? earnStore : spendStore
const bgColor = previousRoute.value === "income" ? "var(--green-primary)" : ""

const selectedMonth: Ref<string> = ref("")

const filteredSpend = computed(() => {
  if (selectedMonth.value === "") {
    return activeStore.sortedStoreItems
  } else {
    return activeStore.sortedStoreItems.filter((sortedItem) => {
      const date = new Date(sortedItem.timestamp)
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
