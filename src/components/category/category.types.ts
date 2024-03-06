import { type ComponentPublicInstance } from "vue"

export enum CategoryMode {
  DEFAULT = "default",
  NONAME = "no-name"
}

export interface NewCategory {
  categoryName: string
  iconName: string
  color: string
}

export interface NewCategoryFormInstance extends ComponentPublicInstance {
  submitForm: () => void
}

export interface EditCategoryFormInstance extends ComponentPublicInstance {
  submitEditForm: () => void
}
