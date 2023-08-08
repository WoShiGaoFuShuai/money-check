import { defineStore } from "pinia"
import { reactive, ref } from "vue"
import type { Ref } from "vue"

interface CategoryObject {
  iconName: string
  categoryName: string
}

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    categoriesExpenses: reactive([
      { iconName: "fa-solid fa-list", categoryName: "All Categories" },
      { iconName: "fa-solid fa-basket-shopping", categoryName: "Food" },
      { iconName: "fa-solid fa-shirt", categoryName: "Clothes" },
      { iconName: "fa-solid fa-dumbbell", categoryName: "Sport" },
      { iconName: "fa-solid fa-house", categoryName: "House" },
      { iconName: "fa-solid fa-person", categoryName: "Myself" },
      { iconName: "fa-solid fa-car", categoryName: "Car" },
      { iconName: "fa-solid fa-mug-saucer", categoryName: "Eating Outside" }
    ] as CategoryObject[]),
    showCategoriesExpenses: ref(false) as Ref<Boolean>
  }),
  actions: {
    changeShowCategoriesExpenses(value: Boolean) {
      this.showCategoriesExpenses = value
    }
  }
})
