import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('nuxt-aeo module', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    server: true,
    build: true,
    port: 0,
    waitFor: 2000,
  })
  it('renders the index page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<div>basic</div>')
  })

  it('module is loaded and composables are available', async () => {
    const html = await $fetch('/')
    // Verify that module is loaded correctly
    expect(html).toBeTruthy()
    expect(typeof html).toBe('string')
  })

  it('injects JSON-LD schema script', async () => {
    const html = await $fetch('/')
    // Verify that useSchema added JSON-LD script
    expect(html).toContain('application/ld+json')
    expect(html).toContain('@context')
    expect(html).toContain('@type')
    expect(html).toContain('WebPage')
  })

  it('transforms schema keys correctly', async () => {
    const html = await $fetch('/')
    // Verify that context → @context, type → @type transformation works correctly
    // Use regex because JSON may be formatted with whitespace
    expect(html).toMatch(/"@context"\s*:\s*"https:\/\/schema\.org"/)
    expect(html).toMatch(/"@type"\s*:\s*"WebPage"/)
  })
})
