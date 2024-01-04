<template>
  <div
    class="error__wrapper"
    :style="{ 'margin-bottom': mb + 'px' }"
    data-testId="error__text"
  >
    {{ props.error }}
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  error: {
    type: String as () => string,
    required: true
  },
  mb: {
    type: Number as () => number,
    required: false,
    default: 0
  }
})
</script>
<style lang="css" scoped>
.error__wrapper {
  text-align: center;
  color: red;
}
</style>
