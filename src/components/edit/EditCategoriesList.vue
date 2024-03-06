<template>
  <TopNavbar :title="'Categories'">
    <template #left-icons>
      <font-awesome-icon
        icon="fa-solid fa-xmark"
        role="closeBtn"
        @click="closeEditCategoriesList"
      />
    </template>
  </TopNavbar>

  <CategoryItems
    :categories="categoriesStore.categoriesExpenses"
    @choose-category-name="handleChooseCategoryName"
  />
</template>
<script lang="ts" setup>
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import CategoryItems from "@/components/category/CategoryItems.vue"
import { useCategoriesStore, type CategoryObject } from "@/stores/categories"

const emit = defineEmits(["toggleEditCategoriesList", "chooseCategoryName"])
const categoriesStore = useCategoriesStore()

const closeEditCategoriesList = () => {
  emit("toggleEditCategoriesList", false)
}

const handleChooseCategoryName = (category: CategoryObject) => {
  emit("chooseCategoryName", category.categoryName)
}
</script>
<style lang="css" scoped></style>
