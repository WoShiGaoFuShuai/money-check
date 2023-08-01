import "@/assets/main.css"

import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "@/App.vue"
import router from "@/router"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faPencil } from "@fortawesome/free-solid-svg-icons"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faCreditCard } from "@fortawesome/free-solid-svg-icons"
import { faRepeat } from "@fortawesome/free-solid-svg-icons"
import { faMoneyBill1 } from "@fortawesome/free-solid-svg-icons"
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons"
import { faWallet } from "@fortawesome/free-solid-svg-icons"
library.add(faPencil)
library.add(faPlus)
library.add(faCreditCard)
library.add(faRepeat)
library.add(faMoneyBill1)
library.add(faPiggyBank)
library.add(faWallet)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component("font-awesome-icon", FontAwesomeIcon)

app.mount("#app")
