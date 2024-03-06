<template>
  <div
    v-show="categoriesStore.showCategoriesExpenses"
    class="category__wrapper"
    data-testid="expenses__categoriesWrapper"
  >
    <div
      v-for="(category, i) in activeCategories"
      :key="i"
      class="category__item"
      data-testid="category__item"
      @click="handleClick(category)"
    >
      <div class="category__item-icon">
        <font-awesome-icon
          class="category__item-icon__item"
          :icon="category.iconName"
          :style="{ color: category.color }"
        />
      </div>
      <div class="category__item-title">{{ category.categoryName }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCategoriesStore } from "@/stores/categories"
import { useAccountsStore } from "@/stores/accounts"
import { useCalculatorStore } from "@/stores/calculator"
import type { CategoryObject } from "@/stores/categories"
import { Mode } from "@/components/expensesView/enums"
import { useRouter } from "vue-router"

const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: () => "expenses"
  }
})

const categoriesStore = useCategoriesStore()
const accountsStore = useAccountsStore()
const calculatorStore = useCalculatorStore()

const activeCategories =
  props.mode === Mode.EXPENSES
    ? categoriesStore.categoriesExpenses
    : categoriesStore.categoriesIncome

const router = useRouter()

const handleClick = (category: CategoryObject) => {
  if (category.categoryName !== "All Categories") {
    const display = document.querySelector(".display")
    let success: boolean
    if (props.mode === Mode.INCOME) {
      success = accountsStore.addSumActiveAccount(category)
    } else {
      success = accountsStore.subtractSumActiveAccount(category)
    }

    if (success) {
      calculatorStore.clearField()
      categoriesStore.changeShowCategoriesExpenses(false)
      display?.classList.remove("display-error")
    } else {
      display?.classList.add("display-error")
    }
  } else if (category.categoryName === "All Categories") {
    router.push({ name: "categories", query: { from: props.mode } })
  }
}
</script>
<style lang="css" scoped>
.category__wrapper {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
}

.category__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 50px;
  margin: 10px;
}

.category__item-title {
  text-align: center;
  font-size: 12px;
}
</style>
