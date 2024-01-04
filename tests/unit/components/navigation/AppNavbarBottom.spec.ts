import { shallowMount } from "@vue/test-utils"
import AppNavbarBottom from "../../../../src/components/navigation/AppNavbarBottom.vue"
import { createRouter, createMemoryHistory } from "vue-router"
import { defineComponent } from "vue"

const DummyComponent = defineComponent({
  template: "<div></div>"
})

describe("AppNavbarBottom.vue", () => {
  let wrapper
  let router

  beforeEach(() => {
    const routes = [
      { path: "/", name: "default", component: DummyComponent },
      { path: "/expenses", name: "expenses", component: DummyComponent },
      { path: "/income", name: "income", component: DummyComponent },
      { path: "/accounts", name: "accounts", component: DummyComponent }
    ]

    router = createRouter({
      history: createMemoryHistory(),
      routes
    })

    wrapper = shallowMount(AppNavbarBottom, {
      global: {
        plugins: [router],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
  })

  it("renders correctly", () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it("contains all navigation links", () => {
    const links = wrapper.findAll(".navbar-bottom__link")
    expect(links.length).toBe(3)
  })
})
