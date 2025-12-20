import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    testTimeout: 60000, // 60초 타임아웃
    hookTimeout: 60000, // hook 타임아웃
    teardownTimeout: 10000, // teardown 타임아웃
  },
})
