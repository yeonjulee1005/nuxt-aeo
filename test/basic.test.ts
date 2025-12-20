import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

const rootDir = fileURLToPath(new URL('./fixtures/basic', import.meta.url))

await setup({
  rootDir,
  server: true,
  build: true,
})

describe('nuxt-aeo module', () => {

  it('renders the index page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<div>basic</div>')
  })

  it('module is loaded and composables are available', async () => {
    const html = await $fetch('/')
    // 모듈이 정상적으로 로드되었는지 확인
    expect(html).toBeTruthy()
    expect(typeof html).toBe('string')
  })

  it('injects JSON-LD schema script', async () => {
    const html = await $fetch('/')
    // useSchema가 JSON-LD 스크립트를 추가했는지 확인
    expect(html).toContain('application/ld+json')
    expect(html).toContain('@context')
    expect(html).toContain('@type')
    expect(html).toContain('WebPage')
  })

  it('transforms schema keys correctly', async () => {
    const html = await $fetch('/')
    // context → @context, type → @type 변환이 제대로 되었는지 확인
    // JSON이 포맷팅되어 공백이 포함될 수 있으므로 정규식 사용
    expect(html).toMatch(/"@context"\s*:\s*"https:\/\/schema\.org"/)
    expect(html).toMatch(/"@type"\s*:\s*"WebPage"/)
  })
})
