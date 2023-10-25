import { render, screen } from "@testing-library/vue"
import EditCurrentAccount from "../../../../src/components/accounts/EditCurrentAccount.vue"
import { nextTick } from "vue"
import userEvent from "@testing-library/user-event"
import { useAccountsStore } from "../../../../src/stores/accounts"
import { vi } from "vitest"
import { RouterLinkStub } from "@vue/test-utils"

// Define a stub for the NewAccountsCurrencySelect component
const NewAccountsCurrencySelect = {
  props: {
    allCurrency: {
      type: Array,
      default: () => []
    },
    currentSymbol: String
  },
  template: "<div></div>"
}

describe("EditCurrentAccount", () => {
  const renderEditCurrentAccount = (mocks = {}) => {
    const accountToEdit = {
      sum: 1,
      title: "a",
      symbol: "Q",
      index: 0
    }

    return render(EditCurrentAccount, {
      props: {
        accountToEdit
      },
      global: {
        mocks: {
          ...mocks
        },
        stubs: {
          FontAwesomeIcon: true,
          NewAccountsCurrencySelect,
          RouterLink: RouterLinkStub
        }
      }
    })
  }

  it("displays data from account that user wants to edit in inputs", async () => {
    renderEditCurrentAccount()

    const accountNameInput = screen.getByRole("accountNameInput") as HTMLInputElement
    const accountBalanceInput = screen.getByRole("accountBalanceInput") as HTMLInputElement

    await nextTick()

    expect(accountNameInput.value).toBe("a")
    expect(accountBalanceInput.value).toBe("1")
  })

  describe("editAccount", () => {
    it("when user clicks on tick button, edits current account with new data", async () => {
      const accountsStore = useAccountsStore()
      const editAccountMock = vi.fn()
      accountsStore.editAccount = editAccountMock

      const globalMocks = {
        $store: {
          accountsStore: {
            editAccount: editAccountMock
          }
        }
      }

      renderEditCurrentAccount(globalMocks)

      const accountNameInput = screen.getByRole("accountNameInput") as HTMLInputElement
      const accountBalanceInput = screen.getByRole("accountBalanceInput") as HTMLInputElement
      await userEvent.type(accountNameInput, "bc")
      await userEvent.type(accountBalanceInput, "23")

      const editAccountBtn = screen.getByRole("editAccountBtn")
      await userEvent.click(editAccountBtn)

      expect(editAccountMock).toHaveBeenCalled()

      const editAccount = {
        title: accountNameInput.value,
        sum: Number(accountBalanceInput.value),
        currency: ""
      }

      expect(editAccountMock).toHaveBeenCalledWith(editAccount, 0)
    })
  })

  describe("changeAccountBalance", () => {
    it("changes value of balance when user clicks on +- button", async () => {
      renderEditCurrentAccount()

      const accountBalanceInput = screen.getByRole("accountBalanceInput") as HTMLInputElement
      await nextTick()
      expect(accountBalanceInput.value).toBe("1")

      const changeAccountBalanceBtn = screen.getByRole("changeAccountBalanceBtn")
      await userEvent.click(changeAccountBalanceBtn)

      expect(accountBalanceInput.value).toBe("-1")
    })
  })

  describe("when user clicks on X button", () => {
    it("should close edit current account window", async () => {
      const { emitted } = renderEditCurrentAccount()

      const closeBtn = screen.getByRole("closeAccountBtn")
      await userEvent.click(closeBtn)

      expect(emitted()).toHaveProperty("hideEditCurrentAccount")
    })
  })
})
