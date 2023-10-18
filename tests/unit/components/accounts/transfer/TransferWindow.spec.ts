import { screen, render, within } from "@testing-library/vue"
import TransferWindow from "../../../../../src/components/accounts/transfer/TransferWindow.vue"
import userEvent from "@testing-library/user-event"

describe("TransferWindow", () => {
  const accounts = [
    { title: "acc1", sum: 1, currency: "Rp", active: true },
    { title: "acc2", sum: 2, currency: "$", active: false }
  ]

  const renderTransferWindow = (props = {}) => {
    return render(TransferWindow, {
      props: {
        transferAccounts: accounts,
        choosenAccountIndex: 0,
        ...props
      },
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
  }

  it("shows all accounts on the page", () => {
    renderTransferWindow()

    const accountsOnPage = screen.getAllByRole("transfer__item")
    expect(accountsOnPage).toHaveLength(accounts.length)
  })

  it("correctly indicates the chosen account with a tick icon", () => {
    const props = {
      choosenAccountIndex: 1
    }

    renderTransferWindow(props)

    const accountsOnPage = screen.getAllByRole("transfer__item")
    const choosenIconSecond = within(accountsOnPage[1]).getByRole("transfer__item-choosen")
    const choosenIconFirst = within(accountsOnPage[0]).queryByRole("transfer__item-choosen")
    expect(choosenIconSecond).toBeInTheDocument()
    expect(choosenIconFirst).not.toBeInTheDocument()
  })

  it("calls chooseAccount method with correct index when an account is clicked", async () => {
    const { emitted } = renderTransferWindow()

    const accountsOnPage = screen.getAllByRole("transfer__item")
    await userEvent.click(accountsOnPage[1])

    expect(emitted()).toHaveProperty("chooseAccount")
    expect(emitted().chooseAccount[0]).toEqual([1])
  })
})
