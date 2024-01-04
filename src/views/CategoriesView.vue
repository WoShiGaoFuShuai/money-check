<template>
  <TopNavbar
    :title="'Categories'"
    :right-icons="[{ icon: 'fa solid fa-pencil' }, { icon: 'fa solid fa-plus' }]"
  />

  <CategoryItems :categories="categoriesStore.categoriesExpenses" />
</template>
<script lang="ts" setup>
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import CategoryItems from "@/components/category/CategoryItems.vue"
import { useCategoriesStore } from "@/stores/categories"

const categoriesStore = useCategoriesStore()
</script>
<style lang="css" scoped></style>
