export interface AccountsWithDifferentCurrencyTransfer {
  debitAmount: number | null
  creditAmount: number | null
  debitCurrency: string
  creditCurrency: string
}

export interface InfoInputData extends AccountsWithDifferentCurrencyTransfer {
  isShowTextInput: boolean
}
