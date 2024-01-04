import { createPinia, setActivePinia } from "pinia"
import { useSpendStore } from "../../../src/stores/spend"
import { useAccountsStore } from "../../../src/stores/accounts"
import { vi } from "vitest"

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
        spendStore.spend = []

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
          spendStore.spend = []
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
          spendStore.spend = []

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
          spendStore.spend = []
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
          spendStore.spend = []
          spendStore.addToSpend(yesterdaySpendCard3)
          spendStore.addToSpend(yesterdaySpendCard1)
          spendStore.addToSpend(yesterdaySpendCard2)

          const result = spendStore.spendYesterdaySorted
          expect(result).toEqual([yesterdaySpendCard1, yesterdaySpendCard2, yesterdaySpendCard3])
        })
      })

      describe("allMonth", () => {
        it("should return all months from spend store without dublication", () => {
          const spendStore = useSpendStore()
          spendStore.spend = []

          const juneTimestamp = new Date(2023, 5, 15).getTime()
          const julyTimestamp = new Date(2023, 6, 15).getTime()
          const augustTimestamp = new Date(2023, 7, 15).getTime()

          const spendJune1 = createSpendCard({ timestamp: juneTimestamp })
          const spendJune2 = createSpendCard({ timestamp: juneTimestamp })
          const spendJuly = createSpendCard({ timestamp: julyTimestamp })
          const spendAugust = createSpendCard({ timestamp: augustTimestamp })

          spendStore.addToSpend(spendJune1)
          spendStore.addToSpend(spendJune2)
          spendStore.addToSpend(spendJuly)
          spendStore.addToSpend(spendAugust)

          expect(spendStore.allMonths).toStrictEqual(["June 2023", "July 2023", "August 2023"])
        })
      })

      describe("sortedStoreItems", () => {
        it("should sort spends in descending order", () => {
          const spendStore = useSpendStore()
          spendStore.spend = []

          const juneTimestamp = new Date(2023, 5, 15).getTime()
          const julyTimestamp = new Date(2023, 6, 15).getTime()
          const augustTimestamp = new Date(2023, 7, 15).getTime()

          const spendJune = createSpendCard({ timestamp: juneTimestamp })
          const spendJuly = createSpendCard({ timestamp: julyTimestamp })
          const spendAugust = createSpendCard({ timestamp: augustTimestamp })

          spendStore.addToSpend(spendJune)
          spendStore.addToSpend(spendAugust)
          spendStore.addToSpend(spendJuly)

          expect(spendStore.sortedStoreItems).toStrictEqual([spendAugust, spendJuly, spendJune])
        })
      })

      describe("deleteSpend", () => {
        it("adds sum to account and detetes spend", () => {
          const spendStore = useSpendStore()
          spendStore.spend = []
          const firstSpend = createSpendCard()
          const secondSpend = createSpendCard()
          spendStore.addToSpend(firstSpend)
          spendStore.addToSpend(secondSpend)

          const accountsStore = useAccountsStore()
          const changeSumDeletedTransactionMock = vi.fn()
          accountsStore.changeSumDeletedTransaction = changeSumDeletedTransactionMock

          spendStore.deleteSpend(0)
          expect(spendStore.spend.length).toEqual(1)
          expect(changeSumDeletedTransactionMock).toHaveBeenCalled()
        })
      })

      describe("editSpend", () => {
        describe("when user edits transaction", () => {
          it("removes previous transaction and adds a new one", () => {
            const accountsStore = useAccountsStore()
            const changeSumEditedTransactionMock = vi.fn()
            accountsStore.changeSumEditedTransaction = changeSumEditedTransactionMock

            const spendStore = useSpendStore()
            spendStore.spend = []
            const firstSpend = createSpendCard({ account: "first" })
            const secondSpend = createSpendCard({ account: "second" })
            spendStore.addToSpend(firstSpend)
            spendStore.addToSpend(secondSpend)

            const newSpend = {
              iconName: "",
              categoryName: "",
              sum: 0,
              timestamp: 1,
              account: "new acc",
              currency: ""
            }

            spendStore.editSpend(newSpend, 0)

            expect(spendStore.spend[0]).toEqual(newSpend)
          })
        })
      })
    })
  })
})
