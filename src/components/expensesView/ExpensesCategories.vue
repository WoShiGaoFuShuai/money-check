<template>
  <div
    v-show="categoriesStore.showCategoriesExpenses"
    class="category__wrapper"
  >
    <div
      v-for="(category, i) in categoriesStore.categoriesExpenses"
      :key="i"
      class="category__item"
      data-testid="category__item"
      @click="handleClick(category)"
    >
      <div class="category__item-icon">
        <font-awesome-icon
          class="category__item-icon__item"
          :icon="category.iconName"
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
const categoriesStore = useCategoriesStore()
const accountsStore = useAccountsStore()
const calculatorStore = useCalculatorStore()

const handleClick = (category: CategoryObject) => {
  if (category.categoryName !== "All Categories") {
    accountsStore.subtractSumActiveAccount(category)
    calculatorStore.clearField()
    categoriesStore.changeShowCategoriesExpenses(false)
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
