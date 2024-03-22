<template>
  <div class="editingTransaction__wrapper">
    <TopNavbar :title="'Editing'">
      <template #left-icons>
        <router-link :to="{ name: 'expenses' }">
          <font-awesome-icon icon="fa-solid fa-arrow-left" />
        </router-link>
      </template>
    </TopNavbar>

    <EditMainWindow
      :edit-item="editItem"
      :edit-item-index="editItemIndex"
      @change-amount="changeAmount"
      @change-category="changeCategory"
      @change-account="changeAccount"
      @change-date="changeDate"
    />
  </div>
</template>
<script lang="ts" setup>
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import EditMainWindow from "@/components/edit/EditMainWindow.vue"
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { useSpendStore } from "@/stores/spend"
import { useEarnStore } from "@/stores/earn"
import { type SpendCardInfo } from "@/stores/accounts"
import type { CategoryObject } from "@/stores/categories"

const spendStore = useSpendStore()
const earnStore = useEarnStore()
const editItem = ref<SpendCardInfo | null>(null)
const editItemIndex = ref<number>(0)
const route = useRoute()

// onMounted(() => {

//   if (route.params.timestamp) {
//     const foundItem = spendStore.spend.find((item) => item.timestamp === +route.params.timestamp)

//     if (foundItem) {
//       editItemIndex.value = spendStore.spend.indexOf(foundItem)
//     }

//     editItem.value = foundItem ? { ...foundItem } : null
//   }
// })

onMounted(() => {
  if (route.params.timestamp) {
    let foundItem
    if (route.meta.source === "income") {
      foundItem = earnStore.earn.find((item) => item.timestamp === +route.params.timestamp)

      // ... handle the case for income
    } else {
      foundItem = spendStore.spend.find((item) => item.timestamp === +route.params.timestamp)
      // ... handle the case for expenses
    }

    if (foundItem && route.meta.source === "expenses") {
      editItemIndex.value = spendStore.spend.indexOf(foundItem)
    } else if (foundItem && route.meta.source === "income") {
      editItemIndex.value = earnStore.earn.indexOf(foundItem)
    }

    editItem.value = foundItem ? { ...foundItem } : null
  }
})

const changeAmount = (newAmount: number) => {
  if (editItem.value) {
    editItem.value.sum = newAmount
  }
}

const changeCategory = (category: CategoryObject) => {
  if (editItem.value) {
    editItem.value.categoryName = category.categoryName
    editItem.value.iconName = category.iconName
    editItem.value.color = category.color
  }
}

const changeAccount = (newAcount: string, newCurrency: string) => {
  if (editItem.value) {
    editItem.value.account = newAcount
    editItem.value.currency = newCurrency
  }
}

const changeDate = (newDate: number) => {
  if (editItem.value) {
    editItem.value.timestamp = newDate
  }
}
</script>
<style lang="css" scoped></style>
