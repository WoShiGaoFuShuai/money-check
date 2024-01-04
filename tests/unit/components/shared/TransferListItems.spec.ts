import { screen, render } from "@testing-library/vue"
import TransferListItems from "../../../../src/components/shared/TransferListItems.vue"
import type {
  TransferData,
  TransferDataWithDifferentCurrency
} from "../../../../src/stores/transfers"

type TransferItemsArrayType = (TransferData | TransferDataWithDifferentCurrency)[]

const defaultTransferItemsArray = [
  {
    timestamp: 1,
    note: "",
    amount: 1,
    debitTitle: "",
    creditTitle: "",
    createdTime: 1,
    currency: ""
  },
  {
    timestamp: 1,
    note: "",
    amount: 1,
    debitTitle: "",
    creditTitle: "",
    createdTime: 1,
    currency: ""
  }
]

const renderTransferListItems = (
  customTransferItemsArray: TransferItemsArrayType = defaultTransferItemsArray
) => {
  render(TransferListItems, {
    props: {
      transfersList: customTransferItemsArray
    },
    global: {
      stubs: {
        FontAwesomeIcon: true
      }
    }
  })
}

describe("TransferListItems", () => {
  it("renders correct amount of transfer items", () => {
    renderTransferListItems()

    const transferItemsAll = screen.getAllByTestId("transfer__item")
    expect(transferItemsAll.length).toEqual(2)
  })

  it("renders transfer with correct data", () => {
    const transferItemsArray = [
      {
        timestamp: 1703555987141,
        note: "",
        amount: 10,
        debitTitle: "debit",
        creditTitle: "credit",
        createdTime: 1,
        currency: "$"
      }
    ]

    renderTransferListItems(transferItemsArray)

    const debitTitle = screen.getByTestId("transfer__debit")
    const creditTitle = screen.getByTestId("transfer__credit")
    const dayLabel = screen.getByTestId("transfer__dayLabel")
    const amount = screen.getByTestId("transfer__amount")

    expect(debitTitle.textContent).toBe("debit")
    expect(creditTitle.textContent).toBe("credit")
    expect(dayLabel.textContent).toBe("26 December")
    expect(amount.textContent).toBe("10 $")
  })

  describe("transfer note", () => {
    it("displays note if there is a note in transfer", () => {
      const transferItemsArray = [
        {
          timestamp: 1,
          note: "note",
          amount: 1,
          debitTitle: "",
          creditTitle: "",
          createdTime: 1,
          currency: ""
        }
      ]

      renderTransferListItems(transferItemsArray)

      const note = screen.getByTestId("transfer__note")
      expect(note).toBeVisible()
      expect(note.textContent).toEqual("note")
    })

    it("does not display note if there is no note in transfer", () => {
      const transferItemsArray = [
        {
          timestamp: 1,
          note: "",
          amount: 1,
          debitTitle: "",
          creditTitle: "",
          createdTime: 1,
          currency: ""
        }
      ]
      renderTransferListItems(transferItemsArray)

      const note = screen.queryByTestId("transfer__note")
      expect(note).toBeNull()
    })
  })

  describe("getAmount", () => {
    describe("when there is a transfer between accounts with same currency", () => {
      it("displays amount and currency", () => {
        const transferItemsArray = [
          {
            timestamp: 1,
            note: "",
            amount: 10,
            debitTitle: "",
            creditTitle: "",
            createdTime: 1,
            currency: "Y"
          }
        ]
        renderTransferListItems(transferItemsArray)

        const amount = screen.getByTestId("transfer__amount")
        expect(amount.textContent).toBe("10 Y")
      })
    })

    describe("when there is a transfer between accounts with different currencies", () => {
      it("displays amount and currency for both accounts", () => {
        const transferItemsArray = [
          {
            timestamp: 1,
            note: "",
            debitAmount: 10,
            creditAmount: 15,
            debitTitle: "Debit Account",
            creditTitle: "Credit Account",
            createdTime: 1,
            currencyDebit: "USD",
            currencyCredit: "EUR"
          }
        ]
        renderTransferListItems(transferItemsArray)

        const amount = screen.getByTestId("transfer__amount")
        expect(amount.textContent).toBe("10 USD  (15 EUR)")
      })
    })
  })
})
