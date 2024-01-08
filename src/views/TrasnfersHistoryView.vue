<template>
  <div class="transferHistoryView">
    <TopNavbar :title="'Transfer History'" />

    <HistorySelect
      :all-month="transfersStore.allMonths"
      @new-selected-item="changeSelectedItem"
    ></HistorySelect>

    <TransferTransactionItem
      v-for="transfer in filteredTransfers"
      :key="transfer.timestamp"
      :transfer="transfer"
      @transaction-item-click="editTransactionInitiated"
    />

    <EditTransferWindow
      v-if="isShowEditTransferWindow"
      :edit-debit-account-index="editDebitAccountIndex"
      :edit-credit-account-index="editCreditAccountIndex"
      @close-edit-transfer-window="toggleIsShowEditTransferWindow(false)"
    />
  </div>
</template>
<script lang="ts" setup>
import HistorySelect from "@/components/shared/HistorySelect.vue"
import TransferTransactionItem from "@/components/accounts/transfer/TransferTransactionItem.vue"
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import EditTransferWindow from "@/components/accounts/transfer/EditTransferWindow.vue"

import { useTransfersStore } from "@/stores/transfers"
import { useAccountsStore } from "@/stores/accounts"
import { ref, type Ref, computed } from "vue"
import type { TransferData, TransferDataWithDifferentCurrency } from "@/stores/transfers"

type TransferType = TransferData | TransferDataWithDifferentCurrency

const transfersStore = useTransfersStore()
const accountsStore = useAccountsStore()

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

//EDIT TRANSFER WINDOW
const isShowEditTransferWindow = ref<boolean>(false)
const editDebitAccountIndex = ref<number>(0)
const editCreditAccountIndex = ref<number>(0)

const toggleIsShowEditTransferWindow = (value: boolean) => {
  isShowEditTransferWindow.value = value
}

const editTransactionInitiated = (transfer: TransferType) => {
  const debitItem = accountsStore.accounts.find((item) => item.title === transfer.debitTitle)
  const creditItem = accountsStore.accounts.find((item) => item.title === transfer.creditTitle)

  if (debitItem && creditItem) {
    editDebitAccountIndex.value = accountsStore.accounts.indexOf(debitItem)
    editCreditAccountIndex.value = accountsStore.accounts.indexOf(creditItem)
  }

  toggleIsShowEditTransferWindow(true)
}
</script>
<style lang="css" scoped>
.transferHistoryView {
  padding-bottom: 56px;
}
</style>
