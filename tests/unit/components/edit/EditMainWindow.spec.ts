import { createRouter, createWebHistory } from "vue-router"
import { defineComponent } from "vue"
import { render, screen } from "@testing-library/vue"
import EditMainWindow from "../../../../src/components/edit/EditMainWindow.vue"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"
import { setActivePinia, createPinia } from "pinia"

import { mount } from "@vue/test-utils"
import EditAmountForm from "../../../../src/components/edit/EditAmountForm.vue"
import EditCategoriesList from "../../../../src/components/edit/EditCategoriesList.vue"
import EditAccountsList from "../../../../src/components/edit/EditAccountsList.vue"
import EditDateCalendar from "../../../../src/components/edit/EditDateCalendar.vue"
import ConfirmationDelete from "../../../../src/components/shared/ConfirmationDelete.vue"
import { useSpendStore } from "../../../../src/stores/spend"

const MockComponent = defineComponent({
  template: "<div></div>"
})

const routes = [{ path: "/", component: MockComponent }]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.push = vi.fn()

const renderEditMainWindow = (editItemArg: {} | null = {}, globalMocks = {}) => {
  const defaultEditItem = {
    iconName: "string",
    categoryName: "string",
    sum: 10,
    timestamp: 1,
    account: "string",
    currency: "string"
  }

  const editItem = editItemArg === null ? null : { ...defaultEditItem, ...editItemArg }

  render(EditMainWindow, {
    props: {
      editItem,
      editItemIndex: 0
    },
    global: {
      ...globalMocks,
      stubs: {
        FontAwesomeIcon: true
      },
      plugins: [router]
    }
  })
}

const mountEditMainWindow = (additionalMocks = {}) => {
  return mount(EditMainWindow, {
    props: {
      editItem: {
        iconName: "string",
        categoryName: "string",
        sum: 10,
        timestamp: 1,
        account: "string",
        currency: "string"
      },
      editItemIndex: 0
    },
    global: {
      stubs: {
        FontAwesomeIcon: true
      },
      plugins: [router],
      mocks: {
        ...additionalMocks
      }
    }
  })
}

beforeEach(() => {
  setActivePinia(createPinia())
})

describe("EditMainWindow", () => {
  describe("toggleEditAccountsList", () => {
    describe("when user clicks on account li", () => {
      it("opens EditAccountsList window", async () => {
        renderEditMainWindow()

        let editAccountListWindow = screen.queryByTestId("editAccountListWindow")
        expect(editAccountListWindow).not.toBeInTheDocument()

        const accountLi = screen.getByTestId("account__li")
        await userEvent.click(accountLi)

        editAccountListWindow = screen.getByTestId("editAccountListWindow")
        expect(editAccountListWindow).toBeInTheDocument()
      })
    })
  })

  describe("toggleEditCategoriesList", () => {
    describe("when user clicks on transaction li", () => {
      it("opens Edit Categories List window", async () => {
        renderEditMainWindow()

        let editCategoriesListWindow = screen.queryByTestId("editCategoriesListWindow")
        expect(editCategoriesListWindow).not.toBeInTheDocument()

        const categoryLi = screen.getByTestId("category__li")
        await userEvent.click(categoryLi)

        editCategoriesListWindow = screen.getByTestId("editCategoriesListWindow")
        expect(editCategoriesListWindow).toBeInTheDocument()
      })
    })
  })

  describe("toggleEditAmountForm", () => {
    describe("when user clicks on amount li", () => {
      it("opens Edit Amount Form window", async () => {
        renderEditMainWindow()

        let editAmountFormWindow = screen.queryByTestId("editAmountFormWindow")
        expect(editAmountFormWindow).not.toBeInTheDocument()

        const amountLi = screen.getByTestId("amount__li")
        await userEvent.click(amountLi)

        editAmountFormWindow = screen.getByTestId("editAmountFormWindow")
        expect(editAmountFormWindow).toBeInTheDocument()
      })
    })
  })

  describe("toggleEditDateCalendar", () => {
    describe("when user clicks on date li", () => {
      it("opens Edit Date Calendar window", async () => {
        renderEditMainWindow()

        let editDateCalendarWindow = screen.queryByTestId("editDateCalendarWindow")
        expect(editDateCalendarWindow).not.toBeInTheDocument()

        const dateLi = screen.getByTestId("date__li")
        await userEvent.click(dateLi)

        editDateCalendarWindow = screen.getByTestId("editDateCalendarWindow")
        expect(editDateCalendarWindow).toBeInTheDocument()
      })
    })
  })

  describe("editItem", () => {
    it("should show calculated day if editItem is passed as a prop", () => {
      const editItem = {
        timestamp: 1700997980578 // timestamp for 26th of November
      }
      renderEditMainWindow(editItem)

      const dayLabel = screen.getByTestId("dayLabel__success")
      expect(dayLabel.textContent).toBe("26 November")
    })

    it("should show erros is editItem is not passed", () => {
      renderEditMainWindow(null)

      const errorDate = screen.getByTestId("dayLabel__failure")
      expect(errorDate.textContent).toBe("Error Date")

      const dayLabel = screen.queryByTestId("dayLabel__success") as HTMLElement
      expect(dayLabel).not.toBeInTheDocument()
    })
  })

  describe("acceptEditTransaction", () => {
    it("calls editSpend and navigates to expenses", async () => {
      const spendStore = useSpendStore()
      const editSpendMock = vi.fn()
      spendStore.editSpend = editSpendMock
      const globalMocks = {
        mocks: {
          $store: {
            spendStore: {
              editSpend: editSpendMock
            }
          }
        }
      }

      const editItemProps = {
        iconName: "icon",
        categoryName: "category 1",
        sum: 10,
        timestamp: 1,
        account: "Account 2",
        currency: "$"
      }

      renderEditMainWindow(editItemProps, globalMocks)

      const acceptEditTransactionBtn = screen.getByRole("accept__edit__transaction__btn")
      await userEvent.click(acceptEditTransactionBtn)

      expect(editSpendMock).toHaveBeenCalledWith(editItemProps, 0)
      expect(router.push).toHaveBeenCalledWith({ name: "expenses" })
    })
  })
})

describe("EditMainWindow events handling", () => {
  describe("EditAmountForm", () => {
    it("handles the changeAmount event emitted from EditAmountForm", async () => {
      const wrapper = mountEditMainWindow()

      await wrapper.find('[data-testId="amount__li"]').trigger("click")
      await wrapper.vm.$nextTick()

      // Now find and interact with EditAmountForm
      const editAmountFormWrapper = wrapper.findComponent(EditAmountForm)
      if (editAmountFormWrapper.exists()) {
        editAmountFormWrapper.vm.$emit("editAmountConfirm", 20)

        // Check if the event was emitted from EditMainWindow
        const emittedChangeAmount = wrapper.emitted("changeAmount")
        expect(emittedChangeAmount).toBeTruthy()
        if (emittedChangeAmount) {
          expect(emittedChangeAmount[0]).toEqual([20])
        }
      } else {
        throw new Error("EditAmountForm is not rendered")
      }
    })

    it("should emit toggleEditAmountForm and hide EditAmountForm", async () => {
      const wrapper = mountEditMainWindow()

      // Find and click the amount list item
      const amountListItem = wrapper.find('[data-testId="amount__li"]')
      await userEvent.click(amountListItem.element)

      //Check if editAmountFormComponent exists
      let editAmountFormComponent = wrapper.findComponent(EditAmountForm)
      expect(editAmountFormComponent.exists()).toBe(true)

      // Emitting toggleEditAmountForm from editAmountFormComponent and waiting for next tick
      editAmountFormComponent.vm.$emit("toggleEditAmountForm", false)
      await wrapper.vm.$nextTick()

      // Check if the editAmountFormComponent is now hidden
      editAmountFormComponent = wrapper.findComponent(EditAmountForm)
      expect(editAmountFormComponent.exists()).toBe(false)
    })
  })

  describe("EditAccountsList", () => {
    it("handles toggleEditAccountsList event emitted from EditAccountsList", async () => {
      const wrapper = mountEditMainWindow()

      // Find and click the category list item
      const accountsListItem = wrapper.find('[data-testId="account__li"]')
      await userEvent.click(accountsListItem.element)

      let editAccountsList = wrapper.findComponent(EditAccountsList)
      expect(editAccountsList.exists()).toBe(true)

      // Emit event from EditAccountsList
      editAccountsList.vm.$emit("toggleEditAccountsList", false)

      // Wait for next tick to ensure Vue has processed the DOM updates
      await wrapper.vm.$nextTick()

      // Check if the EditAccountsList is now hidden
      editAccountsList = wrapper.findComponent(EditAccountsList)
      expect(editAccountsList.exists()).toBe(false)
    })

    it("emits changeChoosenAccount when an account is selected", async () => {
      // Mock the accounts data
      const accountsData = [{ title: "Account 1", currency: "USD", sum: 100 }]

      // Mock the accountsStore
      const accountsStoreMock = {
        accountsStore: {
          accounts: accountsData
        }
      }

      const wrapper = mountEditMainWindow(accountsStoreMock)

      // Trigger the UI interaction to show EditAccountsList
      const accountListItem = wrapper.find('[data-testId="account__li"]')
      await accountListItem.trigger("click")

      await wrapper.vm.$nextTick() // Wait for the DOM update

      // Find the EditAccountsList component
      const editAccountsList = wrapper.findComponent(EditAccountsList)

      // Assume 'accounts' prop in EditAccountsList has an account with title 'Account 1' and currency 'USD'
      const accountToSelect = editAccountsList.find('[data-testId="acc-list__item"]') // Adjust selector as needed
      await accountToSelect.trigger("click")

      // Check if the changeChoosenAccount event has been emitted with the correct parameters
      expect(editAccountsList.emitted("changeChoosenAccount")).toBeTruthy()
      expect(editAccountsList.emitted("changeChoosenAccount")).toEqual([["Account 1", "USD"]])
    })
  })

  describe("EditCategoriesList", () => {
    it("should hide EditCategoriesList when toggleEditCategoriesList is emitted", async () => {
      // Mount the component
      const wrapper = mountEditMainWindow()

      // Find and click the category list item
      const categoryListItem = wrapper.find('[data-testId="category__li"]')
      await userEvent.click(categoryListItem.element)

      // Check if EditCategoriesList is visible
      let editCategoriesList = wrapper.findComponent(EditCategoriesList)
      expect(editCategoriesList.exists()).toBe(true)

      // Emit event from EditCategoriesList
      editCategoriesList.vm.$emit("toggleEditCategoriesList", false)

      // Wait for next tick to ensure Vue has processed the DOM updates
      await wrapper.vm.$nextTick()

      // Check if the EditCategoriesList is now hidden
      editCategoriesList = wrapper.findComponent(EditCategoriesList)
      expect(editCategoriesList.exists()).toBe(false)
    })

    it("emits chooseCategoryName when an category is selected ", async () => {
      // Mock the expenses data
      const expensesData = [{ iconName: "fa-solid fa-list", categoryName: "Category 1" }]

      // Mock the categoriesStore

      const categoriesStoreMock = {
        categoriesStore: {
          categoriesExpenses: expensesData
        }
      }

      const wrapper = mountEditMainWindow(categoriesStoreMock)

      // click on the category list item & waiting updading DOM
      const categoryListItem = wrapper.find('[data-testId="category__li"]')
      categoryListItem.trigger("click")

      await wrapper.vm.$nextTick()

      // Find EditCategoriesList component
      const editCategoriesList = wrapper.findComponent(EditCategoriesList)

      // Simulate selecting a category
      // Assume 'categories' prop in EditCategoriesList has a category named 'Category 1'
      const categoryToSelect = editCategoriesList.find('[data-testId="category__item"]') // Adjust selector as needed
      await categoryToSelect.trigger("click")

      // Check if the chooseCategoryName event has been emitted with the correct parameter
      expect(editCategoriesList.emitted("chooseCategoryName")).toBeTruthy()
      expect(editCategoriesList.emitted("chooseCategoryName")).toEqual([["Category 1"]])
    })
  })

  describe("EditDateCalendar", () => {
    it("should hide EditDateCalendar when close-edit-date-calendar is emitted", async () => {
      const wrapper = mountEditMainWindow()

      const dateListItem = wrapper.find('[data-testId="date__li"]')
      await userEvent.click(dateListItem.element)

      let editDateCalendarComponent = wrapper.findComponent(EditDateCalendar)
      expect(editDateCalendarComponent.exists()).toBe(true)

      editDateCalendarComponent.vm.$emit("closeEditDateCalendar", false)
      await wrapper.vm.$nextTick()

      editDateCalendarComponent = wrapper.findComponent(EditDateCalendar)
      expect(editDateCalendarComponent.exists()).toBe(false)
    })

    it("emits editDateConfirm when confirm button is clicked", async () => {
      const wrapper = mountEditMainWindow()

      const dateListItem = wrapper.find('[data-testId="date__li"]')
      await dateListItem.trigger("click")

      await wrapper.vm.$nextTick()

      const editDateCalendar = wrapper.findComponent(EditDateCalendar)

      const confirmBtn = wrapper.find('[aria-label="Confirm"]')
      await confirmBtn.trigger("click")

      expect(editDateCalendar.emitted("editDateConfirm")).toBeTruthy()
    })
  })

  describe("ConfirmationDelete", () => {
    it("emits cancel emit when cancel button is clicked", async () => {
      const wrapper = mountEditMainWindow()

      const deleteTransactionBtn = wrapper.find('[role="delete__btn"]')
      await deleteTransactionBtn.trigger("click")
      await wrapper.vm.$nextTick()

      const confirmationDeleteComponent = wrapper.findComponent(ConfirmationDelete)

      const cancelBtn = wrapper.find('[role="cancelBtn"]')
      await cancelBtn.trigger("click")
      await wrapper.vm.$nextTick()

      expect(confirmationDeleteComponent.emitted()).toHaveProperty("cancel")
    })

    it("emits confirm emit when confirm button is clicked", async () => {
      const wrapper = mountEditMainWindow()

      const deleteTransactionBtn = wrapper.find('[role="delete__btn"]')
      await deleteTransactionBtn.trigger("click")
      await wrapper.vm.$nextTick()

      const confirmationDeleteComponent = wrapper.findComponent(ConfirmationDelete)

      const confirmBtn = wrapper.find('[role="confirmBtn"]')
      await confirmBtn.trigger("click")
      await wrapper.vm.$nextTick()

      expect(confirmationDeleteComponent.emitted()).toHaveProperty("confirm")
    })
  })
})
