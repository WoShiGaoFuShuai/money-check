<template>
  <div
    class="transfer__window-wrapper"
    data-testid="transfer__window-wrapper"
  >
    <ul>
      <li
        v-for="(account, i) in props.transferAccounts"
        :key="i"
        class="transfer__item"
        role="transfer__item"
        @click="chooseAccount(i)"
      >
        <div class="transfer__item-info">
          <div>
            {{ account.title }}
          </div>
          <div>
            <span>
              {{ account.sum }}
            </span>
            <span>
              {{ account.currency }}
            </span>
          </div>
        </div>

        <div
          v-if="choosenAccountIndex === i"
          class="transfer__item-choosen"
          role="transfer__item-choosen"
        >
          <font-awesome-icon icon="fa-solid fa-check" />
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import type { Account } from "@/stores/accounts"

const emit = defineEmits(["chooseAccount"])
const props = defineProps({
  transferAccounts: {
    type: Array as () => Account[],
    required: true
  },
  choosenAccountIndex: {
    type: Number,
    required: true
  }
})

const chooseAccount = (index: number) => {
  emit("chooseAccount", index)
}
</script>
<style lang="css" scoped>
.transfer__window-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  padding: 48px 8px 16px;
}

.transfer__item {
  border-bottom: 1px solid var(--grey-primary);
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
}

.transfer__item-info {
  display: flex;
  flex: 1 1 auto;
  justify-content: space-between;
}

.transfer__item-choosen {
  margin-left: 16px;
}
</style>
