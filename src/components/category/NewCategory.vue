<template>
  <div class="newCategory__wrapper">
    <TopNavbar
      :title="'New Category'"
      :right-icons="[{ icon: 'fa solid fa-check', handler: submitNewCategory }]"
    >
      <template #left-icons>
        <font-awesome-icon
          icon="fa-solid fa-xmark"
          @click="closeNewCategory"
        />
      </template>
    </TopNavbar>

    <NewCategoryForm
      ref="newCategoryFormRef"
      :mode="mode"
      @form-submit="handleFormSubmit"
    />
  </div>
</template>
<script lang="ts" setup>
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import NewCategoryForm from "@/components/category/NewCategoryForm.vue"
import { ref } from "vue"
import type { NewCategory, NewCategoryFormInstance } from "@/components/category/category.types"
import { useCategoriesStore } from "@/stores/categories"
import { Mode } from "@/components/expensesView/enums"

const emit = defineEmits(["toggleNewCategory"])

const props = defineProps({
  mode: {
    type: String,
    required: true,
    validator: (value: string): boolean => Object.values(Mode).includes(value as Mode)
  }
})

const categoriesStore = useCategoriesStore()

const closeNewCategory = () => {
  emit("toggleNewCategory")
}

const newCategoryFormRef = ref<NewCategoryFormInstance | null>(null)

const handleFormSubmit = (formData: NewCategory) => {
  const newCategory = {
    iconName: "fa-solid" + " " + formData.iconName,
    categoryName: formData.categoryName,
    color: formData.color
  }

  categoriesStore.addCategory(newCategory, props.mode)

  emit("toggleNewCategory")
}

const submitNewCategory = () => {
  if (newCategoryFormRef.value?.submitForm) {
    newCategoryFormRef.value.submitForm()
  }
}
</script>
<style lang="css" scoped>
.newCategory__wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--white);
}
</style>
