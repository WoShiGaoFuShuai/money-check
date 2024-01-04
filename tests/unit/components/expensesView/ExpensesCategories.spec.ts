import { render, screen } from "@testing-library/vue"
import { setActivePinia, createPinia } from "pinia"
import userEvent from "@testing-library/user-event"
import ExpensesCategories from "../../../../src/components/expensesView/ExpensesCategories.vue"
import { useCategoriesStore } from "../../../../src/stores/categories"
import { useAccountsStore } from "../../../../src/stores/accounts"
import { useCalculatorStore } from "../../../../src/stores/calculator"
import { vi } from "vitest"

const renderExpensesCategories = (props = {}, globalMocks = {}) => {
  render(ExpensesCategories, {
    props: {
      mode: "income",
      ...props
    },
    global: {
      ...globalMocks,
      stubs: {
        FontAwesomeIcon: true
      }
    }
  })
}

describe("ExpensesCategories", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("renders the correct number of items as in the store", () => {
    const categoriesStore = useCategoriesStore()
    categoriesStore.categoriesExpenses = Array(5).fill({})

    renderExpensesCategories()

    const renderedItems = screen.getAllByTestId("category__item")
    expect(renderedItems).toHaveLength(categoriesStore.categoriesExpenses.length)
  })

  describe("when user clicks on the All Categories", () => {
    it("amount shoudn't be subtracted to the accounts", async () => {
      const accountsStore = useAccountsStore()
      const subtractSumActiveAccountMock = vi.fn()
      accountsStore.subtractSumActiveAccount = subtractSumActiveAccountMock

      const globalMocks = {
        mocks: {
          $store: {
            accountsStore: {
              subtractSumActiveAccount: subtractSumActiveAccountMock
            }
          }
        }
      }

      renderExpensesCategories({}, globalMocks)

      const buttonAllCategories = screen.getByText(/all categories/i)
      await userEvent.click(buttonAllCategories)
      expect(subtractSumActiveAccountMock).not.toHaveBeenCalled() // Check if the stub was not called
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

      const props = {
        mode: "default"
      }

      const globalMocks = {
        mocks: {
          $store: {
            accountsStore: {
              subtractSumActiveAccount: subtractSumActiveAccountStub
            }
          }
        }
      }

      renderExpensesCategories(props, globalMocks)

      const foodCategory = screen.getByText(/food/i) as HTMLDivElement
      await userEvent.click(foodCategory)
      expect(subtractSumActiveAccountStub).toHaveBeenCalled()
    })
  })

  describe("when user clicks on other categories (not All Categories) in income window", () => {
    it("it should add amount to the account", async () => {
      const accountsStore = useAccountsStore()
      const accountsStoreAddSumActiveAccount = vi.fn()
      accountsStore.addSumActiveAccount = accountsStoreAddSumActiveAccount

      const categoriesStore = useCategoriesStore()
      categoriesStore.categoriesExpenses = [
        { iconName: "fa-solid fa-list", categoryName: "All Categories" },
        { iconName: "fa-solid fa-basket-shopping", categoryName: "Food" }
      ]

      const props = {
        mode: "income"
      }

      const globalMocks = {
        mocks: {
          $store: {
            accountsStore: {
              addSumActiveAccount: accountsStoreAddSumActiveAccount
            }
          }
        }
      }

      renderExpensesCategories(props, globalMocks)

      const buttonFood = screen.getByText(/food/i) as HTMLDivElement
      await userEvent.click(buttonFood)
      expect(accountsStoreAddSumActiveAccount).toHaveBeenCalledTimes(1)
    })

    it("should clear display field & hide expenses categories", async () => {
      const categoriesStore = useCategoriesStore()
      categoriesStore.categoriesExpenses = [
        { iconName: "fa-solid fa-list", categoryName: "All Categories" },
        { iconName: "fa-solid fa-basket-shopping", categoryName: "Food" }
      ]
      const changeShowCategoriesExpensesMock = vi.fn()
      categoriesStore.changeShowCategoriesExpenses = changeShowCategoriesExpensesMock

      const calculatorStore = useCalculatorStore()
      const clearFieldMock = vi.fn()
      calculatorStore.clearField = clearFieldMock
      calculatorStore.outputBeforeOperator = "5"

      const globalMocks = {
        mocks: {
          $store: {
            categoriesStore: {
              changeShowCategoriesExpenses: changeShowCategoriesExpensesMock
            },
            calculatorStore: {
              clearField: clearFieldMock
            }
          }
        }
      }

      renderExpensesCategories({}, globalMocks)

      const buttonFood = screen.getByText(/food/i) as HTMLDivElement

      await userEvent.click(buttonFood)

      expect(clearFieldMock).toHaveBeenCalled()
      expect(changeShowCategoriesExpensesMock).toHaveBeenCalledWith(false)
      const expensesCategoriesWrapper = screen.queryByTestId("expenses__categoriesWrapper")
      expect(expensesCategoriesWrapper).not.toBeVisible()
    })
  })
})
