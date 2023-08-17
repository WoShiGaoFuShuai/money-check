import { render, screen } from "@testing-library/vue"
import SpendCard from "../../../src/components/SpendCard.vue"
import { useSpendStore } from "../../../src/stores/spend"

describe("SpendCard", () => {
  const renderSpendCard = () => {
    render(SpendCard, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
  }

  it("displays 'no operations' text if we dont have any spends", () => {
    const spendStore = useSpendStore()

    expect(spendStore.spend.length).toEqual(0)
    renderSpendCard()

    const noOperationsDiv = screen.getByRole("no-operations")
    expect(noOperationsDiv).toBeInTheDocument()
  })

  it("does not display cards container if we dont have any spends", () => {
    const spendStore = useSpendStore()

    expect(spendStore.spend.length).toEqual(0)
    renderSpendCard()

    const noOperationsDiv = screen.queryByRole("cards-container")
    expect(noOperationsDiv).not.toBeInTheDocument()
  })

  it("displays correct amount of cards", () => {
    const spendStore = useSpendStore()
    const newSpendCard1 = {
      iconName: "",
      categoryName: "",
      sum: 0,
      timestamp: 0,
      account: "",
      currency: ""
    }
    const newSpendCard2 = {
      iconName: "",
      categoryName: "",
      sum: 0,
      timestamp: 0,
      account: "",
      currency: ""
    }
    spendStore.spend = [newSpendCard1, newSpendCard2]

    renderSpendCard()

    const spendItems = screen.getAllByRole("spendItem")
    expect(spendItems.length).toBe(2)
  })

  describe("getDayLabel", () => {
    describe("when timestamp less than 24 hours", () => {
      it("shows 'today'", () => {
        const spendStore = useSpendStore()
        const newSpendCard1 = {
          iconName: "",
          categoryName: "",
          sum: 0,
          timestamp: Date.now(),
          account: "",
          currency: ""
        }
        spendStore.spend = [newSpendCard1]
        renderSpendCard()
        const getDayLabel = screen.getByRole("getDayLabel")
        expect(getDayLabel.textContent).toBe("Today")
      })
    })

    describe("when timestamp more than 24 hours", () => {
      it("shows 'yesterday'", () => {
        const spendStore = useSpendStore()
        const twentyFiveHoursInMilliseconds = 25 * 60 * 60 * 1000
        const newSpendCard1 = {
          iconName: "",
          categoryName: "",
          sum: 0,
          timestamp: Date.now() - twentyFiveHoursInMilliseconds,
          account: "",
          currency: ""
        }
        spendStore.spend = [newSpendCard1]
        renderSpendCard()
        const getDayLabel = screen.getByRole("getDayLabel")
        expect(getDayLabel.textContent).toBe("Yesterday")
      })
    })
  })
})
