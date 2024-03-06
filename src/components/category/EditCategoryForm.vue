<template>
  <div class="newCategory__form-wrapper">
    <div class="newCategory__form">
      <div class="form__item">
        <label
          class="form__label-title"
          for="name"
          >Name</label
        >
        <input
          id="name"
          v-model="categoryNameInput"
          type="text"
          class="form__input"
          placeholder="name for category"
          role="accountNameInput"
        />
      </div>

      <div
        class="form__item"
        @click="toggleIsShowCategoryAllIcons"
      >
        <label class="form__label-title">Icon</label>
        <div class="form__icon-wrapper">
          <font-awesome-icon
            :icon="icon"
            class="form__icon form__icon--big"
            :style="{ color }"
          />
          <font-awesome-icon
            icon="fa-solid fa-chevron-right"
            class="form__icon"
          />
        </div>
      </div>

      <div class="form__item">
        <label
          class="form__label-title"
          for="color"
          >Color</label
        >
        <div class="form__icon-wrapper">
          <input
            id="color"
            v-model="color"
            type="color"
            name="color"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="newCategory__deleteBtn">
    <font-awesome-icon
      icon="fa-solid fa-trash"
      class="icon icon__delete"
      @click="deleteCategory"
    />
  </div>

  <CategoryAllIcons
    v-if="isShowCategoryAllIcons"
    @close="toggleIsShowCategoryAllIcons"
    @choose-category="changeIcon"
  />
  <!-- 
    
    @choose-category="changeIcon" -->

  <AppError
    v-if="error !== ''"
    :error="error"
    :mt="16"
  />
</template>
<script setup lang="ts">
import { ref } from "vue"
import CategoryAllIcons from "@/components/category/CategoryAllIcons.vue"
import AppError from "@/components/shared/AppError.vue"
import type { CategoryObject } from "@/stores/categories"
import type { NewCategory } from "@/components/category/category.types"

const props = defineProps({
  category: {
    type: Object as () => CategoryObject,
    required: true
  }
})

const emit = defineEmits(["submitEditForm", "deleteCategory"])

const icon = ref<string>(props.category.iconName)

const isShowCategoryAllIcons = ref<boolean>(false)

const toggleIsShowCategoryAllIcons = () => {
  isShowCategoryAllIcons.value = !isShowCategoryAllIcons.value
}

const changeIcon = (category: CategoryObject) => {
  icon.value = category.iconName
}

const categoryNameInput = ref<string>(props.category.categoryName)
const color = ref<string>(props.category.color)

const submitEditForm = () => {
  error.value = ""

  if (categoryNameInput.value.trim() === "") {
    error.value = "Name can not be empty"
    return
  }

  const editCategory: NewCategory = {
    iconName: icon.value,
    categoryName: categoryNameInput.value,
    color: color.value
  }

  emit("submitEditForm", editCategory)
}

const deleteCategory = () => {
  emit("deleteCategory")
}

//ERROR
const error = ref<string>("")

// Expose the submitEditForm method
defineExpose({ submitEditForm })
</script>
<style lang="css">
.newCategory__deleteBtn {
  text-align: center;
  margin-top: 16px;
}

.icon__delete {
  background-color: var(--blue-primary);
  padding: 8px 12px;
  border-radius: 6px;
}
</style>
