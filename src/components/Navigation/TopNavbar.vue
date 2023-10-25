<template>
  <div
    class="topbar"
    :style="{ backgroundColor: bgColor }"
  >
    <div class="topbar-icons__left">
      <router-link
        v-if="showArrowBack"
        :to="linkTo"
        role="routerLinkBack"
        data-testId="backArrow"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
      </router-link>
    </div>

    <div class="topbar-name">
      <h3 data-testId="title">{{ props.title }}</h3>
    </div>
    <div
      v-if="props.rightIcons.length"
      class="topbar-icons__right"
    >
      <div
        v-for="icon in props.rightIcons"
        :key="icon.icon"
        class="right-iton__item"
        data-testId="rightIcon"
      >
        <font-awesome-icon
          role="FAicon"
          :icon="icon.icon"
          @click="icon.handler"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { previousRoute } from "@/router/index"

const props = defineProps({
  rightIcons: {
    type: Array as () => { icon: string; handler?: () => void }[],
    required: false,
    default() {
      return []
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

const linkTo = computed(() => {
  return previousRoute.value?.length ? { name: previousRoute.value } : { name: "" }
})

const showArrowBack = computed(() => {
  return previousRoute.value?.length ? true : false
})
</script>
<style lang="css" scoped>
.topbar {
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 8px;
  margin-bottom: 12px;
  z-index: 100;
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
