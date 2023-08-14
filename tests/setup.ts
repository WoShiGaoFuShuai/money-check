import { cleanup } from "@testing-library/vue"
import matchers from "@testing-library/jest-dom/matchers"
import { expect, afterEach } from "vitest"

import { setActivePinia } from "pinia"
import { createTestingPinia } from "@pinia/testing"

// Initialize Pinia
const pinia = createTestingPinia()
setActivePinia(pinia)

expect.extend(matchers)
afterEach(() => {
  cleanup()
})
