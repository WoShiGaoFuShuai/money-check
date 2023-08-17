import { defineStore } from "pinia"
import type { SpendCardInfo } from "./accounts"

export const useSpendStore = defineStore("spend", {
  state: () => ({
    spend: [] as SpendCardInfo[]
  }),
  actions: {
    addToSpend(value: SpendCardInfo) {
      this.spend.push(value)
    }
  },
  getters: {
    sortedSpendByTimestamp(state) {
      return state.spend.sort((a, b) => b.timestamp - a.timestamp)
    }
    // spendToday(state) {
    //   return state.spend.reduce((acc, currentValue) => acc + currentValue.sum, 0)
    // }
  }
})
