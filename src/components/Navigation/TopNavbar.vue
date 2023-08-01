<template>
  <div
    class="topbar"
    :style="{ backgroundColor: bgColor }"
  >
    <div class="topbar-icons__left"></div>

    <div class="topbar-name">
      <h3>{{ props.title }}</h3>
    </div>
    <div
      v-if="props.rightIcons[0] !== ''"
      class="topbar-icons__right"
    >
      <div
        v-for="rightIcon in props.rightIcons"
        :key="rightIcon"
        class="right-iton__item"
      >
        <font-awesome-icon :icon="rightIcon" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  rightIcons: {
    type: Array as () => string[],
    required: false,
    default() {
      return [""]
    }
  },
  title: {
    type: String as () => string,
    required: true
  },
  bgColor: {
    type: String as () => string,
    requires: false,
    default: () =>
      getComputedStyle(document.documentElement).getPropertyValue("--blue-primary").trim()
  }
})
</script>
<style scoped lang="css">
.topbar {
  display: flex;
  justify-content: center;
  padding: 8px;
  margin-bottom: 12px;
}

.topbar-icons__right {
  display: flex;
}

.topbar-name {
  margin-left: auto;
  margin-right: auto;
  color: white;
}

.right-iton__item {
  margin-left: 8px;
}
</style>
