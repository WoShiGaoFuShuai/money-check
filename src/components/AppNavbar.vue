<template>
  <div class="navbar-wrapper">
    <router-link :to="{ name: 'accounts' }">
      <div class="navbar-item">ACCOUNTS</div>
    </router-link>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="css">
.navbar-wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
