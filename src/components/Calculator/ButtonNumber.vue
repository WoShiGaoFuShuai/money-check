<template>
  <button @click="sendToParentNumber(props.num)">{{ props.num }}</button>
</template>
<script setup lang="ts">
interface Props {
  num: number
}

const props = defineProps<Props>()

const emit = defineEmits(["sendToParentNumber"])

const sendToParentNumber = (number: number) => {
  emit("sendToParentNumber", number)
}
</script>
<style lang="css">
button {
  grid-column: span 1;
  padding: 8px;
  font-size: 18px;
  background-color: var(--calc-bg-button);
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #f0f0f0;
}
</style>
