import { defineStore } from "pinia"
import { useCalculatorStore } from "@/stores/calculator"

interface Account {
  title: string
  sum: number
  active: Boolean
}

export const useAccountsStore = defineStore("accounts", {
  state: () => ({
    accounts: [
      { title: "acc1", sum: 130, active: true },
      { title: "acc2", sum: 10, active: false },
      { title: "acc3", sum: 100, active: false },
      { title: "acc4", sum: 1000, active: false }
    ] as Account[]
  }),
  actions: {
    addSumToActiveAccount() {
      const calculatorStore = useCalculatorStore()
      const outputBeforeOperator: number = parseInt(calculatorStore.outputBeforeOperator)

      const activeAccount = this.getterActiveAccount
      if (activeAccount) {
        activeAccount.sum += outputBeforeOperator
      }
    }
  },
  getters: {
    getterActiveAccount(state) {
      return state.accounts.find((acc) => acc.active) || null
    }
  }
})
