<template>
  <div class="navbar-bottom__wrapper">
    <ul class="navbar-bottom__ul">
      <li>
        <router-link
          class="navbar-bottom__link"
          :to="{ name: 'expenses' }"
        >
          <div class="navbar-item">
            <font-awesome-icon
              class="navbar-bottom__icon"
              icon="fa-solid fa-money-bill-1"
            />

            <span class="navbar-item__title">Expenses</span>
          </div>
        </router-link>
      </li>

      <li>
        <router-link
          class="navbar-bottom__link"
          :to="{ name: 'income' }"
        >
          <div class="navbar-item">
            <font-awesome-icon
              class="navbar-bottom__icon"
              icon="fa-solid fa-piggy-bank"
            />

            <span class="navbar-item__title">Income</span>
          </div>
        </router-link>
      </li>

      <li>
        <router-link
          class="navbar-bottom__link"
          :to="{ name: 'accounts' }"
        >
          <div class="navbar-item">
            <font-awesome-icon
              class="navbar-bottom__icon"
              icon="fa-solid fa-wallet"
            />

            <span class="navbar-item__title">Accounts</span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="css" scoped>
.navbar-bottom__wrapper {
  display: none;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 8px 12px;
  background-color: var(--grey-primary);
}

.navbar-bottom__ul {
  display: flex;
  justify-content: space-between;
}

.navbar-bottom__link {
  text-decoration: none;
}

.navbar-item {
  display: flex;
  flex-direction: column;
}

.navbar-bottom__icon {
  color: var(--blue-primary);
}

.navbar-item__title {
  font-size: 14px;
  color: var(--black-primary);
}
</style>
