<template>
  <div class="nav-top">
    <nav>
      <ul class="nav-top__ul">
        <li
          v-for="(link, index) in props.links"
          :key="index"
        >
          <router-link
            data-testid="router-link"
            :to="{ name: link.linkName }"
          >
            <font-awesome-icon :icon="link.icon" />
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script lang="ts" setup>
import type { NavTopPropLinks } from "@/views/AccountsView.vue"
const props = defineProps({
  links: {
    type: Array as () => NavTopPropLinks[],
    required: true
  }
})
</script>
<style lang="css" scoped>
.nav-top {
  background-color: var(--grey-primary);
  padding: 48px 4px 4px 4px;
}

.nav-top__ul {
  display: flex;
  justify-content: space-around;
}
</style>
