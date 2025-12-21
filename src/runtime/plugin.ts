import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { useSchema } from './composables/useSchema'
import type { GlobalSchema, ModuleOptions } from './types'

/**
 * AEO (AI Engine Optimization) module plugin
 * Plugin that automatically injects global schema information
 * Includes automatic semantic HTML generation
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const aeoConfig = config.public.aeo as ModuleOptions & {
    schemas?: GlobalSchema[]
  }

  // Don't inject if autoInject is false
  if (aeoConfig?.autoInject === false) {
    return
  }

  // Global renderHtml, visuallyHidden options (default: true)
  const globalRenderHtml = aeoConfig?.renderHtml !== false
  const globalVisuallyHidden = aeoConfig?.visuallyHidden !== false

  // Inject if schemas array exists
  if (aeoConfig?.schemas && Array.isArray(aeoConfig.schemas) && aeoConfig.schemas.length > 0) {
    for (const schema of aeoConfig.schemas) {
      // Use individual schema's renderHtml, visuallyHidden options or global options
      const renderHtml = schema.renderHtml !== undefined ? schema.renderHtml : globalRenderHtml
      const visuallyHidden = schema.visuallyHidden !== undefined ? schema.visuallyHidden : globalVisuallyHidden

      // Spread only remaining properties excluding renderHtml, visuallyHidden
      const { renderHtml: _renderHtml, visuallyHidden: _visuallyHidden, ...schemaData } = schema

      // Add default value if context is missing
      useSchema({
        context: 'https://schema.org',
        ...schemaData,
        renderHtml,
        visuallyHidden,
      })
    }
  }
  else {
    // Inject default Project Schema if schemas is missing
    useSchema({
      context: 'https://schema.org',
      type: 'Project',
      renderHtml: globalRenderHtml,
      visuallyHidden: globalVisuallyHidden,
    })
  }
})
