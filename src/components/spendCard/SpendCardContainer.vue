<template>
  <router-link
    v-for="(spendItem, i) in props.spendSorted"
    :key="i"
    class="spendCard__item router__link"
    :to="{ name: props.editingRouteName, params: { timestamp: spendItem.timestamp } }"
    role="spendItem"
  >
    <div class="spendCard__left">
      <div class="spendCard__item-category">
        <font-awesome-icon
          class="spendCard__item-category__icon"
          :icon="spendItem.iconName"
          :style="{ color: spendItem.color }"
        />
      </div>
      <div class="spendCard__item-info">
        <p class="spendCard__item-info__name">{{ spendItem.categoryName }}</p>
        <p class="spendCard__item-info__currency">{{ spendItem.account }}</p>
      </div>
    </div>

    <div class="spendCard__right">
      <div class="spendCard__item-money">
        <p class="spendCard__item-money__amount">{{ spendItem.sum }} {{ spendItem.currency }}</p>
        <p
          role="getDayLabel"
          class="spendCard__item-money__time"
        >
          {{ getDayLabel(spendItem.timestamp) }}
        </p>
      </div>
    </div>
  </router-link>
</template>
<script setup lang="ts">
import type { SpendCardInfo } from "@/stores/accounts"
import { getDayLabel } from "@/helpers/getDayLabel"

const props = defineProps({
  spendSorted: {
    type: Array as () => SpendCardInfo[],
    required: true
  },
  editingRouteName: {
    type: String,
    required: true
  }
})
</script>
<style lang="css" scoped>
.router__link {
  text-decoration: none;
  color: #000000;
}
.spendCard__item {
  display: flex;
  justify-content: space-between;
  padding-top: 4px;
  padding-bottom: 4px;
  border-bottom: 1px solid black;
}

.spendCard__item:last-child {
  border-bottom: none;
}

.spendCard__left {
  display: flex;
  align-items: center;
}

.spendCard__item-category {
  text-align: center;
  margin-right: 8px;
  width: 30px;
}

.spendCard__item-category__icon {
  font-size: 22px;
}
</style>
