import { screen, render } from "@testing-library/vue"
import TransferRecent from "../../../../../src/components/accounts/transfer/TransferRecent.vue"

describe("TransferRecent", () => {
  const renderTransferRecent = (props = {}) => {
    render(TransferRecent, {
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
    renderTransferRecent(props)

    const date = screen.getByTestId("date")
    expect(date.textContent).toBe(props.date)
  })

  describe("when we do not have transfers yet", () => {
    it('displays "no transfers" text', () => {
      const props = { transfersList: [] }
      renderTransferRecent(props)

      const text = screen.getByTestId("no-transfers-text")
      expect(text).toBeInTheDocument()
    })
  })
})
