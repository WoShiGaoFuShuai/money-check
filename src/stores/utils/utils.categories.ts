import { type CategoryObject } from "@/stores/categories"

export function getUniqueIcons(
  store: CategoryObject[],
  allNames: string[],
  uniqueCategories: CategoryObject[]
) {
  store.forEach((item: CategoryObject) => {
    if (!allNames.includes(item.iconName)) {
      allNames.push(item.iconName)
      uniqueCategories.push(item)
    }
  })
}
