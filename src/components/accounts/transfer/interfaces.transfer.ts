export interface AccountsWithDifferentCurrencyTransfer {
  debitAmount: number | null
  creditAmount: number | null
  debitCurrency: string
  creditCurrency: string
}

export interface InfoInputData extends AccountsWithDifferentCurrencyTransfer {
  isShowTextInput: boolean
}

export interface TransferInfoDifferentCurrency {
  timestamp: number
  note: string
  createdTime: number
  debitTitle: string
  creditTitle: string
  currencyCredit: string
  currencyDebit: string
}
