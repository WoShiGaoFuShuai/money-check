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
    @show-exchange-rate="showExchangeRate"
    @submit-transfer="submitTransfer"
    @send-trasnfer-info-form-different-currency="receiveTrasnferInfoFormDifferentCurrency"
  />

  <TransferExchangeRate
    v-if="isShowExchangeRate"
    :debit-account="choosenDebitAccount"
    :credit-account="choosenCreditAccount"
    @close-transfer-exchange-rate="closeTransferExchangeRate"
    @submit-transfer-with-different-currency="sendTransferWithDifferentCurrency"
  />

  <TransferRecent
    class="transfer__recent"
    :date="'today'"
    :transfers-list="transfersStore.transfersTodaySorted"
  />
  <TransferRecent
    :date="'yesterday'"
    :transfers-list="transfersStore.transfersYesterdaySorted"
  />

  <router-link
    class="transfer__link"
    :to="{ name: 'transfers-history' }"
  >
    HISTORY
  </router-link>
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
import TransferRecent from "@/components/accounts/transfer/TransferRecent.vue"
import TransferExchangeRate from "@/components/accounts/transfer/TransferExchangeRate.vue"

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

const sendTransferWithDifferentCurrency = (data: { debitAmount: number; creditAmount: number }) => {
  accountsStore.transferWithDifferentCurrency(
    choosenDebitAccountIndex.value,
    choosenCreditAccountIndex.value,
    data.debitAmount,
    data.creditAmount
  )

  const transferWithDifferentCurrency = {
    ...transferInfoDifferentCurrency,
    ...data,
    currencyDebit: choosenDebitAccount.value.currency,
    currencyCredit: choosenCreditAccount.value.currency
  }

  transfersStore.addToTransfers(transferWithDifferentCurrency)
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
