import { useAccountsStore } from "@/stores/accounts"
import type { CategoryObject } from "@/stores/categories"
import type { SpendCardInfo } from "@/stores/accounts"

export function createSpendCardInfo(categoryInfo: CategoryObject, num: number): SpendCardInfo {
  const accountsStore = useAccountsStore()

  return {
    sum: num,
    ...categoryInfo,
    timestamp: Date.now(),
    account: accountsStore.getterActiveAccount?.title || null,
    currency: accountsStore.getterActiveAccount?.currency || null
  }
}
