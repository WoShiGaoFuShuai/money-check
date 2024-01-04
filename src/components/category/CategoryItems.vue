<template>
  <div class="category__wrapper">
    <div
      v-for="(category, i) in props.categories"
      :key="i"
      class="category__item"
      data-testId="category__item"
      @click="handler(category.categoryName)"
    >
      <div class="category__item-icon">
        <font-awesome-icon
          class="category__item-icon__item"
          :icon="category.iconName"
        />
      </div>
      <div class="category__item-title">{{ category.categoryName }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { CategoryObject } from "@/stores/categories"

const emit = defineEmits(["chooseCategoryName"])

const props = defineProps({
  categories: {
    type: Array as () => CategoryObject[],
    required: true
  }
})

const handler = (categoryName: string) => {
  emit("chooseCategoryName", categoryName)
}
</script>

<style lang="css" scoped>
.category__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
  padding-top: 56px;
}

.category__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 50px;
  margin: 10px;
}

.category__item-title {
  text-align: center;
}
</style>
