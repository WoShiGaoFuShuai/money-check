<template>
  <TopNavbar
    :title="'Settings'"
    :right-icons="[{ icon: 'fa solid fa-pencil', handler: editCurrecny }]"
  />

  <div class="settings__currency-wrapper">
    <div
      class="settings__currency-head__wrapper"
      :style="blurCss"
    >
      <div class="settings__currency-head">
        <h3 class="settings__currency-head__text">Currency</h3>
        <button
          class="button__primary button__plus"
          @click="changeShowAddCurrencyModal"
        >
          <font-awesome-icon icon="fa-solid fa-plus" />
        </button>
      </div>
      <ul class="settings__currency-items">
        <li
          v-for="(currencyItem, index) in accountsStore.currencies"
          :key="currencyItem.currency"
          class="settings__currency-items__item"
        >
          <div class="item__inner">
            <span>
              {{ currencyItem.currency }}
            </span>

            <div v-if="editMode">
              <button
                class="button__edit"
                @click="showEditCard(currencyItem.currency, currencyItem.symbol, index)"
              >
                <font-awesome-icon icon="fa-solid fa-pencil" />
              </button>
              <button
                class="button__edit"
                @click="deleteCurrency(index)"
              >
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
            </div>
          </div>

          <span class="item__inner-currency">
            {{ currencyItem.symbol }}
          </span>
        </li>
      </ul>
    </div>

    <CurrencyAddNewModal
      v-if="showAddCurrencyModal"
      @close="changeShowAddCurrencyModal"
    >
    </CurrencyAddNewModal>

    <CurrencyEditModal
      v-if="editCard"
      :initial-currency-name="editCurrencyName"
      :initial-currency-symbol="editCurrencySymbol"
      :initial-currency-index="editCurrencyIndex"
      @close="changeShowCurrencyEditModal"
    >
    </CurrencyEditModal>
  </div>
</template>
<script lang="ts" setup>
import TopNavbar from "@/components/navigation/TopNavbar.vue"
import { useAccountsStore } from "@/stores/accounts"
import { ref, computed } from "vue"
import CurrencyAddNewModal from "@/components/currency/CurrencyAddNewModal.vue"
import CurrencyEditModal from "@/components/currency/CurrencyEditModal.vue"

const accountsStore = useAccountsStore()
const showAddCurrencyModal = ref(false)
const editCurrencyIndex = ref(0)

const changeShowAddCurrencyModal = () => {
  showAddCurrencyModal.value = !showAddCurrencyModal.value
}

const blurCss = computed(() => {
  return { filter: showAddCurrencyModal.value || editCard.value ? "blur(5px)" : "blur(0px)" }
})

//edit currency
const editMode = ref(false)
const editCard = ref(false)
const editCurrencyName = ref("")
const editCurrencySymbol = ref("")

const editCurrecny = () => {
  editMode.value = !editMode.value
}

const showEditCard = (currency: string, symbol: string, index: number) => {
  editCard.value = !editCard.value

  editCurrencyName.value = currency
  editCurrencySymbol.value = symbol
  editCurrencyIndex.value = index
}

// delete currency
const deleteCurrency = (index: number) => {
  accountsStore.deleteCurrency(index)
}

// change visability of edit modal
const changeShowCurrencyEditModal = () => {
  editCard.value = !editCard.value
}
</script>

<style lang="css">
.newCurrency__modal-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 24px 16px;
}

.newCurrency__modal-form__wrapper {
  background: white;
  box-shadow: 0px 0px 58px rgba(58, 134, 255, 0.7);
  border-radius: 12px;
}

.settings__currency-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.newAccount__wrapper {
  position: absolute;
  top: 0;
  width: 100%;
  background-color: white;
  height: 100vh;
}

.settings__currency-wrapper {
  background-color: var(--blue-secondary);
  padding: 64px 8px;
}

.newAccount__main {
  background-color: var(--blue-secondary);
  padding: 64px 8px 8px 8px;
}
.newAccount__form {
  display: flex;
  flex-direction: column;
}

.newAccount__newCurrency-form {
  padding: 24px 4px 16px 4px;
  border-radius: 4px;
  color: rgb(58, 134, 255);
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
  border-radius: 4px;
  border: 1px solid var(--blue-primary);
}

.form__label-title--balance {
  display: flex;
}
.form__label-title--plusMinus {
  padding: 0 8px;
}

.newAccount__currency {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.button__wrapper {
  display: flex;
  justify-content: center;
  padding-bottom: 16px;
}

.button__primary {
  outline: none;
  border: none;
  padding: 4px;
  border-radius: 4px;
  background-color: var(--blue-primary);
  color: white;
  cursor: pointer;
}

.buttom__primary--margin {
  margin-right: 8px;
}

.button__primary:hover {
  background-color: var(--blue-secondary);
}

.settings__currency-items__item {
  display: flex;
  justify-content: space-between;
  padding: 8px 4px;
}

.settings__currency-items__item:nth-child(even) {
  background-color: var(--blue-secondary-light);
}

.item__inner {
  display: flex;
  flex: 1 1 auto;
  justify-content: space-between;
  padding-right: 16px;
}

.item__inner-currency {
  min-width: 40px;
  text-align: center;
}

.button__edit {
  outline: none;
  border: none;
  padding: 4px;
  border-radius: 4px;
  background-color: transparent;
  color: var(--black-primary);
  cursor: pointer;
  margin-right: 16px;
}

.settings__currency-head__text {
  font-weight: 700;
}

.button__plus {
  padding: 4px 8px;
}
</style>
