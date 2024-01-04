import { defineStore } from "pinia"
import { useCalculatorStore } from "@/stores/calculator"
import { useSpendStore } from "@/stores/spend"
import { useEarnStore } from "@/stores/earn"
import type { CategoryObject } from "@/stores/categories"
import { Calc } from "calc-js"
import { performOperation } from "@/helpers/performOperation"
import { createSpendCardInfo } from "@/helpers/createSpendCardInfo"
import { Mode } from "@/components/expensesView/enums"

export interface Account {
  title: string
  sum: number
  currency: string
  active: boolean
}

export interface Currency {
  currency: string
  symbol: string
}

export interface SpendCardInfo {
  iconName: string
  categoryName: string
  sum: number
  timestamp: number
  account: string
  currency: string | null
}

export const useAccountsStore = defineStore("accounts", {
  state: () => ({
    accounts: [
      { title: "acc1", sum: 5, currency: "Rp", active: true },
      { title: "acc2", sum: 10, currency: "$", active: false },
      { title: "acc3", sum: 100, currency: "€", active: false },
      { title: "acc4", sum: 1000, currency: "¥", active: false }
    ] as Account[],
    currencies: [
      { currency: "United States Dollar", symbol: "$" },
      { currency: "Euro", symbol: "€" },
      { currency: "Ukrainian Hryvnia", symbol: "₴" },
      { currency: "Russian Ruble", symbol: "₽" },
      { currency: "Japanese Yen", symbol: "¥" },
      { currency: "British Pound Sterling", symbol: "£" },
      { currency: "Australian Dollar", symbol: "A$" },
      { currency: "Chinese Yuan", symbol: "¥" },
      { currency: "Indonesian Rupiah", symbol: "Rp" },
      { currency: "Bitcoin", symbol: "₿" },
      { currency: "Gold", symbol: "XAU" }
    ] as Currency[]
  }),
  actions: {
    subtractSumActiveAccount(categoryInfo: CategoryObject | null = null) {
      const calculatorStore = useCalculatorStore()
      const outputBeforeOperatorNum: number = parseFloat(calculatorStore.outputBeforeOperator)
      const outputAfterOperatorNum: number = parseFloat(calculatorStore.outputAfterOperator)
      const currentOperator = calculatorStore.currentOperator

      const numericResult = isNaN(outputAfterOperatorNum)
        ? outputBeforeOperatorNum
        : performOperation(outputBeforeOperatorNum, outputAfterOperatorNum, currentOperator!)

      // to prevent negative numbers and 0 be added to the accounts
      if (numericResult > 0) {
        if (this.getterActiveAccount && !isNaN(numericResult)) {
          const index = this.accounts.indexOf(this.getterActiveAccount)
          this.accounts[index].sum = new Calc(this.accounts[index].sum)
            .minus(numericResult)
            .finish()
        }

        if (categoryInfo !== null) {
          const spendCardInfo: SpendCardInfo = createSpendCardInfo(categoryInfo, numericResult)

          const spendStore = useSpendStore()
          spendStore.addToSpend(spendCardInfo)
        }

        return true
      } else {
        return false
      }
    },
    addSumActiveAccount(categoryInfo: CategoryObject | null = null) {
      const calculatorStore = useCalculatorStore()
      const outputBeforeOperatorNum: number = parseFloat(calculatorStore.outputBeforeOperator)
      const outputAfterOperatorNum: number = parseFloat(calculatorStore.outputAfterOperator)
      const currentOperator = calculatorStore.currentOperator

      const numericResult = isNaN(outputAfterOperatorNum)
        ? outputBeforeOperatorNum
        : performOperation(outputBeforeOperatorNum, outputAfterOperatorNum, currentOperator!)

      // to prevent negative numbers and 0 be added to the accounts
      if (numericResult > 0) {
        if (this.getterActiveAccount && !isNaN(numericResult)) {
          const index = this.accounts.indexOf(this.getterActiveAccount)
          this.accounts[index].sum = new Calc(this.accounts[index].sum).sum(numericResult).finish()
        }

        if (categoryInfo !== null) {
          const spendCardInfo: SpendCardInfo = createSpendCardInfo(categoryInfo, numericResult)

          const earnStore = useEarnStore()
          earnStore.addToEarn(spendCardInfo)
        }
        return true
      } else {
        return false
      }
    },
    changeActiveAccount(accountTitle: string) {
      const currentActiveAccount = this.getterActiveAccount as Account | null

      if (currentActiveAccount?.title === accountTitle) {
        return
      }

      if (currentActiveAccount) {
        const indexCurrentActiveAccount = this.accounts.indexOf(currentActiveAccount)
        this.accounts[indexCurrentActiveAccount].active = false
      }

      const newActiveAccountIndex = this.accounts.findIndex((acc) => acc.title === accountTitle)
      if (newActiveAccountIndex !== -1) {
        this.accounts[newActiveAccountIndex].active = true
      }
    },
    addCurrency(newCurrency: Currency) {
      this.currencies.push(newCurrency)
    },
    deleteCurrency(indexToDelete: number) {
      this.currencies.splice(indexToDelete, 1)
    },
    editCurrency(indexToEdit: number, newCurrency: Currency) {
      this.currencies.splice(indexToEdit, 1, newCurrency)
    },
    addNewAccount(newAccount: Account) {
      this.accounts.push(newAccount)
    },
    editAccount(account: { title: string; sum: number; currency: string }, index: number) {
      const active = this.accounts[index].active

      const editedAccount = {
        title: account.title,
        sum: account.sum,
        currency: account.currency,
        active
      }

      this.accounts.splice(index, 1, editedAccount)
    },
    deleteAccount(index: number) {
      this.accounts.splice(index, 1)
    },
    transfer(indexDebit: number, indexCredit: number, amount: number) {
      this.accounts[indexDebit].sum = performOperation(this.accounts[indexDebit].sum, amount, "-")
      this.accounts[indexCredit].sum = performOperation(this.accounts[indexCredit].sum, amount, "+")
    },
    transferWithDifferentCurrency(
      indexDebit: number,
      indexCredit: number,
      debitAmount: number,
      creditAmount: number
    ) {
      this.accounts[indexDebit].sum = performOperation(
        this.accounts[indexDebit].sum,
        debitAmount,
        "-"
      )

      this.accounts[indexCredit].sum = performOperation(
        this.accounts[indexCredit].sum,
        creditAmount,
        "+"
      )
    },
    changeSumEditedTransaction(
      accOldName: string,
      accOldSum: number,
      accNewName: string,
      accNewSum: number,
      mode: Mode
    ) {
      const oldAccount = this.accounts.find((item) => item.title === accOldName)
      const newAccount = this.accounts.find((item) => item.title === accNewName)

      if (oldAccount && newAccount) {
        const oldAccountIndex = this.accounts.indexOf(oldAccount)
        const newAccountIndex = this.accounts.indexOf(newAccount)

        // CHECK MODE, is it is expenses we add sum to old account and subsctract from new.
        // Because if previous sum was 5 and new 10, it means we need to +5 to previous and -10 to new account.
        const oldAccountOperator = mode === Mode.EXPENSES ? "+" : "-"
        const newAccountOperator = mode === Mode.EXPENSES ? "-" : "+"

        this.accounts[oldAccountIndex].sum = performOperation(
          this.accounts[oldAccountIndex].sum,
          accOldSum,
          oldAccountOperator
        )
        this.accounts[newAccountIndex].sum = performOperation(
          this.accounts[newAccountIndex].sum,
          accNewSum,
          newAccountOperator
        )
      }
    },
    changeSumDeletedTransaction(accName: string, accSum: number, mode: Mode) {
      const account = this.accounts.find((item) => item.title === accName)

      if (account) {
        const accountIndex = this.accounts.indexOf(account)

        //Checking MOde, if === expenses => we add sum from deleted transaction to acc,
        // if income => we remove sum from account
        const operator = mode === Mode.EXPENSES ? "+" : "-"

        this.accounts[accountIndex].sum = performOperation(
          this.accounts[accountIndex].sum,
          accSum,
          operator
        )
      }
    }

    // changeSumEditedTransactionEarn(
    //   accOldName: string,
    //   accOldSum: number,
    //   accNewName: string,
    //   accNewSum: number
    // ) {
    //   const oldAccount = this.accounts.find((item) => item.title === accOldName)
    //   const newAccount = this.accounts.find((item) => item.title === accNewName)

    //   if (oldAccount && newAccount) {
    //     const oldAccountIndex = this.accounts.indexOf(oldAccount)
    //     const newAccountIndex = this.accounts.indexOf(newAccount)

    //     this.accounts[oldAccountIndex].sum = performOperation(
    //       this.accounts[oldAccountIndex].sum,
    //       accOldSum,
    //       "-"
    //     )
    //     this.accounts[newAccountIndex].sum = performOperation(
    //       this.accounts[newAccountIndex].sum,
    //       accNewSum,
    //       "+"
    //     )
    //   }
    // }
  },

  getters: {
    getterActiveAccount(state) {
      return state.accounts.find((acc) => acc.active) || null
    }
  }
})
