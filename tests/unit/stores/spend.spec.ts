import { createPinia, setActivePinia } from "pinia"
import { useSpendStore } from "../../../src/stores/spend"

describe("spend store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

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

  describe("actions", () => {
    describe("addToSpend", () => {
      it("adds item to the state spend", () => {
        const spendStore = useSpendStore()

        const spendState = spendStore.spend
        expect(spendState).toEqual([])

        const spendCard = createSpendCard()

        spendStore.addToSpend(spendCard)

        expect(spendState).toEqual([spendCard])
      })
    })

    describe("getters", () => {
      describe("spendTodaySorted", () => {
        it("should return only card spends with today timestamp", () => {
          const todaySpendCard = createSpendCard()
          const oneDay = 24 * 60 * 60 * 1000
          const yesterdaySpendCard = createSpendCard({ timestamp: Date.now() - oneDay })

          const spendStore = useSpendStore()
          spendStore.addToSpend(todaySpendCard)
          spendStore.addToSpend(yesterdaySpendCard)

          const result = spendStore.spendTodaySorted
          expect(result[0]).toEqual(todaySpendCard)
          expect(result).toHaveLength(1)
        })

        it("should return today cards in descending order", () => {
          const oneHour = 1 * 60 * 60 * 1000
          const twoHours = 2 * 60 * 60 * 1000
          const threeHours = 3 * 60 * 60 * 1000
          const todaySpendCard1 = createSpendCard({ timestamp: Date.now() - oneHour })
          const todaySpendCard2 = createSpendCard({ timestamp: Date.now() - twoHours })
          const todaySpendCard3 = createSpendCard({ timestamp: Date.now() - threeHours })

          const spendStore = useSpendStore()
          spendStore.addToSpend(todaySpendCard3)
          spendStore.addToSpend(todaySpendCard1)
          spendStore.addToSpend(todaySpendCard2)

          const result = spendStore.spendTodaySorted
          expect(result).toEqual([todaySpendCard1, todaySpendCard2, todaySpendCard3])
        })
      })

      describe("spendYesterdaySorted", () => {
        it("should return only card spends with yesterday timestamp", () => {
          const todaySpendCard = createSpendCard()
          const oneDay = 24 * 60 * 60 * 1000
          const yesterdaySpendCard = createSpendCard({ timestamp: Date.now() - oneDay })

          const spendStore = useSpendStore()
          spendStore.addToSpend(todaySpendCard)
          spendStore.addToSpend(yesterdaySpendCard)

          const result = spendStore.spendYesterdaySorted
          expect(result[0]).toEqual(yesterdaySpendCard)
          expect(result).toHaveLength(1)
        })

        it("should return yesterday cards in descending order", () => {
          const twentyFourHours = 24 * 60 * 60 * 1000
          const twentyFiveHours = 25 * 60 * 60 * 1000
          const ThirtyHours = 30 * 60 * 60 * 1000
          const yesterdaySpendCard1 = createSpendCard({ timestamp: Date.now() - twentyFourHours })
          const yesterdaySpendCard2 = createSpendCard({ timestamp: Date.now() - twentyFiveHours })
          const yesterdaySpendCard3 = createSpendCard({ timestamp: Date.now() - ThirtyHours })

          const spendStore = useSpendStore()
          spendStore.addToSpend(yesterdaySpendCard3)
          spendStore.addToSpend(yesterdaySpendCard1)
          spendStore.addToSpend(yesterdaySpendCard2)

          const result = spendStore.spendYesterdaySorted
          expect(result).toEqual([yesterdaySpendCard1, yesterdaySpendCard2, yesterdaySpendCard3])
        })
      })
    })
  })
})
