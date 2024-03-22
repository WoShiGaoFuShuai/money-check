import { defineStore } from "pinia"
import { reactive, ref } from "vue"
import type { Ref } from "vue"
import { Mode } from "@/components/expensesView/enums"
import { getUniqueIcons } from "@/stores/utils/utils.categories"
import type { NewCategory } from "@/components/category/category.types"

export interface CategoryObject {
  iconName: string
  categoryName: string
  color: string
}

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    categoriesExpenses: reactive([
      { iconName: "fa-solid fa-basket-shopping", categoryName: "Food", color: "#fefae0" },
      { iconName: "fa-solid fa-shirt", categoryName: "Clothes", color: "#ffb703" },
      { iconName: "fa-solid fa-dumbbell", categoryName: "Sport", color: "#c1121f" },
      { iconName: "fa-solid fa-house", categoryName: "House", color: "#669bbc" },
      { iconName: "fa-solid fa-person", categoryName: "Myself", color: "#c1121f" },
      { iconName: "fa-solid fa-car", categoryName: "Car", color: "#588157" },
      { iconName: "fa-solid fa-mug-saucer", categoryName: "Eating Outside", color: "#588157" }
    ] as CategoryObject[]),
    categoriesIncome: reactive([
      { iconName: "fa-solid fa-piggy-bank", categoryName: "Dividends", color: "#669bbc" },
      { iconName: "fa-solid fa-sack-dollar", categoryName: "Salary", color: "#ffb703" },
      { iconName: "fa-solid fa-briefcase", categoryName: "Business", color: "#c1121f" },
      { iconName: "fa-solid fa-gift", categoryName: "Gifts", color: "#c1121f" }
    ] as CategoryObject[]),
    showCategoriesExpenses: ref(false) as Ref<Boolean>
  }),
  actions: {
    changeShowCategoriesExpenses(value: Boolean) {
      this.showCategoriesExpenses = value
    },
    addCategory(value: CategoryObject, mode: string) {
      if (mode === Mode.INCOME) {
        this.categoriesIncome.push(value)
      } else {
        this.categoriesExpenses.push(value)
      }
    },

    editCategory(newCategory: NewCategory, oldName: string, mode: Mode) {
      //oldCategory will be taken from income or expenses depends on the mode
      const oldCategory =
        mode === Mode.EXPENSES
          ? this.categoriesExpenses.find((item) => item.categoryName === oldName)
          : this.categoriesIncome.find((item) => item.categoryName === oldName)
      if (oldCategory !== undefined) {
        //active store will be used from income or expenses depends on the mode
        const activeStore = mode === Mode.EXPENSES ? this.categoriesExpenses : this.categoriesIncome

        const indexOldCategory = activeStore.indexOf(oldCategory)
        activeStore.splice(indexOldCategory, 1, newCategory)
      }
    },

    deleteCategory(categoryToDel: NewCategory, mode: Mode) {
      //SAME WITH editCategory
      const categoryItem =
        mode === Mode.EXPENSES
          ? this.categoriesExpenses.find((item) => item.categoryName === categoryToDel.categoryName)
          : this.categoriesIncome.find((item) => item.categoryName === categoryToDel.categoryName)

      if (categoryItem !== undefined) {
        //active store will be used from income or expenses depends on the mode
        const activeStore = mode === Mode.EXPENSES ? this.categoriesExpenses : this.categoriesIncome

        const indexCategoryItem = activeStore.indexOf(categoryItem)
        activeStore.splice(indexCategoryItem, 1)
      }
    }
  },
  getters: {
    getterCategoriesExpensesWithoutAllCategories(state) {
      return state.categoriesExpenses.filter((item) => item.categoryName !== "All Categories")
    },
    getterCategoriesIncomeWithoutAllCategories(state) {
      return state.categoriesIncome.filter((item) => item.categoryName !== "All Categories")
    },
    getterUniqueIcons() {
      const allNames: string[] = []
      const uniqueCategories: CategoryObject[] = []

      getUniqueIcons(this.getterCategoriesExpensesWithoutAllCategories, allNames, uniqueCategories)
      getUniqueIcons(this.getterCategoriesIncomeWithoutAllCategories, allNames, uniqueCategories)

      return uniqueCategories
    }
  }
})
