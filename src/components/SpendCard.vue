<template>
  <div class="spendCard__wrapper">
    <!-- <div>spend today {{ spendStore.spendToday }}</div> -->
    <div
      v-if="!spendStore.sortedSpendByTimestamp.length"
      role="no-operations"
    >
      No operations
    </div>
    <div
      v-else
      role="cards-container"
    >
      <div
        v-for="(spendItem, i) in spendStore.sortedSpendByTimestamp"
        :key="i"
        class="spendCard__item"
        role="spendItem"
      >
        <div class="spendCard__left">
          <div class="spendCard__item-category">
            <font-awesome-icon
              class="spendCard__item-category__icon"
              :icon="spendItem.iconName"
            />
          </div>
          <div class="spendCard__item-info">
            <p class="spendCard__item-info__name">{{ spendItem.categoryName }}</p>
            <p class="spendCard__item-info__currency">{{ spendItem.account }}</p>
          </div>
        </div>

        <div class="spendCard__right">
          <div class="spendCard__item-money">
            <p class="spendCard__item-money__amount">
              {{ spendItem.sum }} {{ spendItem.currency }}
            </p>
            <p
              role="getDayLabel"
              class="spendCard__item-money__time"
            >
              {{ getDayLabel(spendItem.timestamp) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useSpendStore } from "@/stores/spend"

const spendStore = useSpendStore()

const getDayLabel = (timestamp: number) => {
  const today = new Date()
  const dateTimestamp = new Date(timestamp)

  if (today.toDateString() === dateTimestamp.toDateString()) {
    return "Today"
  } else {
    return "Yesterday"
  }
}
</script>
<style scoped lang="css">
.spendCard__wrapper {
  padding: 8px;
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
