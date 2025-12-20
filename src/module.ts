import { defineNuxtModule, addPlugin, addImportsDir, createResolver } from '@nuxt/kit'
import type { PersonSchemaInput } from './runtime/types'

/**
 * 모듈 설정 옵션
 */
export interface ModuleOptions {
  /**
   * 전역 Person 정보
   * 모든 페이지에 자동으로 주입될 Person Schema 정보
   */
  person?: PersonSchemaInput

  /**
   * 자동 주입 여부
   * @default true
   */
  autoInject?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-aeo',
    configKey: 'aeo',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    autoInject: true,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // 모듈 옵션을 런타임 설정에 추가하여 플러그인에서 접근 가능하도록 함
    nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {}
    nuxt.options.runtimeConfig.public.aeo = {
      person: options.person,
      autoInject: options.autoInject ?? true,
    }

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    // Auto-import composables from runtime/composables directory
    addImportsDir(resolver.resolve('./runtime/composables'))
  },
})
