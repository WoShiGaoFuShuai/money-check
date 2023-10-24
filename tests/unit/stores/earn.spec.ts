import { createPinia, setActivePinia } from "pinia"
import { useEarnStore } from "../../../src/stores/earn"

describe("earn store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const createEarnCard = (newCard = {}) => {
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
    describe("addToEarn", () => {
      it("adds item to the state earn", () => {
        const earnStore = useEarnStore()
        earnStore.earn = []

        expect(earnStore.earn).toEqual([])

        const earnCard = createEarnCard()

        earnStore.addToEarn(earnCard)

        expect(earnStore.earn).toEqual([earnCard])
      })
    })

    describe("getters", () => {
      describe("earnTodaySorted", () => {
        it("should return only card earn with today timestamp", () => {
          const todayEarnCard = createEarnCard()
          const oneDay = 24 * 60 * 60 * 1000
          const yesterdayEarnCard = createEarnCard({ timestamp: Date.now() - oneDay })

          const earnStore = useEarnStore()
          earnStore.earn = []
          earnStore.addToEarn(todayEarnCard)
          earnStore.addToEarn(yesterdayEarnCard)

          const result = earnStore.earnTodaySorted
          expect(result[0]).toEqual(todayEarnCard)
          expect(result).toHaveLength(1)
        })

        it("should return today cards in descending order", () => {
          const oneHour = 1 * 60 * 60 * 1000
          const twoHours = 2 * 60 * 60 * 1000
          const threeHours = 3 * 60 * 60 * 1000
          const todayEarnCard1 = createEarnCard({ timestamp: Date.now() - oneHour })
          const todayEarnCard2 = createEarnCard({ timestamp: Date.now() - twoHours })
          const todayEarnCard3 = createEarnCard({ timestamp: Date.now() - threeHours })

          const earnStore = useEarnStore()
          earnStore.earn = []

          earnStore.addToEarn(todayEarnCard3)
          earnStore.addToEarn(todayEarnCard1)
          earnStore.addToEarn(todayEarnCard2)

          const result = earnStore.earnTodaySorted
          expect(result).toEqual([todayEarnCard1, todayEarnCard2, todayEarnCard3])
        })
      })

      describe("earnYesterdaySorted", () => {
        it("should return only earn cards with yesterday timestamp", () => {
          const todayEarnCard = createEarnCard()
          const oneDay = 24 * 60 * 60 * 1000
          const yesterdayEarnCard = createEarnCard({ timestamp: Date.now() - oneDay })

          const earnStore = useEarnStore()
          earnStore.earn = []
          earnStore.addToEarn(todayEarnCard)
          earnStore.addToEarn(yesterdayEarnCard)

          const result = earnStore.earnYesterdaySorted
          expect(result[0]).toEqual(yesterdayEarnCard)
          expect(result).toHaveLength(1)
        })

        it("should return yesterday cards in descending order", () => {
          const twentyFourHours = 24 * 60 * 60 * 1000
          const twentyFiveHours = 25 * 60 * 60 * 1000
          const ThirtyHours = 30 * 60 * 60 * 1000
          const yesterdayEarnCard1 = createEarnCard({ timestamp: Date.now() - twentyFourHours })
          const yesterdayEarnCard2 = createEarnCard({ timestamp: Date.now() - twentyFiveHours })
          const yesterdayEarnCard3 = createEarnCard({ timestamp: Date.now() - ThirtyHours })

          const earnStore = useEarnStore()
          earnStore.earn = []
          earnStore.addToEarn(yesterdayEarnCard3)
          earnStore.addToEarn(yesterdayEarnCard1)
          earnStore.addToEarn(yesterdayEarnCard2)

          const result = earnStore.earnYesterdaySorted
          expect(result).toEqual([yesterdayEarnCard1, yesterdayEarnCard2, yesterdayEarnCard3])
        })
      })

      describe("allMonth", () => {
        it("should return all months from earn store without dublication", () => {
          const earnStore = useEarnStore()
          earnStore.earn = []

          const juneTimestamp = new Date(2023, 5, 15).getTime()
          const julyTimestamp = new Date(2023, 6, 15).getTime()
          const augustTimestamp = new Date(2023, 7, 15).getTime()

          const earnJune1 = createEarnCard({ timestamp: juneTimestamp })
          const earnJune2 = createEarnCard({ timestamp: juneTimestamp })
          const earnJuly = createEarnCard({ timestamp: julyTimestamp })
          const earnAugust = createEarnCard({ timestamp: augustTimestamp })

          earnStore.addToEarn(earnJune1)
          earnStore.addToEarn(earnJune2)
          earnStore.addToEarn(earnJuly)
          earnStore.addToEarn(earnAugust)

          expect(earnStore.allMonths).toStrictEqual(["June 2023", "July 2023", "August 2023"])
        })
      })

      describe("sortedStoreItems", () => {
        it("should sort earns in descending order", () => {
          const earnStore = useEarnStore()
          earnStore.earn = []

          const juneTimestamp = new Date(2023, 5, 15).getTime()
          const julyTimestamp = new Date(2023, 6, 15).getTime()
          const augustTimestamp = new Date(2023, 7, 15).getTime()

          const earnJune = createEarnCard({ timestamp: juneTimestamp })
          const earnJuly = createEarnCard({ timestamp: julyTimestamp })
          const earnAugust = createEarnCard({ timestamp: augustTimestamp })

          earnStore.addToEarn(earnJune)
          earnStore.addToEarn(earnAugust)
          earnStore.addToEarn(earnJuly)

          expect(earnStore.sortedStoreItems).toStrictEqual([earnAugust, earnJuly, earnJune])
        })
      })
    })
  })
})
