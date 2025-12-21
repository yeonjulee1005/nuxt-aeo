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

    // Add module options to runtime config so plugin can access them
    nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {}
    ;(nuxt.options.runtimeConfig.public as Record<string, unknown>).aeo = {
      schemas: options.schemas,
      autoInject: options.autoInject ?? true,
      renderHtml: options.renderHtml,
      visuallyHidden: options.visuallyHidden,
    }

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    // Auto-import composables from runtime/composables directory
    addImportsDir(resolver.resolve('./runtime/composables'))
  },
})
