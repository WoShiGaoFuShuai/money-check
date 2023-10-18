<template>
  <div class="transferHistoryView">
    <TopNavbar :title="'Transfer History'" />

    <HistorySelect
      :all-month="transfersStore.allMonths"
      @new-selected-item="changeSelectedItem"
    ></HistorySelect>

    <TransferListItems :transfers-list="filteredTransfers" />
  </div>
</template>
<script lang="ts" setup>
import HistorySelect from "@/components/shared/HistorySelect.vue"
import TransferListItems from "@/components/shared/TransferListItems.vue"
import TopNavbar from "@/components/navigation/TopNavbar.vue"

import { useTransfersStore } from "@/stores/transfers"
import { ref, type Ref, computed } from "vue"

const transfersStore = useTransfersStore()

const selectedMonth: Ref<string> = ref("")

const filteredTransfers = computed(() => {
  if (selectedMonth.value === "") {
    return transfersStore.sortedTransfers
  } else {
    return transfersStore.sortedTransfers.filter((transferItem) => {
      const date = new Date(transferItem.timestamp)
      const month = date.toLocaleString("en-US", { month: "long" })
      return month === selectedMonth.value.slice(0, -5)
    })
  }
})

const changeSelectedItem = (value: string) => {
  selectedMonth.value = value
}
</script>
<style lang="css" scoped>
.transferHistoryView {
  padding-bottom: 56px;
}
</style>
