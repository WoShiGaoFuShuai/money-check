<template>
  <div class="transferHistoryView">
    <TopNavbar :title="'Transfer History'" />

    <HistorySelect
      :items="transfersStore.allMonths"
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
      :info-input-data="infoInputData"
      :edit-debit-account-index="editDebitAccountIndex"
      :edit-credit-account-index="editCreditAccountIndex"
      @close-edit-transfer-window="toggleIsShowEditTransferWindow(false)"
      @change-edit-choosen-credit-account-index="changeEditChoosenCreditAccountIndex"
      @change-edit-choosen-debit-account-index="changeEditChoosenDebitAccountIndex"
      @reset-info-input-data="resetInfoInputData"
      @submit-transfer-with-different-currency="receiveDataFromExchangeRate"
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
import type { TransferType } from "@/stores/transfers"
import type {
  AccountsWithDifferentCurrencyTransfer,
  InfoInputData
} from "@/components/accounts/transfer/interfaces.transfer"

const transfersStore = useTransfersStore()
const accountsStore = useAccountsStore()

const selectedMonth: Ref<string> = ref("")
const infoInputData = ref<InfoInputData>({
  isShowTextInput: false,
  debitAmount: null,
  creditAmount: null,
  debitCurrency: "",
  creditCurrency: ""
})

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

//SAME
const editTransactionInitiated = (transfer: TransferType) => {
  const debitItem = accountsStore.accounts.find((item) => item.title === transfer.debitTitle)
  const creditItem = accountsStore.accounts.find((item) => item.title === transfer.creditTitle)

  if (debitItem && creditItem) {
    editDebitAccountIndex.value = accountsStore.accounts.indexOf(debitItem)
    editCreditAccountIndex.value = accountsStore.accounts.indexOf(creditItem)
  }

  transfersStore.addToEditTransfer(transfer)

  // CHECK IF THE TRANSFER IS WITH DIFFERENT CURRENCY
  if ("creditAmount" in transfer) {
    infoInputData.value.isShowTextInput = true
    infoInputData.value.debitAmount = transfer.debitAmount
    infoInputData.value.creditAmount = transfer.creditAmount
    infoInputData.value.debitCurrency = transfer.currencyDebit
    infoInputData.value.creditCurrency = transfer.currencyCredit
  }

  toggleIsShowEditTransferWindow(true)
}

const resetInfoInputData = () => {
  infoInputData.value.isShowTextInput = false
  infoInputData.value.debitAmount = null
  infoInputData.value.creditAmount = null
  infoInputData.value.debitCurrency = ""
  infoInputData.value.creditCurrency = ""
}

//SAME
// Change indexes to pass to EditTransferWindow as props
const changeEditChoosenDebitAccountIndex = (index: number) => {
  editDebitAccountIndex.value = index
}
//SAME
const changeEditChoosenCreditAccountIndex = (index: number) => {
  editCreditAccountIndex.value = index
}

//SAME
const receiveDataFromExchangeRate = (submittedData: AccountsWithDifferentCurrencyTransfer) => {
  infoInputData.value.isShowTextInput = true
  infoInputData.value.creditAmount = submittedData.creditAmount
  infoInputData.value.creditCurrency = submittedData.creditCurrency
  infoInputData.value.debitAmount = submittedData.debitAmount
  infoInputData.value.debitCurrency = submittedData.debitCurrency
}
</script>
<style lang="css" scoped>
.transferHistoryView {
  padding-bottom: 56px;
}
</style>
