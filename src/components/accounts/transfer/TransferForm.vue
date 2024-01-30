<template>
  <form
    class="transfer__form"
    @submit.prevent="submitTransfer"
  >
    <div class="transfer__form-input__wrapper">
      <input
        id="date"
        v-model="dateInput"
        class="transfer__form-input"
        type="date"
        name="date"
        required
        role="dateInput"
        :max="todayDate"
      />
      <input
        id="note"
        v-model="note"
        class="transfer__form-input"
        type="text"
        name="note"
        placeholder="Note"
      />
    </div>

    <div class="transfer__form-input__wrapper input__wrapper--bottom">
      <!-- !props.infoInputData.isShowTextInput &&  -->
      <template v-if="props.isSameCurrency">
        <input
          id="amount"
          v-model="amount"
          :class="[
            'transfer__form-input',
            'transfer__form-input--last',
            { 'mr-0': props.mode === modeForm.EDITMODE }
          ]"
          type="number"
          name="amount"
          placeholder="Amount"
          required
          role="amountInput"
          @focus="openExchangeRate"
        />
      </template>

      <template v-else>
        <input
          id="amountDifferentCurrency"
          v-model="amountDifferentCurrencyComputed"
          :class="[
            'transfer__form-input',
            'transfer__form-input--last',
            { 'mr-0': props.mode === modeForm.EDITMODE }
          ]"
          type="text"
          name="amount"
          placeholder="Amount"
          required
          role="amountDifferentCurrency"
          readonly
          @focus="openExchangeRate"
        />
      </template>

      <button
        v-if="props.mode !== modeForm.EDITMODE"
        class="transfer__form-btn"
        role="submitButton"
        type="submit"
      >
        <font-awesome-icon icon="fa-solid fa-check" />
      </button>
    </div>

    <div
      v-if="props.mode === modeForm.EDITMODE"
      class="deleteTransaction__wrapper"
    >
      <font-awesome-icon
        icon="fa-solid fa-trash"
        class="btn__primary-form deleteTransaction__btn"
        @click="deleteTransaction"
      />
    </div>

    <p
      v-if="isShowError"
      style="color: red"
    >
      Amount should be more than 0
    </p>
  </form>
</template>
<script lang="ts" setup>
import { computed, ref, onMounted, watch } from "vue"
import type { InfoInputData } from "@/components/accounts/transfer/interfaces.transfer"
import { useTransfersStore } from "@/stores/transfers"
import { modeForm } from "@/components/accounts/transfer/enums.transfer"

export interface TransferInfoForm {
  timestamp: number
  note: string
  amount: null
  createdTime: number
}

const emit = defineEmits([
  "submitTransfer",
  "showExchangeRate",
  "sendTrasnferInfoFormDifferentCurrency",
  "valueInputForm",
  "valueNoteForm",
  "valueDateForm",
  "deleteTransaction"
])

const props = defineProps({
  isSameCurrency: {
    type: Boolean,
    required: true
  },
  infoInputData: {
    type: Object as () => InfoInputData,
    required: true
  },
  mode: {
    type: String as () => modeForm,
    required: true
  },
  isShowError: {
    type: Boolean,
    required: false
  }
})

const todayDate = computed(() => {
  const today = new Date()
  const year = today.getFullYear()
  let month: number | string = today.getMonth() + 1
  let day: number | string = today.getDate()

  if (month < 10) {
    month = `0${month}`
  }
  if (day < 10) {
    day = `0${day}`
  }

  return `${year}-${month}-${day}`
})

const amount = ref<null | string>(null)
const amountDifferentCurrencyComputed = computed(() => {
  if (props.infoInputData.isShowTextInput) {
    return `${props.infoInputData.debitAmount} ${props.infoInputData.debitCurrency} → ${props.infoInputData.creditAmount} ${props.infoInputData.creditCurrency}`
  }
  return ""
})
const note = ref("")
const dateInput = ref("")

const submitTransfer = () => {
  //if 2 accounts have same currency

  if (props.isSameCurrency) {
    let date = new Date(dateInput.value)
    const timestamp = date.getTime()

    const transferInfoForm = {
      timestamp,
      note: note.value,
      amount: amount.value,
      createdTime: Date.now()
    }

    emit("submitTransfer", amount.value, transferInfoForm)
  } else {
    let date = new Date(dateInput.value)
    const timestamp = date.getTime()

    // GET CURRENCY AND AMOUNT FROM INPUT WITH DIFF CURRENCY
    const str = amountDifferentCurrencyComputed
    const arrow = "→"
    const indexArrow = str.value.indexOf(arrow)
    const debitItem = str.value.slice(0, indexArrow - 1).trim()
    const creditItem = str.value.slice(indexArrow + 2).trim()

    const space = " "
    const indexSpaceDebitItem = debitItem.indexOf(space)
    const indexSpaceCreditItem = creditItem.indexOf(space)

    const debitAmount = +debitItem.slice(0, indexSpaceDebitItem)
    const debitCurrency = debitItem.slice(indexSpaceDebitItem + 1)

    const creditAmount = +creditItem.slice(0, indexSpaceCreditItem)
    const creditCurrency = creditItem.slice(indexSpaceCreditItem + 1)

    const transferInfoFormDifferentCurrency = {
      timestamp,
      note: note.value,
      createdTime: Date.now(),
      debitAmount,
      debitCurrency,
      creditAmount,
      creditCurrency
    }

    emit("sendTrasnferInfoFormDifferentCurrency", transferInfoFormDifferentCurrency)
  }

  amount.value = null
  note.value = ""
}

const openExchangeRate = () => {
  if (props.isSameCurrency) {
    return
  }

  let date = new Date(dateInput.value)
  const timestamp = date.getTime()

  const transferInfoFormDifferentCurrency = {
    timestamp,
    note: note.value,
    createdTime: Date.now()
  }

  // emit("sendTrasnferInfoFormDifferentCurrency", transferInfoFormDifferentCurrency)
  emit("showExchangeRate")
}

const deleteTransaction = () => {
  emit("deleteTransaction")
}

//STORES
const transfersStore = useTransfersStore()

//get current date for date input
onMounted(() => {
  const date =
    transfersStore.editTransfer.length >= 1 ? transfersStore.editTransfer[0].timestamp : Date.now()

  const newDate = new Date(date)

  const year = newDate.getFullYear()
  const month = String(newDate.getMonth() + 1).padStart(2, "0")
  const day = String(newDate.getDate()).padStart(2, "0")

  const formattedDate = `${year}-${month}-${day}`
  dateInput.value = formattedDate

  if (props.mode === modeForm.EDITMODE) {
    const transfer = transfersStore.editTransfer[0]
    note.value = transfersStore.editTransfer[0].note
    // Check if the transfer is of type TransferData
    if ("amount" in transfer) {
      amount.value = `${transfer.amount}`
    } else {
      // amount.value = `${transfer.debitTitle} ${transfer.currencyDebit} → ${transfer.creditTitle} ${transfer.currencyCredit}`
      // Handle the case for TransferDataWithDifferentCurrency
    }
  }
})

// WATCHERS
//when we have edit mode we pass amount, date, note to parent
watch(amount, (newVal) => {
  if (props.mode === modeForm.EDITMODE) {
    if (newVal !== null) {
      emit("valueInputForm", +newVal)
    }
  }
})

watch(note, (newVal) => {
  if (props.mode === modeForm.EDITMODE) {
    emit("valueNoteForm", newVal)
  }
})

watch(dateInput, (newVal) => {
  if (props.mode === modeForm.EDITMODE) {
    emit("valueDateForm", newVal)
  }
})
</script>
<style lang="css" scoped>
.transfer__form {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  margin-top: 16px;
  padding: 0 8px;
}

.transfer__form-input__wrapper {
  display: flex;
  flex-direction: column;
  max-width: 240px;
  width: 100%;
}

.input__wrapper--bottom {
  flex-direction: row;
  margin-bottom: 40px;
}

.deleteTransaction__btn {
  padding: 8px;
}

.transfer__form-input {
  background-color: var(--blue-secondary);
  border: 1px solid var(--blue-primary);
  outline: none;
  border-radius: 6px;
  padding: 4px;
  margin-bottom: 8px;
  text-align: center;
}

.transfer__form-input--last {
  margin-bottom: 0;
  margin-right: 8px;
  width: 100%;
}

.transfer__form-input::placeholder {
  text-align: center;
}

.transfer__form-btn {
  background-color: var(--blue-primary);
  outline: none;
  border: 0;
  padding: 4px 6px;
  border-radius: 4px;
}

.mr-0 {
  margin-right: 0;
}
</style>
