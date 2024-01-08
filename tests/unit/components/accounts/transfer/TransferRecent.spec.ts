import { screen, render } from "@testing-library/vue"
import TransferTransactions from "../../../../../src/components/accounts/transfer/TransferTransactions.vue"

describe("TransferTransactions", () => {
  const renderTransferTransactions = (props = {}) => {
    render(TransferTransactions, {
      props: {
        transfersList: [
          {
            timestamp: 1,
            note: "",
            amount: 10,
            debitTitle: "acc1",
            creditTitle: "acc2",
            createdTime: 999,
            currency: "Rp"
          }
        ],
        date: "today",
        ...props
      },
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
  }
  it("displays date", () => {
    const props = { date: "today1" }
    renderTransferTransactions(props)

    const date = screen.getByTestId("date")
    expect(date.textContent).toBe(props.date)
  })

  describe("when we do not have transfers yet", () => {
    it('displays "no transfers" text', () => {
      const props = { transfersList: [] }
      renderTransferTransactions(props)

      const text = screen.getByTestId("no-transfers-text")
      expect(text).toBeInTheDocument()
    })
  })
})
