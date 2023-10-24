import { render, screen } from "@testing-library/vue"
import SpendCard from "../../../../src/components/spendCard/SpendCard.vue"
import { useSpendStore } from "../../../../src/stores/spend"

describe("SpendCard", () => {
  const renderSpendCard = (props = {}) => {
    render(SpendCard, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      },
      props: {
        spendSorted: [],
        date: "today",
        mode: "",
        ...props
      }
    })
  }

  const createSpendCard = (newCard = {}) => {
    return {
      iconName: "",
      categoryName: "",
      sum: 0,
      timestamp: Date.now(),
      account: "",
      currency: "",
      ...newCard
    }
  }

  it("displays 'Spent today' if user in expenses window", () => {
    const props = {
      date: "today",
      mode: "Spent"
    }
    renderSpendCard(props)

    const spendTotal = screen.getByRole("spend-total")
    expect(spendTotal.textContent).toContain("Spent today")
  })

  it("displays 'Earned today' if user in expenses window", () => {
    const props = {
      date: "today",
      mode: "Earned"
    }
    renderSpendCard(props)

    const spendTotal = screen.getByRole("spend-total")
    expect(spendTotal.textContent).toContain("Earned today")
  })

  describe("displays sum for total spends", () => {
    it("displays 0 if there are no spends for today", () => {
      const props = {
        spendSorted: []
      }
      renderSpendCard(props)

      const spendTotalSumZero = screen.getByRole("spend-total-sum-zero")
      expect(spendTotalSumZero.textContent).toEqual("0")
    })

    it("displays sum and currency when user have al least 1 spend", () => {
      const spendCard1 = createSpendCard({ sum: 22, currency: "$" })

      const props = {
        spendSorted: [spendCard1]
      }

      renderSpendCard(props)
      const spendTotalSum = screen.getByRole("spend-total-sum")
      expect(spendTotalSum.textContent).toEqual(
        props.spendSorted[0].sum + props.spendSorted[0].currency
      )
    })

    describe("when user has 2 spends with same currency", () => {
      it("counts them together and displays sum + currency", () => {
        const spendCard1 = createSpendCard({ sum: 2, currency: "$" })
        const spendCard2 = createSpendCard({ sum: 1, currency: "$" })

        const props = {
          spendSorted: [spendCard1, spendCard2]
        }
        renderSpendCard(props)
        const totalSum = props.spendSorted[0].sum + props.spendSorted[1].sum
        const currency = props.spendSorted[0].currency

        const spendTotalSum = screen.getByRole("spend-total-sum")
        expect(spendTotalSum.textContent).toEqual(totalSum + currency)
      })
    })

    describe("when user has 2 spends with different currency", () => {
      it("counts them separately and displays 2 spends with 2 currency", () => {
        const spendCard1 = createSpendCard({ sum: 2, currency: "$" })
        const spendCard2 = createSpendCard({ sum: 1, currency: "Rp" })

        const props = {
          spendSorted: [spendCard1, spendCard2],
          mode: "Spent"
        }
        renderSpendCard(props)
        const firstSumAndCurrency = props.spendSorted[0].sum + props.spendSorted[0].currency
        const secondSumAndCurrency = props.spendSorted[1].sum + props.spendSorted[1].currency
        const spendTotal = screen.getByRole("spend-total")
        expect(spendTotal.textContent).toBe(
          "Spent today:" + " " + firstSumAndCurrency + ", " + secondSumAndCurrency
        )
      })
    })
  })

  describe("when user has more than 1 spend with different currency", () => {
    it("adds comma after every currency, but last", () => {
      const spendCard1 = createSpendCard({ sum: 2, currency: "$" })
      const spendCard2 = createSpendCard({ sum: 2, currency: "Rp" })
      const spendCard3 = createSpendCard({ sum: 3, currency: "Y" })

      const props = {
        spendSorted: [spendCard1, spendCard2, spendCard3]
      }
      renderSpendCard(props)

      const spendTotalSums = screen.getAllByRole("spend-total-sum")

      expect(spendTotalSums[0].textContent).toContain(",")
      expect(spendTotalSums[1].textContent).toContain(",")
      expect(spendTotalSums[2].textContent).not.toContain(",")
    })
  })

  it("displays 'no operations' text if we dont have any spends", () => {
    const spendStore = useSpendStore()
    spendStore.spend = []

    expect(spendStore.spend.length).toEqual(0)
    renderSpendCard()

    const noOperationsDiv = screen.getByRole("no-operations")
    expect(noOperationsDiv).toBeInTheDocument()
  })

  it("does not display cards container if we dont have any spends", () => {
    const spendStore = useSpendStore()
    spendStore.spend = []

    expect(spendStore.spend.length).toEqual(0)
    renderSpendCard()

    const noOperationsDiv = screen.queryByRole("cards-container")
    expect(noOperationsDiv).not.toBeInTheDocument()
  })

  it("displays correct amount of cards", () => {
    const spendCard1 = createSpendCard({ sum: 0 })
    const spendCard2 = createSpendCard({ sum: 0 })

    const props = {
      spendSorted: [spendCard1, spendCard2]
    }

    renderSpendCard(props)

    const spendItems = screen.getAllByRole("spendItem")
    expect(spendItems.length).toBe(2)
  })
})
