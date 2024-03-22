<template>
  <div class="transaction__wrapper">
    <ul class="transaction__ul">
      <li
        class="transaction__li"
        data-testId="account__li"
        @click="toggleEditAccountsList(true)"
      >
        <div class="transaction__li-left">Account:</div>

        <div class="transaction__li-right">
          <span class="transaction__li-right__acc">
            {{ props.editItem?.account }}
          </span>
          <font-awesome-icon
            class="transaction__li-right__img"
            icon="fa-solid fa-chevron-right"
          ></font-awesome-icon>
        </div>
      </li>

      <li
        class="transaction__li"
        data-testId="category__li"
        @click="toggleEditCategoriesList(true)"
      >
        <div class="transaction__li-left">Category:</div>

        <div class="transaction__li-right">
          <span class="transaction__li-right__acc">
            {{ editItem?.categoryName }}
          </span>
          <font-awesome-icon
            class="transaction__li-right__img"
            icon="fa-solid fa-chevron-right"
          ></font-awesome-icon>
        </div>
      </li>

      <li
        class="transaction__li"
        data-testId="amount__li"
        @click="toggleEditAmountForm(true)"
      >
        <div class="transaction__li-left">Amount:</div>

        <div class="transaction__li-right">
          <span class="transaction__li-right__acc">
            {{ amount }} {{ props.editItem?.currency }}
          </span>
          <font-awesome-icon
            class="transaction__li-right__img"
            icon="fa-solid fa-chevron-right"
          ></font-awesome-icon>
        </div>
      </li>

      <li
        class="transaction__li"
        data-testId="date__li"
        @click="toggleEditDateCalendar(true)"
      >
        <div class="transaction__li-left">Date:</div>

        <div class="transaction__li-right">
          <span
            v-if="props.editItem"
            data-testId="dayLabel__success"
            class="transaction__li-right__acc"
          >
            {{ getDayLabel(props.editItem.timestamp) }}
          </span>
          <span
            v-else
            data-testId="dayLabel__failure"
            class="transaction__li-right__acc"
            >Error Date</span
          >
          <font-awesome-icon
            class="transaction__li-right__img"
            icon="fa-solid fa-chevron-right"
          ></font-awesome-icon>
        </div>
      </li>
      <li class="transaction__li buttons__wrapper">
        <font-awesome-icon
          class="transaction__li-right__img btn__primary"
          icon="fa-solid fa-trash"
          role="delete__btn"
          @click="isShowConfirmation = true"
        ></font-awesome-icon>

        <font-awesome-icon
          class="transaction__li-right__img btn__primary"
          icon="fa-solid fa-check"
          role="accept__edit__transaction__btn"
          @click="acceptEditTransaction"
        ></font-awesome-icon>
      </li>
    </ul>
  </div>

  <div
    v-if="isShowEditAccountList"
    data-testId="editAccountListWindow"
    class="edit__acc-window"
  >
    <EditAccountsList
      :edit-item="editItem"
      :accounts="accountsStore.accounts"
      @change-choosen-account="changeChoosenAccount"
      @toggle-edit-accounts-list="toggleEditAccountsList"
    />
  </div>

  <div
    v-if="isShowEditCategoriesList"
    data-testId="editCategoriesListWindow"
    class="edit__acc-window"
  >
    <EditCategoriesList
      @toggle-edit-categories-list="toggleEditCategoriesList"
      @choose-category="changeCategory"
    />
  </div>

  <div
    v-if="isShowEditAmountForm"
    data-testId="editAmountFormWindow"
    class="edit__acc-window"
  >
    <EditAmountForm
      :edit-item="editItem"
      @edit-amount-confirm="changeAmount"
      @toggle-edit-amount-form="toggleEditAmountForm"
    />
  </div>

  <div
    v-if="isShowEditDate"
    data-testId="editDateCalendarWindow"
    class="edit__acc-window"
  >
    <EditDateCalendar
      :edit-item="editItem"
      @edit-date-confirm="changeDate"
      @close-edit-date-calendar="toggleEditDateCalendar"
    />
  </div>

  <ConfirmationDelete
    v-if="isShowConfirmation"
    :text="'Delete the transaction?'"
    @cancel="isShowConfirmation = false"
    @confirm="confirmedDelTransaction"
  />
</template>
<script lang="ts" setup>
import EditAccountsList from "@/components/edit/EditAccountsList.vue"
import EditCategoriesList from "@/components/edit/EditCategoriesList.vue"
import EditAmountForm from "@/components/edit/EditAmountForm.vue"
import EditDateCalendar from "@/components/edit/EditDateCalendar.vue"
import ConfirmationDelete from "@/components/shared/ConfirmationDelete.vue"
import type { PropType } from "vue"
import { getDayLabel } from "@/helpers/getDayLabel"
import { useAccountsStore } from "@/stores/accounts"
import { useSpendStore } from "@/stores/spend"
import { useEarnStore } from "@/stores/earn"
import type { SpendCardInfo } from "@/stores/accounts"
import { ref, watch } from "vue"
import { useRouter, useRoute } from "vue-router"
import type { CategoryObject } from "@/stores/categories"

const emit = defineEmits(["changeAmount", "changeCategory", "changeAccount", "changeDate"])

const props = defineProps({
  editItem: {
    type: Object as PropType<SpendCardInfo | null>,
    required: true,
    validator: (value: unknown): value is SpendCardInfo | null => {
      return value === null || value instanceof Object
    }
  },
  editItemIndex: {
    type: Number as () => number,
    required: true
  }
})

//STORES
const accountsStore = useAccountsStore()
const spendStore = useSpendStore()
const earnStore = useEarnStore()

//ROUTER
const router = useRouter()
const route = useRoute()

//EDIT ACCOUNT LIST
const isShowEditAccountList = ref(false)

const toggleEditAccountsList = (shouldShow: boolean) => {
  isShowEditAccountList.value = shouldShow
}

const changeChoosenAccount = (newAccount: string, newCurrency: string) => {
  emit("changeAccount", newAccount, newCurrency)
}

watch(
  () => props.editItem?.account,
  (newVal, oldVal) => {
    if (newVal !== oldVal && typeof newVal === "string") {
      if (props.editItem?.currency) {
        changeChoosenAccount(newVal, props.editItem?.currency)
      }
    }
  }
)

//EDIT CATEGORIES LIST
const isShowEditCategoriesList = ref(false)

const toggleEditCategoriesList = (shouldShow: boolean) => {
  isShowEditCategoriesList.value = shouldShow
}

const changeCategory = (category: CategoryObject) => {
  emit("changeCategory", category)
  isShowEditCategoriesList.value = false
}

//EDIT AMOUNT
const isShowEditAmountForm = ref(false)
const amount = ref(props.editItem?.sum || 0)

const toggleEditAmountForm = (value: boolean) => {
  isShowEditAmountForm.value = value
}

const changeAmount = (newAmount: number) => {
  amount.value = newAmount
  toggleEditAmountForm(false)
  emit("changeAmount", newAmount)
}

watch(
  () => props.editItem?.sum,
  (newVal, oldVal) => {
    if (newVal !== oldVal && newVal !== undefined) {
      amount.value = newVal
    }
  }
)

//EDIT DATE
const isShowEditDate = ref(false)

const toggleEditDateCalendar = (value: boolean) => {
  isShowEditDate.value = value
}

const changeDate = (newDate: number) => {
  emit("changeDate", newDate)
}

//DELETE TRANSACTION
const isShowConfirmation = ref(false)

const confirmedDelTransaction = () => {
  if (route.meta.source === "expenses") {
    spendStore.deleteSpend(props.editItemIndex)
    isShowConfirmation.value = false
    router.push({ name: "expenses" })
  } else if (route.meta.source === "income") {
    earnStore.deleteEarn(props.editItemIndex)
    isShowConfirmation.value = false
    router.push({ name: "income" })
  }
}

//ACCEPT EDIT TRANSACTION
const acceptEditTransaction = () => {
  if (props.editItem) {
    const editItem = { ...props.editItem }

    if (route.meta.source === "expenses") {
      spendStore.editSpend(editItem, props.editItemIndex)
      router.push({ name: "expenses" })
    } else if (route.meta.source === "income") {
      earnStore.editEarn(editItem, props.editItemIndex)
      router.push({ name: "income" })
    }
  }
}
</script>

<style lang="css" scoped>
.transaction__wrapper {
  padding: 50px 16px 0 16px;
}

.transaction__li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.transaction__li:last-child {
  justify-content: center;
}

.transaction__li-right {
  display: flex;
  align-items: center;
}

.transaction__li-right__img {
  font-size: 8px;
}

.transaction__li-right__acc {
  margin-right: 8px;
}

.buttons__wrapper {
  margin-top: 32px;
}

.btn__primary {
  background-color: var(--blue-primary);
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
}

.btn__primary:first-child {
  margin-right: 16px;
}

.edit__acc-window {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--white);
}
</style>
