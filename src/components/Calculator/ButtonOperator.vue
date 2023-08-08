<template>
  <button
    class="operator"
    @click="sendCurrentOperatorToParent"
  >
    {{ props.operator }}
  </button>
</template>
<script lang="ts" setup>
interface Props {
  operator: string
}

const props = defineProps<Props>()
const emit = defineEmits(["sendCurrentOperatorToParent"])

const sendCurrentOperatorToParent = () => {
  emit("sendCurrentOperatorToParent", props.operator)
}
</script>
<style lang="css" scoped>
button.operator {
  background-color: var(--calc-bg-operator);
}
</style>
