import { defineStore } from "pinia"
import type { SpendCardInfo } from "./accounts"
import { useAccountsStore } from "./accounts"
import { Mode } from "@/components/expensesView/enums"
import type { NewCategory } from "@/components/category/category.types"

type MonthName = string

export const useEarnStore = defineStore("earn", {
  state: () => ({
    earn: [
      {
        iconName: "fa-solid fa-piggy-bank",
        categoryName: "category EARN",
        sum: 111,
        timestamp: Date.now(),
        account: "acc5",
        currency: "€",
        color: "#fff000"
      },
      {
        iconName: "fa-solid fa-piggy-bank",
        categoryName: "EARN",
        sum: 222,
        timestamp: Date.now() - 86400000,
        account: "acc4",
        currency: "Rp",
        color: "#fff000"
      },
      {
        iconName: "fa-solid fa-piggy-bank",
        categoryName: "-1 month EARN",
        sum: 333,
        timestamp: Date.now() - 1 * 30 * 24 * 60 * 60 * 1000,
        account: "acc3",
        currency: "$",
        color: "#fff000"
      },
      {
        iconName: "fa-solid fa-piggy-bank",
        categoryName: "-2 monthEARN",
        sum: 444,
        timestamp: Date.now() - 2 * 30 * 24 * 60 * 60 * 1000,
        account: "acc1",
        currency: "¥",
        color: "#fff000"
      },
      {
        iconName: "fa-solid fa-piggy-bank",
        categoryName: "-3 monthEARN",
        sum: 555,
        timestamp: Date.now() - 3 * 30 * 24 * 60 * 60 * 1000,
        account: "acc2",
        currency: "$",
        color: "#fff000"
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
    },

    deleteAllEarnsOfAccount(accName: string) {
      console.log(this.earn.filter((item) => item.account !== accName))

      this.earn = this.earn.filter((item) => item.account !== accName)
    },

    changeCategory(newCategory: NewCategory, nameToUpdate: string) {
      const arraysToUpdate = this.earn.filter((item) => item.categoryName === nameToUpdate)

      if (arraysToUpdate.length) {
        arraysToUpdate.forEach((item) => {
          item.iconName = newCategory.iconName
          item.categoryName = newCategory.categoryName
          item.color = newCategory.color
        })
      }
    },

    changeAccountAndCurrency(
      oldAccountName: string,
      newAccount: { title: string; sum: number; currency: string }
    ) {
      const allEarns = this.earn.filter((item) => item.account === oldAccountName)
      allEarns.forEach((item) => {
        item.account = newAccount.title
        item.currency = newAccount.currency
      })
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
    //SAME
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
