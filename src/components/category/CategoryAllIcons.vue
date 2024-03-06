<template>
  <div class="allIcons__wrapper">
    <TopNavbar :title="'All Icons'">
      <template #left-icons>
        <div
          class="allIcons__topnavbar-left"
          @click="closeWindow"
        >
          <font-awesome-icon
            icon="fa-solid fa-chevron-right"
            class="allIcons__topnavbar-left__icon"
          />

          <p>Back</p>
        </div>
      </template>
    </TopNavbar>

    <div class="allIcons__content">
      <CategoryItems
        :categories="categoriesStore.getterUniqueIcons"
        :mode="CategoryMode.NONAME"
        @choose-category-name="chooseCategory"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import CategoryItems from "@/components/category/CategoryItems.vue"
import { useCategoriesStore, type CategoryObject } from "@/stores/categories"
import { CategoryMode } from "@/components/category/category.types"

const categoriesStore = useCategoriesStore()

const emit = defineEmits(["close", "chooseCategory"])

const closeWindow = () => {
  emit("close")
}

const chooseCategory = (category: CategoryObject) => {
  emit("chooseCategory", category)
  closeWindow()
}
</script>
<style lang="css">
.allIcons__wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--white);
}

.allIcons__topnavbar-left {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: absolute;
  left: 8px;
}

.allIcons__topnavbar-left__icon {
  rotate: 180deg;
  margin-right: 16px;
}
</style>
