import { render, screen } from "@testing-library/vue"
import AppAccounts from "../../../src/components/AppAccounts.vue"
import { useAccountsStore } from "../../../src/stores/accounts"

describe("AppAccounts", () => {
  it("renders the correct number of items as in the store", () => {
    const accountStore = useAccountsStore()
    accountStore.accounts = Array(5).fill({})

    render(AppAccounts)

    const renderedItems = screen.getAllByTestId("accounts-item")
    expect(renderedItems).toHaveLength(accountStore.accounts.length)
  })
})
