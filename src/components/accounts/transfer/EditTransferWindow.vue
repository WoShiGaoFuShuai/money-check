<template>
  <div class="editTransferWindow__wrapper">
    <TopNavbar
      :right-icons="[{ icon: 'fa-solid fa-check' }]"
      :title="'Editing'"
    >
      <template #left-icons>
        <font-awesome-icon
          icon="fa-solid fa-xmark"
          @click="closeEditTransferWindow"
        />
      </template>
    </TopNavbar>

    <div class="editTransfer">
      <TransferAccount
        :title="'Debit the account'"
        :accounts="accountsStore.accounts"
        :choosen-account-index="props.editDebitAccountIndex"
        @choose-debit-account="changeEditChoosenDebitAccountIndex"
      />

      <TransferAccount
        :title="'Credit the account'"
        :accounts="accountsStore.accounts"
        :choosen-account-index="props.editCreditAccountIndex"
        @choose-credit-account="changeEditChoosenCreditAccountIndex"
      />

      <TransferForm
        :is-same-currency="isSameCurrency"
        @show-exchange-rate="showExchangeRate"
        @send-trasnfer-info-form-different-currency="receiveTrasnferInfoFormDifferentCurrency"
      />
      <!-- @submit-transfer="submitTransfer" -->

      <TransferExchangeRate
        v-if="isShowExchangeRate"
        :debit-account="choosenDebitAccount"
        :credit-account="choosenCreditAccount"
        @close-transfer-exchange-rate="closeTransferExchangeRate"
        @submit-transfer-with-different-currency="sendTransferWithDifferentCurrency"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import TransferAccount from "@/components/accounts/transfer/TransferAccount.vue"
import TransferForm from "@/components/accounts/transfer/TransferForm.vue"
import TransferExchangeRate from "@/components/accounts/transfer/TransferExchangeRate.vue"
import { useAccountsStore } from "@/stores/accounts"
import { computed, reactive, ref } from "vue"
import type { TransferInfoDifferentCurrency } from "@/views/TransfersView.vue"

const accountsStore = useAccountsStore()

const emit = defineEmits([
  "closeEditTransferWindow",
  "changeEditChoosenDebitAccountIndex",
  "changeEditChoosenCreditAccountIndex"
])
const closeEditTransferWindow = () => {
  emit("closeEditTransferWindow")
}

const props = defineProps({
  editDebitAccountIndex: {
    type: Number,
    required: true
  },
  editCreditAccountIndex: {
    type: Number,
    required: true
  }
})

// COMPUTED

const isSameCurrency = computed(() => {
  return (
    accountsStore.accounts[props.editDebitAccountIndex].currency ===
    accountsStore.accounts[props.editCreditAccountIndex].currency
  )
})

const choosenDebitAccount = computed(() => {
  return accountsStore.accounts[props.editDebitAccountIndex]
})

const choosenCreditAccount = computed(() => {
  return accountsStore.accounts[props.editCreditAccountIndex]
})

//CONSTS
const transferInfoDifferentCurrency = reactive<TransferInfoDifferentCurrency>({
  timestamp: 0,
  note: "",
  createdTime: 0,
  debitTitle: "",
  creditTitle: "",
  currencyCredit: "",
  currencyDebit: ""
})

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

// showExchangeRate
const isShowExchangeRate = ref(false)

const showExchangeRate = () => {
  isShowExchangeRate.value = true
}

//close TransferExchangeRate
const closeTransferExchangeRate = () => {
  isShowExchangeRate.value = false
}

// sendTransferWithDifferentCurrency
const sendTransferWithDifferentCurrency = () => {
  console.log("123")
}

// const changeChoosenDebitAccountIndex = (index: number) => {
//   choosenDebitAccountIndex.value = index
// }

// const changeChoosenCreditAccountIndex = (index: number) => {
//   choosenCreditAccountIndex.value = index
// }

const changeEditChoosenDebitAccountIndex = (index: number) => {
  emit("changeEditChoosenDebitAccountIndex", index)
}

const changeEditChoosenCreditAccountIndex = (index: number) => {
  emit("changeEditChoosenCreditAccountIndex", index)
}
</script>
<style lang="css" scoped>
.editTransferWindow__wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--white);
}

.editTransfer {
  padding: 48px 4px 4px 4px;
}
</style>
