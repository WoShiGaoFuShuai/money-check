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
            :icon="['fa-solid', icon]"
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

  <CategoryAllIcons
    v-if="isShowCategoryAllIcons"
    @close="toggleIsShowCategoryAllIcons"
    @choose-category="changeIcon"
  />

  <AppError
    v-if="error !== ''"
    :error="error"
    :mt="16"
  />
</template>
<script lang="ts" setup>
import CategoryAllIcons from "@/components/category/CategoryAllIcons.vue"
import AppError from "@/components/shared/AppError.vue"
import type { CategoryObject } from "@/stores/categories"
import type { NewCategory } from "@/components/category/category.types"
import { useCategoriesStore } from "@/stores/categories"
import { Mode } from "@/components/expensesView/enums"
import { ref } from "vue"

const emit = defineEmits(["formSubmit"])

const props = defineProps({
  mode: {
    type: String,
    required: true,
    validator: (value: string): boolean => Object.values(Mode).includes(value as Mode)
  }
})

const categoryNameInput = ref<string>("")
const isShowCategoryAllIcons = ref<boolean>(false)
const categoriesStore = useCategoriesStore()

const toggleIsShowCategoryAllIcons = () => {
  isShowCategoryAllIcons.value = !isShowCategoryAllIcons.value
}

const icon = ref<string>("fa-house")
const changeIcon = (category: CategoryObject) => {
  const parts = category.iconName.split(" ")
  const iconName = parts.pop()

  if (iconName === undefined) {
    icon.value = "fa-xmark"
  } else {
    icon.value = iconName
  }
}

const color = ref<string>("#000000")

const submitForm = () => {
  error.value = ""
  if (categoryNameInput.value.trim() === "") {
    error.value = "Name can not be empty"
    return
  }

  //HERE CHECK IF NAME IS UNIQUE in expenses or income
  const isUnique =
    props.mode === Mode.EXPENSES
      ? categoriesStore.categoriesExpenses.find(
          (category) =>
            category.categoryName.toLowerCase() === categoryNameInput.value.toLowerCase()
        )
      : categoriesStore.categoriesIncome.find(
          (category) =>
            category.categoryName.toLowerCase() === categoryNameInput.value.toLowerCase()
        )

  if (isUnique) {
    error.value = "Category name must be unique"
    return
  }

  const formData: NewCategory = {
    categoryName: categoryNameInput.value,
    iconName: icon.value,
    color: color.value
  }
  error.value = ""
  emit("formSubmit", formData)
}

// Expose the submitForm method
defineExpose({ submitForm })

//ERROR
const error = ref<string>("")
</script>
<style lang="css">
.newCategory__form-wrapper {
  background-color: var(--blue-secondary);
  padding: 64px 8px 8px 8px;
}

.newCategory__form {
  display: flex;
  flex-direction: column;
}

.form__item {
  display: flex;
  margin-bottom: 12px;
}

.form__label-title {
  display: inline-block;
  max-width: 100px;
  width: 100%;
  min-width: 80px;
}

.form__input {
  width: 100%;
  padding: 0 8px;
  border: 0;
  outline: none;
}

.form__icon-wrapper {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  align-items: center;
}

.form__icon.form__icon--big {
  font-size: 30px;
  padding-right: 16px;
}
</style>
