import "@/assets/main.css"

import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "@/App.vue"
import router from "@/router"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import {
  faPlus,
  faCreditCard,
  faRepeat,
  faMoneyBill1,
  faPiggyBank,
  faWallet,
  faPencil,
  faBasketShopping,
  faShirt,
  faDumbbell,
  faHouse,
  faPerson,
  faCar,
  faMugSaucer,
  faRoad,
  faList,
  faDeleteLeft,
  faEquals,
  faXmark,
  faTrash,
  faCheck
} from "@fortawesome/free-solid-svg-icons"

library.add(
  faPencil,
  faPlus,
  faCreditCard,
  faRepeat,
  faMoneyBill1,
  faPiggyBank,
  faWallet,
  faShirt,
  faBasketShopping,
  faDumbbell,
  faHouse,
  faPerson,
  faCar,
  faMugSaucer,
  faRoad,
  faList,
  faDeleteLeft,
  faEquals,
  faXmark,
  faTrash,
  faCheck
)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component("font-awesome-icon", FontAwesomeIcon)

app.mount("#app")
