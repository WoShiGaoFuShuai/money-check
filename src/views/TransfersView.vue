<template class="transfersView">
  <TopNavbar :title="'Transfers'" />
  <NavTop :links="links" />
  <TransferAccount
    :title="'Debit the account'"
    :accounts="accountsStore.accounts"
    :choosen-account-index="choosenDebitAccountIndex"
    @choose-debit-account="changeChoosenDebitAccountIndex"
  />

  <TransferAccount
    :title="'Credit to the account'"
    :accounts="accountsStore.accounts"
    :choosen-account-index="choosenCreditAccountIndex"
    @choose-credit-account="changeChoosenCreditAccountIndex"
  />

  <TransferForm
    :mode="modeForm.DEFAULT"
    :is-same-currency="isSameCurrency"
    :info-input-data="infoInputData"
    @show-exchange-rate="showExchangeRate"
    @submit-transfer="submitTransfer"
    @send-trasnfer-info-form-different-currency="receiveTrasnferInfoFormDifferentCurrency"
  />

  <TransferExchangeRate
    v-if="isShowExchangeRate"
    :debit-account="choosenDebitAccount"
    :credit-account="choosenCreditAccount"
    @close-transfer-exchange-rate="closeTransferExchangeRate"
    @submit-transfer-with-different-currency="receiveDataFromExchangeRate"
  />

  <TransferTransactions
    class="transfer__recent"
    :date="'today'"
    :transfers-list="transfersStore.transfersTodaySorted"
    @edit-transaction-initiated="editTransactionInitiated"
  />
  <TransferTransactions
    :date="'yesterday'"
    :transfers-list="transfersStore.transfersYesterdaySorted"
    @edit-transaction-initiated="editTransactionInitiated"
  />

  <router-link
    class="transfer__link"
    :to="{ name: 'transfers-history' }"
  >
    HISTORY
  </router-link>

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
</template>
<script lang="ts" setup>
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import NavTop from "@/components/shared/NavTop.vue"
import TransferAccount from "@/components/accounts/transfer/TransferAccount.vue"
import TransferForm from "@/components/accounts/transfer/TransferForm.vue"
import type { NavTopPropLinks } from "@/views/AccountsView.vue"
import { useAccountsStore } from "@/stores/accounts"
import { ref, computed } from "vue"
import { useTransfersStore } from "@/stores/transfers"
import type { TransferInfoForm } from "@/components/accounts/transfer/TransferForm.vue"
import TransferTransactions from "@/components/accounts/transfer/TransferTransactions.vue"
import TransferExchangeRate from "@/components/accounts/transfer/TransferExchangeRate.vue"
import EditTransferWindow from "@/components/accounts/transfer/EditTransferWindow.vue"
import type { TransferType } from "@/stores/transfers"
import type {
  AccountsWithDifferentCurrencyTransfer,
  InfoInputData
} from "@/components/accounts/transfer/interfaces.transfer"
import { modeForm } from "@/components/accounts/transfer/enums.transfer"

const links: NavTopPropLinks[] = [
  { icon: "fa-solid fa-credit-card", linkName: "accounts" },
  { icon: "fa-solid fa-repeat", linkName: "transfers" }
]

export interface TransferInfoFormDifferentCurrency {
  timestamp: number
  note: string
  createdTime: number
  debitAmount: number
  debitCurrency: string
  creditAmount: number
  creditCurrency: string
}

const accountsStore = useAccountsStore()
const transfersStore = useTransfersStore()

const choosenDebitAccountIndex = ref(0)
const choosenCreditAccountIndex = ref(1)
const isShowEditTransferWindow = ref<boolean>(false)
const infoInputData = ref<InfoInputData>({
  isShowTextInput: false,
  debitAmount: null,
  creditAmount: null,
  debitCurrency: "",
  creditCurrency: ""
})

const resetInfoInputData = () => {
  infoInputData.value.isShowTextInput = false
  infoInputData.value.debitAmount = null
  infoInputData.value.creditAmount = null
  infoInputData.value.debitCurrency = ""
  infoInputData.value.creditCurrency = ""
}

const transferInfoDifferentCurrency = ref<TransferInfoFormDifferentCurrency>({
  timestamp: 0,
  note: "",
  createdTime: 0,
  debitAmount: 0,
  debitCurrency: "",
  creditAmount: 0,
  creditCurrency: ""
})

const changeChoosenDebitAccountIndex = (index: number) => {
  choosenDebitAccountIndex.value = index
}

const changeChoosenCreditAccountIndex = (index: number) => {
  choosenCreditAccountIndex.value = index
}

const submitTransfer = (amount: number, transferInfoForm: TransferInfoForm) => {
  const transfer = {
    timestamp: transferInfoForm.timestamp,
    note: transferInfoForm.note,
    amount: transferInfoForm.amount,
    createdTime: transferInfoForm.createdTime,
    debitTitle: choosenDebitAccount.value.title,
    creditTitle: choosenCreditAccount.value.title,
    currency: choosenDebitAccount.value.currency
  }

  transfersStore.addToTransfers(transfer)
  accountsStore.transfer(choosenDebitAccountIndex.value, choosenCreditAccountIndex.value, amount)
}

const choosenDebitAccount = computed(() => {
  return accountsStore.accounts[choosenDebitAccountIndex.value]
})

const choosenCreditAccount = computed(() => {
  return accountsStore.accounts[choosenCreditAccountIndex.value]
})

const isSameCurrency = computed(() => {
  return (
    accountsStore.accounts[choosenDebitAccountIndex.value].currency ===
    accountsStore.accounts[choosenCreditAccountIndex.value].currency
  )
})

// showExchangeRate
const isShowExchangeRate = ref(false)

const showExchangeRate = () => {
  isShowExchangeRate.value = true
}

//close TransferExchangeRate
const closeTransferExchangeRate = () => {
  isShowExchangeRate.value = false
}

//receiveTrasnferInfoFormDifferentCurrency
const receiveTrasnferInfoFormDifferentCurrency = (
  receivedInfoForm: TransferInfoFormDifferentCurrency
) => {
  transferInfoDifferentCurrency.value.timestamp = receivedInfoForm.timestamp
  transferInfoDifferentCurrency.value.note = receivedInfoForm.note
  transferInfoDifferentCurrency.value.createdTime = receivedInfoForm.createdTime
  transferInfoDifferentCurrency.value.debitAmount = receivedInfoForm.debitAmount
  transferInfoDifferentCurrency.value.debitCurrency = receivedInfoForm.debitCurrency
  transferInfoDifferentCurrency.value.creditAmount = receivedInfoForm.creditAmount
  transferInfoDifferentCurrency.value.creditCurrency = receivedInfoForm.creditCurrency

  submitTransferWithDifferentCurrency()
}

const receiveDataFromExchangeRate = (submittedData: AccountsWithDifferentCurrencyTransfer) => {
  infoInputData.value.isShowTextInput = true
  infoInputData.value.creditAmount = submittedData.creditAmount
  infoInputData.value.creditCurrency = submittedData.creditCurrency
  infoInputData.value.debitAmount = submittedData.debitAmount
  infoInputData.value.debitCurrency = submittedData.debitCurrency
}

const submitTransferWithDifferentCurrency = () => {
  accountsStore.transferWithDifferentCurrency(
    choosenDebitAccountIndex.value,
    choosenCreditAccountIndex.value,
    transferInfoDifferentCurrency.value.debitAmount,
    transferInfoDifferentCurrency.value.creditAmount
  )

  const transferWithDifferentCurrency = {
    ...transferInfoDifferentCurrency.value,
    currencyDebit: transferInfoDifferentCurrency.value.debitCurrency,
    currencyCredit: transferInfoDifferentCurrency.value.creditCurrency,
    debitTitle: choosenDebitAccount.value.title,
    creditTitle: choosenCreditAccount.value.title
  }

  transfersStore.addToTransfers(transferWithDifferentCurrency)
  resetInfoInputData()
}

//EditTransferWindow
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

const editDebitAccountIndex = ref<number>(0)
const editCreditAccountIndex = ref<number>(0)

// Change indexes to pass to EditTransferWindow as props
const changeEditChoosenDebitAccountIndex = (index: number) => {
  editDebitAccountIndex.value = index
}

const changeEditChoosenCreditAccountIndex = (index: number) => {
  editCreditAccountIndex.value = index
}
</script>
<style lang="css" scoped>
.transfersView {
  position: relative;
}
.transfer__recent {
  margin-top: 24px;
}

.transfer__link {
  display: inline-block;
  padding-bottom: 64px;
  color: var(--blue-primary);
  text-decoration: none;
  text-align: center;
  width: 100%;
}
</style>
