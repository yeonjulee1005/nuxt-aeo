import { defineNuxtPlugin, useRoute, useRuntimeConfig } from '#app'
import { useSchema } from './composables/useSchema'
import type { GlobalSchema, ModuleOptions } from './types'

/**
 * Normalize path for comparison
 * Removes trailing slashes and ensures consistent format
 */
function normalizePath(path: string): string {
  // Remove trailing slash except for root path
  if (path === '/') {
    return '/'
  }
  return path.replace(/\/$/, '')
}

/**
 * Check if schema URL matches current route
 * @param schemaUrl - URL from schema configuration (can be relative or absolute)
 * @param currentPath - Current route path
 * @returns true if schema should be applied to current route
 */
function matchesRoute(schemaUrl: string | undefined, currentPath: string): boolean {
  // If schema has no URL, apply to all routes (backward compatibility)
  if (!schemaUrl) {
    return true
  }

  // Normalize paths for comparison
  const normalizedCurrentPath = normalizePath(currentPath)

  // Handle absolute URLs
  if (schemaUrl.startsWith('http://') || schemaUrl.startsWith('https://')) {
    try {
      const url = new URL(schemaUrl)
      const schemaPath = normalizePath(url.pathname)
      return schemaPath === normalizedCurrentPath
    }
    catch {
      // If URL parsing fails, fall back to string comparison
      return false
    }
  }

  // Handle relative URLs
  const normalizedSchemaPath = normalizePath(schemaUrl)
  return normalizedSchemaPath === normalizedCurrentPath
}

/**
 * AEO (AI Engine Optimization) module plugin
 * Plugin that automatically injects global schema information
 * Includes automatic semantic HTML generation
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const route = useRoute()
  const aeoConfig = config.public.aeo as ModuleOptions & {
    schemas?: GlobalSchema[]
  }

  // Don't inject if autoInject is false
  if (aeoConfig?.autoInject === false) {
    return
  }

  // Clean up semantic HTML from previous routes on client side
  if (import.meta.client && typeof document !== 'undefined') {
    const cleanupSemanticHTML = () => {
      // Remove all existing semantic HTML elements
      const existingSemanticElements = document.querySelectorAll('[class*="nuxt-aeo-semantic-"]')
      existingSemanticElements.forEach((el) => {
        el.remove()
      })
    }

    // Execute cleanup when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', cleanupSemanticHTML)
    }
    else {
      cleanupSemanticHTML()
    }
  }

  // Global renderHtml, visuallyHidden options (default: true)
  const globalRenderHtml = aeoConfig?.renderHtml !== false
  const globalVisuallyHidden = aeoConfig?.visuallyHidden !== false

  // Get current route path
  const currentPath = route.path

  // Inject if schemas array exists
  if (aeoConfig?.schemas && Array.isArray(aeoConfig.schemas) && aeoConfig.schemas.length > 0) {
    for (const schema of aeoConfig.schemas) {
      // Check if schema should be applied to current route
      const schemaUrl = schema.url as string | undefined
      if (!matchesRoute(schemaUrl, currentPath)) {
        continue
      }

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
