<template>
  <div class="history-select__block">
    <select
      v-model="selectedItem"
      class="history-select"
      role="history-select"
      @change="handleEmitSelecteItem"
    >
      <option
        v-for="item in props.allCurrency"
        :key="item.currency"
        :value="item.currency"
      >
        {{ item.currency }}
        {{ item.symbol }}
      </option>
    </select>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from "vue"
import type { Ref } from "vue"
import type { Currency } from "@/stores/accounts"

const props = defineProps({
  allCurrency: {
    type: Array as () => Currency[],
    required: true
  }
})

const emit = defineEmits(["emitSelectedItem"])

const selectedItem: Ref<string> = ref("")

//emits
const handleEmitSelecteItem = () => {
  emit("emitSelectedItem", selectedSymbol.value)
}

onMounted(() => {
  selectedItem.value = props.allCurrency[0].currency
  emit("emitSelectedItem", selectedSymbol.value)
})

const selectedSymbol = computed(() => {
  const currentSelectedItem = props.allCurrency.find((item) => item.currency === selectedItem.value)
  const symbol = currentSelectedItem?.symbol

  return symbol
})
</script>

<style lang="css">
.history-select__block {
  background-color: var(--blue-primary);
  padding: 8px 16px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.history-select {
  border: none;
  background-color: transparent;
  color: white;
  font-size: 16px;
  cursor: pointer;
  outline: none;
}

.history-select option {
  background-color: var(--blue-primary);
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
  outline: none;
}
</style>
