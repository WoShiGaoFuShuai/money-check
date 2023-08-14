import { createPinia, setActivePinia } from "pinia"
import { useCategoriesStore } from "../../../src/stores/categories"

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("changing showCategoriesExpenses to opposite value", () => {
    const categoriesStore = useCategoriesStore()

    let showCategoriesExpensesValue = categoriesStore.showCategoriesExpenses

    expect(showCategoriesExpensesValue).toBe(false)

    categoriesStore.changeShowCategoriesExpenses(true)
    showCategoriesExpensesValue = categoriesStore.showCategoriesExpenses
    expect(showCategoriesExpensesValue).toBe(true)
  })
})
