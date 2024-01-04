import { render, screen } from "@testing-library/vue"
import SpendCardContainer from "../../../../src/components/spendCard/SpendCardContainer.vue"
import { RouterLinkStub } from "@vue/test-utils"

describe("SpendCardContainer", () => {
  const renderSpendCardContainer = (props = {}) => {
    render(SpendCardContainer, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub
        }
      },
      props: {
        spendSorted: [],
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

  describe("getDayLabel", () => {
    describe("when timestamp less than 24 hours", () => {
      it("shows 'today'", () => {
        const spendCard1 = createSpendCard()

        const props = {
          spendSorted: [spendCard1]
        }
        renderSpendCardContainer(props)
        const getDayLabel = screen.getByRole("getDayLabel")
        expect(getDayLabel.textContent).toBe("Today")
      })
    })

    describe("when timestamp more than 24 hours", () => {
      it("shows 'yesterday'", () => {
        const twentyFiveHoursInMilliseconds = 25 * 60 * 60 * 1000
        const spendCard1 = createSpendCard({
          timestamp: Date.now() - twentyFiveHoursInMilliseconds
        })

        const props = {
          spendSorted: [spendCard1]
        }

        renderSpendCardContainer(props)
        const getDayLabel = screen.getByRole("getDayLabel")
        expect(getDayLabel.textContent).toBe("Yesterday")
      })
    })
  })
})
