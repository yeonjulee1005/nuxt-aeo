import { defineNuxtModule, addPlugin, addImportsDir, createResolver } from '@nuxt/kit'
import type { ModuleOptions } from './runtime/types'

// Re-export ModuleOptions for external use
export type { ModuleOptions } from './runtime/types'

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
    ;(nuxt.options.runtimeConfig.public as Record<string, unknown>).aeo = {
      schemas: options.schemas,
      autoInject: options.autoInject ?? true,
    }

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    // Auto-import composables from runtime/composables directory
    addImportsDir(resolver.resolve('./runtime/composables'))
  },
})
