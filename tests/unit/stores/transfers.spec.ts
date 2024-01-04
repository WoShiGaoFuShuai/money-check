import { createPinia, setActivePinia } from "pinia"
import { useTransfersStore } from "../../../src/stores/transfers"

describe("transfers store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const createTransferDataCard = (newTransfer = {}) => {
    return {
      timestamp: Date.now(),
      note: "",
      amount: 1,
      debitTitle: "",
      creditTitle: "",
      createdTime: 1,
      currency: "",
      ...newTransfer
    }
  }

  describe("actions", () => {
    it("adds transfers to the store", () => {
      const transfersStore = useTransfersStore()
      transfersStore.transfers = []

      expect(transfersStore.transfers.length).toEqual(0)

      const transferData = {
        timestamp: 1,
        note: "",
        amount: 1,
        debitTitle: "",
        creditTitle: "",
        createdTime: 1,
        currency: ""
      }

      const transferDataCard = createTransferDataCard(transferData)

      transfersStore.addToTransfers(transferDataCard)

      expect(transfersStore.transfers.length).toEqual(1)
      expect(transfersStore.transfers[0]).toEqual(transferData)
    })
  })

  describe("getters", () => {
    describe("transfersTodaySorted", () => {
      it("should return only card transfers with today timestamp", () => {
        const todayTransferCard = createTransferDataCard()
        const oneDay = 24 * 60 * 60 * 1000
        const yesterdayTransferCard = createTransferDataCard({ timestamp: Date.now() - oneDay })

        const transfersStore = useTransfersStore()
        transfersStore.transfers = []
        transfersStore.addToTransfers(todayTransferCard)
        transfersStore.addToTransfers(yesterdayTransferCard)

        const result = transfersStore.transfersTodaySorted
        expect(result[0]).toEqual(todayTransferCard)
        expect(result).toHaveLength(1)
      })
    })

    describe("transfersYesterdaySorted", () => {
      it("should return only card transfers with yesterday timestamp", () => {
        const todayTransferCard = createTransferDataCard()
        const oneDay = 24 * 60 * 60 * 1000
        const yesterdaySpendCard = createTransferDataCard({ timestamp: Date.now() - oneDay })

        const transfersStore = useTransfersStore()
        transfersStore.transfers = []
        transfersStore.addToTransfers(todayTransferCard)
        transfersStore.addToTransfers(yesterdaySpendCard)

        const result = transfersStore.transfersYesterdaySorted
        expect(result[0]).toEqual(yesterdaySpendCard)
        expect(result).toHaveLength(1)
      })

      it("should return yesterday cards in descending order", () => {
        const twentyFourHours = 24 * 60 * 60 * 1000
        const twentyFiveHours = 25 * 60 * 60 * 1000
        const ThirtyHours = 30 * 60 * 60 * 1000
        const yesterdayTransferCard1 = createTransferDataCard({
          timestamp: Date.now() - twentyFourHours,
          createdTime: 1
        })

        const yesterdayTransferCard2 = createTransferDataCard({
          timestamp: Date.now() - twentyFiveHours,
          createdTime: 2
        })
        const yesterdayTransferCard3 = createTransferDataCard({
          timestamp: Date.now() - ThirtyHours,
          createdTime: 3
        })

        const transfersStore = useTransfersStore()
        transfersStore.transfers = []
        transfersStore.addToTransfers(yesterdayTransferCard3)
        transfersStore.addToTransfers(yesterdayTransferCard1)
        transfersStore.addToTransfers(yesterdayTransferCard2)

        const result = transfersStore.transfersYesterdaySorted

        expect(result).toEqual([
          yesterdayTransferCard3,

          yesterdayTransferCard2,
          yesterdayTransferCard1
        ])
      })
    })

    describe("allMonth", () => {
      it("should return all months from transfer store without dublication", () => {
        const transfersStore = useTransfersStore()
        transfersStore.transfers = []

        const juneTimestamp = new Date(2023, 5, 15).getTime()
        const julyTimestamp = new Date(2023, 6, 15).getTime()
        const augustTimestamp = new Date(2023, 7, 15).getTime()

        const spendJune1 = createTransferDataCard({ timestamp: juneTimestamp })
        const spendJune2 = createTransferDataCard({ timestamp: juneTimestamp })
        const spendJuly = createTransferDataCard({ timestamp: julyTimestamp })
        const spendAugust = createTransferDataCard({ timestamp: augustTimestamp })

        transfersStore.addToTransfers(spendJune1)
        transfersStore.addToTransfers(spendJune2)
        transfersStore.addToTransfers(spendJuly)
        transfersStore.addToTransfers(spendAugust)

        expect(transfersStore.allMonths).toStrictEqual(["June 2023", "July 2023", "August 2023"])
      })
    })

    describe("sortedTransfers", () => {
      it("should sort transfers in descending order", () => {
        const transfersStore = useTransfersStore()
        transfersStore.transfers = []

        const juneTimestamp = new Date(2023, 5, 15).getTime()
        const julyTimestamp = new Date(2023, 6, 15).getTime()
        const augustTimestamp = new Date(2023, 7, 15).getTime()

        const spendJune = createTransferDataCard({ timestamp: juneTimestamp })
        const spendJuly = createTransferDataCard({ timestamp: julyTimestamp })
        const spendAugust = createTransferDataCard({ timestamp: augustTimestamp })

        transfersStore.addToTransfers(spendJune)
        transfersStore.addToTransfers(spendAugust)
        transfersStore.addToTransfers(spendJuly)

        expect(transfersStore.sortedTransfers).toStrictEqual([spendAugust, spendJuly, spendJune])
      })
    })
  })
})
