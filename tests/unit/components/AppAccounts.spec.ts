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
    const accountStore = useAccountsStore()
    accountStore.accounts = Array(5).fill({})

    render(AppAccounts)

    const renderedItems = screen.getAllByTestId("accounts-item")
    expect(renderedItems).toHaveLength(accountStore.accounts.length)
  })

  describe("when user clicks on the account", () => {
    it.only("changes active account", async () => {
      const accountsStore = useAccountsStore()
      accountsStore.accounts = [
        { title: "acc1", sum: 0, active: true },
        { title: "acc2", sum: 0, active: false }
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
