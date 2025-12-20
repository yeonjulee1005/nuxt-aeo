import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    testTimeout: 120000, // 120초 타임아웃 (2분)
    hookTimeout: 120000, // hook 타임아웃 (2분)
    teardownTimeout: 30000, // teardown 타임아웃 (30초)
    globalSetup: undefined,
  },
})
