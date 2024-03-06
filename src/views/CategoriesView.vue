<template>
  <TopNavbar
    :title="'Categories'"
    :bg-color="bgColor"
    :right-icons="[
      { icon: 'fa solid fa-pencil', handler: toggleEditMode, bg: bgIconColor },

      { icon: 'fa solid fa-plus', handler: toggleNewCategory }
    ]"
  />
  <CategoryItems
    :categories="activeCategories"
    :edit-mode="isEditMode"
    @push-to-edit-window="openEditWindow"
  />

  <EditCategory
    v-if="isShowEditCategory"
    :category="receivedCategory"
    @close-edit-category="toggleEditCategory(false)"
    @edit-old-category="editOldCategory"
    @delete-category="deleteCategory"
  />

  <NewCategory
    v-if="isShowNewCategory"
    :mode="mode"
    @toggle-new-category="toggleNewCategory"
  />
</template>
<script lang="ts" setup>
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import CategoryItems from "@/components/category/CategoryItems.vue"
import NewCategory from "@/components/category/NewCategory.vue"
import EditCategory from "@/components/category/EditCategory.vue"
import { useCategoriesStore } from "@/stores/categories"
import { useSpendStore } from "@/stores/spend"
import { useEarnStore } from "@/stores/earn"
import { ref, computed } from "vue"
import { useRoute } from "vue-router"
import { Mode } from "@/components/expensesView/enums"
import type { CategoryObject } from "@/stores/categories"
import type { NewCategory as NewCategoryType } from "@/components/category/category.types"

const categoriesStore = useCategoriesStore()
const spendStore = useSpendStore()
const earnStore = useEarnStore()
const route = useRoute()

const isShowNewCategory = ref<boolean>(false)

const toggleNewCategory = () => {
  isShowNewCategory.value = !isShowNewCategory.value
}

const activeCategories = computed(() => {
  return route.query.from === "income"
    ? categoriesStore.getterCategoriesIncomeWithoutAllCategories
    : categoriesStore.getterCategoriesExpensesWithoutAllCategories
})

const bgColor = route.query.from === "income" ? "var(--green-primary)" : "var(--blue-primary)"
const mode = route.query.from === "income" ? Mode.INCOME : Mode.EXPENSES

// EDIT
const isShowEditCategory = ref<boolean>(false)
const isEditMode = ref<boolean>(false)
const bgIconColor = ref<string>("")

const receivedCategory = ref<CategoryObject>({
  iconName: "",
  categoryName: "",
  color: ""
})

const resetReceivedCategory = () => {
  receivedCategory.value.iconName = ""
  receivedCategory.value.categoryName = ""
  receivedCategory.value.color = ""
}

const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value
  bgIconColor.value = bgIconColor.value === "" ? "red" : ""
}

const toggleEditCategory = (value: boolean) => {
  isShowEditCategory.value = value
}

const openEditWindow = (category: CategoryObject) => {
  receivedCategory.value = category
  toggleEditCategory(true)
}

const editOldCategory = (newCategory: NewCategoryType) => {
  // Depends on the mode we use changeCategory in spend or earn store
  const activeStore = mode === Mode.EXPENSES ? spendStore : earnStore

  categoriesStore.editCategory(newCategory, receivedCategory.value.categoryName, mode)

  activeStore.changeCategory(newCategory, receivedCategory.value.categoryName)
  resetReceivedCategory()
  toggleEditMode()
}

//DELETE CATEGORY
const deleteCategory = () => {
  categoriesStore.deleteCategory(receivedCategory.value, mode)
  resetReceivedCategory()
  toggleEditCategory(false)
  toggleEditMode()
}
</script>
<style lang="css" scoped></style>
