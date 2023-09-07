import { render, screen } from "@testing-library/vue"
import AccountsList from "../../../../src/components/accounts/AccountsList.vue"
import userEvent from "@testing-library/user-event"
import { setActivePinia, createPinia } from "pinia"
import { vi } from "vitest"
import { useAccountsStore } from "../../../../src/stores/accounts"

describe("AccountsList", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const renderAccountsList = (props = {}, globalMocks = {}) => {
    return render(AccountsList, {
      props: {
        accounts: [{ title: "Account 1", sum: 100, currency: "USD" }],
        editMode: false,
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

  it("renders the accounts correctly", async () => {
    const props = {
      accounts: [
        { title: "Account 1", sum: 100, currency: "USD" },
        { title: "Account 2", sum: 200, currency: "EUR" }
      ]
    }

    renderAccountsList(props)

    const allAccounts = await screen.findAllByRole("accouts-list__li")
    expect(allAccounts).toHaveLength(2)
  })

  describe("editMode", () => {
    it("does not display edit mode if props passed as false", () => {
      renderAccountsList()

      const editModeButtons = screen.queryByRole("editModeButtons")
      expect(editModeButtons).not.toBeInTheDocument()
    })

    it("does display edit mode if props passed as true", () => {
      const props = {
        editMode: true
      }

      renderAccountsList(props)

      const editModeButtons = screen.getByRole("editModeButtons")
      expect(editModeButtons).toBeInTheDocument()
    })
  })

  describe("showEditCurrentAccount", () => {
    it("sends emit with data when user clicks on the pencil icon", async () => {
      const props = {
        editMode: true
      }

      const { emitted } = renderAccountsList(props)

      const pencilIcon = screen.getByRole("pencilIcon")
      await userEvent.click(pencilIcon)

      expect(emitted()).toHaveProperty("showEditCurrentAccount")
      expect(emitted().showEditCurrentAccount.length).toBe(1)
      const emittedData = emitted().showEditCurrentAccount[0]
      expect(emittedData).toEqual([{ sum: 100, symbol: "USD", title: "Account 1", index: 0 }])
    })
  })

  describe("deleteAccount", () => {
    it("calls delete account function in accountsStore with correct index", async () => {
      const accountsStore = useAccountsStore()

      const deleteAccountMock = vi.fn()

      accountsStore.deleteAccount = deleteAccountMock

      // const accounts = [{ title: "Account 1", sum: 100, currency: "USD" }]

      const props = {
        editMode: true
      }

      const globalMocks = {
        mocks: {
          $store: {
            accountsStore: {
              deleteAccount: deleteAccountMock
            }
          }
        }
      }

      renderAccountsList(props, globalMocks)

      const deleteIcon = screen.getByRole("deleteIcon")
      await userEvent.click(deleteIcon)

      expect(deleteAccountMock).toHaveBeenCalledWith(0)
    })
  })
})
