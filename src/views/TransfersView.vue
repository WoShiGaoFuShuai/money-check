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
    :edit-debit-account-index="editDebitAccountIndex"
    :edit-credit-account-index="editCreditAccountIndex"
    @close-edit-transfer-window="toggleIsShowEditTransferWindow(false)"
    @change-edit-choosen-credit-account-index="changeEditChoosenCreditAccountIndex"
    @change-edit-choosen-debit-account-index="changeEditChoosenDebitAccountIndex"
  />
</template>
<script lang="ts" setup>
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import NavTop from "@/components/shared/NavTop.vue"
import TransferAccount from "@/components/accounts/transfer/TransferAccount.vue"
import TransferForm from "@/components/accounts/transfer/TransferForm.vue"
import type { NavTopPropLinks } from "@/views/AccountsView.vue"
import { useAccountsStore } from "@/stores/accounts"
import { ref, computed, reactive } from "vue"
import { useTransfersStore } from "@/stores/transfers"
import type { TransferInfoForm } from "@/components/accounts/transfer/TransferForm.vue"
import TransferTransactions from "@/components/accounts/transfer/TransferTransactions.vue"
import TransferExchangeRate from "@/components/accounts/transfer/TransferExchangeRate.vue"
import EditTransferWindow from "@/components/accounts/transfer/EditTransferWindow.vue"
import type { TransferData, TransferDataWithDifferentCurrency } from "@/stores/transfers"
import type {
  AccountsWithDifferentCurrencyTransfer,
  InfoInputData
} from "@/components/accounts/transfer/interfaces.transfer"

type TransferType = TransferData | TransferDataWithDifferentCurrency

const links: NavTopPropLinks[] = [
  { icon: "fa-solid fa-credit-card", linkName: "accounts" },
  { icon: "fa-solid fa-repeat", linkName: "transfers" }
]

export interface TransferInfoDifferentCurrency {
  timestamp: number
  note: string
  createdTime: number
  debitTitle: string
  creditTitle: string
  currencyDebit: string
  currencyCredit: string
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

const transferInfoDifferentCurrency = reactive<TransferInfoDifferentCurrency>({
  timestamp: 0,
  note: "",
  createdTime: 0,
  debitTitle: "",
  creditTitle: "",
  currencyCredit: "",
  currencyDebit: ""
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
const receiveTrasnferInfoFormDifferentCurrency = (transferInfoFormDifferentCurrency: {
  timestamp: number
  note: string
  createdTime: number
}) => {
  transferInfoDifferentCurrency.timestamp = transferInfoFormDifferentCurrency.timestamp
  transferInfoDifferentCurrency.note = transferInfoFormDifferentCurrency.note
  transferInfoDifferentCurrency.createdTime = transferInfoFormDifferentCurrency.createdTime
  transferInfoDifferentCurrency.debitTitle = choosenDebitAccount.value.title
  transferInfoDifferentCurrency.creditTitle = choosenCreditAccount.value.title
  transferInfoDifferentCurrency.currencyDebit = choosenDebitAccount.value.currency
  transferInfoDifferentCurrency.currencyCredit = choosenCreditAccount.value.currency
}

const receiveDataFromExchangeRate = (submittedData: AccountsWithDifferentCurrencyTransfer) => {
  infoInputData.value.isShowTextInput = true
  infoInputData.value.creditAmount = submittedData.creditAmount
  infoInputData.value.creditCurrency = submittedData.creditCurrency
  infoInputData.value.debitAmount = submittedData.debitAmount
  infoInputData.value.debitCurrency = submittedData.debitCurrency
}

// const sendTransferWithDifferentCurrency = (data: { debitAmount: number; creditAmount: number }) => {
//   accountsStore.transferWithDifferentCurrency(
//     choosenDebitAccountIndex.value,
//     choosenCreditAccountIndex.value,
//     data.debitAmount,
//     data.creditAmount
//   )

//   const transferWithDifferentCurrency = {
//     ...transferInfoDifferentCurrency,
//     ...data,
//     currencyDebit: choosenDebitAccount.value.currency,
//     currencyCredit: choosenCreditAccount.value.currency
//   }

//   transfersStore.addToTransfers(transferWithDifferentCurrency)
// }

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
