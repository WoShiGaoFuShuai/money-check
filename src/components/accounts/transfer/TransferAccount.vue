<template>
  <div class="transfer-select__wrapper">
    <h4 role="title">{{ props.title }}</h4>
    <div
      class="transfer-select__block"
      data-testid="transfer-select-block"
      @click="showTransferWindow"
    >
      <div class="transfer-select__info">
        <span role="acc-title">{{ props.accounts[props.choosenAccountIndex].title }}</span>

        <div>
          <span role="acc-sum">{{ props.accounts[props.choosenAccountIndex].sum }}</span>

          <span role="acc-currency">{{ props.accounts[props.choosenAccountIndex].currency }}</span>
        </div>
      </div>
      <div>
        <font-awesome-icon icon="fa-solid fa-chevron-right" />
      </div>
    </div>
  </div>

  <TransferWindow
    v-if="isTransferWindow"
    :transfer-accounts="props.accounts"
    :choosen-account-index="props.choosenAccountIndex"
    @choose-account="changeChoosenAccountIndex"
  />
</template>
<script lang="ts" setup>
import TransferWindow from "@/components/accounts/transfer/TransferWindow.vue"
import { ref } from "vue"
import { type Account } from "@/stores/accounts"

const emit = defineEmits(["chooseDebitAccount", "chooseCreditAccount"])

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  accounts: {
    type: Array as () => Account[],
    required: true
  },
  choosenAccountIndex: {
    type: Number,
    required: true
  }
})

const isTransferWindow = ref(false)

const showTransferWindow = () => {
  isTransferWindow.value = !isTransferWindow.value
}

const changeChoosenAccountIndex = (index: number) => {
  if (props.title.includes("Debit")) {
    emit("chooseDebitAccount", index)
  } else if (props.title.includes("Credit")) {
    emit("chooseCreditAccount", index)
  }
  isTransferWindow.value = false
}
</script>
<style lang="css" scoped>
.transfer-select__wrapper {
  padding: 32px 8px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--blue-secondary);
}

.transfer-select__block {
  background-color: var(--blue-primary);
  padding: 8px 16px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.transfer-select__info {
  display: flex;
  flex: 1 1 auto;
  justify-content: space-between;
  padding-right: 16px;
}
</style>
