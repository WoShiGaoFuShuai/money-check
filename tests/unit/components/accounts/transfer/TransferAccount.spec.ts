import { screen, render } from "@testing-library/vue"
import TransferAccount from "../../../../../src/components/accounts/transfer/TransferAccount.vue"
import userEvent from "@testing-library/user-event"

describe("TransferAccount", () => {
  const accounts = [
    { title: "acc1", sum: 1, currency: "Rp", active: true },
    { title: "acc2", sum: 2, currency: "$", active: false }
  ]

  const renderTransferAccount = (props = {}) => {
    return render(TransferAccount, {
      props: {
        title: "Abc",
        accounts,
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

  it("renders correct title", () => {
    const props = {
      title: "Hi"
    }
    renderTransferAccount(props)

    const title = screen.getByRole("title")
    expect(title.textContent).toEqual("Hi")
  })

  it("renders correct info about chosen account: title, sum, currency", () => {
    const props = {
      choosenAccountIndex: 0
    }

    renderTransferAccount(props)

    const accTitle = screen.getByRole("acc-title")
    const accSum = screen.getByRole("acc-sum")
    const accCurrency = screen.getByRole("acc-currency")

    expect(accTitle.textContent).toBe(accounts[props.choosenAccountIndex].title)
    expect(accSum.textContent).toBe(accounts[props.choosenAccountIndex].sum.toString())
    expect(accCurrency.textContent).toBe(accounts[props.choosenAccountIndex].currency)
  })

  it("shows transferWindow when user clicks on the transfer-select-block", async () => {
    renderTransferAccount()

    let transferWindow = screen.queryByTestId("transfer__window-wrapper")

    expect(transferWindow).not.toBeInTheDocument()

    const transferSelect = screen.getByTestId("transfer-select-block")
    await userEvent.click(transferSelect)

    transferWindow = screen.getByTestId("transfer__window-wrapper")

    expect(transferWindow).toBeInTheDocument()
  })

  it("emits chooseDebitAccount event if title includes Debit", async () => {
    const { emitted } = renderTransferAccount({ title: "Debit" })

    const transferSelect = screen.getByTestId("transfer-select-block")
    await userEvent.click(transferSelect) // to show the TransferWindow

    const transferItems = screen.getAllByRole("transfer__item")
    await userEvent.click(transferItems[0])

    expect(emitted()).toHaveProperty("chooseDebitAccount")
    expect(emitted().chooseDebitAccount[0]).toEqual([0])

    //also check that window closes
    const transferWindow = screen.queryByTestId("transfer__window-wrapper")
    expect(transferWindow).not.toBeInTheDocument()
  })

  it("emits chooseCreditAccount event if title includes Credit", async () => {
    const { emitted } = renderTransferAccount({ title: "Credit" })

    const transferSelect = screen.getByTestId("transfer-select-block")
    await userEvent.click(transferSelect) // to show the TransferWindow

    const transferItems = screen.getAllByRole("transfer__item")
    await userEvent.click(transferItems[1])

    expect(emitted()).toHaveProperty("chooseCreditAccount")
    expect(emitted().chooseCreditAccount[0]).toEqual([1])

    //also check that window closes
    const transferWindow = screen.queryByTestId("transfer__window-wrapper")
    expect(transferWindow).not.toBeInTheDocument()
  })
})
