import { render, screen } from "@testing-library/vue"
import { setActivePinia, createPinia } from "pinia"
import userEvent from "@testing-library/user-event"
import ExpensesCategories from "../../../../src/components/expensesView/ExpensesCategories.vue"
import { useCategoriesStore } from "../../../../src/stores/categories"
import { useAccountsStore } from "../../../../src/stores/accounts"
import { vi } from "vitest"

describe("ExpensesCategories", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("renders the correct number of items as in the store", () => {
    const categoriesStore = useCategoriesStore()
    categoriesStore.categoriesExpenses = Array(5).fill({})

    render(ExpensesCategories, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })

    const renderedItems = screen.getAllByTestId("category__item")
    expect(renderedItems).toHaveLength(categoriesStore.categoriesExpenses.length)
  })

  describe("when user clicks on the All Categories", () => {
    it("amount shoudn't be subtracted to the accounts", async () => {
      const { subtractSumActiveAccount } = useAccountsStore()
      const accountsStoreSubtractSumActiveAccountStub = vi.fn(subtractSumActiveAccount)

      render(ExpensesCategories, {
        global: {
          stubs: {
            FontAwesomeIcon: true
          }
        }
      })

      const buttonAllCategories = screen.getByText(/all categories/i)
      await userEvent.click(buttonAllCategories)
      expect(accountsStoreSubtractSumActiveAccountStub).not.toHaveBeenCalled() // Check if the stub was not called
    })
  })

  describe("when user clicks on the category in expenses window", () => {
    it("should subtract sum from account", async () => {
      const accountsStore = useAccountsStore()
      const subtractSumActiveAccountStub = vi.fn()
      accountsStore.subtractSumActiveAccount = subtractSumActiveAccountStub

      const categoriesStore = useCategoriesStore()
      categoriesStore.categoriesExpenses = [
        { iconName: "fa-solid fa-list", categoryName: "All Categories" },
        { iconName: "fa-solid fa-basket-shopping", categoryName: "Food" }
      ]

      render(ExpensesCategories, {
        props: {
          mode: "default"
        },
        global: {
          stubs: {
            FontAwesomeIcon: true
          }
        }
      })

      const foodCategory = screen.getByText(/food/i) as HTMLDivElement
      await userEvent.click(foodCategory)
      expect(subtractSumActiveAccountStub).toHaveBeenCalled()
    })
  })

  describe("when uset clicks on other categories in income window", () => {
    it("it should add amount to the account", async () => {
      const accountsStore = useAccountsStore()
      const accountsStoreAddSumActiveAccount = vi.fn()
      accountsStore.addSumActiveAccount = accountsStoreAddSumActiveAccount

      const categoriesStore = useCategoriesStore()
      categoriesStore.categoriesExpenses = [
        { iconName: "fa-solid fa-list", categoryName: "All Categories" },
        { iconName: "fa-solid fa-basket-shopping", categoryName: "Food" }
      ]

      render(ExpensesCategories, {
        props: {
          mode: "income"
        },
        global: {
          stubs: {
            FontAwesomeIcon: true
          }
        }
      })
      const buttonFood = screen.getByText(/food/i) as HTMLDivElement
      await userEvent.click(buttonFood)
      expect(accountsStoreAddSumActiveAccount).toHaveBeenCalledTimes(1)
    })
  })
})
