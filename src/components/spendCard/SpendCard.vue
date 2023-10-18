<template>
  <div class="spendCard__wrapper">
    <div
      class="spendCard__totalSpend"
      role="spend-total"
    >
      spent {{ date }}:
      <span
        v-if="!Object.keys(currencyTotals).length"
        role="spend-total-sum-zero"
        >0</span
      >
      <template v-else>
        <span
          v-for="(total, currency, index) in currencyTotals"
          :key="currency"
          role="spend-total-sum"
        >
          {{ total }}{{ currency
          }}<span v-if="index !== Object.keys(currencyTotals).length - 1">, </span>
        </span>
      </template>
    </div>
    <div
      v-if="!props.spendSorted.length"
      class="spendCard__noOperations"
      role="no-operations"
    >
      No operations
    </div>
    <div
      v-else
      role="cards-container"
    >
      <SpendCardContainer :spend-sorted="props.spendSorted" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { SpendCardInfo } from "@/stores/accounts"
import { computed } from "vue"
import SpendCardContainer from "@/components/spendCard/SpendCardContainer.vue"
import { Calc } from "calc-js"

const props = defineProps({
  spendSorted: {
    type: Array as () => SpendCardInfo[],
    required: true
  },
  date: {
    type: String as () => string,
    required: true
  }
})

const currencyTotals = computed(() => {
  const totals: Record<string, number> = {}

  for (const spendItem of props.spendSorted) {
    if (spendItem.currency) {
      if (totals[spendItem.currency]) {
        totals[spendItem.currency] = new Calc(totals[spendItem.currency])
          .sum(spendItem.sum)
          .finish()
      } else {
        totals[spendItem.currency] = spendItem.sum
      }
    }
  }

  return totals
})
</script>
<style scoped lang="css">
.spendCard__wrapper {
  padding: 8px;
}

.spendCard__totalSpend,
.spendCard__noOperations {
  text-align: center;
}
</style>
