import type {
  AccountsWithDifferentCurrencyTransfer,
  InfoInputData
} from "@/components/accounts/transfer/interfaces.transfer"
import { ref } from "vue"

export const infoInputData = ref<InfoInputData>({
  isShowTextInput: false,
  debitAmount: null,
  creditAmount: null,
  debitCurrency: "",
  creditCurrency: ""
})

export const resetInfoInputData = () => {
  infoInputData.value.isShowTextInput = false
  infoInputData.value.debitAmount = null
  infoInputData.value.creditAmount = null
  infoInputData.value.debitCurrency = ""
  infoInputData.value.creditCurrency = ""
}

export const receiveDataFromExchangeRate = (
  submittedData: AccountsWithDifferentCurrencyTransfer
) => {
  console.log("receiveDataFromExchangeRate")
  infoInputData.value.isShowTextInput = true
  infoInputData.value.creditAmount = submittedData.creditAmount
  infoInputData.value.creditCurrency = submittedData.creditCurrency
  infoInputData.value.debitAmount = submittedData.debitAmount
  infoInputData.value.debitCurrency = submittedData.debitCurrency
}
