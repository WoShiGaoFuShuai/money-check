import { createPinia, setActivePinia } from "pinia"
import { useSpendStore } from "../../../src/stores/spend"

describe("spend store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe("actions", () => {
    describe("addToSpend", () => {
      it("adds item to the state spend", () => {
        const spendStore = useSpendStore()

        const spendState = spendStore.spend
        expect(spendState).toEqual([])

        const newSpendCard = {
          iconName: "fa-solid fa-xmark",
          categoryName: "cat",
          sum: 1,
          timestamp: 2,
          account: "acc",
          currency: "cur"
        }
        spendStore.addToSpend(newSpendCard)

        expect(spendState).toEqual([newSpendCard])
      })
    })

    describe("getters", () => {
      describe("sortedSpendByTimestamp", () => {
        it("sorts items in state spend in ascending order", () => {
          const spendStore = useSpendStore()

          const newSpendCard1 = {
            iconName: "",
            categoryName: "",
            sum: 0,
            timestamp: 2,
            account: "",
            currency: ""
          }

          const newSpendCard2 = {
            iconName: "",
            categoryName: "",
            sum: 0,
            timestamp: 10,
            account: "",
            currency: ""
          }

          spendStore.spend = [newSpendCard1, newSpendCard2]

          expect(spendStore.spend).toEqual([newSpendCard1, newSpendCard2])
          expect(spendStore.sortedSpendByTimestamp).toEqual([newSpendCard2, newSpendCard1])
        })
      })
    })
  })
})
