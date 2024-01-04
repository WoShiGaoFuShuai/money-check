<template>
  <div class="confirmation__del">
    <p class="confirmation__del-text">Delete the transaction?</p>
    <div class="confirmation__del-buttons__wrapper">
      <button
        class="confirmation__del-buttons__item"
        role="confirmBtn"
        @click="confirm"
      >
        OK
      </button>
      <button
        class="confirmation__del-buttons__item"
        role="cancelBtn"
        @click="cancel"
      >
        Cancel
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
const emit = defineEmits(["confirm", "cancel"])

const confirm = () => {
  emit("confirm")
}
const cancel = () => {
  emit("cancel")
}
</script>
<style lang="css" scoped>
.confirmation__del {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--white);
  border-radius: 24px;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.5);
}

.confirmation__del-text {
  padding: 16px 24px;
}

.confirmation__del-buttons__wrapper {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid var(--grey-primary);
}

.confirmation__del-buttons__item {
  display: flex;
  flex: 1;
  background: transparent;
  border: 0;
  outline: none;
  padding: 8px 0;
  justify-content: center;
  border-right: 1px solid var(--grey-primary);
  color: var(--blue-primary);
}

.confirmation__del-buttons__item:last-child {
  border-right: none;
}
</style>
