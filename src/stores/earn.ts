import { defineStore } from "pinia"
import type { SpendCardInfo } from "./accounts"
import { useAccountsStore } from "./accounts"
import { Mode } from "@/components/expensesView/enums"

type MonthName = string

export const useEarnStore = defineStore("earn", {
  state: () => ({
    earn: [
      {
        iconName: "fa-solid fa-piggy-bank",
        categoryName: "category EARN",
        sum: 1,
        timestamp: Date.now(),
        account: "acc1",
        currency: "$"
      },
      {
        iconName: "fa-solid fa-piggy-bank",
        categoryName: "EARN",
        sum: 11,
        timestamp: Date.now() - 86400000,
        account: "acc1",
        currency: "$"
      },
      {
        iconName: "fa-solid fa-piggy-bank",
        categoryName: "-1 month EARN",
        sum: 1,
        timestamp: Date.now() - 1 * 30 * 24 * 60 * 60 * 1000,
        account: "acc1",
        currency: "$"
      },
      {
        iconName: "fa-solid fa-piggy-bank",
        categoryName: "-2 monthEARN",
        sum: 1,
        timestamp: Date.now() - 2 * 30 * 24 * 60 * 60 * 1000,
        account: "acc1",
        currency: "$"
      },
      {
        iconName: "fa-solid fa-piggy-bank",
        categoryName: "-3 monthEARN",
        sum: 1,
        timestamp: Date.now() - 3 * 30 * 24 * 60 * 60 * 1000,
        account: "acc1",
        currency: "$"
      }
    ] as SpendCardInfo[]
  }),
  actions: {
    addToEarn(value: SpendCardInfo) {
      this.earn.push(value)
    },
    editEarn(newEarn: SpendCardInfo, index: number) {
      const accountsStore = useAccountsStore()
      accountsStore.changeSumEditedTransaction(
        this.earn[index].account,
        this.earn[index].sum,
        newEarn.account,
        newEarn.sum,
        Mode.INCOME
      )

      this.earn.splice(index, 1, newEarn)
    },

    deleteEarn(index: number) {
      const accountsStore = useAccountsStore()
      accountsStore.changeSumDeletedTransaction(
        this.earn[index].account,
        this.earn[index].sum,
        Mode.INCOME
      )
      this.earn.splice(index, 1)
    }
  },
  getters: {
    earnTodaySorted(state) {
      const timeNow = Date.now()
      const today = new Date(timeNow)
      today.setHours(0, 0, 0, 0)
      const todayEarn = state.earn.filter((earnItem) => earnItem.timestamp >= today.getTime())
      return todayEarn.sort((a, b) => b.timestamp - a.timestamp)
    },

    earnYesterdaySorted(state) {
      const timeNow = Date.now()
      const today = new Date(timeNow)
      const yesterday = new Date(timeNow - 86400000)
      today.setHours(0, 0, 0, 0)
      yesterday.setHours(0, 0, 0, 0)

      const yesterdayEarn = state.earn.filter(
        (earnItem) =>
          earnItem.timestamp >= yesterday.getTime() && earnItem.timestamp < today.getTime()
      )
      return yesterdayEarn.sort((a, b) => b.timestamp - a.timestamp)
    },
    allMonths(state): MonthName[] {
      const monthsSet = new Set()

      state.earn.forEach((earnItem) => {
        const date = new Date(earnItem.timestamp)
        const monthName = date.toLocaleString("en", { month: "long" }) as MonthName
        const year = date.getFullYear()

        monthsSet.add(`${monthName} ${year}`)
      })

      return Array.from(monthsSet) as MonthName[]
    },
    sortedStoreItems(state) {
      return state.earn.sort((a, b) => b.timestamp - a.timestamp)
    }
  }
})
