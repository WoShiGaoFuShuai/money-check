<template>
  <div class="editCategory__wrapper">
    <TopNavbar
      :title="'Edit Category'"
      :right-icons="[{ icon: 'fa solid fa-check', handler: submitEditCategory }]"
    >
      <template #left-icons>
        <font-awesome-icon
          icon="fa-solid fa-xmark"
          @click="closeEditCategory"
        />
      </template>
    </TopNavbar>

    <EditCategoryForm
      ref="editCategoryFormRef"
      :category="props.category"
      @submit-edit-form="handleSubmitEditForm"
      @delete-category="toggleDeleteConfirmation"
    />

    <ConfirmationDelete
      v-if="isShowDeleteConfirmation"
      :text="'Delete the category?'"
      @confirm="deleteCategory"
      @cancel="toggleDeleteConfirmation"
    />
  </div>
</template>

<script setup lang="ts">
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import EditCategoryForm from "@/components/category/EditCategoryForm.vue"
import ConfirmationDelete from "@/components/shared/ConfirmationDelete.vue"
import type { CategoryObject } from "@/stores/categories"
import type { EditCategoryFormInstance, NewCategory } from "@/components/category/category.types"
import { ref } from "vue"

const emit = defineEmits(["closeEditCategory", "editOldCategory", "deleteCategory"])

const props = defineProps({
  category: {
    type: Object as () => CategoryObject,
    required: true
  }
})

const closeEditCategory = () => {
  emit("closeEditCategory")
}

const editCategoryFormRef = ref<EditCategoryFormInstance | null>(null)

const submitEditCategory = () => {
  if (editCategoryFormRef.value?.submitEditForm) {
    editCategoryFormRef.value.submitEditForm()
  }
}

const handleSubmitEditForm = (formData: NewCategory) => {
  emit("editOldCategory", formData)
  closeEditCategory()
}

//DELETE
const isShowDeleteConfirmation = ref<boolean>(false)

const toggleDeleteConfirmation = () => {
  isShowDeleteConfirmation.value = !isShowDeleteConfirmation.value
}

const deleteCategory = () => {
  emit("deleteCategory")
  isShowDeleteConfirmation.value = false
}
</script>
<style lang="css" scoped>
.editCategory__wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--white);
}
</style>
