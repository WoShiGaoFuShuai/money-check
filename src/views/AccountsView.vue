<template>
  <TopNavbar
    :title="'Accounts'"
    :right-icons="['fa solid fa-pencil', 'fa solid fa-plus']"
  />

  <div class="nav-top">
    <nav>
      <ul class="nav-top__ul">
        <li>
          <font-awesome-icon icon="fa-solid fa-credit-card" />
        </li>

        <li>
          <font-awesome-icon icon="fa-solid fa-repeat" />
        </li>
      </ul>
    </nav>
  </div>

  <div class="accounts-list">
    <ul>
      <li class="accouts-list__li">
        <div class="accounts-list__account-name">
          <span class="account-name__name">Name #1</span>
        </div>

        <div class="accounts-list__account-amount">
          <span class="account-amount__amount">$ 100</span>
        </div>
      </li>

      <li class="accouts-list__li">
        <div class="accounts-list__account-name">
          <span class="account-name__name">Name #2</span>
        </div>

        <div class="accounts-list__account-amount">
          <span class="account-amount__amount">$ 200</span>
        </div>
      </li>

      <li class="accouts-list__li">
        <div class="accounts-list__account-name">
          <span class="account-name__name">Name #3</span>
        </div>

        <div class="accounts-list__account-amount">
          <span class="account-amount__amount">$ 300</span>
        </div>
      </li>

      <li class="accouts-list__li">
        <div class="accounts-list__account-name">
          <span class="account-name__name">Name #4</span>
        </div>

        <div class="accounts-list__account-amount">
          <span class="account-amount__amount">$ 400</span>
        </div>
      </li>

      <li class="accouts-list__li">
        <div class="accounts-list__account-name">
          <span class="account-name__name">Name #5</span>
        </div>

        <div class="accounts-list__account-amount">
          <span class="account-amount__amount">$ 500</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import TopNavbar from "@/components/navigation/TopNavbar.vue"
</script>
<style lang="css" scoped>
.nav-top {
  background-color: var(--grey-primary);
  padding: 4px;
}

.nav-top__ul {
  display: flex;
  justify-content: space-around;
}

.accounts-list {
  padding: 8px;
}

.accouts-list__li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.account-amount__amount {
  color: var(--green-primary);
}
</style>
