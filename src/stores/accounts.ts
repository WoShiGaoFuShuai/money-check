import { defineStore } from "pinia"
import { useCalculatorStore } from "@/stores/calculator"
import { useSpendStore } from "@/stores/spend"
import type { CategoryObject } from "@/stores/categories"

interface Account {
  title: string
  sum: number
  currency: string
  active: boolean
}

export interface SpendCardInfo {
  iconName: string
  categoryName: string
  sum: number
  timestamp: number
  account: string | null
  currency: string | null
}

export const useAccountsStore = defineStore("accounts", {
  state: () => ({
    accounts: [
      { title: "acc1", sum: 130, currency: "Rp", active: true },
      { title: "acc2", sum: 10, currency: "$", active: false },
      { title: "acc3", sum: 100, currency: "€", active: false },
      { title: "acc4", sum: 1000, currency: "¥", active: false }
    ] as Account[]
  }),
  actions: {
    subtractSumActiveAccount(categoryInfo: CategoryObject | null = null) {
      const calculatorStore = useCalculatorStore()
      const outputBeforeOperator: number = parseInt(calculatorStore.outputBeforeOperator)
      const activeAccount = this.getterActiveAccount

      if (activeAccount) {
        activeAccount.sum -= outputBeforeOperator
      }

      if (categoryInfo !== null) {
        const spendCardInfo: SpendCardInfo = {
          sum: outputBeforeOperator,
          ...categoryInfo,
          timestamp: Date.now(),
          account: this.getterActiveAccount?.title || null,
          currency: this.getterActiveAccount?.currency || null
        }

        const spendStore = useSpendStore()
        spendStore.addToSpend(spendCardInfo)
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
    }
  },
  getters: {
    getterActiveAccount(state) {
      return state.accounts.find((acc) => acc.active) || null
    }
  }
})
