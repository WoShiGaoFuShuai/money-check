<template>
  <div
    class="recent__item"
    data-testId="transfer__item"
    @click="handleClick(props.transfer)"
  >
    <div class="recent__item-left">
      <div>
        <span
          data-testId="transfer__debit"
          class="recent__item-title"
          >{{ props.transfer.debitTitle }}</span
        >
        <font-awesome-icon
          icon="fa-solid fa-arrow-right-long"
          class="recent__item-icon"
        />
        <span
          data-testId="transfer__credit"
          class="recent__item-title"
          >{{ props.transfer.creditTitle }}</span
        >
      </div>

      <div data-testId="transfer__dayLabel">
        {{ getDayLabel(props.transfer.timestamp) }}
      </div>
      <p
        v-if="props.transfer.note !== ''"
        data-testId="transfer__note"
      >
        {{ props.transfer.note }}
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
import type { TransferType } from "@/stores/transfers"

const props = defineProps({
  transfer: {
    type: Object as () => TransferType,
    required: true
  }
})

const emit = defineEmits(["transactionItemClick"])

const getAmount = (transfer: TransferType) => {
  if ("amount" in transfer) {
    return `${transfer.amount} ${transfer.currency}`
  } else {
    return `${transfer.debitAmount} ${transfer.currencyDebit}  (${transfer.creditAmount} ${transfer.currencyCredit})`
  }
}

const handleClick = (transferClicked: TransferType) => {
  emit("transactionItemClick", transferClicked)
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
