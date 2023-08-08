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
  console.log("ButtonNumber", number)

  emit("sendToParentNumber", number)
}
</script>
