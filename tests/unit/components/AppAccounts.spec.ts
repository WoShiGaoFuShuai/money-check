import { render, screen } from "@testing-library/vue"
import { createPinia, setActivePinia } from "pinia"
import userEvent from "@testing-library/user-event"
import AppAccounts from "../../../src/components/AppAccounts.vue"
import { useAccountsStore } from "../../../src/stores/accounts"

describe("AppAccounts", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("renders the correct number of items as in the store", () => {
    const accountsStore = useAccountsStore()
    accountsStore.accounts = Array(5).fill({})

    render(AppAccounts)

    const renderedItems = screen.getAllByTestId("accounts-item")
    expect(renderedItems).toHaveLength(accountsStore.accounts.length)
  })

  it("renders amount, currency & title in the account", () => {
    const accountsStore = useAccountsStore()
    accountsStore.accounts = [{ title: "ab", sum: 9, currency: "Rp", active: true }]

    render(AppAccounts)

    const accountTitle = screen.getByRole("account-title")
    const accountSum = screen.getByRole("account-sum")

    expect(accountTitle.textContent).toBe("ab")
    expect(accountSum.textContent).toBe("9 Rp")
  })

  describe("when user clicks on the account", () => {
    it("changes active account", async () => {
      const accountsStore = useAccountsStore()
      accountsStore.accounts = [
        { title: "acc1", sum: 0, currency: "Rp", active: true },
        { title: "acc2", sum: 0, currency: "Rp", active: false }
      ]

      render(AppAccounts)

      let firstAccount = screen.getByRole("acc1")
      let secondAccount = screen.getByRole("acc2")

      await userEvent.click(secondAccount)

      firstAccount = screen.getByRole("acc1")
      secondAccount = screen.getByRole("acc2")

      expect(firstAccount).not.toHaveClass("active-account")
      expect(secondAccount).toHaveClass("active-account")
    })
  })
})
