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
      <template v-if="!props.infoInputData.isShowTextInput">
        <input
          id="amount"
          v-model="amount"
          class="transfer__form-input transfer__form-input--last"
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
          class="transfer__form-input transfer__form-input--last"
          type="text"
          name="amount"
          placeholder="Amount"
          required
          role="amountDifferentCurrency"
          readonly
        />
      </template>

      <button
        class="transfer__form-btn"
        role="submitButton"
        type="submit"
      >
        <font-awesome-icon icon="fa-solid fa-check" />
      </button>
    </div>
  </form>
</template>
<script lang="ts" setup>
import { computed, ref, onMounted } from "vue"
import type { InfoInputData } from "@/components/accounts/transfer/interfaces.transfer"

export interface TransferInfoForm {
  timestamp: number
  note: string
  amount: null
  createdTime: number
}

const emit = defineEmits([
  "submitTransfer",
  "showExchangeRate",
  "sendTrasnferInfoFormDifferentCurrency"
])

const props = defineProps({
  isSameCurrency: {
    type: Boolean,
    required: true
  },
  infoInputData: {
    type: Object as () => InfoInputData,
    required: true
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

const amount = ref(null)
const amountDifferentCurrencyComputed = computed(() => {
  if (props.infoInputData.isShowTextInput) {
    return `${props.infoInputData.debitAmount} ${props.infoInputData.debitCurrency} → ${props.infoInputData.creditAmount} ${props.infoInputData.creditCurrency}`
  }
  return ""
})
const note = ref("")
const dateInput = ref("")

const submitTransfer = () => {
  let date = new Date(dateInput.value)
  const timestamp = date.getTime()

  const transferInfoForm = {
    timestamp,
    note: note.value,
    amount: amount.value,
    createdTime: Date.now()
  }

  emit("submitTransfer", amount.value, transferInfoForm)

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

  emit("sendTrasnferInfoFormDifferentCurrency", transferInfoFormDifferentCurrency)
  emit("showExchangeRate")
}

//get current date for date input
onMounted(() => {
  const date = Date.now()
  const newDate = new Date(date)

  const year = newDate.getFullYear()
  const month = String(newDate.getMonth() + 1).padStart(2, "0")
  const day = String(newDate.getDate()).padStart(2, "0")

  const formattedDate = `${year}-${month}-${day}`
  dateInput.value = formattedDate
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
</style>
