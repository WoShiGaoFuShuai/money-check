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
    spendTodaySorted(state) {
      const timeNow = Date.now()
      const today = new Date(timeNow)
      today.setHours(0, 0, 0, 0)
      const todaySpend = state.spend.filter((spendItem) => spendItem.timestamp >= today.getTime())
      return todaySpend.sort((a, b) => b.timestamp - a.timestamp)
    },

    spendYesterdaySorted(state) {
      const timeNow = Date.now()
      const today = new Date(timeNow)
      const yesterday = new Date(timeNow - 86400000)
      today.setHours(0, 0, 0, 0)
      yesterday.setHours(0, 0, 0, 0)

      const yesterdaySpend = state.spend.filter(
        (spendItem) =>
          spendItem.timestamp >= yesterday.getTime() && spendItem.timestamp < today.getTime()
      )
      return yesterdaySpend.sort((a, b) => b.timestamp - a.timestamp)
    }
  }
})
