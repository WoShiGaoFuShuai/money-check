import { defineStore } from "pinia"
type MonthName = string
type TransfersArray = (TransferData | TransferDataWithDifferentCurrency)[]
export type TransferType = TransferData | TransferDataWithDifferentCurrency

export interface TransferData {
  timestamp: number
  note: string
  amount: null | number
  debitTitle: string
  creditTitle: string
  createdTime: number
  currency: string
}

export interface TransferDataWithDifferentCurrency {
  timestamp: number
  note: string
  debitAmount: number | null
  creditAmount: number | null
  debitTitle: string
  creditTitle: string
  createdTime: number
  currencyDebit: string
  currencyCredit: string
}

export const useTransfersStore = defineStore("transfers", {
  state: () => ({
    transfers: [
      {
        amount: 5,
        creditTitle: "acc5",
        debitTitle: "acc1",
        note: "check",
        timestamp: Date.now(),
        createdTime: Date.now(),
        currency: "Rp"
      },

      {
        timestamp: Date.now(),
        note: "different",
        debitAmount: 1,
        creditAmount: 10,
        debitTitle: "acc1",
        creditTitle: "acc3",
        createdTime: Date.now(),
        currencyDebit: "Rp",
        currencyCredit: "€"
      },
      {
        amount: 2,
        creditTitle: "acc3",
        debitTitle: "acc4",
        note: "haha",
        timestamp: Date.now() - 1 * 30 * 24 * 60 * 60 * 1000,
        createdTime: Date.now() - 1 * 30 * 24 * 60 * 60 * 1000,
        currency: "Y"
      },
      {
        amount: 3,
        creditTitle: "acc5",
        debitTitle: "acc6",
        note: "haha",
        timestamp: Date.now() - 2 * 30 * 24 * 60 * 60 * 1000,
        createdTime: Date.now() - 2 * 30 * 24 * 60 * 60 * 1000,
        currency: "Y"
      },
      {
        amount: 4,
        creditTitle: "acc3",
        debitTitle: "acc4",
        note: "haha",
        timestamp: Date.now() - 4 * 30 * 24 * 60 * 60 * 1000,
        createdTime: Date.now() - 4 * 30 * 24 * 60 * 60 * 1000,
        currency: "Y"
      }
    ] as TransfersArray,
    editTransfer: [] as TransfersArray
  }),
  actions: {
    addToTransfers(value: TransferData | TransferDataWithDifferentCurrency) {
      this.transfers.push(value)
    },
    addToEditTransfer(value: TransferType) {
      if (this.editTransfer.length) {
        this.editTransfer = []
      }
      this.editTransfer.push(value)
    },
    deleteTransfer(index: number) {
      console.log("deleteTransfer in transfer store", index)
      this.transfers.splice(index, 1)
    },
    clearEditTransfer() {
      this.editTransfer = []
    },
    changeAccountAndCurrency(
      oldAccountName: string,
      newAccount: { title: string; sum: number; currency: string }
    ) {
      function isTransferData(transfer: TransferType): transfer is TransferData {
        return "currency" in transfer
      }

      const allTransfers = this.transfers.filter(
        (item) => item.debitTitle === oldAccountName || item.creditTitle === oldAccountName
      )
      allTransfers.forEach((item) => {
        //if true => transfer is with same currency, if false => with different currencies
        if (isTransferData(item)) {
          // item with same currency
          if (item.debitTitle === oldAccountName) {
            item.debitTitle = newAccount.title
          }

          if (item.creditTitle === oldAccountName) {
            item.creditTitle = newAccount.title
          }
          item.currency = newAccount.currency
        } else {
          // item with different currencies
          if (item.debitTitle === oldAccountName) {
            item.debitTitle = newAccount.title
            item.currencyDebit = newAccount.currency
          }

          if (item.creditTitle === oldAccountName) {
            item.creditTitle = newAccount.title
            item.currencyCredit = newAccount.currency
          }
        }
      })
    }
  },
  getters: {
    transfersTodaySorted(state) {
      const timeNow = Date.now()
      const today = new Date(timeNow)
      today.setHours(0, 0, 0, 0)
      const todayTransfers = state.transfers.filter(
        (transferItem) => transferItem.timestamp >= today.getTime()
      )
      // return todayTransfers.slice().reverse()
      return todayTransfers.sort((a, b) => b.createdTime - a.createdTime)
    },
    transfersYesterdaySorted(state) {
      const timeNow = Date.now()
      const today = new Date(timeNow)
      const yesterday = new Date(timeNow - 86400000)
      today.setHours(0, 0, 0, 0)
      yesterday.setHours(0, 0, 0, 0)

      const yesterdayTransfers = state.transfers.filter(
        (transferItem) =>
          transferItem.timestamp >= yesterday.getTime() && transferItem.timestamp < today.getTime()
      )
      // return yesterdayTransfers.slice().reverse()
      return yesterdayTransfers.sort((a, b) => b.createdTime - a.createdTime)
    },
    allMonths(state): MonthName[] {
      const monthsSet = new Set()

      state.transfers.forEach((transferItem) => {
        const date = new Date(transferItem.timestamp)
        const monthName = date.toLocaleString("en", { month: "long" }) as MonthName
        const year = date.getFullYear()

        monthsSet.add(`${monthName} ${year}`)
      })

      return Array.from(monthsSet) as MonthName[]
    },
    sortedTransfers(state) {
      return state.transfers.sort((a, b) => b.timestamp - a.timestamp)
    }
  }
})
