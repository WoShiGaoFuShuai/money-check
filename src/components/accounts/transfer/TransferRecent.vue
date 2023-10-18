<template>
  <div class="recent__wrapper">
    <div
      data-testid="date"
      class="recent__date"
    >
      {{ props.date }}
    </div>
    <div
      v-if="!transfersList.length"
      class="recent__no-transfers"
      data-testid="no-transfers-text"
    >
      no transfers
    </div>
    <div
      v-else
      class="recent__transfers-wrapper"
    >
      <TransferListItems :transfers-list="props.transfersList" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { TransferData, TransferDataWithDifferentCurrency } from "@/stores/transfers"
import TransferListItems from "@/components/shared/TransferListItems.vue"

type TransfersArray = (TransferData | TransferDataWithDifferentCurrency)[]

const props = defineProps({
  date: {
    type: String,
    required: true
  },
  transfersList: {
    type: Array as () => TransfersArray,
    required: true
  }
})
</script>
<style lang="css" scoped>
.recent__date {
  background-color: var(--blue-secondary);
  padding: 4px 8px;
  text-align: center;
}

.recent__no-transfers {
  text-align: center;
  padding: 8px 0;
}
</style>
