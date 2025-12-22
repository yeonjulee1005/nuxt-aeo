/**
 * Universal Schema composable
 * A universal function that adds any Schema type to useHead
 * Includes automatic semantic HTML generation
 */

import { useHead, useRequestURL, useRuntimeConfig } from '#app'

/**
 * Get base URL for URL normalization
 * Uses useRequestURL() origin if available, otherwise falls back to app.baseURL
 */
function getBaseUrl(): string {
  try {
    // Try to use useRequestURL() if available (SSR/client)
    const requestUrl = useRequestURL()
    if (requestUrl?.origin) {
      return requestUrl.origin
    }
  }
  catch {
    // useRequestURL() may not be available in all contexts
  }

  try {
    // Fall back to app.baseURL from runtime config
    const config = useRuntimeConfig()
    const appConfig = config.app as { baseURL?: string } | undefined
    const baseURL = appConfig?.baseURL
    if (baseURL) {
      // If baseURL is absolute, return it; otherwise construct from origin
      if (baseURL.startsWith('http://') || baseURL.startsWith('https://')) {
        return new URL(baseURL).origin
      }
      // If baseURL is relative, try to construct absolute URL
      // In browser, use window.location.origin
      if (import.meta.client && typeof window !== 'undefined') {
        return window.location.origin
      }
    }
  }
  catch {
    // Runtime config may not be available
  }

  // Final fallback: use window.location.origin in browser
  if (import.meta.client && typeof window !== 'undefined') {
    return window.location.origin
  }

  // Last resort: return empty string (will cause URL constructor to throw, but that's handled)
  return ''
}

/**
 * Normalize URL to absolute URL
 * If URL is already absolute (starts with http:// or https://), returns as-is
 * If URL is relative, combines with base URL
 */
function normalizeUrl(url: string, baseUrl: string): string {
  // Return absolute URLs as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  // Normalize relative URLs
  if (!baseUrl) {
    // If no base URL available, return relative URL as-is
    return url
  }

  try {
    // Combine base URL with relative URL
    return new URL(url, baseUrl).href
  }
  catch {
    // If URL construction fails, return original URL
    return url
  }
}

/**
 * Recursively normalize URLs in schema object
 * Processes 'url', 'image', 'logo', and 'item' properties, including nested objects and arrays
 */
function normalizeSchemaUrls(obj: unknown, baseUrl: string): unknown {
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(item => normalizeSchemaUrls(item, baseUrl))
  }

  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(obj)) {
    // Normalize 'url', 'image', 'logo', and 'item' properties
    if ((key === 'url' || key === 'image' || key === 'logo' || key === 'item') && typeof value === 'string') {
      result[key] = normalizeUrl(value, baseUrl)
    }
    // Recursively process nested objects
    else if (value && typeof value === 'object') {
      result[key] = normalizeSchemaUrls(value, baseUrl)
    }
    else {
      result[key] = value
    }
  }

  return result
}

/**
 * Helper function that recursively transforms object keys
 * context → @context, type → @type
 */
function transformSchemaKeys(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(obj)) {
    // Key transformation: context → @context, type → @type
    const transformedKey = key === 'context' ? '@context' : key === 'type' ? '@type' : key

    // Recursively transform if value is an object and not an array
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      result[transformedKey] = transformSchemaKeys(value as Record<string, unknown>)
    }
    // Transform each element if value is an array
    else if (Array.isArray(value)) {
      result[transformedKey] = value.map(item =>
        item && typeof item === 'object' && !Array.isArray(item)
          ? transformSchemaKeys(item as Record<string, unknown>)
          : item,
      )
    }
    else {
      result[transformedKey] = value
    }
  }

  return result
}

/**
 * Generate semantic HTML based on Schema type
 */
function generateSemanticHTML(schemaType: string, schemaData: Record<string, unknown>): string | null {
  const type = schemaType.toLowerCase()

  switch (type) {
    case 'organization':
      return generateOrganizationHTML(schemaData)
    case 'person':
      return generatePersonHTML(schemaData)
    case 'itemlist':
      return generateItemListHTML(schemaData)
    default:
      // Generate simple semantic HTML by default
      return generateGenericHTML(schemaType, schemaData)
  }
}

/**
 * Convert Organization Schema to semantic HTML
 */
function generateOrganizationHTML(data: Record<string, unknown>): string {
  const name = escapeHtml(String(data.name || ''))
  const description = data.description ? escapeHtml(String(data.description)) : ''
  const url = data.url ? escapeHtml(String(data.url)) : ''

  let html = `<div itemscope itemtype="https://schema.org/Organization">`
  if (name) html += `<span itemprop="name">${name}</span>`
  if (description) html += `<span itemprop="description">${description}</span>`
  if (url) html += `<a itemprop="url" href="${url}">${url}</a>`
  html += `</div>`

  return html
}

/**
 * Convert Person Schema to semantic HTML
 */
function generatePersonHTML(data: Record<string, unknown>): string {
  const name = escapeHtml(String(data.name || ''))
  const alternateName = data.alternateName ? escapeHtml(String(data.alternateName)) : ''
  const jobTitle = data.jobTitle ? escapeHtml(String(data.jobTitle)) : ''
  const url = data.url ? escapeHtml(String(data.url)) : ''
  const knowsAbout = Array.isArray(data.knowsAbout) ? data.knowsAbout.map((item: unknown) => escapeHtml(String(item))) : []

  let html = `<div itemscope itemtype="https://schema.org/Person">`
  if (name) html += `<span itemprop="name">${name}</span>`
  if (alternateName) html += `<span itemprop="alternateName">${alternateName}</span>`
  if (jobTitle) html += `<span itemprop="jobTitle">${jobTitle}</span>`
  if (url) html += `<a itemprop="url" href="${url}">${url}</a>`
  if (knowsAbout.length > 0) {
    knowsAbout.forEach((skill: string) => {
      html += `<span itemprop="knowsAbout">${skill}</span>`
    })
  }
  html += `</div>`

  return html
}

/**
 * Convert ItemList Schema to semantic HTML
 */
function generateItemListHTML(data: Record<string, unknown>): string {
  const name = escapeHtml(String(data.name || ''))
  const description = data.description ? escapeHtml(String(data.description)) : ''
  const itemListElement = Array.isArray(data.itemListElement) ? data.itemListElement : []

  let html = `<div itemscope itemtype="https://schema.org/ItemList">`
  if (name) html += `<span itemprop="name">${name}</span>`
  if (description) html += `<span itemprop="description">${description}</span>`
  if (itemListElement.length > 0) {
    html += `<ol>`
    itemListElement.forEach((item: unknown) => {
      if (item && typeof item === 'object') {
        const itemObj = item as Record<string, unknown>
        const position = itemObj.position || ''
        const itemName = itemObj.name ? escapeHtml(String(itemObj.name)) : ''
        const itemUrl = typeof itemObj.item === 'string' ? escapeHtml(itemObj.item) : ''

        html += `<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">`
        if (position) html += `<meta itemprop="position" content="${position}">`
        if (itemName) html += `<span itemprop="name">${itemName}</span>`
        if (itemUrl) html += `<a itemprop="item" href="${itemUrl}">${itemUrl}</a>`
        html += `</li>`
      }
    })
    html += `</ol>`
  }
  html += `</div>`

  return html
}

/**
 * Convert generic Schema to semantic HTML
 */
function generateGenericHTML(schemaType: string, data: Record<string, unknown>): string {
  const typeUrl = `https://schema.org/${schemaType}`
  let html = `<div itemscope itemtype="${typeUrl}">`

  // Automatically convert common properties
  const commonProps = ['name', 'description', 'url', 'image']
  commonProps.forEach((prop) => {
    if (data[prop]) {
      const value = escapeHtml(String(data[prop]))
      if (prop === 'url' || prop === 'image') {
        html += `<a itemprop="${prop}" href="${value}">${value}</a>`
      }
      else {
        html += `<span itemprop="${prop}">${value}</span>`
      }
    }
  })

  html += `</div>`
  return html
}

/**
 * HTML escape helper function
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#039;',
  }
  return text.replace(/[&<>"']/g, m => map[m] ?? m)
}

/**
 * Universal composable that adds Schema.org JSON-LD to page head
 *
 * @param schema - Schema object (can use context, type)
 * @param schema.renderHtml - Whether to automatically generate semantic HTML (default: false)
 * @param schema.visuallyHidden - Whether to visually hide (default: true)
 *
 * @example
 * ```ts
 * useSchema({
 *   context: 'https://schema.org',
 *   type: 'Person',
 *   name: 'John Doe',
 *   renderHtml: true,
 *   visuallyHidden: true
 * })
 * ```
 */
export function useSchema(schema: Record<string, unknown> & {
  renderHtml?: boolean
  visuallyHidden?: boolean
}) {
  // Extract renderHtml, visuallyHidden options
  const { renderHtml = false, visuallyHidden = true, ...schemaData } = schema

  // Get base URL for URL normalization
  const baseUrl = getBaseUrl()

  // Normalize URLs in schema data (before key transformation)
  const normalizedSchemaData = normalizeSchemaUrls(schemaData, baseUrl) as Record<string, unknown>

  // Convert context, type to @context, @type
  const transformedSchema = transformSchemaKeys(normalizedSchemaData)

  // Add default value if @context is missing
  const schemaWithContext = {
    '@context': transformedSchema['@context'] ?? 'https://schema.org',
    ...transformedSchema,
  }

  // Add JSON-LD script tag using useHead
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schemaWithContext, null, 2),
      },
    ],
  })

  // Automatic semantic HTML generation
  if (renderHtml) {
    const schemaType = (transformedSchema['@type'] || schemaData.type || '') as string
    const semanticHtml = generateSemanticHTML(schemaType, schemaData)

    if (semanticHtml) {
      // Add visually-hidden CSS style (only once)
      if (visuallyHidden) {
        useHead({
          style: [
            {
              innerHTML: `
                .nuxt-aeo-visually-hidden {
                  position: absolute;
                  width: 1px;
                  height: 1px;
                  padding: 0;
                  margin: -1px;
                  overflow: hidden;
                  clip: rect(0, 0, 0, 0);
                  white-space: nowrap;
                  border: 0;
                }
              `,
            },
          ],
        })
      }

      // Inject semantic HTML into body on client side
      if (import.meta.client) {
        const injectSemanticHTML = () => {
          if (typeof document !== 'undefined') {
            // Remove existing injected semantic HTML if present (for same type)
            const existing = document.querySelector(`.nuxt-aeo-semantic-${schemaType.toLowerCase()}`)
            if (existing) {
              existing.remove()
            }

            // Add semantic HTML to body
            const semanticDiv = document.createElement('div')
            semanticDiv.className = `nuxt-aeo-semantic-${schemaType.toLowerCase()} ${visuallyHidden ? 'nuxt-aeo-visually-hidden' : ''}`
            semanticDiv.setAttribute('aria-hidden', 'true')
            semanticDiv.innerHTML = semanticHtml
            document.body.appendChild(semanticDiv)
          }
        }

        // Execute when DOM is ready
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', injectSemanticHTML)
        }
        else {
          injectSemanticHTML()
        }
      }
    }
  }
}
