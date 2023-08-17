import { render, screen } from "@testing-library/vue"
import { setActivePinia, createPinia } from "pinia"
import { vi } from "vitest"
import userEvent from "@testing-library/user-event"
import ExpensesCategories from "../../../../src/components/expensesView/ExpensesCategories.vue"
import { useCategoriesStore } from "../../../../src/stores/categories"
import { useAccountsStore } from "../../../../src/stores/accounts"

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

  // describe("when uset clicks on other categories", () => {
  //   it.only("it should add amount to the account", async () => {
  //     const { addSumToActiveAccount } = useAccountsStore()
  //     const accountsStoreAddSumToActiveAccountStub = vi.fn(addSumToActiveAccount)

  //     render(ExpensesCategories, {
  //       global: {
  //         stubs: {
  //           FontAwesomeIcon: true
  //         }
  //       }
  //     })
  //     const buttonFood = screen.getByText(/food/i)
  //     await userEvent.click(buttonFood)
  //     expect(accountsStoreAddSumToActiveAccountStub).toHaveBeenCalledTimes(1)
  //   })
  // })
})
