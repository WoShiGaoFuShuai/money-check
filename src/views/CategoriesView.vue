<template>
  <TopNavbar
    :title="'Categories'"
    :right-icons="['fa solid fa-pencil', 'fa solid fa-plus']"
  />

  <div class="category__wrapper">
    <div
      v-for="(category, i) in allCategories"
      :key="i"
      class="category__item"
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
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import { ref } from "vue"
import type { Ref } from "vue"

interface Category {
  iconName: string
  categoryName: string
}

const allCategories: Ref<Array<Category>> = ref([
  { iconName: "fa-solid fa-basket-shopping", categoryName: "Food" },
  { iconName: "fa-solid fa-shirt", categoryName: "Clothes" },
  { iconName: "fa-solid fa-dumbbell", categoryName: "Sport" },
  { iconName: "fa-solid fa-house", categoryName: "House" },
  { iconName: "fa-solid fa-person", categoryName: "Myself" },
  { iconName: "fa-solid fa-car", categoryName: "Car" },
  { iconName: "fa-solid fa-mug-saucer", categoryName: "Eating Outside" },
  { iconName: "fa-solid fa-road", categoryName: "Road" }
])
</script>
<style lang="css" scoped>
.category__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
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
