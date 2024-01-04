<template>
  <div
    v-for="transfer in props.transfersList"
    :key="transfer.timestamp"
    class="recent__item"
    data-testId="transfer__item"
  >
    <div class="recent__item-left">
      <div>
        <span
          data-testId="transfer__debit"
          class="recent__item-title"
          >{{ transfer.debitTitle }}</span
        >
        <font-awesome-icon
          icon="fa-solid fa-arrow-right-long"
          class="recent__item-icon"
        />
        <span
          data-testId="transfer__credit"
          class="recent__item-title"
          >{{ transfer.creditTitle }}</span
        >
      </div>

      <div data-testId="transfer__dayLabel">
        {{ getDayLabel(transfer.timestamp) }}
      </div>
      <p
        v-if="transfer.note !== ''"
        data-testId="transfer__note"
      >
        {{ transfer.note }}
      </p>
    </div>

    <div class="recent__item-right">
      <span
        data-testId="transfer__amount"
        class="recent__item-amount"
        >{{ getAmount(transfer) }}</span
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getDayLabel } from "@/helpers/getDayLabel"
import type { TransferData, TransferDataWithDifferentCurrency } from "@/stores/transfers"

type TransfersArray = (TransferData | TransferDataWithDifferentCurrency)[]

const props = defineProps({
  transfersList: {
    type: Array as () => TransfersArray,
    required: true
  }
})

const getAmount = (transfer: TransferData | TransferDataWithDifferentCurrency) => {
  if ("amount" in transfer) {
    return `${transfer.amount} ${transfer.currency}`
  } else {
    return `${transfer.debitAmount} ${transfer.currencyDebit}  (${transfer.creditAmount} ${transfer.currencyCredit})`
  }
}
</script>
<style lang="css" scoped>
.recent__item {
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid var(--grey-primary);
  justify-content: space-between;
}

.recent__item-title {
  margin-right: 8px;
}

.recent__item-icon {
  margin-right: 8px;
}
</style>
