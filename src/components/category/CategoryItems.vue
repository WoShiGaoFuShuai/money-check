<template>
  <div class="category__wrapper">
    <div
      v-for="(category, i) in props.categories"
      :key="i"
      class="category__item"
      data-testId="category__item"
      @click="handler(category)"
    >
      <div class="category__item-icon">
        <font-awesome-icon
          class="category__item-icon__item"
          :icon="category.iconName"
          :style="{ color: mode === CategoryMode.DEFAULT ? category.color : '' }"
        />
      </div>
      <div
        v-if="props.mode === CategoryMode.DEFAULT"
        class="category__item-title"
      >
        {{ category.categoryName }}
      </div>
      <div
        v-if="editMode"
        class="category__item-chevron"
      >
        <font-awesome-icon icon="fa-solid fa-chevron-right" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { CategoryObject } from "@/stores/categories"
import { CategoryMode } from "@/components/category/category.types"
import type { PropType } from "vue"

const emit = defineEmits(["chooseCategoryName", "pushToEditWindow"])

const props = defineProps({
  categories: {
    type: Array as () => CategoryObject[],
    required: true
  },
  mode: {
    type: String as PropType<CategoryMode>,
    required: false,
    default: CategoryMode.DEFAULT
  },
  editMode: {
    type: Boolean,
    required: false,
    default: false
  }
})

const handler = (category: CategoryObject) => {
  if (props.editMode) {
    console.log("HANDLER")
    emit("pushToEditWindow", category)
    return
  }
  emit("chooseCategoryName", category)
}
</script>

<style lang="css" scoped>
.category__wrapper {
  /* display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline; */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding-top: 56px;
}

.category__item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* max-width: 50px; */
  align-items: flex-start;
  margin: 10px;
  background: #8ecae6;
  padding: 8px;
  border-radius: 16px;
}

.category__item-chevron {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
}

.category__item-title {
  text-align: center;
}
</style>
