<template>
  <TopNavbar
    :bg-color="bgColor"
    :title="title"
  />

  <div class="report__wrapper-selects">
    <div class="report__selects">
      <HistorySelect
        :items="activeStore.allMonths"
        @new-selected-item="changeSelectedItem"
      />

      <HistorySelect
        :title="'All Accounts'"
        :items="accountsStore.getterAllTitles"
        @new-selected-item="changeSelectedAccount"
      />
    </div>
  </div>
  <div class="total__wrapper">
    <div v-if="!Object.keys(filteredTotalsComputed).length">Sorry, no results.</div>
    <div
      v-for="(value, key, index) in filteredTotalsComputed"
      v-else
      :key="index"
      class="total__item"
      :style="{ backgroundColor: colors[index % colors.length] }"
    >
      <div class="total__result">{{ value }} {{ key }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import HistorySelect from "@/components/shared/HistorySelect.vue"
import { previousRoute } from "@/router/index"
import { useSpendStore } from "@/stores/spend"
import { useEarnStore } from "@/stores/earn"
import { useAccountsStore } from "@/stores/accounts"
import type { SpendCardInfo } from "@/stores/accounts"

import { ref, computed } from "vue"
import type { Ref } from "vue"

const spendStore = useSpendStore()
const earnStore = useEarnStore()
const accountsStore = useAccountsStore()

const activeStore = previousRoute.value === "income" ? earnStore : spendStore
const bgColor = previousRoute.value === "income" ? "var(--green-primary)" : ""

const selectedMonth: Ref<string> = ref("")

const changeSelectedItem = (value: string) => {
  selectedMonth.value = value
}

interface Totals {
  [key: string]: number
}

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp)
  return date.toLocaleString("en-EN", { month: "long", year: "numeric" })
}

// const totalsComputed = computed(() => {
//   let totals: Totals = {}

//   spendStore.spend.forEach((item: SpendCardInfo) => {
//     if (item.currency) {
//       // Format the date of the item
//       const itemDate = formatDate(item.timestamp)

//       // Check if the selected month is empty or matches the item's month
//       if (selectedMonth.value === "" || selectedMonth.value === itemDate) {
//         // IF object has no key => add it to the object with sum of the item
//         if (!totals[item.currency]) {
//           totals[item.currency] = item.sum
//         } else {
//           // if object has the key => add sum to existent key
//           totals[item.currency] += item.sum
//         }
//       }
//     }
//   })

//   return totals
// })

const totalsComputed = computed(() => {
  let totals: Totals = {}

  const processItems = (items: SpendCardInfo[]) => {
    items.forEach((item: SpendCardInfo) => {
      if (item.currency) {
        // Format the date of the item
        const itemDate = formatDate(item.timestamp)

        // Check if the selected month is empty or matches the item's month
        if (selectedMonth.value === "" || selectedMonth.value === itemDate) {
          // IF object has no key => add it to the object with sum of the item
          if (!totals[item.currency]) {
            totals[item.currency] = item.sum
          } else {
            // if object has the key => add sum to existent key
            totals[item.currency] += item.sum
          }
        }
      }
    })
  }

  if (previousRoute.value === "income") {
    processItems(earnStore.earn)
  } else {
    processItems(spendStore.spend)
  }

  return totals
})

const colors = ["#cdb4db", "#ffc8dd", "#ffafcc", "#bde0fe", "#ffb703", "#2a9d8f", "#e9c46a"]

const selectedAccount = ref("")

const changeSelectedAccount = (value: string) => {
  selectedAccount.value = value
}

const filteredTotalsComputed = computed(() => {
  const totals = totalsComputed.value
  const filteredTotals: Totals = {}

  // Define the function outside of the loop
  const processItemsFiltered = (items: SpendCardInfo[], currency: string) => {
    items.forEach((itemStore: SpendCardInfo) => {
      if (itemStore.currency === currency) {
        const itemDate = formatDate(itemStore.timestamp)

        // Check if the item matches the chosen month, currency, and account
        if (
          (selectedMonth.value === "" || selectedMonth.value === itemDate) &&
          (!selectedAccount.value || selectedAccount.value === itemStore.account)
        ) {
          // Initialize the currency key in the filtered totals if not present
          if (!filteredTotals[currency]) {
            filteredTotals[currency] = 0
          }

          filteredTotals[currency] += itemStore.sum
        }
      }
    })
  }

  // Iterate over the computed totals to filter them
  for (const currency in totals) {
    // Call processItemsFiltered with the appropriate store's data for the current currency
    if (previousRoute.value === "income") {
      processItemsFiltered(earnStore.earn, currency)
    } else {
      processItemsFiltered(spendStore.spend, currency)
    }
  }

  return filteredTotals
})

// CHECK Expenses or Income
const title = previousRoute.value === "income" ? "Total Earns" : "Total Expenses"
</script>
<style lang="css" scoped>
.report__wrapper-selects {
  background-color: var(--blue-secondary);
  padding-top: 54px;
  padding-bottom: 16px;
}

.report__selects {
  max-width: 600px;
  display: flex;
  justify-content: space-evenly;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 24px;
}
.total__wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 600px;
  margin: 0 auto;
}
.total__wrapper > .total__item:only-of-type {
  grid-column: 1 / -1;
}

.total__item {
  text-align: center;
  padding: 12px;
  margin: 8px;
  border-radius: 12px;
}
</style>
