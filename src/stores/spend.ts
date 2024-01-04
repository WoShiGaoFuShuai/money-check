import { defineStore } from "pinia"
import { useAccountsStore, type SpendCardInfo } from "@/stores/accounts"
import { Mode } from "@/components/expensesView/enums"
type MonthName = string

export const useSpendStore = defineStore("spend", {
  state: () => ({
    spend: [
      {
        iconName: "fa-solid fa-piggy-bank",
        categoryName: "category",
        sum: 1,
        timestamp: Date.now(),
        account: "acc1",
        currency: "$"
      },
      {
        iconName: "fa-solid fa-piggy-bank",
        categoryName: "CAT",
        sum: 11,
        timestamp: Date.now() - 86400000,
        account: "acc1",
        currency: "$"
      },
      {
        iconName: "fa-solid fa-piggy-bank",
        categoryName: "-1 month",
        sum: 1,
        timestamp: Date.now() - 1 * 30 * 24 * 60 * 60 * 1000,
        account: "acc1",
        currency: "$"
      },
      {
        iconName: "fa-solid fa-piggy-bank",
        categoryName: "-2 month",
        sum: 1,
        timestamp: Date.now() - 2 * 30 * 24 * 60 * 60 * 1000,
        account: "acc1",
        currency: "$"
      },
      {
        iconName: "fa-solid fa-piggy-bank",
        categoryName: "-3 month",
        sum: 1,
        timestamp: Date.now() - 3 * 30 * 24 * 60 * 60 * 1000,
        account: "acc1",
        currency: "$"
      }
    ] as SpendCardInfo[]
  }),
  actions: {
    addToSpend(value: SpendCardInfo) {
      this.spend.push(value)
    },
    deleteSpend(index: number) {
      const accountsStore = useAccountsStore()
      accountsStore.changeSumDeletedTransaction(
        this.spend[index].account,
        this.spend[index].sum,
        Mode.EXPENSES
      )
      this.spend.splice(index, 1)
    },
    editSpend(newSpend: SpendCardInfo, index: number) {
      const accountsStore = useAccountsStore()
      accountsStore.changeSumEditedTransaction(
        this.spend[index].account,
        this.spend[index].sum,
        newSpend.account,
        newSpend.sum,
        Mode.EXPENSES
      )

      this.spend.splice(index, 1, newSpend)
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
    },
    allMonths(state): MonthName[] {
      const monthsSet = new Set()

      state.spend.forEach((spendItem) => {
        const date = new Date(spendItem.timestamp)
        const monthName = date.toLocaleString("en", { month: "long" }) as MonthName
        const year = date.getFullYear()

        monthsSet.add(`${monthName} ${year}`)
      })

      return Array.from(monthsSet) as MonthName[]
    },
    sortedStoreItems(state) {
      return state.spend.sort((a, b) => b.timestamp - a.timestamp)
    }
  }
})
