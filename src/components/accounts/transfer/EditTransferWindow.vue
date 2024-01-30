<template>
  <div class="editTransferWindow__wrapper">
    <TopNavbar
      :right-icons="[{ icon: 'fa-solid fa-check', handler: submitEditTransfer }]"
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
        ref="transferFormRef"
        :mode="modeForm.EDITMODE"
        :is-same-currency="isSameCurrency"
        :info-input-data="infoInputData"
        :is-show-error="isShowErrorForm"
        @show-exchange-rate="showExchangeRate"
        @send-trasnfer-info-form-different-currency="receiveTrasnferInfoFormDifferentCurrency"
        @value-input-form="receiveValueInputForm"
        @value-note-form="receiveValueNoteForm"
        @value-date-form="receiveValueDateForm"
        @delete-transaction="deleteTransaction"
      />
      <!-- @submit-transfer="submitTransfer" -->

      <TransferExchangeRate
        v-if="isShowExchangeRate"
        :debit-account="choosenDebitAccount"
        :credit-account="choosenCreditAccount"
        @close-transfer-exchange-rate="closeTransferExchangeRate"
        @submit-transfer-with-different-currency="submitTransferWithDifferentCurrency"
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
import { useTransfersStore } from "@/stores/transfers"
import { computed, reactive, ref, onUnmounted } from "vue"
// import type { TransferInfoDifferentCurrency } from "@/views/TransfersView.vue"
import { modeForm } from "@/components/accounts/transfer/enums.transfer"
import type { InfoInputData } from "@/components/accounts/transfer/interfaces.transfer"
import type {
  TransferData,
  TransferType,
  TransferDataWithDifferentCurrency
} from "@/stores/transfers"
import type { AccountsWithDifferentCurrencyTransfer } from "@/components/accounts/transfer/interfaces.transfer"

//STORES
const accountsStore = useAccountsStore()
const transfersStore = useTransfersStore()

const emit = defineEmits([
  "closeEditTransferWindow",
  "changeEditChoosenDebitAccountIndex",
  "changeEditChoosenCreditAccountIndex",
  "resetInfoInputData",
  "submitTransferWithDifferentCurrency"
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
  },
  infoInputData: {
    type: Object as () => InfoInputData,
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

const amountValueForm = ref<number>(0)
const noteValueForm = ref<string>("")
const dateValueForm = ref<string>("")
const isShowErrorForm = ref<boolean>(false)

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

// submitTransferWithDifferentCurrency
const submitTransferWithDifferentCurrency = (
  exchangeWindowTransfer: AccountsWithDifferentCurrencyTransfer
) => {
  emit("submitTransferWithDifferentCurrency", exchangeWindowTransfer)
}

const changeEditChoosenDebitAccountIndex = (index: number) => {
  emit("changeEditChoosenDebitAccountIndex", index)
}

const changeEditChoosenCreditAccountIndex = (index: number) => {
  emit("changeEditChoosenCreditAccountIndex", index)
}

//RECEIVING input amount value from form when mode === editMode
const receiveValueInputForm = (newInputValue: number) => {
  amountValueForm.value = newInputValue
}

//RECEIVING input note from form when mode === editMode
const receiveValueNoteForm = (newNoteValue: string) => {
  noteValueForm.value = newNoteValue
}

const receiveValueDateForm = (newDateValue: string) => {
  dateValueForm.value = newDateValue
}

//SUBMITTING EDITING TRANSFER
const submitEditTransfer = () => {
  // CHECK IF new amount is 0 and it is transfer with same currency => show an error and return from func
  if (amountValueForm.value <= 0 && !props.infoInputData?.isShowTextInput) {
    isShowErrorForm.value = true
    return
  }

  //GET CURRENT EDIT TRANSFER from transfers.editTransfer
  const currentEditTransfer = getCurrentEditTransfer()

  // FIND INDEX OF TRANSFER
  const currentEditTransferInTransfers = getCurrentEditTransferInTransfers(currentEditTransfer)

  const { indexEditDebitAcc, indexEditCreditAcc, editCreditAcc, editDebitAcc } =
    getAccountIndexes(currentEditTransfer)

  if (currentEditTransferInTransfers) {
    const indexOfEditTransfer = getIndexOfEditTransfer(currentEditTransferInTransfers)

    //REMOVE PREVIOUS TRANSFER
    transfersStore.deleteTransfer(indexOfEditTransfer)

    //HERE WE CHECK IF THIS TRANSFER WITH SAME CURRENCY
    if (
      "amount" in currentEditTransferInTransfers &&
      currentEditTransferInTransfers.amount !== null &&
      isSameCurrency.value &&
      indexEditDebitAcc !== null &&
      indexEditCreditAcc !== null
    ) {
      //UNDO previous transfer to get amount back
      undoTransfer(indexEditDebitAcc, indexEditCreditAcc, currentEditTransferInTransfers.amount)

      // calculate new transfer
      calculateNewTransfer(
        props.editDebitAccountIndex,
        props.editCreditAccountIndex,
        amountValueForm.value
      )

      //LET's create new transfer with same currency
      const newTransfer = createNewTransfer(
        dateValueForm.value,
        noteValueForm.value,
        amountValueForm.value,
        choosenDebitAccount.value.title,
        choosenCreditAccount.value.title,
        choosenCreditAccount.value.currency
      )

      //pushing new transfer to the store
      transfersStore.addToTransfers(newTransfer)
      //change isShowErrorForm to false
      isShowErrorForm.value = false

      // deleteTransfer, undoTransfer, transfer, addToTransfers, clear

      resetCloseEmits()
      return
    }
    //TRANSFER WAS WITH SAME CURRENCY BUT THE CHANGED IT
    else if (
      "amount" in currentEditTransferInTransfers &&
      currentEditTransferInTransfers.amount !== null &&
      !isSameCurrency.value &&
      indexEditDebitAcc !== null &&
      indexEditCreditAcc !== null
    ) {
      undoTransfer(indexEditDebitAcc, indexEditCreditAcc, currentEditTransferInTransfers.amount)

      // CALCULATE NEW TRANSFER WITH DIFF
      if (props.infoInputData.debitAmount !== null && props.infoInputData.creditAmount !== null) {
        const transferInfoFormDifferentCurrency = createTransferInfoFormDifferentCurrency(
          dateValueForm.value,
          props.editDebitAccountIndex,
          props.editCreditAccountIndex,
          props.infoInputData.debitAmount,
          props.infoInputData.debitCurrency,
          props.infoInputData.creditAmount,
          props.infoInputData.creditCurrency,
          noteValueForm.value
        )

        //SEND TO TRANSFERS
        transfersStore.addToTransfers(transferInfoFormDifferentCurrency)

        // calculate new transfer with diff currencies
        calculateNewTransferWithDifferentCurrency(
          props.editDebitAccountIndex,
          props.editCreditAccountIndex,
          props.infoInputData.debitAmount,
          props.infoInputData.creditAmount
        )
      }

      // deleteTransfer, undoTransfer, transferWithDifferentCurrency, addToTransfers, clear
      resetCloseEmits()
      return
    }
    // WHEN TRANSFER WITH DIFFERENT CURRENCIES
    else if (
      "debitAmount" in currentEditTransfer &&
      currentEditTransfer.debitAmount !== null &&
      currentEditTransfer.creditAmount !== null &&
      !isSameCurrency.value
    ) {
      //UNDO previous transfer to get amount back
      if (
        editCreditAcc &&
        editDebitAcc &&
        indexEditDebitAcc !== null &&
        indexEditCreditAcc !== null
      ) {
        undoTransferWithDifferentCurrency(
          indexEditDebitAcc,
          currentEditTransfer.debitAmount,
          indexEditCreditAcc,
          currentEditTransfer.creditAmount
        )
      }

      if (props.infoInputData.debitAmount !== null && props.infoInputData.creditAmount !== null) {
        const transferInfoFormDifferentCurrency = createTransferInfoFormDifferentCurrency(
          dateValueForm.value,
          props.editDebitAccountIndex,
          props.editCreditAccountIndex,
          props.infoInputData.debitAmount,
          props.infoInputData.debitCurrency,
          props.infoInputData.creditAmount,
          props.infoInputData.creditCurrency,
          noteValueForm.value
        )

        transfersStore.addToTransfers(transferInfoFormDifferentCurrency)

        // calculate new transfer with diff currencies
        calculateNewTransferWithDifferentCurrency(
          props.editDebitAccountIndex,
          props.editCreditAccountIndex,
          props.infoInputData.debitAmount,
          props.infoInputData.creditAmount
        )
      }

      // deleteTransfer, undoTransferWithDifferentCurrency, transferWithDifferentCurrency, addToTransfers, clear

      resetCloseEmits()
      return
    }
    // WHEN EDIT TRANSFER WITH DIFFERENT CURRENCIES, BUT THEY EDIT TO ACCs with SAME CURRENCY
    else if (
      "debitAmount" in currentEditTransfer &&
      currentEditTransfer.debitAmount !== null &&
      currentEditTransfer.creditAmount !== null &&
      isSameCurrency.value
    ) {
      //UNDO previous transfer to get amount back
      if (
        editCreditAcc &&
        editDebitAcc &&
        indexEditDebitAcc !== null &&
        indexEditCreditAcc !== null
      ) {
        undoTransferWithDifferentCurrency(
          indexEditDebitAcc,
          currentEditTransfer.debitAmount,
          indexEditCreditAcc,
          currentEditTransfer.creditAmount
        )
      }

      // calculate new transfer
      calculateNewTransfer(
        props.editDebitAccountIndex,
        props.editCreditAccountIndex,
        amountValueForm.value
      )

      //LET's create new transfer with same currency
      const newTransfer = createNewTransfer(
        dateValueForm.value,
        noteValueForm.value,
        amountValueForm.value,
        choosenDebitAccount.value.title,
        choosenCreditAccount.value.title,
        choosenCreditAccount.value.currency
      )

      //pushing new transfer to the store
      transfersStore.addToTransfers(newTransfer)
      //change isShowErrorForm to false
      isShowErrorForm.value = false

      // deleteTransfer, undoTransferWithDifferentCurrency, transfer, addToTransfers, clear

      resetCloseEmits()
      return
    }
  }
}

//Deleting transsaction
const deleteTransaction = () => {
  const currentEditTransfer = getCurrentEditTransfer()

  // FIND INDEX OF TRANSFER
  const currentEditTransferInTransfers = getCurrentEditTransferInTransfers(currentEditTransfer)
  const { indexEditDebitAcc, indexEditCreditAcc, editCreditAcc, editDebitAcc } =
    getAccountIndexes(currentEditTransfer)

  if (currentEditTransferInTransfers) {
    const indexOfEditTransfer = getIndexOfEditTransfer(currentEditTransferInTransfers)

    //REMOVE PREVIOUS TRANSFER
    transfersStore.deleteTransfer(indexOfEditTransfer)

    //HERE WE CHECK IF THIS TRANSFER WITH SAME CURRENCY
    if (
      "amount" in currentEditTransferInTransfers &&
      currentEditTransferInTransfers.amount !== null &&
      indexEditDebitAcc !== null &&
      indexEditCreditAcc !== null
    ) {
      //UNDO previous transfer to get amount back
      undoTransfer(indexEditDebitAcc, indexEditCreditAcc, currentEditTransferInTransfers.amount)
    }
    //TRANSFER WITH DIFFERENT CURRENCIES
    else if (
      "debitAmount" in currentEditTransfer &&
      currentEditTransfer.debitAmount !== null &&
      currentEditTransfer.creditAmount !== null
    ) {
      //find indexes of accounts
      if (
        editCreditAcc &&
        editDebitAcc &&
        indexEditDebitAcc !== null &&
        indexEditCreditAcc !== null
      ) {
        //UNDO previous transfer to get amount back
        undoTransferWithDifferentCurrency(
          indexEditDebitAcc,
          currentEditTransfer.debitAmount,
          indexEditCreditAcc,
          currentEditTransfer.creditAmount
        )
      }
    }

    resetCloseEmits()
  }
  // }
}

onUnmounted(() => {
  transfersStore.clearEditTransfer()
})

// reusing funcs
function getCurrentEditTransfer() {
  return transfersStore.editTransfer[0]
}

function getCurrentEditTransferInTransfers(currentEditTransfer: TransferType) {
  return transfersStore.transfers.find((item) => item === currentEditTransfer)
}

//UNDO TRANSFER
function undoTransfer(debitAccountIndex: number, creditAccountIndex: number, amount: number) {
  accountsStore.undoTransfer(debitAccountIndex, creditAccountIndex, amount)
}

//UNDO TRANSFER WITH DIFF CURRENCY
function undoTransferWithDifferentCurrency(
  indexEditDebitAcc: number,
  currentEditTransferDebitAmount: number,
  indexEditCreditAcc: number,
  currentEditTransferCreditAmount: number
) {
  accountsStore.undoTransferWithDifferentCurrency(
    indexEditDebitAcc,
    currentEditTransferDebitAmount,
    indexEditCreditAcc,
    currentEditTransferCreditAmount
  )
}

function getIndexOfEditTransfer(currentEditTransferInTransfers: TransferType) {
  return transfersStore.transfers.indexOf(currentEditTransferInTransfers)
}

function getAccountIndexes(currentEditTransfer: TransferType) {
  let indexEditDebitAcc = null
  let indexEditCreditAcc = null

  //find indexes of accounts in EDIT TRANSFER
  const editCreditTitle = currentEditTransfer.creditTitle
  const editDebitTitle = currentEditTransfer.debitTitle

  const editCreditAcc = accountsStore.accounts.find((item) => item.title === editCreditTitle)
  const editDebitAcc = accountsStore.accounts.find((item) => item.title === editDebitTitle)

  if (editCreditAcc && editDebitAcc) {
    indexEditDebitAcc = accountsStore.accounts.indexOf(editDebitAcc)
    indexEditCreditAcc = accountsStore.accounts.indexOf(editCreditAcc)
  }

  return { indexEditDebitAcc, indexEditCreditAcc, editCreditAcc, editDebitAcc }
}

// Calculating new transfer in accounts Store
function calculateNewTransfer(
  editDebitAccIndex: number,
  editCreditAccIndex: number,
  amountValueForm: number
) {
  accountsStore.transfer(editDebitAccIndex, editCreditAccIndex, amountValueForm)
}

// Calculating new transfer with DIFF CURRENCY in accounts Store
function calculateNewTransferWithDifferentCurrency(
  editDebitAccountIndex: number,
  editCreditAccountIndex: number,
  infoInputDataDebitAmount: number,
  infoInputDataCreditAmount: number
): void {
  accountsStore.transferWithDifferentCurrency(
    editDebitAccountIndex,
    editCreditAccountIndex,
    infoInputDataDebitAmount,
    infoInputDataCreditAmount
  )
}

//Creating new transfer
function createNewTransfer(
  dateValueForm: string,
  noteValueForm: string,
  amountValueForm: number,
  choosenDebitAccountTitle: string,
  choosenCreditAccountTitle: string,
  choosenCreditAccountCurrency: string
): TransferData {
  const newTransfer: TransferData = {
    timestamp: new Date(dateValueForm).getTime(),
    note: noteValueForm,
    amount: amountValueForm,
    debitTitle: choosenDebitAccountTitle,
    creditTitle: choosenCreditAccountTitle,
    createdTime: Date.now(),
    currency: choosenCreditAccountCurrency
  }

  return newTransfer
}

function resetCloseEmits() {
  emit("resetInfoInputData")
  emit("closeEditTransferWindow")
}

function createTransferInfoFormDifferentCurrency(
  dateValueForm: string,
  editDebitAccountIndex: number,
  editCreditAccountIndex: number,
  infoInputDataDebitAmount: number,
  infoInputDataDebitCurrency: string,
  infoInputDataCreditAmount: number,
  infoInputDataCreditCurrency: string,
  noteValueForm: string
): TransferDataWithDifferentCurrency {
  //calculate data for transferInfoFormDifferentCurrency
  let date = new Date(dateValueForm)
  const timestamp = date.getTime()
  const debitTitle = accountsStore.accounts[editDebitAccountIndex].title
  const creditTitle = accountsStore.accounts[editCreditAccountIndex].title

  const transferInfoFormDifferentCurrency = {
    createdTime: Date.now(),
    debitAmount: infoInputDataDebitAmount,
    currencyDebit: infoInputDataDebitCurrency,
    creditAmount: infoInputDataCreditAmount,
    currencyCredit: infoInputDataCreditCurrency,
    timestamp,
    note: noteValueForm,
    creditTitle,
    debitTitle
  }

  return transferInfoFormDifferentCurrency
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
