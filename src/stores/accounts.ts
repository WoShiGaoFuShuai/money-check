import { defineStore } from "pinia"

export const useAccountsStore = defineStore("accounts", {
  state: () => ({
    accounts: [
      { title: "acc1", sum: 0 },
      { title: "acc2", sum: 10 },
      { title: "acc3", sum: 100 },
      { title: "acc4", sum: 1000 }
    ]
  })
  // actions: {
  //   loginUser() {
  //     this.isLoggedIn = true
  //   }
  // }
})
