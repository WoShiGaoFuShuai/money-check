import { shallowMount, RouterLinkStub } from "@vue/test-utils"
import NavTop from "../../../../src/components/shared/NavTop.vue"

interface RenderNavTopProps {
  links?: { icon: string; linkName: string }[]
}

const renderNavTop = (props: RenderNavTopProps = {}) => {
  return shallowMount(NavTop, {
    propsData: {
      links: props.links || [
        { icon: "icon-1", linkName: "linkName-1" },
        { icon: "icon-2", linkName: "linkName-2" }
      ]
    },
    global: {
      stubs: {
        FontAwesomeIcon: true,
        RouterLink: RouterLinkStub
      }
    }
  })
}

describe("NavTop", () => {
  it("renders list items based on links prop", () => {
    const props: RenderNavTopProps = {
      links: [
        { icon: "icon-1", linkName: "linkName-1" },
        { icon: "icon-2", linkName: "linkName-2" }
      ]
    }
    const wrapper = renderNavTop(props)
    const routerLinks = wrapper.findAllComponents(RouterLinkStub)

    expect(routerLinks[0].props("to")).toEqual({ name: "linkName-1" })
    expect(routerLinks[1].props("to")).toEqual({ name: "linkName-2" })
  })
})
